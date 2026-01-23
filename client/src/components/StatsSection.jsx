import React from 'react'
import { motion } from 'framer-motion'
import { Users, Zap, TrendingUp, Sparkles } from 'lucide-react'

const StatsSection = () => {
    const stats = [
        {
            icon: Users,
            value: '10k+',
            label: 'Active Users',
            gradient: 'from-cyan-500 to-blue-500',
            delay: 0.1
        },
        {
            icon: Zap,
            value: '50k+',
            label: 'Creations Generated',
            gradient: 'from-purple-500 to-pink-500',
            delay: 0.2
        },
        {
            icon: TrendingUp,
            value: '99%',
            label: 'Satisfaction Rate',
            gradient: 'from-green-500 to-teal-500',
            delay: 0.3
        },
        {
            icon: Sparkles,
            value: '24/7',
            label: 'AI Support',
            gradient: 'from-orange-500 to-red-500',
            delay: 0.4
        }
    ]

    return (
        <div className='relative py-20 px-4 sm:px-20 xl:px-32 overflow-hidden'>
            {/* Background Effects */}
            <div className='absolute inset-0 opacity-20'>
                <div className='absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: stat.delay }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group glass rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all text-center"
                        >
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
                            <p className="text-sm text-gray-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default StatsSection
