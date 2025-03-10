import connectDB from '../db/connection.js';
import categoriesRouter from './modules/category/category.router.js';
import productRouter from './modules/product/product.router.js';
import authRouter from './modules/auth/auth.router.js';
import subCategoriesRouter from './modules/subCategory/subCategory.router.js';
import cartRouter from './modules/cart/cart.router.js';
import userRouter from './modules/user/user.router.js';
import orderRouter from './modules/order/order.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import axios from 'axios'; // Import axios for making requests
import cors from 'cors';

const initApp = (app, express) => {
    connectDB();
    app.use(cors());
    app.use(express.json());

    // Define a route for creating payment session
    app.post('/create-payment-session', async (req, res) => {
        const { amount, customerName, customerEmail, customerPhone } = req.body;

        try {
            // Corrected API endpoint
            const response = await axios.post(
                'https://api.lahza.io/v1/payments/session', // Updated endpoint
                {
                    amount: amount, // Payment amount
                    currency: 'USD', // Currency
                    description: 'Payment for Stadium Booking', // Description of payment
                    customer: {
                        name: customerName, // Customer name
                        email: customerEmail, // Customer email
                        mobile: customerPhone, // Customer phone number
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Set content type to JSON
                        Authorization: 'Bearer pk_test_LphSnqbNAyG1jdckoTL3QunlUkXHeb92v', // API key
                    },
                }
            );

            // Send back the payment session data or the payment URL to the client
            res.json(response.data); // Send response from Lahza API back to the frontend
        } catch (error) {
            console.error('Error creating payment session:', error);
            res.status(500).json({ error: 'Failed to create payment session' });
        }
    });

    // Set up other routes
    app.get('/', (req, res) => {
        return res.status(200).json({ message: "Hello in Maysaa-Shop" });
    });

    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/categories', categoriesRouter);
    app.use('/subCategories', subCategoriesRouter);
    app.use('/products', productRouter);
    app.use('/cart', cartRouter);
    app.use('/coupon', couponRouter);
    app.use('/order', orderRouter);

    // Handle 404 errors
    app.use('*', (req, res) => {
        return res.status(404).json({ message: "Page not found" });
    });

    // Error handler
    app.use((err, req, res, next) => {
        res.json({ message: err.message });
    });
};

export default initApp;
