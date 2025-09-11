import React , {useState , useEffect} from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkle, Sparkles } from 'lucide-react';
import { useUser, useClerk,SignIn, Protect } from '@clerk/clerk-react'
const Dashboard = () => {

    const [creations,setcreations] = useState([]);
    const getDashboardData = async() => {
        setcreations(dummyCreationData)
    }


    useEffect(()=>{
        getDashboardData()
    },[])
     
    return(
        <div className='h-full overflow-y-scroll p-6'>
            <div className='flex justify-start gap-4 flex-wrap'>
                {/* total cretion cards */}
                <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
                    <div className='text-slate-600'>
                        <p className='text-sm'>Total Creations</p>
                        
                        <h2 className='w-5 text-white'>{creations.length}</h2>
                    </div>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
                        <Sparkles className='w-5 text-white'/>
                    </div>
                </div>
                {/* active cretion card */}
                 <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
                    <div className='text-slate-600'>
                        <p className='text-sm'>Active Plan</p>

                        
                        <h2 className='w-5 text-white'><Protect plan='premium' fallback='free'>Premium</Protect></h2>
                    </div>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
                        <Gem className='w-5 text-white'/>
                    </div>
                </div>
            </div>

            
            <h1>DashBoard</h1>
        </div>
    )
}

export default Dashboard