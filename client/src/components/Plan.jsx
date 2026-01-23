import React from 'react'
import { PricingTable } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { Sparkles, Gem } from 'lucide-react'

const Plan = () => {
    return(
        <div className='relative py-24 px-4 sm:px-20 xl:px-32 overflow-hidden'>
            {/* Background Effects */}
            <div className='absolute inset-0 opacity-20'>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse'></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div 
                    className='text-center mb-16'
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-6'>
                        <Gem className='w-4 h-4 text-cyan-400 animate-pulse' />
                        <span className='text-sm font-medium gradient-text-cyan'>Pricing</span>
                    </div>
                    <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-text'>
                        Choose Your Plan
                    </h2>
                    <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
                        Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
                    </p>
                </motion.div>

                <motion.div 
                    className='mt-14 max-sm:m-8'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className='glass rounded-2xl p-8 border border-cyan-500/20'>
                        <PricingTable />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Plan
