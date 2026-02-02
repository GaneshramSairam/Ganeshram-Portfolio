import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', to: 'hero' },
        { name: 'Experience', to: 'experience' },
        { name: 'Certifications', to: 'certifications' },
        { name: 'Awards', to: 'awards' },
        { name: 'Skills', to: 'skills' },
        { name: 'Contact', to: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Skip to content link */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-sm shadow-md py-3'
                    : 'bg-transparent py-5'
                    }`}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="hero"
                            smooth={true}
                            duration={500}
                            className={`text-xl font-bold cursor-pointer transition-colors ${isScrolled ? 'text-primary' : 'text-white'
                                }`}
                            tabIndex={0}
                            aria-label="Go to home"
                        >
                            <img
                                src="/assets/gs-logo.svg"
                                alt="GS Logo"
                                className="h-10 w-10 hover:opacity-90 transition-opacity"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    offset={-80}
                                    spy={true}
                                    activeClass="nav-active"
                                    className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-all ${isScrolled
                                        ? 'text-gray-700 hover:text-primary hover:bg-primary-50'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }`}
                                    tabIndex={0}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled
                                ? 'text-gray-700 hover:bg-gray-100'
                                : 'text-white hover:bg-white/10'
                                }`}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <FaTimes className="text-xl" aria-hidden="true" />
                            ) : (
                                <FaBars className="text-xl" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-white border-t"
                        >
                            <div className="container mx-auto px-4 py-4 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        smooth={true}
                                        duration={500}
                                        offset={-80}
                                        onClick={closeMobileMenu}
                                        className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-primary-50 hover:text-primary cursor-pointer transition-colors"
                                        tabIndex={0}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
