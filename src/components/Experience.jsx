import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBuilding, FaCheckCircle, FaCog } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { data } = useData();
    const { projects } = data;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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

    if (projects.length === 0) return null;

    return (
        <section
            id="experience"
            className="py-20 bg-gray-50"
            aria-labelledby="experience-heading"
            ref={ref}
        >
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 id="experience-heading" className="section-heading">
                        Professional Experience
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Delivering end-to-end solutions across diverse industries
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className={`grid gap-8 ${projects.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'
                        }`}
                >
                    {projects.map((project) => (
                        <motion.article
                            key={project.id}
                            variants={cardVariants}
                            className="card group"
                            aria-label={`Project: ${project.title}`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="badge badge-accent mt-2">
                                        {project.industry}
                                    </span>
                                </div>
                                <FaBuilding className="text-3xl text-primary/20" aria-hidden="true" />
                            </div>

                            {/* Solution */}
                            <div className="flex items-center gap-2 text-gray-700 font-medium mb-4">
                                <FaCog className="text-accent" aria-hidden="true" />
                                <span>{project.solution}</span>
                            </div>

                            {/* Deliverables */}
                            {project.deliverables && project.deliverables.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                        Key Deliverables
                                    </h4>
                                    <ul className="space-y-2" role="list">
                                        {project.deliverables.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-600">
                                                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" aria-hidden="true" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Technical Scope */}
                            {project.technicalScope && (
                                <div className="pt-4 border-t border-gray-100">
                                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                        Technical Scope
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        {project.technicalScope}
                                    </p>
                                </div>
                            )}
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
