
import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  Crown,
  Sparkles,
  Baby,
  Scissors,
  ArrowLeft,
  Star,
  Zap,
  Heart,
  Droplet,
  Palette,
  Flower,
  Leaf,
  Sun,
  SprayCanIcon as Spray,
  Gem,
  Snowflake,
  Waves,
  Shirt,
  ShoppingBag,
  Loader2,
} from "lucide-react"

// Enhanced icon mapping for categories
const icons = {
  // Skin Care
  Droplet,
  Snowflake,
  Waves,
  Sparkles,
  // Hair Care
  Spray,
  Scissors,
  Palette,
  // Body Care
  Flower,
  Heart,
  Leaf,
  Sun,
  // Accessories & Others
  Gem,
  Shirt,
  ShoppingBag,
  Crown,
  Baby,
}

// Fallback categories with enhanced styling data
const fallbackCategories = [
  {
    name: "منتجات الرويال",
    subtitle: "منتجات زيادة ونقصان الوزن",
    description: "حلول متطورة للوصول للوزن المثالي",
    icon: Crown,
    badge: "الأكثر طلباً",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    glowColor: "shadow-[#7a8471]/20",
    particles: ["👑", "✨", "💎"],
  },
  {
    name: "منتجات العناية بالبشرة",
    subtitle: "عناية فائقة لبشرة صحية ونضرة",
    description: "تقنيات حديثة لإشراق طبيعي",
    icon: Sparkles,
    badge: "جديد",
    image: "/images/maysa1.jpg",
    glowColor: "shadow-[#d4a5a5]/20",
    particles: ["🌸", "💫", "🌺"],
  },
  {
    name: "منتجات الجسم",
    subtitle: "عناية آمنة ولطيفة للجسم",
    description: "منتجات طبيعية 100% للأطفال",
    icon: Baby,
    badge: "آمن",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    glowColor: "shadow-[#8b9a7a]/20",
    particles: ["🍼", "🧸", "🌟"],
  },
  {
    name: "منتجات الشعر",
    subtitle: "حلول متكاملة للشعر الصحي والجميل",
    description: "تركيبات متقدمة لشعر قوي ولامع",
    icon: Scissors,
    badge: "مميز",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    glowColor: "shadow-[#d4a5a5]/20",
    particles: ["💇‍♀️", "✂️", "💆‍♀️"],
  },
]

// Enhanced category data processor
const enhanceCategoryData = (apiCategories) => {
  return apiCategories.map((category, index) => {
    // Get icon from mapping or use fallback
    const iconKeys = Object.keys(icons)
    const IconComponent = icons[iconKeys[category.index]] || icons[iconKeys[index % iconKeys.length]] || Heart

    // Enhanced styling based on category name or index
    const styleVariants = [
      {
        glowColor: "shadow-[#7a8471]/20",
        particles: ["👑", "✨", "💎"],
        badge: "الأكثر طلباً",
      },
      {
        glowColor: "shadow-[#d4a5a5]/20",
        particles: ["🌸", "💫", "🌺"],
        badge: "جديد",
      },
      {
        glowColor: "shadow-[#8b9a7a]/20",
        particles: ["🍼", "🧸", "🌟"],
        badge: "آمن",
      },
      {
        glowColor: "shadow-[#d4a5a5]/20",
        particles: ["💇‍♀️", "✂️", "💆‍♀️"],
        badge: "مميز",
      },
    ]

    const styleIndex = index % styleVariants.length
    const style = styleVariants[styleIndex]

    // Generate appropriate image based on category name
    const getImageForCategory = (name) => {
      const lowerName = name.toLowerCase()
      if (lowerName.includes("شعر") || lowerName.includes("hair")) {
        return "/images/maysa2.jpg";
      } else if (lowerName.includes("بشرة") || lowerName.includes("skin")) {
        return "/images/maysa1.jpg";
      } else if (lowerName.includes("جسم") || lowerName.includes("body") || lowerName.includes("care")) {
        return "/images/maysa3.jpg";
      } else if (lowerName.includes("رويال") || lowerName.includes("وزن") || lowerName.includes("weight")) {
        return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      }
      // Default images for other categories
      const defaultImages = [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ]
      return defaultImages[index % defaultImages.length]
    }

    return {
      ...category,
      id: category.id || index + 1,
      icon: IconComponent,
      subtitle: `اكتشف أفضل منتجات ${category.name}`,
      description: `مجموعة متميزة من ${category.name} عالية الجودة`,
      image: getImageForCategory(category.name),
      ...style,
    }
  })
}

const ProductCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const desiredCategoryNames = [
    "رويال",
    "منتجات البشرة",
    "منتجات الجسم",
    "منتجات الشعر",
  ]


  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/categories`)
        const data = await response.json()

        if (data.message === "success" && data.categorise) {
          // Filter to only show desired categories by name
          const filtered = data.categorise.filter(cat =>
            desiredCategoryNames.includes(cat.name)
          )

          // Enhance filtered categories
          const enhancedCategories = enhanceCategoryData(filtered)

          // Keep order consistent with fallback
          const orderedCategories = desiredCategoryNames
            .map(name => enhancedCategories.find(cat => cat.name === name))
            .filter(Boolean) // remove undefined results


          setCategories(orderedCategories)
        } else {
          setCategories(fallbackCategories)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        setError("فشل في تحميل الفئات")
        setCategories(fallbackCategories)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])




  // Mouse tracking for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleCategoryClick = (categoryName) => {
    // Navigate to products page with category filter (your original navigation logic)
    navigate(`/products?categoryName=${encodeURIComponent(categoryName)}`)
  }

  const handleContactClick = () => {
    // Add your contact navigation logic here
    navigate("/contact")
  }

  const handleConsultationClick = () => {
    // Add your consultation booking logic here
    navigate("/consultation")
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f1ed] via-[#f8f4f0] to-[#f2ede8] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Loader2 className="w-12 h-12 text-[#7a8471]" />
          </motion.div>
          <p className="text-[#6b7562] text-lg font-medium">جاري تحميل الفئات...</p>
        </motion.div>
      </div>
    )
  }

  // Error state
  if (error && categories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f1ed] via-[#f8f4f0] to-[#f2ede8] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <Crown className="w-16 h-16 text-[#d4a5a5] mx-auto mb-4" />
          <h3 className="text-[#4a5142] font-bold text-xl mb-2">عذراً، حدث خطأ</h3>
          <p className="text-[#6b7562] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#7a8471] text-white px-6 py-3 rounded-full hover:bg-[#6b7562] transition-colors"
          >
            إعادة المحاولة
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f5f1ed] via-[#f8f4f0] to-[#f2ede8] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#7a8471]/10 rounded-full"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <section className="relative py-8 sm:py-16 lg:py-24" ref={containerRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Ultra Modern Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 sm:mb-20 lg:mb-24"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-[#d4a5a5] mx-auto" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -inset-2 bg-[#d4a5a5]/20 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-[#4a5142] via-[#7a8471] to-[#d4a5a5] bg-clip-text text-transparent leading-tight"
            >
              تسوق حسب الفئة
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-[#6b7562] max-w-3xl mx-auto leading-relaxed font-medium"
            >
              اكتشف عالماً من المنتجات الفاخرة المصممة خصيصاً لتلبية احتياجاتك
            </motion.p>

            {/* Floating Action Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-[#7a8471] to-[#8b9a7a] text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-[#7a8471]/25 transition-all duration-300 font-semibold text-lg backdrop-blur-sm border border-white/10"
            >
              <Zap className="w-5 h-5" />
              استكشف المجموعة
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Revolutionary Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon
              const isHovered = hoveredCard === category.id

              return (
                <motion.div
                  key={category.id || category.name}
                  initial={{ opacity: 0, y: 100, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  className="group cursor-pointer perspective-1000"
                  onMouseEnter={() => setHoveredCard(category.id || index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <motion.div
                    whileHover={{
                      y: -20,
                      rotateY: 5,
                      rotateX: 5,
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`relative h-80 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden transition-all duration-500 ${category.glowColor} ${isHovered ? "shadow-2xl" : "shadow-xl"
                      }`}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Glassmorphism Background */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20" />

                    {/* Dynamic Background Image */}
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${category.image})` }}
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        filter: isHovered ? "brightness(1.1)" : "brightness(0.9)",
                      }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Subtle overlay for text readability */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10"
                      animate={{
                        opacity: isHovered ? 0.8 : 0.6,
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Floating Particles */}
                    {isHovered && category.particles && (
                      <div className="absolute inset-0 pointer-events-none">
                        {category.particles.map((particle, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0, y: 50 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              y: [50, -20, -50],
                              x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 1,
                            }}
                            className="absolute text-2xl"
                            style={{
                              left: `${20 + i * 25}%`,
                              top: "70%",
                            }}
                          >
                            {particle}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Content Container */}
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
                      {/* Header Section */}
                      <div className="flex items-start justify-between">
                        {/* Badge */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                          className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30"
                        >
                          <span className="text-xs font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {category.badge || "مميز"}
                          </span>
                        </motion.div>

                        {/* Animated Icon */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          className="relative"
                        >
                          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                          </div>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            className="absolute -inset-2 bg-white/10 rounded-2xl blur-md"
                          />
                        </motion.div>
                      </div>

                      {/* Content Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-right">
                            {category.name}
                          </h3>
                          <p className="text-white/90 text-sm sm:text-base leading-relaxed text-right">
                            {category.subtitle}
                          </p>
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              height: isHovered ? "auto" : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="text-white/80 text-xs sm:text-sm leading-relaxed text-right overflow-hidden"
                          >
                            {category.description}
                          </motion.p>
                        </div>

                        {/* CTA Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 20,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="flex justify-end"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 font-semibold text-sm"
                          >
                            تسوق الآن
                            <motion.div
                              animate={{ x: [0, -5, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </motion.div>
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Ambient Light Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        background: isHovered
                          ? "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
                          : "linear-gradient(45deg, transparent, transparent)",
                      }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>


        </div>
      </section>
    </div>
  )
}

export default ProductCategories
