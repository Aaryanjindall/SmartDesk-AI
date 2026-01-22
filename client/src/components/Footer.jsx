// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20">
//       <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
//         <div className="md:max-w-96">
//           <img
//             className="h-9"
//             src={assets.logo}
//             alt="logo"
//           />
//           <p className="mt-6 text-sm">
//             Experience the power of AI with QuickAI . <br /> Transform your content creation with our suite of premium AI tools . Write articles, genrate images , and enhance your workflow.
//           </p>
//         </div>

//         <div className="flex-1 flex items-start md:justify-end gap-20">
//           <div>
//             <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
//             <ul className="text-sm space-y-2">
//               <li><a href="#">Home</a></li>
//               <li><a href="#">About us</a></li>
//               <li><a href="#">Contact us</a></li>
//               <li><a href="#">Privacy policy</a></li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
//             <div className="text-sm space-y-2">
//               <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
//               <div className="flex items-center gap-2 pt-4">
//                 <input
//                   className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
//                   type="email"
//                   placeholder="Enter your email"
//                 />
//                 <button className="bg-primary w-24 h-9 text-white rounded cursor-pointer">Subscribe</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <p className="pt-4 text-center text-xs md:text-sm pb-5">
//         Copyright 2025 © <a href="https://prebuiltui.com">Aaryan Jindal</a>. All Right Reserved.
//       </p>
//     </footer>
//   )
// }

// export default Footer


import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-white to-gray-50 text-gray-600 mt-24">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12">

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-14 border-b border-gray-200 pb-10">

          {/* Brand */}
          <div className="max-w-md">
            <img className="h-10" src={assets.logo} alt="SmartDesk.ai logo" />
            <p className="mt-5 text-sm leading-relaxed">
              Experience the power of AI with <span className="font-medium text-gray-800">SmartDesk.ai</span>.  
              Create articles, generate images, and boost productivity with modern AI tools.
            </p>
          </div>

          {/* Links + Newsletter */}
          <div className="flex flex-col sm:flex-row gap-16">

            {/* Company */}
            <div>
              <h2 className="font-semibold text-gray-800 mb-4">Company</h2>
              <ul className="text-sm space-y-2">
                {['Home', 'About', 'Contact', 'Privacy Policy'].map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="max-w-sm">
              <h2 className="font-semibold text-gray-800 mb-4">
                Stay in the loop
              </h2>
              <p className="text-sm">
                Get AI tips, product updates, and new features straight to your inbox.
              </p>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 h-10 px-3 rounded-md border border-gray-300 
                  focus:ring-2 focus:ring-primary/60 outline-none text-sm"
                />
                <button className="h-10 px-5 rounded-md bg-primary text-white text-sm font-medium
                  hover:opacity-90 transition">
                  Subscribe
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-xs md:text-sm py-6 text-gray-500">
          © {new Date().getFullYear()} <span className="font-medium">Aaryan Jindal</span>.  
          All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer
