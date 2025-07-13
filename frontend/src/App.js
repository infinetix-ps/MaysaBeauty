// import React from "react";
// import DynamicHeader from "./components/DynamicHeader.jsx";
// import ProductCategories from "./components/ProductCategories.jsx";
// // import AboutUs from "./components/AboutUs.jsx";
// import ProductGrid from "./components/ProductGrid.jsx";
// import AnimatedDivider from "./components/AnimatedDivider.jsx";
// import Header from "./components/Header.jsx";
// import { CartProvider } from "./pages/contexts/cartContext.jsx"; // Import CartProvider
// import Footer from "./components/Footer.jsx";
// import RoyalSlimHome from "./pages/royalSlim.jsx";
// import IphonePage from "./pages/iphonePage.jsx";
// import WhatsAppButton from "./components/ui/whatsappButton.jsx";

// export const products = [
//   {
//     id: 1,
//     name: "Slimming Body Wrap",
//     price: 49.99,
//     images: [
//       "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000",
//       "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000",
//     ],
//     description:
//       "Achieve a slimmer silhouette with our advanced body wrap. This innovative product helps reduce water retention and cellulite, giving you a more toned appearance.",
//     category: "Slimming",
//     usage:
//       "Apply to target areas and leave for 60 minutes. Use 2-3 times per week for best results.",
//     ingredients: "Caffeine, Green Tea Extract, Seaweed Extract, Shea Butter",
//     rating: 4.5,
//     numReviews: 28,
//     reviews: [
//       {
//         rating: 5,
//         author: "Jane D.",
//         text: "Amazing results! I saw a difference after just one use.",
//       },
//       {
//         rating: 4,
//         author: "Mike S.",
//         text: "Good product, but takes consistent use to see results.",
//       },
//       {
//         rating: 5,
//         author: "Emily R.",
//         text: "Love how my skin feels after using this. Definitely firmer!",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Curves Enhancing Cream",
//     price: 39.99,
//     images: [
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=1000",
//       "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000",
//     ],
//     description:
//       "Enhance your natural curves with our specially formulated cream. Designed to promote fat storage in desired areas, helping you achieve a fuller, more voluptuous figure.",
//     category: "Fattening",
//     usage:
//       "Massage into desired areas twice daily. Results may vary and are most effective when combined with a balanced diet.",
//     ingredients: "Volufiline, Maca Root Extract, Saw Palmetto, Coconut Oil",
//     rating: 4.2,
//     numReviews: 15,
//     reviews: [
//       {
//         rating: 4,
//         author: "Sarah L.",
//         text: "Noticed some improvement in my curves. Will continue using.",
//       },
//       {
//         rating: 5,
//         author: "Tina M.",
//         text: "This cream is a game-changer! Love the results.",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Radiance Boosting Serum",
//     price: 59.99,
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000",
//       "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1000",
//     ],
//     description:
//       "Achieve glowing, youthful skin with our potent radiance-boosting serum. Packed with antioxidants and vitamins to nourish and revitalize your complexion.",
//     category: "Skin Care",
//     usage:
//       "Apply 2-3 drops to cleansed face and neck, morning and night. Gently pat into skin.",
//     ingredients: "Vitamin C, Hyaluronic Acid, Niacinamide, Peptides",
//     rating: 4.2,
//     numReviews: 15,
//     reviews: [
//       {
//         rating: 4,
//         author: "Sarah L.",
//         text: "Noticed some improvement in my curves. Will continue using.",
//       },
//       {
//         rating: 5,
//         author: "Tina M.",
//         text: "This cream is a game-changer! Love the results.",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Firming Body Lotion",
//     price: 34.99,
//     images: [
//       "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=1000",
//       "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1000",
//     ],
//     description:
//       "Tighten and tone your skin with our firming body lotion. This formula helps improve skin elasticity and reduces the appearance of cellulite.",
//     category: "Slimming",
//     usage:
//       "Apply generously to entire body after showering or bathing. Massage in circular motions until absorbed.",
//     ingredients: "Caffeine, Retinol, Shea Butter, Collagen",
//   },
//   {
//     id: 5,
//     name: "Curves Nutrition Shake",
//     price: 29.99,
//     images: [
//       "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?auto=format&fit=crop&q=80&w=1000",
//       "https://images.unsplash.com/photo-1595864659662-8c7039779152?auto=format&fit=crop&q=80&w=1000",
//     ],
//     description:
//       "Support your curves with our nutrient-rich shake. Formulated to provide healthy fats and proteins to help you gain weight in all the right places.",
//     category: "Fattening",
//     usage:
//       "Mix one scoop with 8 oz of milk or water. Consume 1-2 times daily as a snack or meal replacement.",
//     ingredients: "Whey Protein, MCT Oil, Avocado Powder, Chia Seeds",
//   },
//   {
//     id: 6,
//     name: "Hydrating Face Mask",
//     price: 24.99,
//     images: [
//       "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1000",
//       "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?auto=format&fit=crop&q=80&w=1000",
//     ],
//     description:
//       "Quench your skin's thirst with our ultra-hydrating face mask. Infused with moisturizing ingredients to leave your skin soft, supple, and glowing.",
//     category: "Skin Care",
//     usage:
//       "Apply a thick layer to clean, dry skin. Leave on for 15-20 minutes, then rinse with warm water. Use 2-3 times per week.",
//     ingredients: "Hyaluronic Acid, Aloe Vera, Glycerin, Ceramides",
//   },
//   {
//     id: 7,
//     name: "Metabolism Boosting Tea",
//     price: 19.99,
//     images: [
//       "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&q=80&w=1000",
//       "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?auto=format&fit=crop&q=80&w=1000",
//     ],
//     description:
//       "Enhance your slimming efforts with our metabolism-boosting tea. A blend of natural ingredients to support your weight loss journey.",
//     category: "Slimming",
//     usage:
//       "Steep one tea bag in hot water for 3-5 minutes. Enjoy 1-2 cups daily, preferably before meals.",
//     ingredients: "Green Tea, Oolong Tea, Ginger, Lemongrass",
//   },
//   {
//     id: 8,
//     name: "Nourishing Body Oil",
//     price: 44.99,
//     images: [
//       "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=1000",
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=1000",
//     ],
//     description:
//       "Indulge your skin with our luxurious body oil. Rich in nutrients and essential fatty acids to promote soft, supple skin and enhance your natural curves.",
//     category: "Fattening",
//     usage:
//       "Apply to damp skin after bathing or showering. Massage thoroughly into skin, focusing on areas you want to enhance.",
//     ingredients: "Argan Oil, Jojoba Oil, Vitamin E, Evening Primrose Oil",
//   },
// ];
// export const orders = [
//   {
//     id: 1,
//     date: "2023-05-01",
//     total: 89.98,
//     status: "Delivered",
//     items: [1, 5],
//   },
//   { id: 2, date: "2023-05-15", total: 129.99, status: "Shipped", items: [2] },
//   {
//     id: 3,
//     date: "2023-06-01",
//     total: 119.98,
//     status: "Processing",
//     items: [3, 8],
//   },
// ];
// const contents = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1000&h=2000&fit=crop",
//     alt: "Demo Content 1",
//     type: "image",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1682687220198-88e9bdea9931?q=80&w=1000&h=2000&fit=crop",
//     alt: "Demo Content 2",
//     type: "image",
//   },
//   {
//     id: 3,
//     src: "https://images.unsplash.com/photo-1707345512638-997d31a10eaa?q=80&w=1000&h=2000&fit=crop",
//     alt: "Demo Content 3",
//     type: "image",
//   },
// ];

// export function getProduct(id) {
//   return products.find((p) => p.id === Number(id)) || null;
// }
// export function getOrder(id) {
//   return orders.find((o) => o.id === id);
// }
// const content = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1000&h=2000&fit=crop",
//     alt: "Demo Content 1",
//     type: "image",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1682687220198-88e9bdea9931?q=80&w=1000&h=2000&fit=crop",
//     alt: "Demo Content 2",
//     type: "image",
//   },
//   {
//     id: 3,
//     src: "https://images.unsplash.com/photo-1707345512638-997d31a10eaa?q=80&w=1000&h=2000&fit=crop",
//     alt: "Demo Content 3",
//     type: "image",
//   },
// ];

// function App() {
//   return (
//     <CartProvider>
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
//         <Header />
//         <DynamicHeader />
//         <main>
//           <ProductCategories />
//           <IphonePage />
//           <RoyalSlimHome />
//           <ProductGrid products={products} />
//           <WhatsAppButton/>
//         </main>
//       </div>
//     </CartProvider>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import DynamicHeader from "./components/DynamicHeader.jsx";
import ProductCategories from "./components/ProductCategories.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import AnimatedDivider from "./components/AnimatedDivider.jsx";
import Header from "./components/Header.jsx";
import { CartProvider } from "./pages/contexts/cartContext.jsx";
import Footer from "./components/Footer.jsx";
import RoyalSlimHome from "./pages/royalSlim.jsx";
import IphonePage from "./pages/iphonePage.jsx";
import WhatsAppButton from "./components/ui/whatsappButton.jsx";

function App() {
  // State variables to store products and orders
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch products and orders from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products from the backend API
        const productResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/products?limit=50`
        );
        setProducts(productResponse.data.products);

        // Fetch orders from the backend API
        const orderResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/orders`
        );
        setOrders(orderResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <DynamicHeader />
      <main>
        {/* <ProductCategories /> */}
        <IphonePage />
        <RoyalSlimHome />
        <ProductGrid products={products} />
        <WhatsAppButton />
      </main>
    </div>
  );
}

export default App;
