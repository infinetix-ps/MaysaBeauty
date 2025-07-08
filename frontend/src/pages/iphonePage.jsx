import React from 'react'
import { motion } from 'framer-motion';

import DynamicBackground from '../components/iphoneHome/dynamicBG.jsx'
import ParticleAnimation from '../components/iphoneHome/animation.jsx'
import IPhoneTemplate from '../components/iphoneHome/iphoneTemplate.jsx'
import FeedbackCarousel from '../components/iphoneHome/feedbackCarousel.jsx'


const content = [
    {
        id: 1,
        src: "/images/RS1.jpg",
        alt: "Demo Content 1",
        type: "image",
    },

    {
        id: 2,
        src: "/images/RS2.jpg",
        alt: "Demo Content 2",
        type: "image",
    },
    {
        id: 3,
        src: "/images/RS3.jpg",
        alt: "Demo Content 3",
        type: "image",
    },
    {
        id: 4,
        src: "/images/RS4.jpg",
        alt: "Demo Content 3",
        type: "image",
    },
    {
        id: 5,
        src: "/images/RS5.jpg",
        alt: "Demo Content 3",
        type: "image",
    },
    {
        id: 6,
        src: "/images/RS7.jpg",
        alt: "Demo Content 3",
        type: "image",
    },
    {
        id: 7,
        src: "/images/RS8.jpg",
        alt: "Demo Content 3",
        type: "image",
    },
    {
        id: 9,
        src: "/images/RS9.jpg",
        alt: "Demo Content 3",
        type: "image",
    },
    {
        id: 10,
        src: "/images/RS10.jpg",
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