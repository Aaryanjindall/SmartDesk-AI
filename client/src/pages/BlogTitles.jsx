import { useAuth } from '@clerk/clerk-react';
import { Hash, Sparkles, Zap } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food'
  ]

  const [selectCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setloading] = useState(false);
  const [content, setcontent] = useState('')

  const {getToken} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try{
      setloading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectCategory}`
      const { data } = await axios.post('/api/ai/generate-blog-title',{prompt},{headers: {Authorization : `Bearer ${await getToken()}`}})

      if(data.success){
        setcontent(data.content)
        toast.success('Blog titles generated!')
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
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30'>
              <Hash className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text-purple">Blog Titles</h1>
              <p className='text-sm text-gray-400'>Generate catchy blog titles with AI</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <form
            onSubmit={onSubmitHandler}
            className="glass rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all animate-slide-in"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">AI Title Generator</h2>
            </div>

            <div className='mb-6'>
              <label className="block text-sm font-medium text-gray-300 mb-2">Keyword</label>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-3 bg-[#0f0f15] border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="The future of artificial intelligence is..."
                required
              />
            </div>

            <div className='mb-6'>
              <label className="block text-sm font-medium text-gray-300 mb-3">Category</label>
              <div className="flex gap-3 flex-wrap">
                {blogCategories.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedCategory(item)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectCategory === item
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                        : "bg-[#0f0f15] text-gray-400 border border-gray-700 hover:border-purple-500/50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 
              bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
              text-white px-6 py-3 rounded-lg font-medium
              shadow-lg shadow-purple-500/30
              transform transition-all hover:scale-[1.02] active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Zap className='w-5 h-5'/>
                  <span>Generate Title</span>
                </>
              )}
            </button>
          </form>
              
          {/* Generated Titles Section */}
          <div className="glass rounded-2xl p-6 border border-pink-500/20 flex flex-col min-h-[500px] max-h-[700px] animate-slide-in" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center'>
                <Hash className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Generated Titles</h2>
            </div>

            {!content ? (
              <div className="flex-1 flex justify-center items-center">
                <div className="text-center">
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4'>
                    <Hash className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-400">Enter a keyword and click "Generate Title" to get started</p>
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

export default BlogTitles
