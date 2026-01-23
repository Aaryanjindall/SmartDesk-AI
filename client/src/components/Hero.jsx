import React, { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { Sparkles, Play, Zap, ArrowRight } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// 3D Animated Sphere Component
function AnimatedSphere({ position, color, speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  )
}

// 3D Scene Component
function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent' }}
      className="absolute inset-0"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.5} />
      
      <AnimatedSphere position={[-2, 0, 0]} color="#06b6d4" speed={1} />
      <AnimatedSphere position={[2, 0, 0]} color="#a855f7" speed={1.2} />
      <AnimatedSphere position={[0, 2, -2]} color="#ec4899" speed={0.8} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}

const Hero = () => {
    const navigate = useNavigate();
    
    return(
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20'>
            {/* Animated Background */}
            <div className='absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#111118] to-[#1a1a24]'></div>
            <div className='absolute inset-0 opacity-40'>
                <div className='absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse' style={{animationDelay: '2s'}}></div>
            </div>

            {/* 3D Scene */}
            <div className='absolute inset-0 opacity-30 pointer-events-none'>
                <Suspense fallback={null}>
                    <Scene3D />
                </Suspense>
            </div>

            <div className='relative z-10 px-4 sm:px-20 xl:px-32 w-full max-w-7xl mx-auto text-center'>
                <motion.div 
                    className='mb-8'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Badge */}
                    <motion.div 
                        className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-6'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Sparkles className='w-4 h-4 text-cyan-400 animate-pulse' />
                        <span className='text-sm font-medium gradient-text-cyan'>AI-Powered Content Creation</span>
                    </motion.div>

                    <motion.h1 
                        className='text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold mx-auto leading-tight mb-6'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Create amazing content <br/> 
                        with <span className='gradient-text'>AI tools</span>
                    </motion.h1>
                    <motion.p 
                        className='mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-400'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Transform your content creation with our suite of premium AI tools. 
                        Write articles, generate images, and enhance your workflow.
                    </motion.p>
                </motion.div>

                <motion.div 
                    className='flex flex-wrap justify-center gap-4 mb-12'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.button  
                        onClick={()=>navigate('/ai')} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 transform transition-all'
                    >
                        <Zap className='w-5 h-5 group-hover:rotate-12 transition-transform' />
                        Start creating now
                        <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex items-center gap-2 glass border border-cyan-500/20 hover:border-cyan-500/40 text-white px-8 py-4 rounded-xl font-semibold transform transition-all'
                    >
                        <Play className='w-5 h-5 text-cyan-400' />
                        Watch demo
                    </motion.button>
                </motion.div>

                <motion.div 
                    className='flex items-center justify-center gap-4 text-gray-400'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className='flex items-center gap-2'>
                        <img src={assets.user_group} className='h-8 w-auto' alt="Users"/>
                        <span className='text-sm font-medium'>Trusted by 10k+ people</span>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero
