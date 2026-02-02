import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';

const ClientLogos = () => {
    const { data } = useData();
    const { clientLogos } = data;

    if (!clientLogos || clientLogos.length === 0) return null;

    return (
        <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-widest">
                        Clients Worked With
                    </h3>
                </div>

                {/* Scroll Container */}
                <div
                    className="flex overflow-x-auto gap-12 pb-8 items-center justify-start md:justify-center no-scrollbar px-4 snap-x snap-mandatory"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {clientLogos.map((client, index) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex-shrink-0 snap-center flex flex-col items-center justify-center min-w-[150px] group"
                        >
                            <div className="w-32 h-32 flex items-center justify-center bg-gray-50 rounded-xl p-4 transition-all duration-300 group-hover:shadow-lg group-hover:bg-white border border-transparent group-hover:border-gray-100">
                                <img
                                    src={`https://logo.clearbit.com/${client.domain}?size=128`}
                                    alt={`${client.name} logo`}
                                    className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerText = client.name;
                                        e.target.parentElement.classList.add('text-gray-600', 'font-bold', 'text-center', 'text-sm');
                                    }}
                                />
                            </div>
                            <span className="mt-3 text-sm text-gray-400 font-medium group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                                {client.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientLogos;
