import React from "react";
import Header from "../components/Header.jsx";

const PrivacyPolicy = () => {
    return (
        <>
            <Header />

            <div className="max-w-4xl mx-auto p-8 mt-10 bg-gray-100 shadow-xl rounded-xl" dir="rtl">
                <h1 className="text-3xl font-bold text-black mb-6 text-center">سياسة الخصوصية</h1>

                <div className="text-black leading-relaxed space-y-6">
                    <p>
                        نحن نُقدّر خصوصيتك ونلتزم بحماية بياناتك الشخصية. عند استخدامك لموقعنا، نقوم بجمع بعض المعلومات الضرورية لتحسين تجربتك، مثل الاسم، رقم الهاتف، عنوان التوصيل، والبريد الإلكتروني.
                    </p>
                    <p>
                        جميع المعلومات التي يتم جمعها تُستخدم فقط لأغراض معالجة الطلبات وتقديم خدمة أفضل، ولا يتم مشاركتها مع أي طرف ثالث خارج إطار العملية الشرائية أو الشحن.
                    </p>
                    <p>
                        نُؤكّد لك أن بياناتك محفوظة بأمان، ويتم التعامل معها بسرّية تامة وبما يتوافق مع المعايير.
                    </p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
