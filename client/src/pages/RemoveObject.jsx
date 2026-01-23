import { Scissors, Sparkles, Zap, Upload } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState('')
  const [preview, setPreview] = useState('')
  const [object, setobject] = useState('')
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
    e.preventDefault();
    try{
      setloading(true)

      if(object.split(' ').length > 1){
        return toast.error('Please enter only one object name')
      }

      const formData = new FormData()
      formData.append('image',input)
      formData.append('object',object)

      const { data } = await axios.post('/api/ai/remove-image-object',formData,{headers: {Authorization : `Bearer ${await getToken()}`}})

      if(data.success){
        setcontent(data.content)
        toast.success('Object removed successfully!')
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
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/30'>
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text-cyan">Object Removal</h1>
              <p className='text-sm text-gray-400'>Remove unwanted objects from images</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <form
            onSubmit={onSubmitHandler}
            className="glass rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all animate-slide-in"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Object Removal</h2>
            </div>

            <div className='mb-6'>
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload image</label>
              <input
                onChange={handleFileChange}
                type='file'
                accept='image/*'
                className="w-full p-3 bg-[#0f0f15] border border-blue-500/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white hover:file:from-blue-600 hover:file:to-purple-600 file:cursor-pointer focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>

            {preview && (
              <div className='mb-6'>
                <p className='text-sm text-gray-300 mb-2'>Preview:</p>
                <img src={preview} alt="Preview" className='w-full rounded-lg border border-blue-500/20' />
              </div>
            )}

            <div className='mb-6'>
              <label className="block text-sm font-medium text-gray-300 mb-2">Describe object name to remove</label>
              <textarea
                onChange={(e) => setobject(e.target.value)}
                value={object}
                rows={3}
                className="w-full p-3 bg-[#0f0f15] border border-blue-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                placeholder="e.g., watch or spoon, Only single object name"
                required 
              />
              <p className='text-xs text-gray-500 mt-2'>Enter only one object name (single word)</p>
            </div>

            <button
              disabled={loading || !input || !object}
              className='w-full flex justify-center items-center gap-2
              bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600
              text-white px-6 py-3 rounded-lg font-medium
              shadow-lg shadow-blue-500/30
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
                  <span>Remove Object</span>
                </>
              )}
            </button>
          </form>

          {/* Processed Image Section */}
          <div className="glass rounded-2xl p-6 border border-purple-500/20 flex flex-col min-h-[500px] animate-slide-in" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center'>
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Processed Image</h2>
            </div>

            {!content ? (
              <div className="flex-1 flex justify-center items-center">
                <div className="text-center">
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4'>
                    <Upload className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-400">Upload an image and click "Remove Object" to get started</p>
                </div>
              </div>
            ) : (
              <div className='flex-1 flex items-center justify-center'>
                <img 
                  src={content} 
                  alt="Processed" 
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

export default RemoveObject
