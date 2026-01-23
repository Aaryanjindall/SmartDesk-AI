import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Sparkles, ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="relative py-24 px-4 sm:px-20 xl:px-32 overflow-hidden">
      {/* Background Effects */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Heading */} 
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-6'>
            <Sparkles className='w-4 h-4 text-cyan-400 animate-pulse' />
            <span className='text-sm font-medium gradient-text-cyan'>AI Tools</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Powerful AI Tools
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to create, enhance, and optimize your content with
            cutting-edge AI technology.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {AiToolsData.map((tool, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative glass rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 cursor-pointer overflow-hidden transition-all"
              onClick={() => user && navigate(tool.path)}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.bg.from} ${tool.bg.to} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${tool.bg.from} ${tool.bg.to} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                    }}
                  >
                    <tool.Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="gradient-text-cyan">Try it now</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        {!user && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/ai')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-cyan-500/30"
            >
              <Zap className="w-5 h-5" />
              Explore All Tools
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AiTools
