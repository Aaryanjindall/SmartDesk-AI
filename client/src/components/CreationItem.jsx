import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDown, ChevronUp, Image as ImageIcon, FileText, Hash, Calendar, Sparkles } from 'lucide-react'

const CreationItem = ({item}) => {
    const [expanded, setexpanded] = useState(false);

    const getTypeIcon = (type) => {
        switch(type) {
            case 'image': return ImageIcon;
            case 'article': return FileText;
            case 'blog-title': return Hash;
            default: return Sparkles;
        }
    }

    const getTypeGradient = (type) => {
        switch(type) {
            case 'image': return 'from-pink-500 to-purple-500';
            case 'article': return 'from-blue-500 to-cyan-500';
            case 'blog-title': return 'from-purple-500 to-pink-500';
            case 'resume-review': return 'from-green-500 to-teal-500';
            default: return 'from-cyan-500 to-blue-500';
        }
    }

    const TypeIcon = getTypeIcon(item.type);
    const gradient = getTypeGradient(item.type);

    return(
        <div 
            onClick={() => setexpanded(!expanded)} 
            className='group glass rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 cursor-pointer transition-all hover-lift overflow-hidden'
        >
            <div className='p-5'>
                <div className='flex justify-between items-start gap-4'>
                    <div className='flex-1 min-w-0'>
                        <h2 className='text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors'>
                            {item.prompt}
                        </h2>
                        <div className='flex items-center gap-3 text-xs text-gray-400'>
                            <div className='flex items-center gap-1'>
                                <Calendar className='w-3 h-3' />
                                <span>
                                    {item.created_at || item.createdAt
                                        ? new Date(item.created_at || item.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                        : "Just now"}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-3'>
                        <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${gradient} text-white text-xs font-medium shadow-lg flex items-center gap-1.5`}>
                            <TypeIcon className='w-3 h-3' />
                            <span className='capitalize'>{item.type?.replace('-', ' ')}</span>
                        </div>
                        <div className='p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors'>
                            {expanded ? (
                                <ChevronUp className='w-4 h-4 text-gray-400' />
                            ) : (
                                <ChevronDown className='w-4 h-4 text-gray-400' />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {expanded && (
                <div className='border-t border-cyan-500/20 bg-[#0f0f15] animate-fade-in'>
                    {item.type === 'image' ? (
                        <div className='p-5'>
                            <img 
                                src={item.content} 
                                alt={item.prompt} 
                                className='w-full max-w-2xl mx-auto rounded-lg shadow-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all'
                            />
                        </div>
                    ) : (
                        <div className='p-5 max-h-96 overflow-y-auto'>
                            <div className='reset-tw prose prose-invert max-w-none'> 
                                <Markdown>{item.content}</Markdown>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CreationItem
