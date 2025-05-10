import { useState } from "react"
import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { Input } from "../components/ui/input.jsx"
import { Button } from "../components/ui/button.jsx"
import { Link } from "react-router-dom"

function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter signup logic
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <footer className="bg-[#a67c7c] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-4"
            >
              Maysa Beauty Brands
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 text-[#e5ddd3]"
            >
              Discover your perfect beauty routine and embrace your unique charm with our curated collection of
              slimming, fattening, and skincare products.
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow bg-white text-[#402e20]"
              />
              <Button type="submit" className="bg-[#6d4c41] hover:bg-[#5d3f35] text-white">
                Subscribe
              </Button>
            </motion.form>
          </div>
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg font-semibold mb-4"
            >
              Quick Links
            </motion.h4>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              {["Home", "Products"].map((item, index) => (
                <li key={item}>
                  <Link
                    to={`/${item=="Home"? "":item.toLowerCase().replace(" ", "-")}`}
                    className="text-[#e5ddd3] hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg font-semibold mb-4"
            >
              Connect With Us
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex space-x-4"
            >
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-[#e5ddd3] hover:text-white transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 pt-8 border-t border-[#c49a8d] text-center text-[#e5ddd3]"
        >
          <p>&copy; {new Date().getFullYear()} Maysa Beauty Brands. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

