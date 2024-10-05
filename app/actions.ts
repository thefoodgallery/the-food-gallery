"use server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
// import { promises as fs } from "fs";
import Handlebars from "handlebars";
import { FoodItem } from "@/context/StateContext";
import User from "@/models/User";
import Order from "@/models/Orders";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/mongoDb";
import Reservation from "@/models/Reservation";

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

interface MakeReservationData {
  email: string;
  firstName: string;
  lastName: string;
  noOfGuests: string | number;
  phoneNumber: string;
  reservationDate: string;
  reservationTime: string;
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

    // const templatePath = path.join(
    //   process.cwd(),
    //   "/app/email-templates/new-user.html"
    // );
    // console.log("new user template path", templatePath);
    let template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New User Registration</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    "
  >
    <div
      class="container"
      style="
        width: 100%;
        max-width: 600px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      "
    >
      <div class="header" style="text-align: center">
        <img
          src="{{logoUrl}}"
          alt="Brand Logo"
          class="logo"
          style="max-width: 100px; margin-bottom: 20px"
        />
      </div>
      <div class="content" style="margin: 20px 0; text-align: center">
        <p>A new user has registered!</p>
      </div>
      <div
        class="card"
        style="
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          display: inline-block;
        "
      >
        <img
          src="{{userPhoto}}"
          alt="User Photo"
          class="photo"
          style="
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 20px;
          "
          width="100"
          height="100"
        />
        <div class="details">
          <p
            class="name"
            style="margin: 10px 0; font-size: 20px; font-weight: bold"
          >
            {{userName}}
          </p>
          <p class="email" style="margin: 10px 0; font-size: 16px">
            {{userEmail}}
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
`;

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
  onlinePaid?: boolean;
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

    const { userName, userEmail, orderId, orderItems, totalPrice, onlinePaid } =
      orderDetails;

    // const templatePath = path.join(
    //   process.cwd(),
    //   "/public/email-templates/new-order.html"
    // );

    // console.log("placing order templat path", templatePath);
    const templateSource = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f9f9f9;
    "
  >
    <div
      class="container"
      style="
        width: 100%;
        max-width: 600px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        background-color: #fff;
      "
    >
      <div class="header" style="text-align: center">
        <img
          src="{{logoUrl}}"
          alt="Brand Logo"
          class="logo"
          style="max-width: 100px; margin-bottom: 20px"
        />
      </div>
      <div class="content" style="margin: 20px 0; text-align: center">
        <p>Thank you for your order!</p>
      </div>
      <div class="details" style="text-align: left; margin-bottom: 20px">
        <p style="margin: 5px 0"><strong>Name:</strong> {{userName}}</p>
        <p style="margin: 5px 0"><strong>Email:</strong> {{userEmail}}</p>
        <p style="margin: 5px 0"><strong>Order ID:</strong> {{orderId}}</p>
      </div>
      <table
        class="order-items"
        style="width: 100%; border-collapse: collapse; margin-bottom: 20px"
        width="100%"
      >
        <thead>
          <tr>
            <th
              style="
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
                background-color: #f2f2f2;
              "
              align="left"
              bgcolor="#f2f2f2"
            >
              Item
            </th>
            <th
              style="
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
                background-color: #f2f2f2;
              "
              align="left"
              bgcolor="#f2f2f2"
            >
              Quantity
            </th>
            <th
              style="
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
                background-color: #f2f2f2;
              "
              align="left"
              bgcolor="#f2f2f2"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {{#each orderItems}}
          <tr>
            <td
              style="border: 1px solid #ddd; padding: 8px; text-align: left"
              align="left"
            >
              {{this.name}}
            </td>
            <td
              style="border: 1px solid #ddd; padding: 8px; text-align: left"
              align="left"
            >
              {{this.count}}
            </td>
            <td
              style="border: 1px solid #ddd; padding: 8px; text-align: left"
              align="left"
            >
              $ {{this.price}}
            </td>
          </tr>
          {{/each}}
        </tbody>
      </table>
      <div
        class="total"
        style="text-align: right; margin-top: 20px; font-weight: bold"
      >
        <p>Total Price: $ {{totalPrice}} ${
          onlinePaid ? "<em>(Paid Online)</em>" : ""
        }</p>
      </div>
    </div>
  </body>
</html>
`;
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
    console.log(error);
    return error;
  }
}
interface OrderData {
  items: (FoodItem & { count: number })[];
  email: string;
  onlinePaid: boolean;
  paymentData?: any;
}

export const placeOrder = async (orderData: OrderData) => {
  // console.log(orderData);

  try {
    await dbConnect();
    const user = await User.findOne({ email: orderData.email }).exec();
    if (!user) {
      throw new Error("User not found");
    }

    const total = orderData.items
      .reduce((acc, item) => acc + item.price * item.count, 0)
      .toFixed(2);

    const newOrder = new Order({
      customer: user._id,
      items: JSON.stringify(orderData.items),
      orderDate: new Date(),
      totalAmount: total,
      onlinePaid: orderData.onlinePaid,
      paymentData: JSON.stringify(orderData.paymentData),
    });

    const savedOrder = await newOrder.save();

    await sendOrderMail({
      orderId: savedOrder._id as ObjectId,
      orderItems: orderData.items,
      totalPrice: total,
      userEmail: orderData.email,
      userName: user.name,
      onlinePaid: orderData.onlinePaid,
    });
    // console.log("Order placed successfully:", savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const getMyOrders = async (
  userEmail: string | undefined | null
): Promise<
  {
    _id: string;
    customer: string;
    items: any[];
    totalAmount: number;
    orderDate: string;
    __v: number;
  }[]
> => {
  try {
    await dbConnect();
    // console.log(userEmail);
    const user = await User.findOne({ email: userEmail });
    // console.log(user);
    const orders = await Order.find({ customer: user?._id })
      .sort({ orderDate: -1 })
      .exec();

    return orders.map((order) => {
      const plainOrder = order.toObject();
      // console.log(plainOrder);
      return {
        ...plainOrder,
        _id: plainOrder._id.toString(),
        customer: plainOrder.customer.toString(),
        orderDate: plainOrder.orderDate.toISOString(),
        items: JSON.parse(plainOrder.items),
      };
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export async function makeReservation(params: MakeReservationData) {
  try {
    await dbConnect();
    const reservation = new Reservation(params);
    await reservation.save();
    console.log("Reservation made successfully");

    await sendReservationMail(params);
  } catch (error) {
    console.error("Error making reservation:", error);
    throw error;
  }
}

export async function sendReservationMail(
  reservationData: MakeReservationData
) {
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
        accessToken: accessToken.token,
      },
    } as nodemailer.TransportOptions);
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      reservationDate,
      reservationTime,
      noOfGuests,
    } = reservationData;

    const templateSource = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reservation Confirmation</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f9f9f9;
    "
  >
    <div
      class="container"
      style="
        width: 100%;
        max-width: 600px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        background-color: #fff;
      "
    >
      <div class="header" style="text-align: center">
        <img
          src="{{logoUrl}}"
          alt="Brand Logo"
          class="logo"
          style="max-width: 100px; margin-bottom: 20px"
        />
      </div>
      <div class="content" style="margin: 20px 0; text-align: center">
        <p>Thank you for making a reservation!</p>
      </div>
      <div class="details" style="text-align: left; margin-bottom: 20px">
        <p style="margin: 5px 0"><strong>Name:</strong> {{firstName}} {{lastName}}</p>
        <p style="margin: 5px 0"><strong>Email:</strong> {{email}}</p>
        <p style="margin: 5px 0"><strong>Phone Number:</strong> {{phoneNumber}}</p>
        <p style="margin: 5px 0"><strong>Reservation Date:</strong> {{reservationDate}}</p>
        <p style="margin: 5px 0"><strong>Reservation Time:</strong> {{reservationTime}}</p>
        <p style="margin: 5px 0"><strong>No of Guests:</strong> {{noOfGuests}}</p>
      </div>
    </div>
  </body>
</html>
`;
    const template = Handlebars.compile(templateSource);
    const emailHtml = template({
      logoUrl: "https://www.thefood-gallery.com/images/assets/logo.png",
      firstName,
      lastName,
      email,
      phoneNumber,
      reservationDate,
      reservationTime,
      noOfGuests,
    });
    const mailToCustomer = {
      from: `The Food Gallery - thefoodg4@gmail.com `,
      to: email,
      subject: "Reservation Confirmation",
      html: emailHtml,
    };

    const info: nodemailer.SentMessageInfo = await transport.sendMail(
      mailToCustomer
    );

    const mailToRestaurant = {
      from: `New order by - ${firstName + " " + lastName}`,
      to: "thefoodg4@gmail.com",
      subject: `New Reservation Booking by ${email}`,
      html: emailHtml,
    };
    const res: nodemailer.SentMessageInfo = await transport.sendMail(
      mailToRestaurant
    );
    console.log("Reservation Email sent: " + info.response);
  } catch (error) {
    console.error(error);
  }
}
