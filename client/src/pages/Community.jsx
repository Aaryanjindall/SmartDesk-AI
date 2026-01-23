import React, { useEffect, useState } from 'react'
import { Heart, Sparkles, Users } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
    const [creations, setCreations] = useState([])
    const {user} = useUser()
    const [loading, setloading] = useState(true);
    const { getToken } = useAuth()

    const fetchCreations = async ()=>{
        try{
            const { data } = await axios.get('/api/user/get-published-creations',{
                headers : {Authorization: `Bearer ${await getToken()}`}
            })
            if(data.success){
                setCreations(data.creations)
            }else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
        setloading(false);
    }

    const imageLikeToggle = async (id)=>{
        try{
            const{data} = await axios.post('/api/user/toggle-like-creation',{id},{
                headers : {Authorization : `Bearer ${await getToken()}`}
            })

            if(data.success){
                toast.success(data.message)
                await fetchCreations()
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user){
            fetchCreations()
        }
    },[user])

    return (
        <div className='h-full overflow-y-auto p-4 sm:p-6 lg:p-8'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-8 animate-fade-in'>
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30'>
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold gradient-text">Community</h1>
                            <p className='text-sm text-gray-400'>Explore creations from the community</p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className='flex justify-center items-center py-20'>
                        <div className='flex flex-col items-center gap-4'>
                            <div className='w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin'></div>
                            <p className='text-sm text-gray-400'>Loading community creations...</p>
                        </div>
                    </div>
                ) : creations.length === 0 ? (
                    <div className='glass rounded-2xl p-12 text-center border border-cyan-500/20'>
                        <Users className='w-16 h-16 text-gray-600 mx-auto mb-4' />
                        <h3 className='text-xl font-semibold text-gray-300 mb-2'>No creations yet</h3>
                        <p className='text-sm text-gray-500'>Be the first to share your creation with the community!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                        {creations.map((creation, index) => (
                            <div 
                                key={creation.id} 
                                className="group relative overflow-hidden glass rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover-lift animate-slide-in"
                                style={{animationDelay: `${index * 0.05}s`}}
                            >
                                <div className="aspect-square relative">
                                    <img
                                        src={`${creation.content}?t=${creation.id}`}
                                        alt={creation.prompt}
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                                        <div className="flex-1"></div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-white line-clamp-2 font-medium">{creation.prompt}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Heart
                                                        onClick={() => imageLikeToggle(creation.id)}
                                                        className={`w-5 h-5 cursor-pointer transition-all hover:scale-125 ${
                                                            creation.likes?.includes(user?.id?.toString())
                                                                ? 'fill-red-500 text-red-500'
                                                                : 'text-white/70 hover:text-red-400'
                                                        }`}
                                                    />
                                                    <span className="text-xs text-white/80">{creation.likes?.length || 0}</span>
                                                </div>
                                                <div className='px-2 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30'>
                                                    <Sparkles className='w-3 h-3 text-cyan-400' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Community
