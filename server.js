import express from "express";
import Razorpay from "razorpay";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Your Razorpay test credentials
const razorpay = new Razorpay({
  key_id: "rzp_live_Ra7sChrwvhz1KX",
  key_secret: "6w7DwreQJsN51AFg94xDGXYn"
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Order Created:", order.id);
    res.json(order);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
