import React from "react";
import Header from "../components/Header.jsx";

const ReturnAndExchangePolicy = () => {
  return (
    <>
    <Header />

    <div className="max-w-4xl mx-auto p-8 mt-10 bg-gray-100 shadow-xl rounded-xl" dir="rtl">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">سياسة التبديل والإرجاع</h1>
      
      <div className="text-black leading-relaxed space-y-6">
        <div>
          <h2 className="font-semibold text-xl text-black">التبديل:</h2>
          <p>
            نحن نوفّر خيار التبديل في حال كانت هناك مشكلة في المنتج، ويتم ذلك من خلال التواصل معنا مباشرة عبر الواتس آب خلال مدة أقصاها 3 أيام من تاريخ الاستلام، مع ضرورة أن يكون المنتج بحالته الأصلية وغير مستخدم.
          </p>
        </div>
        
        <div>
          <h2 className="font-semibold text-xl text-black">الإرجاع:</h2>
          <p>
            نأسف، لا يمكن إرجاع المنتجات بعد إتمام عملية الشراء، وذلك حرصًا على جودة منتجاتنا ونظافتها.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ReturnAndExchangePolicy;
