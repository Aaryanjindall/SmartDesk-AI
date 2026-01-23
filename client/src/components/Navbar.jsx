import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import {useClerk,UserButton,useUser} from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    const {openSignIn} = useClerk()

    return(
        <div className='fixed top-0 z-50 w-full h-20
            glass backdrop-blur-xl
            flex justify-between items-center
            px-4 sm:px-20 border-b border-cyan-500/20'>
            <div className='flex items-center gap-3'>
                <img 
                    src={assets.logo} 
                    className='w-20 sm:w-32 md:w-40 cursor-pointer transition-transform hover:scale-105' 
                    onClick={()=>navigate('/')}
                    alt="SmartDesk AI"
                />
                <div className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'>
                    <Sparkles className='w-4 h-4 text-cyan-400 animate-pulse' />
                    <span className='text-xs font-medium gradient-text-cyan'>AI Powered</span>
                </div>
            </div>

            {user ? (
                <UserButton 
                    appearance={{
                        elements: {
                            avatarBox: "w-10 h-10 ring-2 ring-cyan-500/50 hover:ring-cyan-400 transition-all"
                        }
                    }}
                />
            ) : (
                <button 
                    onClick={openSignIn}  
                    className='flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer 
                    bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600
                    text-white px-6 sm:px-10 py-2.5
                    shadow-lg shadow-cyan-500/30
                    transform transition-all hover:scale-105 active:scale-95'
                >
                    Get started 
                    <ArrowRight className='w-4 h-4'/> 
                </button>
            )}
        </div>
    )
}

export default Navbar
