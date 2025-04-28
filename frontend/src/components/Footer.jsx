"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter, Code, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter signup logic
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  const navLinks = [
    { name: "الرئيسية", link: "/" },
    { name: "المنتجات", link: "/products" },
    { name: "سياسة الإرجاع والاستبدال", link: "/return-and-exchange-policy" },
    { name: "سياسة الخصوصية", link: "/privacy-policy" },
  ]

  return (
    <footer className="bg-[#a67c7c] text-white" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Section - Takes more space */}
          <div className="md:col-span-5">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-6 text-right"
            >
              Maysa Beauty Brands
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-[#e5ddd3] text-right leading-relaxed"
            >
              اكتشفي روتين الجمال المثالي لكِ واحتضني سحرك <br></br>الفريد مع مجموعتنا المختارة من منتجات التنحيف والتسمين
              والعناية بالبشرة.
            </motion.p>

            {/* Social Media Icons - Repositioned */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex space-x-reverse space-x-4 justify-start mt-6"
              
            >
              <motion.a
                href="https://www.instagram.com/maysabeautybrands/"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#8a6868] hover:bg-[#7a5d5d] transition-colors p-3 rounded-full"
              >
                <Instagram size={20} className="text-white" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#8a6868] hover:bg-[#7a5d5d] transition-colors p-3 rounded-full"
              >
                <Facebook size={20} className="text-white" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#8a6868] hover:bg-[#7a5d5d] transition-colors p-3 rounded-full"
              >
                <Twitter size={20} className="text-white" />
              </motion.a>
            </motion.div>

            {/* Payment Methods - Using online links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8"
            >
              <span className="text-[#e5ddd3] block mb-2 text-sm font-medium">طرق الدفع المتاحة:</span>
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white bg-opacity-10 px-3 py-2 rounded-lg">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="فيزا" className="h-7" />
                </div>
                <div className="bg-white bg-opacity-10 px-3 py-2 rounded-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="ماستركارد"
                    className="h-7"
                  />
                </div>
                <div className="bg-white bg-opacity-10 px-3 py-2 rounded-lg">
                  <img
                    src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                    alt="باي بال"
                    className="h-7"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-3 md:mr-8">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg font-semibold mb-6 text-right"
            >
              روابط سريعة
            </motion.h4>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3 text-right"
            >
              {navLinks.map(({ name, link }) => (
                <li key={name}>
                  <Link
                    to={link}
                    className="text-[#e5ddd3] hover:text-white transition-colors block pr-2 border-r-2 border-[#c49a8d]"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Connect With Us Section */}
          <div className="md:col-span-4">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg font-semibold mb-6 text-right"
            >
              تواصل معنا
            </motion.h4>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-6 text-[#e5ddd3] text-right"
            >
              <p className="mb-2">
                <span className="font-semibold ml-2">البريد الإلكتروني :</span>
                <a href="mailto:maysastore10@gmail.com" className="hover:text-white transition-colors">
                  maysastore10@gmail.com
                </a>
              </p>
              <p className="mb-2">
                <span className="font-semibold ml-2">الهاتف :</span>
                <span>9259881-59 972+</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold ml-2">العنوان :</span>
                <span>رام الله، فلسطين</span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* InfinitiX Company Credit - Static Colors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="relative mt-12 mb-10 mx-auto max-w-3xl overflow-hidden"
        >
          {/* Gradient Background with Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#6d4c41] via-[#8a6868] to-[#6d4c41] rounded-xl"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
          />

          {/* Content Container */}
          <div className="relative z-10 py-5 px-6 flex flex-col items-center">
            {/* Decorative Elements */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Main Content */}
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mr-3"
              >
                <Sparkles size={24} className="text-white opacity-80" />
              </motion.div>

              <div className="text-center">
                <motion.p
                  className="text-[#e5ddd3] mb-1"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  تم تطوير وتصميم بواسطة
                </motion.p>

                <motion.a
                  href="https://www.infinitiex.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Static multi-color text with gradient that matches footer */}
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e5ddd3] via-[#ffffff] to-[#c49a8d] drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]">
                    InfinitiX
                  </span>

                  {/* Static underline */}
                  <div className="h-0.5 bg-gradient-to-r from-[#e5ddd3] via-[#ffffff] to-[#c49a8d] mt-0.5 w-full" />
                </motion.a>
              </div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="ml-3"
              >
                <Code size={24} className="text-white opacity-80" />
              </motion.div>
            </div>

            {/* Decorative Bottom Line */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
            />
          </div>

          {/* Subtle Pulsing Border */}
          <motion.div
            className="absolute inset-0 rounded-xl border border-white opacity-30"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-6 pt-6 border-t border-[#c49a8d] text-center text-[#e5ddd3]"
        >
          <p>© {new Date().getFullYear()}  Maysa Beauty . All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
