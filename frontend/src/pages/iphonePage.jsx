import React from 'react'
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

const iphonePage = () => {
    return (
        <div className="relative overflow-hidden">
            <DynamicBackground />
            <ParticleAnimation />
            <IPhoneTemplate content={content}>
                <FeedbackCarousel />
            </IPhoneTemplate>
        </div>
    )
}

export default iphonePage