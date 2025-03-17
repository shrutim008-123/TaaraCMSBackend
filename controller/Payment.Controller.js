import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

// In-memory map to store request IDs temporarily
const requestMap = new Map();

// for getting access token
const generateAccessToken = async () => {
  try {
    const auth = `${process.env.PAYPAL_ClIENT_ID}:${process.env.PAYPAL_ClIENT_SECRET}`;
    const base64Auth = Buffer.from(auth).toString("base64");
    const tokenResponse = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${base64Auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return tokenResponse.data.access_token;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to generate PayPal access token");
  }
};

// for creating payment order
const createPayment = async (req, res) => {
  try {
    let { amount } = req.body;
    const accessToken = await generateAccessToken();

    const generatedUid = uuidv4(); // Generate a unique request ID
    requestMap.set(generatedUid, { amount }); // ✅ Store requestId in map

    const create_payment_json = {
      intent: "CAPTURE", // ✅ Use CAPTURE to directly capture payment
      purchase_units: [
        {
          items: [
            {
              name: "taara basic donation",
              description: `Donation of $${amount}`,
              quantity: 1,
              unit_amount: {
                currency_code: "USD",
                value: amount,
              },
            },
          ],
          amount: {
            currency_code: "USD",
            value: amount,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: amount,
              },
            },
          },
        },
      ],
      application_context: {
        // ✅ Pass request_id to return_url and cancel_url
        return_url: `http://localhost:3000/payment/success?request_id=${generatedUid}`, // ✅ Pass request_id to success URL
        cancel_url: "http://localhost:3000/payment/failure",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        landing_page: "LOGIN",
      },
      // payment_source: {
      //   paypal: {},
      // },
    };

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      create_payment_json,
      {
        headers: {
          "Content-Type": "application/json",
          "PayPal-Request-Id": generatedUid, // ✅ Set unique request ID
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Order Created:", response.data);

    res.status(201).json({
      id: response.data.id,
      links: response.data.links, // PayPal approval links
    });
  } catch (error) {
    console.log(error?.response?.data?.details);
    res.status(500).json({ error: "Server error" });
  }
};

// for capturing payment after user approval
const paymentSuccess = async (req, res) => {
  try {
    const { token, request_id } = req.query;

    if (!request_id || !requestMap.has(request_id)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    const accessToken = await generateAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${token}/capture`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "PayPal-Request-Id": request_id, // ✅ Use the same request ID for consistency
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Payment Captured:", response.data);

    // ✅ Clean up request ID from map after successful payment
    requestMap.delete(request_id);

    res.redirect("http://localhost:5173/payment");
  } catch (error) {
    console.log(error?.response?.data);
    res.status(500).json({ error: "Failed to capture payment" });
  }
};

// for handling payment failure
const paymentFailure = async (req, res) => {
  try {
    const { request_id } = req.query;

    // ✅ Clean up request ID on failure as well
    if (request_id) {
      requestMap.delete(request_id);
    }
    
    res.send("Payment failed!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to handle payment failure" });
  }
};

export { createPayment, paymentFailure, paymentSuccess };
