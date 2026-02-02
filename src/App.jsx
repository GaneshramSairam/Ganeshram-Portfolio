import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

import { AuthProvider } from './contexts/AuthContext';
import { DataProvider, useData } from './contexts/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Awards from './components/Awards';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ClientLogos from './components/ClientLogos';
import LiveProjects from './components/LiveProjects';

// Portfolio Page Component
function PortfolioPage() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { data } = useData();

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.profile.name,
        jobTitle: data.profile.title || 'Professional',
        description: data.profile.subtitle,
        knowsAbout: data.sapProducts,
    };

    return (
        <>
            <Helmet>
                <title>{data.profile.name} | Professional Portfolio</title>
                <meta
                    name="description"
                    content={data.profile.subtitle}
                />
                <meta
                    name="keywords"
                    content={data.sapProducts.join(', ')}
                />
                <meta name="author" content={data.profile.name} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Tags */}
                <meta
                    property="og:title"
                    content={`${data.profile.name} | Professional Portfolio`}
                />
                <meta
                    property="og:description"
                    content={data.profile.subtitle}
                />
                <meta property="og:type" content="website" />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <div className="min-h-screen bg-white">
                <Navbar />

                <main id="main-content">
                    <Hero />
                    <Experience />
                    <Certifications />
                    <Awards />
                    <Skills />
                    <LiveProjects />
                    <ClientLogos />
                    <Contact />
                </main>

                {/* Scroll to Top Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: showScrollTop ? 1 : 0,
                        scale: showScrollTop ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 right-8 z-40"
                >
                    <Link
                        to="hero"
                        smooth={true}
                        duration={500}
                        className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-600 hover:shadow-xl transition-all cursor-pointer"
                        tabIndex={showScrollTop ? 0 : -1}
                        aria-label="Scroll to top"
                    >
                        <FaArrowUp aria-hidden="true" />
                    </Link>
                </motion.div>
            </div >
        </>
    );
}

function App() {
    return (
        <HelmetProvider>
            <AuthProvider>
                <DataProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<PortfolioPage />} />
                            <Route path="/admin" element={<AdminLogin />} />
                            <Route
                                path="/admin/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </DataProvider>
            </AuthProvider>
        </HelmetProvider>
    );
}

export default App;
