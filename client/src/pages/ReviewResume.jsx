import { FileText, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown'
// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
    const [input, setInput] = useState(null)
    const [loading,setloading] = useState(false);
    const[content,setcontent]  = useState('')
    
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
        <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-6 text-slate-700">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Resume</p>
        <input
          
          onChange={(e) => setInput(e.target.files[0])}
          type='file'
          accept='application/pdf'
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />

        <p className='text-xs text-gray-500 font-light mt-1'>Supports PDF resume only</p>

<button
  type="submit"
  disabled={loading}
  className="w-full flex justify-center items-center gap-2
  bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6
  text-sm rounded-lg cursor-pointer transform transition active:scale-95"
>
  {loading ? (
    <>
      <span>Reviewing...</span>
      <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"></span>
    </>
  ) : (
    <>
      <FileText className="w-5" />
      Review Resume
    </>
  )}
</button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Analysis Results</h1>
        </div>
        {
          !content ? (
            <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <FileText className="w-9 h-9" />
            <p>Upload a resume and click "Review Resume" to get started</p>
          </div>
        </div>
          ) : (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
              <div className='reset-tw'>
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )
        }
        
      </div>
    </div>
      )

}

export default ReviewResume



// import { FileText, Sparkles } from 'lucide-react'
// import React, { useState } from 'react'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import Markdown from 'react-markdown'

// // OPTIONAL: agar VITE_BASE_URL use nahi kar rahe
// // axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const ReviewResume = () => {
//   const [input, setInput] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [content, setContent] = useState('')

//   const onSubmitHandler = async (e) => {
//     e.preventDefault()

//     if (!input) {
//       toast.error("Please upload a resume")
//       return
//     }

//     try {
//       setLoading(true)

//       const formData = new FormData()
//       formData.append("resume", input)

//       const { data } = await axios.post(
//         "http://localhost:3000/api/ai/resume-review",
//         formData
//         // ❌ no auth headers
//       )

//       if (data.success) {
//         setContent(data.content)
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="h-full overflow-y-scroll p-6 flex gap-6 text-slate-700">

//       {/* FORM */}
//       <form
//         onSubmit={onSubmitHandler}
//         className="w-full max-w-lg p-4 bg-white rounded-lg border"
//       >
//         <div className="flex items-center gap-3">
//           <Sparkles className="w-6 text-[#00DA83]" />
//           <h1 className="text-xl font-semibold">Resume Review</h1>
//         </div>

//         <p className="mt-6 text-sm font-medium">Upload Resume</p>

//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={(e) => setInput(e.target.files[0])}
//           className="w-full p-2 mt-2 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full mt-6 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white py-2 rounded"
//         >
//           {loading ? "Reviewing..." : "Review Resume"}
//         </button>
//       </form>

//       {/* RESULT */}
//       <div className="w-full max-w-lg p-4 bg-white rounded-lg border min-h-96">
//         <h1 className="text-xl font-semibold mb-4">Analysis Results</h1>

//         {!content ? (
//           <p className="text-gray-400">
//             Upload resume to see result
//           </p>
//         ) : (
//           <Markdown>{content}</Markdown>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ReviewResume
