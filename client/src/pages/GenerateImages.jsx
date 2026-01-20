import { Image, Sparkles } from 'lucide-react'
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
  const [loading,setloading] = useState(false);
  const[content,setcontent]  = useState('')

  const {getToken} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      setloading(true)
      const prompt = `Generate an image of ${input} int the style ${selectedStyle}`
      console.log(prompt);

      const { data } = await axios.post('http://localhost:3000/api/ai/generate-image',{prompt,publish},{headers: {Authorization : `Bearer ${await getToken()}`}})

      console.log(data);
      

      if(data.success){
        setcontent(data.content)
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
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-6 text-slate-700">
      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe what you want to see in the image..."
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {ImageStyle.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? 'bg-green-50 text-green-700 border-green-400'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />

            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image Public</p>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center items-center gap-2 
          bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 
          text-sm rounded-lg cursor-pointer transform transition active:scale-95"
        >
        { loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Image className='w-5'/>} 
         Generate Image
        </button>
      </form>

      {/* Generated Image Section */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3 mb-4">
          <Image className="w-5 h-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>

        {
          !content ? (
            <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Image className="w-9 h-9" />
            <p>Enter a topic and click "Generate image" to get started</p>
          </div>
        </div>
          ) : (
            <div className='mt-3 h-full'>
              <img src={content} alt="" className='w-full h-full'/>
            </div>
          )
        }

        
      </div>
    </div>
  )
}

export default GenerateImages
