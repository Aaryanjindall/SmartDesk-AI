import React from 'react'
import { useUser, useClerk, Protect } from '@clerk/clerk-react'
import { NavLink } from 'react-router-dom'
import { Hash, House, Image, Eraser, SquarePen, Scissors, FileText, Users, LogOut, Sparkles, Gem } from 'lucide-react'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House, gradient: 'from-cyan-500 to-blue-500' },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen, gradient: 'from-blue-500 to-purple-500' },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash, gradient: 'from-purple-500 to-pink-500' },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image, gradient: 'from-pink-500 to-cyan-500' },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser, gradient: 'from-orange-500 to-red-500' },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors, gradient: 'from-blue-500 to-purple-500' },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText, gradient: 'from-green-500 to-teal-500' },
  { to: '/ai/community', label: 'Community', Icon: Users, gradient: 'from-cyan-500 to-purple-500' }
]

const Sidebar = ({ sidebar, setsidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <>
      {/* Mobile Overlay */}
      {sidebar && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setsidebar(false)}
        />
      )}

      <div
        className={`
          fixed sm:relative top-0 sm:top-auto left-0
          h-screen w-64 sm:w-72
          glass border-r border-[rgba(99,102,241,0.2)]
          flex flex-col justify-between
          z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebar ? 'translate-x-0' : '-translate-x-full'}
          sm:translate-x-0
          backdrop-blur-xl
        `}
      >
        {/* Top Section */}
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-6 border-b border-[rgba(99,102,241,0.2)]">
            <div 
              onClick={openUserProfile} 
              className="flex items-center gap-3 cursor-pointer group hover-lift p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
            >
              <div className="relative">
                <img
                  src={user?.imageUrl}
                  className="w-12 h-12 rounded-full ring-2 ring-cyan-500/50 group-hover:ring-cyan-400 transition-all"
                  alt="profile"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full border-2 border-[#0a0a0f]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-sm font-semibold text-gray-100 truncate">{user?.fullName}</h1>
                <div className="flex items-center gap-1 mt-0.5">
                  <Protect plan='premium' fallback={
                    <span className="text-xs text-gray-400">Free Plan</span>
                  }>
                    <Gem className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-medium gradient-text-cyan">Premium</span>
                  </Protect>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
            {navItems.map(({ to, label, Icon, gradient }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/ai'}
                onClick={() => setsidebar(false)}
                className={({ isActive }) =>
                  `group relative px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-300
                  ${isActive 
                    ? `bg-gradient-to-r ${gradient} text-white shadow-lg shadow-${gradient.split('-')[1]}-500/50` 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[rgba(99,102,241,0.1)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span className="font-medium text-sm">{label}</span>
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className='p-4 border-t border-[rgba(99,102,241,0.2)]'>
          <div className='flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20'>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-medium gradient-text">AI Tools</span>
            </div>
            <LogOut 
              onClick={signOut} 
              className='w-5 h-5 text-gray-400 hover:text-red-400 transition-colors cursor-pointer hover:scale-110' 
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
