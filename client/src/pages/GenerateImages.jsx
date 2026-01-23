import { Image, Sparkles, Zap, Upload } from 'lucide-react'
import React, { useState } from 'react'
import  axios  from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const ImageStyle = [
    'Realistic',
    'Ghibli style',
    'Anime style',
    'Cartoon style',
    'Fantasy style',
    '3D style',
    'Portrait style'
  ]

  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setloading] = useState(false);
  const [content, setcontent] = useState('')

  const {getToken} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      setloading(true)
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

      const { data } = await axios.post('/api/ai/generate-image',{prompt,publish},{headers: {Authorization : `Bearer ${await getToken()}`}})

      if(data.success){
        setcontent(data.content)
        toast.success('Image generated successfully!')
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.response?.data?.message || error.message)
    }
    setloading(false)
  }

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8 animate-fade-in'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/30'>
              <Image className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text-purple">Generate Images</h1>
              <p className='text-sm text-gray-400'>Create stunning images with AI</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <form
            onSubmit={onSubmitHandler}
            className="glass rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all animate-slide-in"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-pink-400" />
              <h2 className="text-xl font-semibold text-white">AI Image Generator</h2>
            </div>

            <div className='mb-6'>
              <label className="block text-sm font-medium text-gray-300 mb-2">Describe Your Image</label>
              <textarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                rows={4}
                className="w-full p-3 bg-[#0f0f15] border border-pink-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
                placeholder="Describe what you want to see in the image..."
                required
              />
            </div>

            <div className='mb-6'>
              <label className="block text-sm font-medium text-gray-300 mb-3">Style</label>
              <div className="flex gap-3 flex-wrap">
                {ImageStyle.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedStyle(item)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedStyle === item
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30'
                        : 'bg-[#0f0f15] text-gray-400 border border-gray-700 hover:border-pink-500/50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 flex items-center gap-3 p-4 rounded-lg bg-[#0f0f15] border border-purple-500/20">
              <label className="relative cursor-pointer flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={(e) => setPublish(e.target.checked)}
                  checked={publish}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500 transition-all relative">
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                </div>
                <span className="text-sm text-gray-300">Make this image Public</span>
              </label>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center items-center gap-2 
              bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600
              text-white px-6 py-3 rounded-lg font-medium
              shadow-lg shadow-pink-500/30
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
                  <span>Generate Image</span>
                </>
              )}
            </button>
          </form>

          {/* Generated Image Section */}
          <div className="glass rounded-2xl p-6 border border-purple-500/20 flex flex-col min-h-[500px] animate-slide-in" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'>
                <Image className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Generated Image</h2>
            </div>

            {!content ? (
              <div className="flex-1 flex justify-center items-center">
                <div className="text-center">
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4'>
                    <Upload className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-400">Enter a description and click "Generate Image" to get started</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 flex items-center justify-center'>
                <img 
                  src={content} 
                  alt="Generated" 
                  className='w-full h-auto rounded-lg shadow-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerateImages
