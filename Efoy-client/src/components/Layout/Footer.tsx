import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaShieldAlt, FaUserMd, FaHeartbeat, FaAmbulance } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <h3 className="text-2xl font-bold text-cyan-400 mb-4">Efoy</h3>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            Your trusted healthcare partner connecting patients with experienced medical professionals. 
                            We're committed to making healthcare accessible, convenient, and personalized.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/efoyhealthcare" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="https://twitter.com/efoyhealth" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="https://instagram.com/efoyhealthcare" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="https://linkedin.com/company/efoy-healthcare" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a href="https://youtube.com/@efoyhealthcare" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                <FaYoutube className="text-xl" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-lg font-semibold text-cyan-400 mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">Home</Link></li>
                            <li><Link to="/doctors" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">Find Doctors</Link></li>
                            <li><Link to="/appointments" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">My Appointments</Link></li>
                            <li><Link to="/dashboard" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">Dashboard</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2">Contact</Link></li>
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-lg font-semibold text-cyan-400 mb-4">Our Services</h4>
                        <ul className="space-y-3">
                            <li className="text-gray-400 flex items-center gap-2">
                                <FaUserMd className="text-cyan-400" />
                                Doctor Consultations
                            </li>
                            <li className="text-gray-400 flex items-center gap-2">
                                <FaHeartbeat className="text-cyan-400" />
                                Health Checkups
                            </li>
                            <li className="text-gray-400 flex items-center gap-2">
                                <FaAmbulance className="text-cyan-400" />
                                Emergency Care
                            </li>
                            <li className="text-gray-400 flex items-center gap-2">
                                <FaShieldAlt className="text-cyan-400" />
                                Health Insurance
                            </li>
                            <li className="text-gray-400 flex items-center gap-2">
                                <FaClock className="text-cyan-400" />
                                24/7 Support
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="text-lg font-semibold text-cyan-400 mb-4">Contact Info</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-cyan-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Bole Road, Addis Ababa<br />
                                        Ethiopia
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPhone className="text-cyan-400 flex-shrink-0" />
                                <a href="tel:+251911234567" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                                    +251 911 234 567
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-cyan-400 flex-shrink-0" />
                                <a href="mailto:info@efoy.com" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                                    info@efoy.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaClock className="text-cyan-400 flex-shrink-0" />
                                <p className="text-gray-400 text-sm">
                                    Mon - Fri: 8:00 AM - 6:00 PM<br />
                                    Sat - Sun: 9:00 AM - 4:00 PM
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Additional Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="text-cyan-400 font-semibold mb-2">Emergency</h5>
                        <p className="text-gray-400 text-sm">24/7 emergency support available</p>
                        <a href="tel:+251911234567" className="text-cyan-400 text-sm font-medium">Call Now</a>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="text-cyan-400 font-semibold mb-2">Health Tips</h5>
                        <p className="text-gray-400 text-sm">Get the latest health and wellness tips</p>
                        <a href="#" className="text-cyan-400 text-sm font-medium">Read More</a>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="text-cyan-400 font-semibold mb-2">Newsletter</h5>
                        <p className="text-gray-400 text-sm">Subscribe for health updates</p>
                        <a href="#" className="text-cyan-400 text-sm font-medium">Subscribe</a>
                    </div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="border-t border-gray-800 pt-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            <p>&copy; 2024 Efoy Healthcare. All rights reserved.</p>
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Cookie Policy</a>
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Sitemap</a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
