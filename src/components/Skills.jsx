import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useData } from '../contexts/DataContext';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { data } = useData();
    const { sapProducts, technicalExpertise, softwareSkills } = data;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 },
        },
    };

    if (sapProducts.length === 0 && technicalExpertise.length === 0) return null;

    return (
        <section
            id="skills"
            className="py-20 bg-white"
            aria-labelledby="skills-heading"
            ref={ref}
        >
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 id="skills-heading" className="section-heading">
                        Core Technical Competencies
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Comprehensive expertise across products and implementation methodologies
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {/* Software Skills */}
                    {softwareSkills && softwareSkills.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h3 className="text-xl font-bold text-primary mb-6 text-center">
                                Software Development
                            </h3>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                className="flex flex-wrap justify-center gap-3"
                                role="list"
                                aria-label="Software Development Skills"
                            >
                                {softwareSkills.map((skill, index) => (
                                    <motion.span
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="skill-pill bg-accent/10 border-accent/20 text-accent font-medium hover:bg-accent/20"
                                        role="listitem"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* SAP Products */}
                    {sapProducts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="text-xl font-bold text-primary mb-6 text-center">
                                Products & Technologies
                            </h3>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                className="flex flex-wrap justify-center gap-3"
                                role="list"
                                aria-label="Products and Technologies"
                            >
                                {sapProducts.map((product, index) => (
                                    <motion.span
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="skill-pill"
                                        role="listitem"
                                    >
                                        {product}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Technical Expertise */}
                    {technicalExpertise.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h3 className="text-xl font-bold text-primary mb-6 text-center">
                                Technical Expertise
                            </h3>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                                role="list"
                                aria-label="Technical Expertise"
                            >
                                {technicalExpertise.map((expertise, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-accent/50 hover:shadow-md transition-all"
                                        role="listitem"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                                        <span className="text-gray-700 font-medium">{expertise}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Skills;
