import React from 'react'
import { assets } from '../assets/assets'
import { Github, Twitter, Linkedin, Mail, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full overflow-hidden border-t border-cyan-500/20">
      {/* Background Effects */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl'></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-8">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-14 pb-12 border-b border-cyan-500/20">
          {/* Brand */}
          <motion.div 
            className="max-w-md"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className='flex items-center gap-3 mb-5'>
              <img className="h-10" src={assets.logo} alt="SmartDesk.ai logo" />
              <div className='flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'>
                <Sparkles className='w-3 h-3 text-cyan-400' />
                <span className='text-xs font-medium gradient-text-cyan'>AI</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Experience the power of AI with <span className="font-semibold gradient-text-cyan">SmartDesk.ai</span>.  
              Create articles, generate images, and boost productivity with modern AI tools.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Twitter, href: '#', color: 'hover:text-cyan-400' },
                { icon: Github, href: '#', color: 'hover:text-purple-400' },
                { icon: Linkedin, href: '#', color: 'hover:text-blue-400' },
                { icon: Mail, href: '#', color: 'hover:text-pink-400' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-lg glass border border-cyan-500/20 flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links + Newsletter */}
          <div className="flex flex-col sm:flex-row gap-16">
            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="font-semibold text-white mb-4">Company</h2>
              <ul className="text-sm space-y-3">
                {['Home', 'About', 'Contact', 'Privacy Policy'].map((item, index) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div 
              className="max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-semibold text-white mb-4">
                Stay in the loop
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Get AI tips, product updates, and new features straight to your inbox.
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 h-11 px-4 rounded-lg bg-[#0f0f15] border border-cyan-500/20 text-white placeholder-gray-500
                  focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none text-sm transition-all"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-11 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium
                  hover:from-cyan-600 hover:to-purple-600 shadow-lg shadow-cyan-500/30 transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}
        <motion.p 
          className="text-center text-sm py-6 text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          © {currentYear} <span className="font-semibold gradient-text-cyan">Aaryan Jindal</span>.  
          All rights reserved.
        </motion.p>
      </div>
    </footer>
  )
}

export default Footer
