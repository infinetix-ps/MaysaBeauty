import React from "react";
import Header from "../components/Header.jsx";

const PrivacyPolicy = () => {
    const sections = [
        {
            id: "collection",
            title: "جمع المعلومات",
            content: "نحن نُقدّر خصوصيتك ونلتزم بحماية بياناتك الشخصية. عند استخدامك لموقعنا، نقوم بجمع بعض المعلومات الضرورية لتحسين تجربتك، مثل الاسم، رقم الهاتف، عنوان التوصيل، والبريد الإلكتروني."
        },
        {
            id: "usage",
            title: "استخدام المعلومات",
            content: "جميع المعلومات التي يتم جمعها تُستخدم فقط لأغراض معالجة الطلبات وتقديم خدمة أفضل، ولا يتم مشاركتها مع أي طرف ثالث خارج إطار العملية الشرائية أو الشحن."
        },
        {
            id: "security",
            title: "أمان البيانات",
            content: "نُؤكّد لك أن بياناتك محفوظة بأمان، ويتم التعامل معها بسرّية تامة وبما يتوافق مع المعايير الدولية لحماية البيانات. نستخدم تقنيات تشفير متقدمة لضمان سلامة معلوماتك الشخصية."
        },
        {
            id: "cookies",
            title: "ملفات تعريف الارتباط",
            content: "يستخدم موقعنا ملفات تعريف الارتباط (كوكيز) لتحسين تجربة المستخدم وتخصيص المحتوى. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك في أي وقت."
        },
        {
            id: "rights",
            title: "حقوقك",
            content: "لديك الحق في الوصول إلى بياناتك الشخصية وتصحيحها وحذفها. يمكنك أيضًا طلب نسخة من بياناتك التي نحتفظ بها. للقيام بذلك، يرجى التواصل معنا عبر معلومات الاتصال المتوفرة على موقعنا."
        },
        {
            id: "updates",
            title: "تحديثات السياسة",
            content: "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة، وسنقوم بإخطارك بالتغييرات المهمة عبر البريد الإلكتروني إذا كان ذلك مناسبًا."
        }
    ];

    return (
        <div className="min-h-screen bg-[hsl(0,0%,100%)]">
            <Header />

            {/* Elegant Header with Primary Color */}
            <div className="bg-[hsl(0,33%,60%)] text-[hsl(0,0%,100%)] py-16">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">سياسة الخصوصية</h1>
                    <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
                        نلتزم بحماية خصوصيتك وضمان أمان بياناتك الشخصية
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Last Updated - Elegant Style */}
                <div className="mb-12 text-right" dir="rtl">
                    <p className="inline-flex items-center px-4 py-2 bg-[hsl(0,0%,96.1%)] rounded-full text-[hsl(0,0%,45.1%)] text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-[hsl(0,33%,60%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
                    </p>
                </div>

                {/* Main Content with Enhanced Readability */}
                <div className="space-y-10" dir="rtl">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            id={section.id}
                            className="bg-[hsl(0,0%,100%)] rounded-[0.5rem] p-8 md:p-10 shadow-md border border-[hsl(0,0%,89.8%)]"
                        >
                            {/* Custom heading with increased spacing between vertical line and text */}
                            <div className="relative mb-6 pr-10">
                                {/* Vertical line positioned with absolute positioning */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[hsl(0,33%,60%)] rounded-full"></div>
                                {/* Text with padding to create space from the line */}
                                <h2 className="text-3xl font-bold text-[hsl(0,0%,3.9%)]">{section.title}</h2>
                            </div>
                            <p className="text-xl leading-relaxed text-[hsl(0,0%,20%)] tracking-wide">{section.content}</p>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-16 bg-[hsl(0,0%,100%)] rounded-[0.5rem] shadow-md border border-[hsl(0,0%,89.8%)] overflow-hidden">
                    <div className="bg-[hsl(0,33%,60%)] py-6 px-10">
                        <h2 className="text-2xl font-bold text-[hsl(0,0%,100%)]" dir="rtl">تواصل معنا</h2>
                    </div>
                    <div className="p-10" dir="rtl">
                        <p className="text-xl text-[hsl(0,0%,20%)] mb-8">
                            إذا كانت لديك أي أسئلة حول سياسة الخصوصية الخاصة بنا، يرجى التواصل معنا:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start">
                                <div className="w-14 h-14 bg-[hsl(0,0%,96.1%)] rounded-[0.5rem] flex items-center justify-center mr-5 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[hsl(0,33%,60%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[hsl(0,0%,3.9%)] mb-2">البريد الإلكتروني</h3>
                                    <a href="mailto:maysastore10@gmail.com" className="text-[hsl(0,33%,60%)] hover:text-[hsl(0,33%,50%)] text-lg font-medium hover:underline">maysastore10@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-14 h-14 bg-[hsl(0,0%,96.1%)] rounded-[0.5rem] flex items-center justify-center mr-5 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[hsl(0,33%,60%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[hsl(0,0%,3.9%)] mb-2">الهاتف</h3>
                                    <a href="tel:0599259881" className="text-[hsl(0,33%,60%)] hover:text-[hsl(0,33%,50%)] text-lg font-medium hover:underline">0599259881</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-12 flex flex-wrap justify-center gap-4" dir="rtl">
                    <button className="flex items-center px-6 py-3 bg-[hsl(0,33%,60%)] text-[hsl(0,0%,100%)] rounded-[0.5rem] hover:bg-[hsl(0,33%,55%)] transition-colors shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        <span className="text-lg font-medium">طباعة السياسة</span>
                    </button>
                    <button className="flex items-center px-6 py-3 bg-[hsl(0,0%,96.1%)] text-[hsl(0,0%,9%)] rounded-[0.5rem] hover:bg-[hsl(0,0%,92%)] transition-colors shadow-sm border border-[hsl(0,0%,89.8%)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-[hsl(0,33%,60%)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="text-lg font-medium">تحميل PDF</span>
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-10 border-t border-[hsl(0,0%,89.8%)] text-center">
                    <div className="inline-flex items-center justify-center">
                        <div className="h-px w-12 bg-[hsl(0,33%,60%)] opacity-50"></div>
                        <p className="mx-4 text-[hsl(0,0%,45.1%)] text-lg">
                            © {new Date().getFullYear()} جميع الحقوق محفوظة
                        </p>
                        <div className="h-px w-12 bg-[hsl(0,33%,60%)] opacity-50"></div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for enhanced typography */}
            <style jsx global>{`
            :root {
            --background: 0 0% 100%;
            --foreground: 0 0% 3.9%;
            --card: 0 0% 100%;
            --card-foreground: 0 0% 3.9%;
            --popover: 0 0% 100%;
            --popover-foreground: 0 0% 3.9%;
            --primary: 0 33% 60%;
            --primary-foreground: 0 0% 100%;
            --secondary: 0 0% 96.1%;
            --secondary-foreground: 0 0% 9%;
            --muted: 0 0% 96.1%;
            --muted-foreground: 0 0% 45.1%;
            --accent: 0 0% 96.1%;
            --accent-foreground: 0 0% 9%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 0 0% 98%;
            --border: 0 0% 89.8%;
            --input: 0 0% 89.8%;
            --ring: 0 0% 3.9%;
            --radius: 0.5rem;
            }
            
            body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            }
            
            /* Enhance Arabic text readability */
            [dir="rtl"] {
            letter-spacing: 0;
            line-height: 1.8;
            }
            
            /* Improve heading clarity */
            h1, h2, h3 {
            letter-spacing: -0.025em;
            }
            
            /* Optimize paragraph readability */
            p {
            line-height: 1.8;
            }
        `}</style>
        </div>
    );
};

export default PrivacyPolicy;