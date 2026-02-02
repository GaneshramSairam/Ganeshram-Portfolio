import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaTrophy, FaCalendarAlt, FaUserTie } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';

const Awards = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { data } = useData();
    const { awards } = data;

    if (awards.length === 0) return null;

    return (
        <section
            id="awards"
            className="py-20 bg-gray-50"
            aria-labelledby="awards-heading"
            ref={ref}
        >
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 id="awards-heading" className="section-heading">
                        Awards & Recognition
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Celebrating achievements in delivering excellence
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {awards.map((award, index) => (
                        <motion.div
                            key={award.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        >
                            <div className="relative bg-white rounded-2xl shadow-xl p-8 border-l-4 border-accent overflow-hidden">
                                {/* Gold Glow Effect */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <div className="relative flex flex-col md:flex-row gap-8">
                                    {/* Trophy Icon */}
                                    <div className="flex-shrink-0">
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                                            className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent-600 flex items-center justify-center shadow-lg animate-pulse-glow"
                                        >
                                            <FaTrophy className="text-white text-4xl" aria-hidden="true" />
                                        </motion.div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-bold text-primary mb-3">
                                            {award.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                                            {award.date && (
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt className="text-accent" aria-hidden="true" />
                                                    <span>{award.date}</span>
                                                </div>
                                            )}
                                            {award.issuedBy && (
                                                <div className="flex items-center gap-2">
                                                    <FaUserTie className="text-accent" aria-hidden="true" />
                                                    <span>{award.issuedBy}</span>
                                                </div>
                                            )}
                                        </div>

                                        {award.description && (
                                            <p className="text-gray-700 leading-relaxed">
                                                {award.description}
                                            </p>
                                        )}

                                        {/* Certificate Image */}
                                        {award.certificateUrl ? (
                                            <div className="mt-6">
                                                <img
                                                    src={award.certificateUrl}
                                                    alt={`Certificate for ${award.title}`}
                                                    className="max-w-full h-auto rounded-lg shadow-md"
                                                />
                                            </div>
                                        ) : (
                                            <div className="mt-6 p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 text-center">
                                                <p className="text-gray-500 text-sm">
                                                    Certificate Image Placeholder
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
