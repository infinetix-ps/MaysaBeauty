import connectDB from "../db/connection.js";
import categoriesRouter from "./modules/category/category.router.js";
import productRouter from "./modules/product/product.router.js";
import authRouter from "./modules/auth/auth.router.js";
import subCategoriesRouter from "./modules/subCategory/subCategory.router.js";
import cartRouter from "./modules/cart/cart.router.js";
import userRouter from "./modules/user/user.router.js";
import orderRouter from "./modules/order/order.router.js";
import couponRouter from "./modules/coupon/coupon.router.js";
import axios from "axios"; // Import axios for making requests
import cors from "cors";

import nodemailer from "nodemailer";

const initApp = (app, express) => {
  connectDB();
  app.use(cors());
  app.use(express.json());

  // Define a route for creating payment session
  app.post("/create-payment-session", async (req, res) => {
    const { amount, customerName, customerEmail, customerPhone } = req.body;

    try {
      // Corrected API endpoint
      const response = await axios.post(
        "https://api.lahza.io/v1/payments/session", // Updated endpoint
        {
          amount: amount, // Payment amount
          currency: "USD", // Currency
          description: "Payment for Stadium Booking", // Description of payment
          customer: {
            name: customerName, // Customer name
            email: customerEmail, // Customer email
            mobile: customerPhone, // Customer phone number
          },
        },
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Authorization: "Bearer pk_test_LphSnqbNAyG1jdckoTL3QunlUkXHeb92v", // API key
          },
        }
      );

      // Send back the payment session data or the payment URL to the client
      res.json(response.data); // Send response from Lahza API back to the frontend
    } catch (error) {
      console.error("Error creating payment session:", error);
      res.status(500).json({ error: "Failed to create payment session" });
    }
  });

  // Set up other routes
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello in Maysaa-Shop" });
  });

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/categories", categoriesRouter);
  app.use("/subCategories", subCategoriesRouter);
  app.use("/products", productRouter);
  app.use("/cart", cartRouter);
  app.use("/coupon", couponRouter);
  app.use("/order", orderRouter);

  app.post('/send-cart-email', async (req, res) => {
    const { email, cart, totalPrice, paymentDetails } = req.body;

    if (!email || !Array.isArray(cart) || !paymentDetails) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    const cartItemsHTML = cart.map(item => `
        <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px;"><img src="${item.image}" alt="${item.name}" style="width: 60px; border-radius: 8px;" /></td>
            <td style="padding: 10px;">${item.name}</td>
            <td style="padding: 10px;">${item.quantity}</td>
            <td style="padding: 10px;">$${item.price}</td>
        </tr>
    `).join('');

    // Format the payment date to a creative string
    const paymentDate = new Date(paymentDetails.paymentDate);
    const formattedDate = paymentDate.toLocaleDateString('en-US', {
        weekday: 'long', // "Monday"
        year: 'numeric', // "2025"
        month: 'long',   // "April"
        day: 'numeric',  // "28"
    }) + ' at ' + paymentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // For 12-hour time format (AM/PM)
    });

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
            <h2 style="text-align: center; color: #4CAF50;">🛒 Maysaa-Shop Receipt</h2>
            <p style="font-size: 16px;">Thank you for your purchase! Here’s your order summary:</p>

            <p><strong>Order ID:</strong> ${paymentDetails.orderId}</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #4CAF50; color: white;">
                        <th style="padding: 10px;">Image</th>
                        <th style="padding: 10px;">Product</th>
                        <th style="padding: 10px;">Quantity</th>
                        <th style="padding: 10px;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${cartItemsHTML}
                </tbody>
            </table>

            <h3 style="text-align: right; margin-top: 20px;">Total: <span style="color: #4CAF50;">$${totalPrice}</span></h3>

            <h4 style="margin-top: 20px;">Payment Details</h4>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Card Type:</strong> ${paymentDetails.cardType}</p>

            <p style="text-align: center; font-size: 14px; margin-top: 30px;">🧡 Maysaa-Shop Team</p>
            <p style="text-align: center; font-size: 12px; color: gray;">If you have any questions, feel free to reply to this email.</p>
        </div>
    `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: "Maysaa-Shop",
        to: email,
        subject: '🧾 Your Maysaa-Shop Cart Summary',
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Cart email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send cart email" });
    }
});
  // Handle 404 errors
  app.use("*", (req, res) => {
    return res.status(404).json({ message: "Page not found" });
  });

  // Error handler
  app.use((err, req, res, next) => {
    res.json({ message: err.message });
  });
};

export default initApp;
