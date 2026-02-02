import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaDownload, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';
import { useState, useEffect } from 'react';

const Hero = () => {
    const { data } = useData();
    const { profile } = data;

    // Animated role showcase
    const roleShowcase = [
        'SAP EWM Consultant by Day',
        'Software enthusiast by Passion',
        'Yoga Teacher by Practice',
        'Vocalist by Heart',
    ];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % roleShowcase.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [roleShowcase.length]);

    // Get initials from name
    const getInitials = (name) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <section
            id="hero"
            className="min-h-screen gradient-bg flex flex-col justify-center relative overflow-hidden"
            aria-label="Hero section"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 py-20">
                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/3"
                    >
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/20 backdrop-blur-sm p-2 mx-auto">
                            {profile.photoUrl ? (
                                <img
                                    src={profile.photoUrl}
                                    alt={profile.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <div
                                    className="w-full h-full rounded-full bg-gradient-to-br from-accent to-accent-600 flex items-center justify-center text-white text-6xl font-bold"
                                    aria-label={`Profile photo placeholder for ${profile.name}`}
                                >
                                    {getInitials(profile.name)}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-2/3 text-center lg:text-left text-white"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            {profile.name}
                        </h1>
                        {profile.title && (
                            <p className="text-xl md:text-2xl font-medium text-accent-200 mb-2">
                                {profile.title}
                            </p>
                        )}

                        {/* Roles / Skills - Clean Inline Display */}
                        {profile.roles && profile.roles.length > 0 && (
                            <div className="mb-6 max-w-2xl">
                                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-2 gap-y-1 text-white/90 text-sm md:text-base font-light tracking-wide">
                                    {profile.roles.map((role, index) => (
                                        <span key={index} className="flex items-center">
                                            <span className="hover:text-accent transition-colors duration-300">{role}</span>
                                            {index < profile.roles.length - 1 && (
                                                <span className="ml-2 text-accent/60">•</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
                            {profile.subtitle}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
                            <Link
                                to="experience"
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className="btn-secondary cursor-pointer inline-flex items-center gap-2"
                                tabIndex={0}
                                role="button"
                                aria-label="View projects section"
                            >
                                View Projects
                            </Link>
                            <Link
                                to="contact"
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className="btn-outline border-white text-white hover:bg-white hover:text-primary cursor-pointer inline-flex items-center gap-2"
                                tabIndex={0}
                                role="button"
                                aria-label="Contact me"
                            >
                                <FaEnvelope aria-hidden="true" />
                                Contact Me
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Animated Role Showcase */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center items-center py-8"
                >
                    <div className="text-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentRoleIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-wide"
                            >
                                <span className="text-accent font-medium">{roleShowcase[currentRoleIndex].split(' by ')[0]}</span>
                                <span className="text-white/70"> by </span>
                                <span className="text-white italic">{roleShowcase[currentRoleIndex].split(' by ')[1]}</span>
                            </motion.p>
                        </AnimatePresence>
                        <div className="flex justify-center gap-2 mt-6">
                            {roleShowcase.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentRoleIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentRoleIndex ? 'bg-accent w-6' : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                    aria-label={`Go to role ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <Link
                        to="experience"
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="text-white/60 hover:text-white cursor-pointer transition-colors"
                        tabIndex={0}
                        aria-label="Scroll down to experience section"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <FaChevronDown className="text-2xl" aria-hidden="true" />
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
