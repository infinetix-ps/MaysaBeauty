import React from 'react'
import { motion} from 'framer-motion';

import DynamicBackground from '../components/iphoneHome/dynamicBG.jsx'
import ParticleAnimation from '../components/iphoneHome/animation.jsx'
import IPhoneTemplate from '../components/iphoneHome/iphoneTemplate.jsx'
import FeedbackCarousel from '../components/iphoneHome/feedbackCarousel.jsx'


const content = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1000&h=2000&fit=crop",
        alt: "Demo Content 1",
        type: "image",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1682687220198-88e9bdea9931?q=80&w=1000&h=2000&fit=crop",
        alt: "Demo Content 2",
        type: "image",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1707345512638-997d31a10eaa?q=80&w=1000&h=2000&fit=crop",
        alt: "Demo Content 3",
        type: "image",
    },
]

const IphonePage = () => {
    return (
        <main className="min-h-screen bg-[#E6D7D9] overflow-hidden">
            <DynamicBackground />
            <ParticleAnimation />
            <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center gap-8 min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-2/5"
                >
                    <IPhoneTemplate content={content} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="w-full lg:w-3/5"
                >
                    <FeedbackCarousel />
                </motion.div>
            </div>
        </main>
    )
}

export default IphonePage