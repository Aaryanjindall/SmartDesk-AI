import { Eraser, Sparkles, Zap, Upload } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackgound = () => {
  const [input, setInput] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setloading] = useState(false);
  const [content, setcontent] = useState('')

  const {getToken} = useAuth()
    
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setInput(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try{
      setloading(true)

      const formData = new FormData()
      formData.append('image',input)

      const { data } = await axios.post('/api/ai/remove-image-background',formData ,{headers: {Authorization : `Bearer ${await getToken()}`}})

      if(data.success){
        setcontent(`${data.content}?v=${data.version}`)
        toast.success('Background removed successfully!')
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }
    setloading(false)
  }

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8 animate-fade-in'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30'>
              <Eraser className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Background Removal</h1>
              <p className='text-sm text-gray-400'>Remove backgrounds from images instantly</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <form
            onSubmit={onSubmitHandler}
            className="glass rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all animate-slide-in"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-semibold text-white">Background Removal</h2>
            </div>

            <div className='mb-6'>
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload image</label>
              <div className="relative">
                <input
                  onChange={handleFileChange}
                  type='file'
                  accept='image/*'
                  className="w-full p-3 bg-[#0f0f15] border border-orange-500/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-orange-500 file:to-red-500 file:text-white hover:file:from-orange-600 hover:file:to-red-600 file:cursor-pointer focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  required
                />
              </div>
              <p className='text-xs text-gray-500 mt-2'>Supports JPG, PNG, and other image formats</p>
            </div>

            {preview && (
              <div className='mb-6'>
                <p className='text-sm text-gray-300 mb-2'>Preview:</p>
                <img src={preview} alt="Preview" className='w-full rounded-lg border border-orange-500/20' />
              </div>
            )}

            <button
              disabled={loading || !input}
              className='w-full flex justify-center items-center gap-2
              bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600
              text-white px-6 py-3 rounded-lg font-medium
              shadow-lg shadow-orange-500/30
              transform transition-all hover:scale-[1.02] active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <>
                  <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Zap className='w-5 h-5'/>
                  <span>Remove Background</span>
                </>
              )}
            </button>
          </form>

          {/* Processed Image Section */}
          <div className="glass rounded-2xl p-6 border border-red-500/20 flex flex-col min-h-[500px] animate-slide-in" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center'>
                <Eraser className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Processed Image</h2>
            </div>

            {!content ? (
              <div className="flex-1 flex justify-center items-center">
                <div className="text-center">
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mx-auto mb-4'>
                    <Upload className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-400">Upload an image and click "Remove Background" to get started</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 flex items-center justify-center'>
                <img 
                  src={content} 
                  alt="Processed" 
                  className='w-full h-auto rounded-lg shadow-2xl border border-red-500/20 hover:border-red-500/40 transition-all'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveBackgound
