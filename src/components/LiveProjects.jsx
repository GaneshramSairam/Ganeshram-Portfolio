import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { FaGithub, FaExternalLinkAlt, FaRocket } from 'react-icons/fa';

const LiveProjects = () => {
    const { data } = useData();
    const { liveProjects } = data;

    if (!liveProjects || liveProjects.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50" id="projects">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-heading flex items-center justify-center gap-3">
                        <FaRocket className="text-accent" />
                        Projects & Innovations
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Real-world applications delivering business value through AI and modern web technologies.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {liveProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="text-accent font-medium text-sm mt-1 block">
                                        {project.role}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                                            aria-label="View Source Code"
                                        >
                                            <FaGithub size={20} />
                                        </a>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-white bg-accent hover:bg-accent-600 rounded-full transition-all shadow-md hover:shadow-lg"
                                            aria-label="View Live Site"
                                        >
                                            <FaExternalLinkAlt size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full uppercase tracking-wide"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LiveProjects;
