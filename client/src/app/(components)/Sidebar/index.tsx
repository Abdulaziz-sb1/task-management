'use client'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import Image from 'next/image'
import React, { useState } from 'react'

const Sidebar = () => {
    // 1.27
    const [showProjects, setShowProjects] = useState<boolean>()
    const [showPriority, setShowPriority] = useState<boolean>()

    const dispatch = useAppDispatch()
    const isSideBarCollapsed = useAppSelector(
        (state)=> state.global.isSidebarCollapsed,
    )
    const navItems = [{
        icon: Home,
        label: 'Home',
        href: "/"
    },
    {
        icon: Briefcase,
        label: 'timeline',
        href: "/timeline"
    },
    {
        icon: Search,
        label: 'Search',
        href: "/search"
    },
    {
        icon: Settings,
        label: 'Settings',
        href: "/settings"
    },
    {
        icon: User,
        label: 'Users',
        href: "/users"
    },
    {
        icon: Users,
        label: 'Teams',
        href: "/teams"
    }
]
    const priorityItems = [{
        icon: AlertCircle,
        label: 'Urgent',
        href: "/priority/urgent"
    },
    {
        icon: ShieldAlert,
        label: 'High',
        href: "/priority/high"
    },
    {
        icon: AlertTriangle,
        label: 'Medium',
        href: "/priority/medium"
    },
    {
        icon: AlertOctagon,
        label: 'Low',
        href: "/priority/low"
    },
    {
        icon: Layers3,
        label: 'Backlog',
        href: "/priority/backlog"
    },
]

    const sidebarClasses = `fixed flex flex-col h-full justify-between shadow-xl
    transition-all duration-400 h-full z-40 dark:bg-black overflow-y-auto bg-white 
    ${isSideBarCollapsed ? "hidden w-0":"w-64"}`
  return (
    <div className={sidebarClasses}>
        <div className='flex h-full w-full flex-col justify-start'>
            {/* LOGO */}
            <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white
            px-6 pt-3 dark:bg-black '>
                <div className='text-xl font-bold text-gray-800 dark:text-white'>
                    LIST
                </div>
                {isSideBarCollapsed ? null :(
                    <button className='py-3' onClick={()=>{dispatch(setIsSidebarCollapsed(!isSideBarCollapsed))}}>
                        <X className='size-6 text-gray-800 hover:text-gray-500 dark:text-white' />
                    </button>
                )}
            </div>
            {/* TEAM */}
            <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700 '>
                <div className='size-10 bg-blue-500'/>
                {/* <Image 
                    src='/logo.png'
                    alt="LOGO"
                    width={40}
                    height={40}
                /> */}
                <div>
                    <h3 className='text-md font-bold tracking-wide dark:text-gray-200'>
                        TEAM
                    </h3>
                    <div className='mt-1 flex items-start gap-2'>
                        <LockIcon className='mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400' />
                        <p className='text-xs text-gray-500'>Private</p>
                    </div>
                </div>
            </div>
            {/* Nav links */}
            <nav className='z-10 w-full'>
                    {navItems?.map((item, index:number) => {
                        return(
                            <SidebarLink 
                                key={index}
                                icon={item?.icon}
                                label={item?.label}
                                href={item?.href}
                            />
                        )
                    })}
            </nav>
            {/* Link for projects */}
            <button onClick={()=> setShowProjects((prev)=> !prev)}
                className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
                    <span>
                        Projects
                    </span>
                    {showProjects ? (<ChevronUp className='size-5' />):(<ChevronDown className='size-5' />)}
            </button>
            {/* Projects list */}

            {/* link for priority  */}
            <button onClick={()=> setShowPriority((prev)=> !prev)}
                className='flex w-full items-center justify-between px-8 py-3 text-gray-500'>
                    <span>
                        Priority
                    </span>
                    {showPriority ? (<ChevronUp className='size-5' />):(<ChevronDown className='size-5' />)}
            </button>
            {showPriority && (
                <>
                    {priorityItems?.map((item, index:number) => {
                        return(
                            <SidebarLink 
                                key={index}
                                icon={item?.icon}
                                label={item?.label}
                                href={item?.href}
                            />
                        )
                    })}
                </>
            )}
        </div>
    </div>
  )
}

interface SidebarLinkProps {
    href: string,
    icon: LucideIcon,
    label: string,
    // isCollapsed: boolean
}
const SidebarLink = ({
    href,
    icon: Icon,
    label,
    // isCollapsed
}: SidebarLinkProps)=>{
    const pathname = usePathname() // to highlight the item
    const isActive = pathname === href || (pathname === '/' && href === 'dashboard')

  return(
    <Link href={href} className='w-full'>
        <div className={`relative flex cursor-pointer items-center gap-3 transition-colors duration-300 
        hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
            isActive ? "bg-gray-100 text-white dark:bg-gray-600":""
        } justify-start px-8 py-3`}>
            {isActive && (
                <div className='absolute left-0 top-0 h-full w-[5px] bg-blue-200' />
            )}
            <Icon className='size-6 text-gray-800 dark:text-gray-100' />
            <span className='font-medium text-gray-800 dark:text-gray-100'>
                {label}
            </span>
        </div>
    </Link>
  )
}

export default Sidebar