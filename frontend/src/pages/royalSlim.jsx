import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCrown, FaLeaf, FaClock, FaExclamationTriangle, FaBan, FaShoppingCart, FaChevronDown, FaInstagram, FaBaby, FaUtensils } from "react-icons/fa"
import "./royalSlim.css"

const faqData = [
    {
        question: "ما هو الرويال سلم ؟",
        answer:
            "رويال سليم هو منتج طبيعي مكوّن من أعشاب فعالة وآمنة لدعم خسارة الوزن. يأتي على شكل عبوة تحتوي على ٢٤ كبسولة، ويعمل على تحفيز الجسم لحرق الدهون بشكل طبيعي من خلال تسريع عملية الأيض وتقليل الشهية.",
        icon: <FaLeaf />,
    },
    {
        question: "آلية الاستعمال",
        answer: `- تناول كبسولة واحدة يوميًا قبل الإفطار بنصف ساعة مع كأس ماء كبير.  
- يُفضل أخذ الكبسولة في نفس الوقت يوميًا بين الساعة 10 و12 صباحًا.  
- يجب أن تكون وجبات اليوم (فطور، غداء، عشاء) متكاملة.  
- يُنصح بتناول سناك صحي بين الوجبات مثل الخضار أو الفواكه.  
- الإكثار من شرب الماء من 2 إلى 3 لتر يوميًا.  
- يُفضل وضع شرائح خيار، ليمون، نعنع، زنجبيل أو كمون في الماء (اختياري).`,
        icon: <FaClock />,
    },
    {
        question: "هل يوجد أعراض جانبية؟",
        answer:
            "لا تظهر أعراض جانبية عند الاستخدام الصحيح، لكن بعض المستخدمين شعروا بجفاف أو دوخة خفيفة في البداية، وغالبًا يكون السبب قلة شرب الماء أو قلة الأكل نتيجة سد الشهية. مع الالتزام بالتعليمات، تختفي هذه الأعراض خلال أيام قليلة.",
        icon: <FaExclamationTriangle />,
    },
    {
        question: "لمين ممنوووع ياخدو الدوا؟",
        answer:
            `- مرضى الضغط والسكري  
- الحوامل  
- المرضعات لأطفال دون 6 شهور  
- أصحاب الأمراض المزمنة والقلب والشرايين  
- من يتناول أدوية أعصاب  
- من يعاني من الشقيقة (الصداع النصفي)  
- من هم دون سن 15 عامًا`,
        icon: <FaBan />,
    },
    {
        question: "هل يؤثر على الحمل؟",
        answer:
            `يُمنع استخدام المنتج من قِبل النساء الحوامل حفاظًا على سلامتهن وسلامة الجنين، لأن بعض الأعشاب قد تؤثر على الحمل في مراحله المبكرة.  

لكن بالنسبة للفتيات غير المتزوجات أو اللواتي يخططن للحمل لاحقًا، نطمنكم إن رويال سليم لا يؤثر إطلاقًا على القدرة على الحمل في المستقبل.  
بالعكس، في بعض الحالات، قد يساعد في تنشيط المبايض لأنه مكوّن من أعشاب طبيعية بالكامل.`,
        icon: <FaBaby />,
    },

    {
        question: "أطعمة ومشروبات يُنصح بتجنبها",
        answer: `لضمان نتائج مرضية من استخدام منتجات Royal Slim  يُنصح بما يلي:  

- تجنّب المواد الدهنية والنشويات الثقيلة.  
- الابتعاد عن المشروبات الغازية والمشروبات التي تحتوي على كافيين مرتفع.  
- تقليل استهلاك القهوة والنسكافيه (مسموح فنجان واحد فقط يوميًا، ويُفضل قبل الكبسولة بساعة).  
- إذا تم استخدام المنتج لفترة طويلة، يُفضل التوقف لمدة 10 أيام بعد كل عبوتين؛ لاستعادة توازن الجسم، ثم العودة لاستخدامه مجددًا.`,
        icon: <FaUtensils />,
    },
    {
        question: "وين ممكن أشوف تجارب الزباين؟",
        answer: (
            <span style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span>تقدروا تشوفوا التجارب الحقيقية لزبائنّا من خلال صفحاتنا الرسمية:</span>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <a
                        href="https://www.instagram.com/maysabeautybrands?igsh=dHFibXhqOGU3MXht&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: "#ffffff",
                            color: "#E1306C",
                            border: "2px solid #E1306C",
                            borderRadius: "20px",
                            padding: "8px 16px",
                            fontWeight: "600",
                            fontSize: "15px",
                            textDecoration: "none",
                            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s ease",
                            whiteSpace: "nowrap",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#E1306C";
                            e.target.style.color = "#ffffff";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#ffffff";
                            e.target.style.color = "#E1306C";
                        }}
                    >
                        💖 صفحة الإنستغرام
                    </a>

                    <a
                        href="https://t.snapchat.com/JgA0jvS2"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: "#ffffff",
                            color: "#000000",
                            border: "2px solid #000000",
                            borderRadius: "20px",
                            padding: "8px 16px",
                            fontWeight: "600",
                            fontSize: "15px",
                            textDecoration: "none",
                            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s ease",
                            whiteSpace: "nowrap",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#000000";
                            e.target.style.color = "#ffffff";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#ffffff";
                            e.target.style.color = "#000000";
                        }}
                    >
                        👻 صفحتنا على سناب شات
                    </a>
                </div>
            </span>
        ),
        icon: <FaInstagram />,
    },
]

function RoyalSlimHome() {
    const [activeIndex, setActiveIndex] = useState(null)
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="royal-slim-container">
            <header className="royal-slim-header">
                <motion.div
                    className="royal-slim-header-content"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <FaCrown className="royal-slim-crown-icon" />
                    <h1>Royal Slim</h1>
                    <p>حلك الأمثل للرشاقة</p>
                </motion.div>
            </header>

            <section className="royal-slim-hero">
                <motion.div
                    className="royal-slim-hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2>اكتشف سر الرشاقة مع رويال سليم</h2>
                    <p>حبوب طبيعية فعالة لحرق الدهون وتنحيف الجسم</p>
                </motion.div>
                <motion.div
                    className="royal-slim-product-image-wrapper"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <img
                        src="https://image.made-in-china.com/202f0j00pyvcSdjhdNoF/Herbal-Home-Royal-Slim-40-Gel-Capsules.webp"
                        alt="Royal Slim Product"
                        className="royal-slim-product-image"
                    />
                </motion.div>
            </section>

            <section className="royal-slim-faq-section">
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    الأسئلة الشائعة
                </motion.h2>
                <div className="royal-slim-faq-container">
                    {faqData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="royal-slim-faq-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <motion.div
                                className="royal-slim-faq-question"
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            >
                                <div className="royal-slim-faq-icon">{item.icon}</div>
                                <h3>{item.question}</h3>
                                <motion.div animate={{ rotate: activeIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <FaChevronDown />
                                </motion.div>
                            </motion.div>
                            <AnimatePresence mode="sync">
                                {activeIndex === index && (
                                    <motion.div
                                        className="royal-slim-faq-answer"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p>{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>


            <footer className="royal-slim-footer">
                <p>خدمة التوصيل متاحة لكافة مناطق الضفة والداخل والقدس  ورام الله البلد مجانا بمحل متفق عليه ❤🚗</p>
            </footer>
        </div>
    )
}

export default RoyalSlimHome

