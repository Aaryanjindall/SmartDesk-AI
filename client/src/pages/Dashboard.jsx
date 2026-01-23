import React , {useState , useEffect} from 'react'
import { Gem, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem';
import axios from 'axios'
import toast from 'react-hot-toast';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
    const [creations, setcreations] = useState([]);
    const [loading, setloading] = useState(true)
    const { getToken } = useAuth()

    const getDashboardData = async() => {
        try{
            const { data } = await axios.get('/api/user/get-user-creations', {
                headers : {Authorization: `Bearer ${await getToken()}`}
            })
            
            if(data.success){
                setcreations(data.creations)
            }else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
        setloading(false)
    }

    useEffect(()=>{
        getDashboardData()
    },[])
     
    return(
        <div className='h-full overflow-y-auto p-4 sm:p-6 lg:p-8'>
            {/* Header */}
            <div className='mb-8 animate-fade-in'>
                <h1 className='text-3xl sm:text-4xl font-bold gradient-text mb-2'>Dashboard</h1>
                <p className='text-gray-400 text-sm'>Welcome back! Here's your creative workspace.</p>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
                {/* Total Creations Card */}
                <div className='group relative overflow-hidden glass rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover-lift animate-slide-in'>
                    <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl'></div>
                    <div className='relative z-10 flex justify-between items-start'>
                        <div>
                            <p className='text-sm text-gray-400 mb-2'>Total Creations</p>
                            <h2 className='text-3xl font-bold text-white mb-1'>{creations.length}</h2>
                            <p className='text-xs text-gray-500'>All time creations</p>
                        </div>
                        <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform'>
                            <Sparkles className='w-7 h-7 text-white'/>
                        </div>
                    </div>
                </div>

                {/* Active Plan Card */}
                <div className='group relative overflow-hidden glass rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover-lift animate-slide-in' style={{animationDelay: '0.1s'}}>
                    <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl'></div>
                    <div className='relative z-10 flex justify-between items-start'>
                        <div>
                            <p className='text-sm text-gray-400 mb-2'>Active Plan</p>
                            <h2 className='text-3xl font-bold text-white mb-1'>
                                <Protect plan='premium' fallback='Free'>Premium</Protect>
                            </h2>
                            <p className='text-xs text-gray-500'>
                                <Protect plan='premium' fallback='Upgrade for more'>Unlimited access</Protect>
                            </p>
                        </div>
                        <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform'>
                            <Gem className='w-7 h-7 text-white'/>
                        </div>
                    </div>
                </div>

                {/* Usage Stats Card */}
                <div className='group relative overflow-hidden glass rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all hover-lift animate-slide-in sm:col-span-2 lg:col-span-1' style={{animationDelay: '0.2s'}}>
                    <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-2xl'></div>
                    <div className='relative z-10 flex justify-between items-start'>
                        <div>
                            <p className='text-sm text-gray-400 mb-2'>This Month</p>
                            <h2 className='text-3xl font-bold text-white mb-1'>{creations.filter(c => {
                                const created = new Date(c.created_at || c.createdAt);
                                const now = new Date();
                                return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                            }).length}</h2>
                            <p className='text-xs text-gray-500'>Recent activity</p>
                        </div>
                        <div className='w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform'>
                            <TrendingUp className='w-7 h-7 text-white'/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Creations Section */}
            <div className='animate-fade-in' style={{animationDelay: '0.3s'}}>
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h2 className='text-2xl font-bold text-white mb-1'>Recent Creations</h2>
                        <p className='text-sm text-gray-400'>Your latest AI-generated content</p>
                    </div>
                    <div className='hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20'>
                        <Zap className='w-4 h-4 text-cyan-400' />
                        <span className='text-xs font-medium gradient-text-cyan'>{creations.length} Items</span>
                    </div>
                </div>

                {loading ? (
                    <div className='flex justify-center items-center py-20'>
                        <div className='flex flex-col items-center gap-4'>
                            <div className='w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin'></div>
                            <p className='text-sm text-gray-400'>Loading your creations...</p>
                        </div>
                    </div>
                ) : creations.length === 0 ? (
                    <div className='glass rounded-2xl p-12 text-center border border-cyan-500/20'>
                        <Sparkles className='w-16 h-16 text-gray-600 mx-auto mb-4' />
                        <h3 className='text-xl font-semibold text-gray-300 mb-2'>No creations yet</h3>
                        <p className='text-sm text-gray-500'>Start creating amazing content with AI tools!</p>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {creations.map((item, index) => (
                            <div key={item.id} className='animate-slide-in' style={{animationDelay: `${index * 0.05}s`}}>
                                <CreationItem item={item}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>            
        </div>
    )
}

export default Dashboard