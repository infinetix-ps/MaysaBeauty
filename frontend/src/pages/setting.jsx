import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, MapPin, Camera, Edit3, Save, X, ChevronRight } from "lucide-react"

const EnhancedSettingsPage = () => {
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        location: "New York, USA",
        avatar: "https://i.pravatar.cc/150?img=68",
    })
    const [isEditing, setIsEditing] = useState(false)
    const [activeSection, setActiveSection] = useState("profile")

    const handleSave = (e) => {
        e.preventDefault()
        setIsEditing(false)
        // Here you would typically send the updated data to your backend
        console.log("Saving settings:", profile)
        // You could add a toast notification here to confirm save
    }

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value })
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfile({ ...profile, avatar: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }

    const renderProfileSection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#402e20]">Profile Information</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-[#C17F82] hover:text-[#A66467] transition-colors"
                >
                    {isEditing ? <X size={24} /> : <Edit3 size={24} />}
                </button>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                <div className="relative mb-4 md:mb-0 md:mr-6">
                    <img
                        src={profile.avatar || "/placeholder.svg"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#C17F82]"
                    />
                    {isEditing && (
                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 bg-[#C17F82] p-2 rounded-full cursor-pointer"
                        >
                            <Camera size={20} className="text-white" />
                            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        </label>
                    )}
                </div>
                <form onSubmit={handleSave} className="w-full max-w-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-[#402e20] mb-2">
                            Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#C17F82] rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-[#C17F82]"
                                disabled={!isEditing}
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C17F82]" size={18} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-[#402e20] mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#C17F82] rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-[#C17F82]"
                                disabled={!isEditing}
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C17F82]" size={18} />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium text-[#402e20] mb-2">
                            Location
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={profile.location}
                                onChange={handleChange}
                                className="w-full p-3 border border-[#C17F82] rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-[#C17F82]"
                                disabled={!isEditing}
                            />
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C17F82]" size={18} />
                        </div>
                    </div>
                    {isEditing && (
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-[#C17F82] text-white px-6 py-2 rounded-md hover:bg-[#A66467] transition-colors duration-300 flex items-center"
                            >
                                <Save className="mr-2" size={18} />
                                Save Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </motion.div>
    )

    const renderSecuritySection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
            <h2 className="text-2xl font-semibold text-[#402e20] mb-6">Security Settings</h2>
            <div className="space-y-4">
                <button className="w-full text-left p-4 bg-[#f5f0eb] rounded-md hover:bg-[#C17F82] hover:text-white transition-colors duration-300">
                    Change Password
                </button>
                <button className="w-full text-left p-4 bg-[#f5f0eb] rounded-md hover:bg-[#C17F82] hover:text-white transition-colors duration-300">
                    Two-Factor Authentication
                </button>
                <button className="w-full text-left p-4 bg-[#f5f0eb] rounded-md hover:bg-[#C17F82] hover:text-white transition-colors duration-300">
                    Login History
                </button>
            </div>
        </motion.div>
    )

    const renderPreferencesSection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
            <h2 className="text-2xl font-semibold text-[#402e20] mb-6">Preferences</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f5f0eb] rounded-md">
                    <span>Language</span>
                    <select className="p-2 rounded-md border border-[#C17F82] focus:outline-none focus:ring-2 focus:ring-[#C17F82]">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                    </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#f5f0eb] rounded-md">
                    <span>Email Notifications</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#f5f0eb] rounded-md">
                    <span>Dark Mode</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </motion.div>
    )

    const renderContent = () => {
        switch (activeSection) {
            case "profile":
                return renderProfileSection()
            case "security":
                return renderSecuritySection()
            case "preferences":
                return renderPreferencesSection()
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-[#f5f0eb] text-[#402e20]">
            <div className="container mx-auto px-4 py-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-8 text-center text-[#402e20]"
                >
                    Account Settings
                </motion.h1>
                <div className="flex flex-col md:flex-row gap-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:w-1/4">
                        <nav className="bg-white rounded-lg shadow-lg p-4">
                            <ul className="space-y-2">
                                {["profile", "security", "preferences"].map((section) => (
                                    <li key={section}>
                                        <button
                                            onClick={() => setActiveSection(section)}
                                            className={`w-full text-left p-3 rounded-md transition-colors duration-300 flex justify-between items-center ${activeSection === section ? "bg-[#C17F82] text-white" : "hover:bg-[#f5f0eb]"
                                                }`}
                                        >
                                            <span className="capitalize">{section}</span>
                                            <ChevronRight size={18} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </motion.div>
                    <div className="md:w-3/4">{renderContent()}</div>
                </div>
            </div>
        </div>
    )
}

export default EnhancedSettingsPage

