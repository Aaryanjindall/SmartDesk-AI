import { FileText, Sparkles, Zap, Upload, File } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Summarize = () => {
  const [input, setInput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success('Copied to clipboard')
    } catch (error) {
      toast.error('Failed to copy')
    }
  }

  const onSubmitHandler = async e => {
    e.preventDefault()

    if (!input) {
      toast.error('Please upload a file')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('file', input)

      const { data } = await axios.post(
        '/api/ai/summarize-data',
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )

      if (data.success) {
        setContent(data.content)
        toast.success('File summarized successfully 🔥')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full overflow-y-auto p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/40'>
              <File className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-red-400'>
                File Content Summarizer
              </h1>
              <p className='text-sm text-gray-400'>
                Supports PDF & PPTX files
              </p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Form */}
          <form
            onSubmit={onSubmitHandler}
            className='glass rounded-2xl p-6 border border-red-500/20'
          >
            <div className='flex items-center gap-3 mb-6'>
              <Sparkles className='w-6 h-6 text-red-400' />
              <h2 className='text-xl font-semibold text-white'>
                Upload File
              </h2>
            </div>

            <div className='mb-6'>
              <label className='block text-sm text-gray-300 mb-2'>
                Select File
              </label>

              <input
                type='file'
                accept='.pdf,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation'
                required
                onChange={e => {
                  const file = e.target.files[0]
                  if (!file) return

                  const allowedTypes = [
                    'application/pdf',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                  ]

                  if (!allowedTypes.includes(file.type)) {
                    toast.error('Only PDF or PPTX files are allowed')
                    return
                  }

                  setInput(file)
                }}
                className='w-full p-3 bg-[#0f0f15] border border-red-500/20 rounded-lg text-white
  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
  file:text-sm file:font-medium
  file:bg-gradient-to-r file:from-red-600 file:to-pink-600
  file:text-white hover:file:from-red-700 hover:file:to-pink-700
  file:cursor-pointer focus:outline-none focus:border-red-500/50
  focus:ring-2 focus:ring-red-500/20 transition-all'
              />

              <p className='text-xs text-gray-500 mt-2'>
                Supported formats: PDF, PPTX
              </p>
            </div>

            <button
              type='submit'
              disabled={loading || !input}
              className='w-full flex justify-center items-center gap-2
              bg-gradient-to-r from-red-600 to-pink-600
              text-white px-6 py-3 rounded-lg
              disabled:opacity-50'
            >
              {loading ? (
                <>
                  <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Zap className='w-5 h-5' />
                  <span>Summarize File Data</span>
                </>
              )}
            </button>
          </form>

          {/* Result */}
          <div className='glass rounded-2xl p-6 border border-pink-500/20 flex flex-col min-h-[500px] max-h-[700px]'>
            <h2 className='text-xl font-semibold text-white mb-4'>
              Summarized Output
            </h2>

            {!content ? (
              <div className='flex-1 flex justify-center items-center'>
                <div className='text-center'>
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4'>
                    <Upload className='w-8 h-8 text-gray-500' />
                  </div>
                  <p className='text-sm text-gray-400'>
                    Upload file and generate summarized data
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className='flex-1 overflow-y-auto'>
                  <div className='reset-tw prose prose-invert max-w-none'>
                    <Markdown>{content}</Markdown>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className='mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg'
                >
                  Copy to Clipboard
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summarize