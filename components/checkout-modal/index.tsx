// app/checkout/page.tsx
"use client";
import { Button, Modal } from "flowbite-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { CreditCard } from "lucide-react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function CheckoutModal({
  open,
  handleClose,
  total,
  dispatchOrder,
}: {
  open: boolean;
  handleClose: () => void;
  total: number | string;
  dispatchOrder: (
    session: Session | null,
    onlinePaid: boolean,
    paymentData?: any | null
  ) => Promise<void>;
}) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        dispatchOrder={dispatchOrder}
        total={total}
        handleClose={handleClose}
        open={open}
      />
    </Elements>
  );
}

const CheckoutForm = ({
  open,
  handleClose,
  total,
  dispatchOrder,
}: {
  open: boolean;
  handleClose: () => void;
  total: number | string;
  dispatchOrder: (
    session: Session | null,
    onlinePaid: boolean,
    paymentData?: any | null
  ) => Promise<void>;
}) => {
  const stripe = useStripe();
  const { data } = useSession();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const totalAmount = parseFloat(total.toString());
  const totalWithTax = totalAmount + totalAmount * 0.1; // Adding 10% tax

  const amountInCents: number = Math.round(
    parseFloat(totalWithTax.toString()) * 100
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    // Create a payment intent using the backend API (server action)
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountInCents, // $50.00 in cents
        currency: "usd",
        paymentMethodType: "card",
      }),
    });

    const { clientSecret, error: paymentError } = await response.json();

    if (paymentError) {
      setError(paymentError);
      setLoading(false);
      return;
    }

    // Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    console.log(result);

    if (result.error) {
      toast.error(result.error.message || "Payment failed");
      setError(result.error.message || "Payment failed");
    } else if (result.paymentIntent?.status === "succeeded") {
      // Handle successful payment
      // console.log("Payment successful!");
      toast.success("Payment successful!");
      handleClose();
      await dispatchOrder(data, true, result);
    }

    setLoading(false);
  };

  return (
    <Modal show={open} onClose={handleClose}>
      <Modal.Header className="flex items-center space-x-2">
        Pay Online
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Please enter your payment details below to complete the order.
          </p>
          <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            <p>Tax (10%): ${(totalAmount * 0.1).toFixed(2)}</p>
            <p>Total with Tax: ${totalWithTax.toFixed(2)}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                  },
                },
              }}
              className="border border-gray-300 p-2 rounded-lg"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="dark"
          onClick={handleSubmit}
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay"}
        </Button>
        <Button color="gray" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
