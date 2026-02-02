import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaExternalLinkAlt, FaCertificate } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';

const Certifications = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { data } = useData();
    const { certifications } = data;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    if (certifications.length === 0) return null;

    return (
        <section
            id="certifications"
            className="py-20 bg-white"
            aria-labelledby="certifications-heading"
            ref={ref}
        >
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 id="certifications-heading" className="section-heading">
                        Certifications
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Validated expertise in technologies and implementation methodologies
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {certifications.map((cert) => (
                        <motion.div
                            key={cert.id}
                            variants={cardVariants}
                            whileHover={{ scale: 1.02 }}
                            className="card text-center group"
                        >
                            {/* Certificate Icon */}
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                                <FaCertificate className="text-white text-3xl" aria-hidden="true" />
                            </div>

                            {/* Certification Name */}
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-primary transition-colors">
                                {cert.name}
                            </h3>

                            {/* View Credential Link */}
                            {cert.credentialUrl ? (
                                <a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-accent hover:text-accent-600 font-medium transition-colors"
                                    aria-label={`View credential for ${cert.name}`}
                                >
                                    <span>View Credential</span>
                                    <FaExternalLinkAlt className="text-sm" aria-hidden="true" />
                                </a>
                            ) : (
                                <span className="text-gray-400 text-sm">Credential link pending</span>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;
