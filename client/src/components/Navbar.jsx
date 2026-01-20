import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {useClerk,UserButton,useUser} from '@clerk/clerk-react'


const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    const {openSignIn} = useClerk()

    return(
        <div className='fixed top-0 z-5 w-full h-20
  bg-white/70 backdrop-blur-xl
  flex justify-between items-center
  px-4 sm:px-20 '>
            <img src={assets.logo} className='w-20 sm:w-32 md:w-40 cursor-pointer' onClick={()=>navigate('/')}/>

            {
                user ? <UserButton/> : (
                    <button onClick={openSignIn}  className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-black text-white px-10 py-2.5'>Get started <ArrowRight  className='w-4 h-4'/> </button>
                )
            }

            
        </div>
    )
}

export default Navbar