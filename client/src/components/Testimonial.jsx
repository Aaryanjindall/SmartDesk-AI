import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, TechCorp',
            content: 'SmartDesk AI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Creator',
            content: 'The AI tools have made our content creation process effortless. We produce high-quality content faster than ever before.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Content Writer',
            content: 'SmartDesk AI transformed our entire workflow. The image generation and article writing features are game-changers.',
            rating: 5,
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className='relative py-24 px-4 sm:px-20 xl:px-32 overflow-hidden'>
            {/* Background Effects */}
            <div className='absolute inset-0 opacity-20'>
                <div className='absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1.5s'}}></div>
            </div>

            <div className="relative z-10">
                <motion.div 
                    className='text-center mb-16'
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6'>
                        <Quote className='w-4 h-4 text-purple-400' />
                        <span className='text-sm font-medium gradient-text-purple'>Testimonials</span>
                    </div>
                    <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-text'>
                        Loved by Creators
                    </h2>
                    <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
                        Don't just take our word for it. Here's what our users are saying.
                    </p>
                </motion.div>

                <motion.div 
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {dummyTestimonialData.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className='group glass rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all relative overflow-hidden'
                        >
                            {/* Gradient Background */}
                            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            
                            <div className="relative z-10">
                                {/* Quote Icon */}
                                <div className='mb-4'>
                                    <Quote className='w-8 h-8 text-purple-400/50' />
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-4">
                                    {Array(5).fill(0).map((_, i) => (
                                        <Star 
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < testimonial.rating 
                                                    ? 'fill-yellow-400 text-yellow-400' 
                                                    : 'text-gray-600'
                                            }`} 
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className='text-gray-300 text-sm leading-relaxed mb-6'>
                                    "{testimonial.content}"
                                </p>

                                {/* Divider */}
                                <div className='h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-6'></div>

                                {/* Author */}
                                <div className='flex items-center gap-4'>
                                    <div className='relative'>
                                        <img 
                                            src={testimonial.image} 
                                            className='w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/30' 
                                            alt={testimonial.name}
                                        />
                                        <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-[#0a0a0f]'></div>
                                    </div>
                                    <div>
                                        <h3 className='font-semibold text-white text-sm'>{testimonial.name}</h3>
                                        <p className='text-xs text-gray-400'>{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
} 

export default Testimonial
