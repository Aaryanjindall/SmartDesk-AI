import { FileText, Sparkles, Zap, Upload } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
    const [input, setInput] = useState(null)
    const [loading, setloading] = useState(false);
    const [content, setcontent] = useState('')
    
    const {getToken} = useAuth()
        
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try{
            setloading(true)

            const formData = new FormData()
            formData.append('resume',input)

            const { data } = await axios.post('/api/ai/resume-review',formData,{headers: {Authorization : `Bearer ${await getToken()}`}})
            
            if(data.success){
                setcontent(data.content)
                toast.success('Resume reviewed successfully!')
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
        setloading(false);
    }

    return (
        <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-8 animate-fade-in'>
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg shadow-green-500/30'>
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold gradient-text">Resume Review</h1>
                            <p className='text-sm text-gray-400'>Get AI-powered feedback on your resume</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form */}
                    <form
                        onSubmit={onSubmitHandler}
                        className="glass rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all animate-slide-in"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-green-400" />
                            <h2 className="text-xl font-semibold text-white">Resume Review</h2>
                        </div>

                        <div className='mb-6'>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Upload Resume</label>
                            <input
                                onChange={(e) => setInput(e.target.files[0])}
                                type='file'
                                accept='application/pdf'
                                className="w-full p-3 bg-[#0f0f15] border border-green-500/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-green-500 file:to-teal-500 file:text-white hover:file:from-green-600 hover:file:to-teal-600 file:cursor-pointer focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                                required
                            />
                            <p className='text-xs text-gray-500 mt-2'>Supports PDF resume only</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !input}
                            className="w-full flex justify-center items-center gap-2
                            bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600
                            text-white px-6 py-3 rounded-lg font-medium
                            shadow-lg shadow-green-500/30
                            transform transition-all hover:scale-[1.02] active:scale-[0.98]
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    <span>Reviewing...</span>
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    <span>Review Resume</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Analysis Results Section */}
                    <div className="glass rounded-2xl p-6 border border-teal-500/20 flex flex-col min-h-[500px] max-h-[700px] animate-slide-in" style={{animationDelay: '0.1s'}}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center'>
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Analysis Results</h2>
                        </div>

                        {!content ? (
                            <div className="flex-1 flex justify-center items-center">
                                <div className="text-center">
                                    <div className='w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4'>
                                        <Upload className="w-8 h-8 text-gray-500" />
                                    </div>
                                    <p className="text-sm text-gray-400">Upload a resume and click "Review Resume" to get started</p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex-1 overflow-y-auto'>
                                <div className='reset-tw prose prose-invert max-w-none'> 
                                    <Markdown>{content}</Markdown>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewResume
