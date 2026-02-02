import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';

import emailjs from '@emailjs/browser';

const Contact = () => {
    const ref = useRef(null);
    const formRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { data } = useData();
    const { socialLinks, profile } = data;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                alert('EmailJS is not configured. Please check your environment variables.');
                console.error('Missing EmailJS environment variables');
                return;
            }

            // Prepare template parameters
            // Ensure your EmailJS template uses these variable names: from_name, from_email, subject, message
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_name: profile.name,
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            alert('Thank you for your message! I will get back to you soon.');
            reset();
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Something went wrong. Please try again later or contact me directly via email.');
        }
    };

    const socialLinkItems = [
        {
            icon: FaLinkedin,
            label: 'LinkedIn',
            href: socialLinks.linkedin,
            show: !!socialLinks.linkedin,
        },
        {
            icon: FaGithub,
            label: 'GitHub',
            href: socialLinks.github,
            show: !!socialLinks.github,
        },
        {
            icon: FaEnvelope,
            label: 'Email',
            href: socialLinks.email ? `mailto:${socialLinks.email}` : '',
            show: !!socialLinks.email,
        },
    ].filter((link) => link.show);

    return (
        <section
            id="contact"
            className="py-20 bg-gray-50"
            aria-labelledby="contact-heading"
            ref={ref}
        >
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 id="contact-heading" className="section-heading">
                        Let's Connect
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Got a project in mind? Let's discuss how I can help you achieve your goals
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-3"
                        >
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="bg-white rounded-xl shadow-lg p-8 space-y-6"
                                noValidate
                            >
                                {/* Name Field */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register('name', { required: 'Name is required' })}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Your name"
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                    />
                                    {errors.name && (
                                        <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="your.email@example.com"
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                    />
                                    {errors.email && (
                                        <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Subject <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        {...register('subject', { required: 'Subject is required' })}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="What's this about?"
                                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                                    />
                                    {errors.subject && (
                                        <p id="subject-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.subject.message}
                                        </p>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        {...register('message', {
                                            required: 'Message is required',
                                            minLength: {
                                                value: 10,
                                                message: 'Message must be at least 10 characters',
                                            },
                                        })}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Tell me about your project..."
                                        aria-describedby={errors.message ? 'message-error' : undefined}
                                    />
                                    {errors.message && (
                                        <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <span>Sending...</span>
                                    ) : (
                                        <>
                                            <FaPaperPlane aria-hidden="true" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-primary mb-6">
                                    Connect with me
                                </h3>
                                <div className="space-y-4">
                                    {socialLinkItems.map((link, index) => (
                                        <motion.a
                                            key={index}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ x: 5 }}
                                            className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                                            aria-label={`Connect on ${link.label}`}
                                        >
                                            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary transition-colors">
                                                <link.icon
                                                    className="text-xl text-primary group-hover:text-white transition-colors"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">
                                                {link.label}
                                            </span>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 py-8 border-t border-gray-200">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600">
                        © {new Date().getFullYear()} {profile.name}. All rights reserved.
                    </p>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
