import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCrown, FaLeaf, FaClock, FaExclamationTriangle, FaBan, FaShoppingCart, FaChevronDown } from "react-icons/fa"
import "./royalSlim.css"

const faqData = [
    {
        question: "ما هو الرويال سلم ؟",
        answer:
            "هو عباره عن حبوب تنحيف ٢٤ حبه من الاعشاب الطبيعيه والامنه تعمل كمنشط قوي وفعال لحرق السعرات الحراريه عن طريق قولبه الدهون في الجسم والطعام",
        icon: <FaLeaf />,
    },
    {
        question: "اليه الاستعمال",
        answer: "يتم اخذ كل يوم حبه من الرويال قبل الافطار بنصف ساعه مع كأس ماء كبير",
        icon: <FaClock />,
    },
    {
        question: "هل يوجد اعراض جانبيه ؟",
        answer:
            "يوجد في حال استعمال المنتج بطريقه خاطئه كعدم الالتزام بشرب المي او كانت كميه الاكل قليله جدا نتيجه سد الشهيه القوي للرويال",
        icon: <FaExclamationTriangle />,
    },
    {
        question: "لمين ممنوووووع ياخدو الدوا ؟",
        answer:
            "الي معهم ضغط وسكري، مرضعات لاطفال دون ٦ شهور، حوامل، اصحاب الامراض المزمنه والقلب والشرايين، الاشخاص اقل من ١٥ سنه، الي بياخدو ادويه اعصاب او عندهم شقيقه",
        icon: <FaBan />,
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
                        src="https://cdn-bjpdk.nitrocdn.com/dyjDRTumiVVFLKEpXMADzKdEUUbypNrL/assets/images/optimized/rev-ab4f880/www.visualeducation.com/wp-content/uploads/2019/09/Clinique_Advert_Karl_Taylor-1.jpg"
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

            <section className="royal-slim-cta-section">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h2>ابدأ رحلتك نحو الرشاقة اليوم</h2>
                    <motion.button className="royal-slim-order-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <FaShoppingCart /> اطلب الآن
                    </motion.button>
                </motion.div>
            </section>

            <footer className="royal-slim-footer">
                <p>خدمة التوصيل متاحة لكافة مناطق الضفة والقدس ٢٠-٣٠ شيقل ورام الله البلد مجانا بمحل متفق عليه ❤🚗</p>
            </footer>
        </div>
    )
}

export default RoyalSlimHome

