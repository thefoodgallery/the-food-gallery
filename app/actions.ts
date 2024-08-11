"use server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { FoodItem } from "@/context/StateContext";
import User from "@/models/User";
import Order from "@/models/Orders";
import { ObjectId } from "mongodb";

const OAuth2 = google.auth.OAuth2;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GMAIL_OAUTH_REFRESH_TOKEN;
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

interface UserDetails {
  userName: string;
  userEmail: string;
  userPhoto: string;
}

export async function sendNewUserMail(userDetails: UserDetails) {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      tls: {
        rejectUnauthorized: false,
      },
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "thefoodg4@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token, // Ensure the token is passed correctly
      },
    } as nodemailer.TransportOptions);
    const { userName, userEmail, userPhoto } = userDetails;

    const templatePath = path.join(
      process.cwd(),
      "util",
      "email-templates",
      "new-user.html"
    );
    let template = fs.readFileSync(templatePath, "utf-8");

    template = template.replace(
      "{{logoUrl}}",
      "https://www.thefood-gallery.com/images/assets/logo.png"
    );
    template = template.replace("{{userName}}", userName);
    template = template.replace("{{userEmail}}", userEmail);
    template = template.replace("{{userPhoto}}", userPhoto);

    let mailOptions = {
      from: userEmail,
      to: "thefoodg4@gmail.com",
      subject: "New User Registration",
      html: template,
    };

    const info: nodemailer.SentMessageInfo = await transport.sendMail(
      mailOptions
    );
    console.log("New user Email sent: " + info.response);
  } catch (error) {
    console.error(error);
  }
}

interface OrderDetails {
  userName: string;
  userEmail: string;
  orderItems: (FoodItem & { count: number })[];
  totalPrice: number | string;
  orderId: string | ObjectId;
}

export async function sendOrderMail(orderDetails: OrderDetails) {
  try {
    // console.log("here sending the email");
    const accessToken = await oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      tls: {
        rejectUnauthorized: false,
      },
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "thefoodg4@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    } as nodemailer.TransportOptions);

    const { userName, userEmail, orderId, orderItems, totalPrice } =
      orderDetails;

    const templatePath = path.join(
      process.cwd(),
      "util",
      "email-templates",
      "new-order.html"
    );

    // console.log(templatePath);
    const templateSource = fs.readFileSync(templatePath, "utf-8");

    const template = Handlebars.compile(templateSource);
    const emailHtml = template({
      logoUrl: "https://www.thefood-gallery.com/images/assets/logo.png",
      userName,
      userEmail,
      orderId,
      orderItems,
      totalPrice,
    });
    const mailToCustomer = {
      from: `The Food Gallery - thefoodg4@gmail.com`,
      to: userEmail,
      subject: "Order Confirmation",
      html: emailHtml,
    };
    const info: nodemailer.SentMessageInfo = await transport.sendMail(
      mailToCustomer
    );

    // console.log(info);

    const mailToRestaurant = {
      from: `New order by - ${userName}`,
      to: "thefoodg4@gmail.com",
      subject: `New Order Confirmation by ${userEmail}`,
      html: emailHtml,
    };
    const res: nodemailer.SentMessageInfo = await transport.sendMail(
      mailToRestaurant
    );
    // console.log("New order Email sent to restaurant: " + res.response);
  } catch (error) {
    console.error(error);
    console.log(error);
    return error;
  }
}

interface OrderData {
  items: (FoodItem & { count: number })[];
  email: string;
}

export const placeOrder = async (orderData: OrderData) => {
  try {
    const user = await User.findOne({ email: orderData.email }).exec();
    if (!user) {
      throw new Error("User not found");
    }

    const total = orderData.items
      .reduce((acc, item) => acc + item.price, 0)
      .toFixed(2);

    const newOrder = new Order({
      customer: user._id,
      items: JSON.stringify(orderData.items),
      orderDate: new Date(),
      totalAmount: total,
    });

    const savedOrder = await newOrder.save();

    await sendOrderMail({
      orderId: savedOrder._id as ObjectId,
      orderItems: orderData.items,
      totalPrice: total,
      userEmail: orderData.email,
      userName: user.name,
    });
    console.log("Order placed successfully:", savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};
