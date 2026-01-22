import React from 'react'
import { useUser, useClerk,SignIn, Protect } from '@clerk/clerk-react'
import { NavLink } from 'react-router-dom'   // 👈 import missing tha
import { Hash, House, Image, Eraser, SquarePen, Scissors, FileText, Users, LogOut } from 'lucide-react'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users }
]

const Sidebar = ({ sidebar, setsidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div
  className={`
    fixed sm:relative top-0 sm:top-auto left-0
    h-screen sm:h-auto w-60
    bg-white border-r border-gray-200
    flex flex-col justify-between
    z-50
    transform transition-transform duration-300 ease-in-out
    ${sidebar ? 'translate-x-0' : '-translate-x-full'}
    sm:translate-x-0
  `}
>

      <div className="my-7 w-full">
        <img
          src={user?.imageUrl}
          className="w-14 h-14 rounded-full mx-auto"
          alt="profile"
        />
        <h1 className="mt-1 text-center font-medium">{user?.fullName}</h1>

        <div className='px-6 mt-5 text-sm tex-gray-600 font-medium'>
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setsidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded transition-colors 
                 ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : 'hover:bg-gray-100'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
        <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
            <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
            <div>
                <h1 className='text-sm font-medium'>{user.fullName}</h1>
                <p className='text-xs text-gray-500'>
                    <Protect plan='premium' fallback='free'>Premium</Protect>
                </p>
            </div>
        

        </div>
        <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'/>
      </div>
      

      {/* <div className="mb-5 flex flex-col gap-2">
        <button
          onClick={() => openUserProfile()}
          className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
        >
          Profile
        </button>
        <button
          onClick={() => signOut()}
          className="px-3 py-2 rounded bg-red-500 text-white text-sm"
        >
          Sign Out
        </button>
      </div> */}

    </div>
  )
}

export default Sidebar
