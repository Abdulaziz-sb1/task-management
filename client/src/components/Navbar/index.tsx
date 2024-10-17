import React from 'react'
import { Menu, Moon, Search, Settings, Sun } from 'lucide-react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state'
import { useGetAuthUserQuery } from '@/state/api'
import { signOut } from 'aws-amplify/auth'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const isSideBarCollapsed = useAppSelector(
    (state)=> state.global.isSidebarCollapsed,
  )
  const isDarkMode = useAppSelector(
    (state)=> state.global.isDarkMode,
  )

  const { data: currentUser } = useGetAuthUserQuery({})

  const handleSignOut = async () => {
    try{
      await signOut()
    } catch(err){
      console.error("Error signing out", err)
    } 
  }

  if(!currentUser) return null
  const currentUserDetails = currentUser?.userDetails

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'>
      {/* search bar */}
      <div className='flex items-center gap-8'>
        {!isSideBarCollapsed ? null : (
          <button onClick={()=> dispatch(setIsSidebarCollapsed(!isSideBarCollapsed))} >
            <Menu className='size-8 dark:text-white' />
            </button>
        )}
        <div className='relative flex h-min w-[200px]'>
          <Search className='absolute cursor-pointer left-1 top-1/2 mr-2 size-5 -translate-y-1/2 transform dark:text-white' />
          <input 
          className='w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 
          focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white'
          type='search'
          placeholder='Search...'
          />
        </div>
      </div>

      {/* Icon */}
      <div className='flex items-center'>
        <button onClick={()=>dispatch(setIsDarkMode(!isDarkMode))}
          className={`rounded p-2 ${isDarkMode ? "dark:hover:bg-gray-700":"hover:bg-gray-100"}`}
          >
            {isDarkMode ? (
              <Sun className='size-6 cursor-pointer dark:text-white' />
            ) : (
              <Moon className='size-6 cursor-pointer dark:text-white' />
            )}
        </button>
        <Link 
          href="/settings"
          className={`rounded p-2 size-min ${isDarkMode ? "dark:hover:bg-gray-700":"hover:bg-gray-100"}`}
        >
          <Settings className='size-6 cursor-pointer dark:text-white' />
        </Link>
        <div className='ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block'>

        </div>
        <div className='hidden items-center justify-between md:flex'>
          <div className='align-center flex size-9 justify-center'>
            <div className='size-4 rounded-full bg-purple-500'></div>
          </div>
          <span className='mx-3 text-gray-600 dark:text-white'>
            {currentUserDetails?.username}
          </span>
          <button className='hidden rounded bg-purple-500 py-2 px-4 text-xs font-bold text-white hover:bg-purple-700 md:block'
          onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar