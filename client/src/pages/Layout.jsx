import React,{useState, useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import {  X ,Menu, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useUser,SignIn } from '@clerk/clerk-react';

const Layout = () => {
    const navigate = useNavigate();
    const [sidebar, setsidebar] = useState(false);
    const {user} = useUser();

    // Close sidebar on route change
    useEffect(() => {
        setsidebar(false);
    }, [navigate]);

    return user ? (
        <div className='flex flex-col h-screen bg-[#0a0a0f] overflow-hidden'>
            {/* Top Navigation Bar */}
            <nav className="
                h-16 w-full
                flex items-center justify-between
                px-4 sm:px-6 lg:px-8
                glass border-b border-[rgba(99,102,241,0.2)]
                backdrop-blur-xl
                animate-slide-in
            ">
                <div className='flex items-center gap-3'>
                    <div className='relative'>
                        <img
                            src={assets.logo}
                            className="h-8 sm:h-10 cursor-pointer transition-transform hover:scale-110"
                            onClick={() => navigate('/')}
                            alt="SmartDesk.ai"
                        />
                        <div className='absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse'></div>
                    </div>
                    <div className='hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'>
                        <Sparkles className='w-4 h-4 text-cyan-400' />
                        <span className='text-xs font-medium gradient-text-cyan'>AI Powered</span>
                    </div>
                </div>

                <div className='sm:hidden'>
                    {sidebar ? (
                        <X 
                            onClick={() => setsidebar(false)} 
                            className="w-6 h-6 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" 
                        />
                    ) : (
                        <Menu 
                            onClick={() => setsidebar(true)} 
                            className="w-6 h-6 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" 
                        />
                    )}
                </div>
            </nav>

            {/* Main Content Area */}
            <div className='flex-1 w-full flex overflow-hidden'>
                <Sidebar sidebar={sidebar} setsidebar={setsidebar}/>
                
                {/* Content with animated background */}
                <div className='flex-1 relative overflow-hidden'>
                    {/* Animated gradient background */}
                    <div className='absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#111118] to-[#1a1a24]'></div>
                    <div className='absolute inset-0 opacity-30'>
                        <div className='absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse'></div>
                        <div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>
                    </div>
                    
                    {/* Content */}
                    <div className='relative z-10 h-full overflow-y-auto'>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='flex items-center justify-center h-screen bg-gradient-to-br from-[#0a0a0f] via-[#111118] to-[#1a1a24]'>
            <div className='animate-fade-in'>
                <SignIn />
            </div>
        </div>
    )
}

export default Layout