import React, { useState } from 'react'
import { HomeIcon, BugAntIcon, AdjustmentsHorizontalIcon, ArrowLeftOnRectangleIcon, ChevronDoubleLeftIcon, UserGroupIcon} from '@heroicons/react/24/outline'
import { signOut, useSession, } from 'next-auth/react'

function SideNav() {
    const {data: session} = useSession()
    const [open, setOpen] = useState(true)

  return (
        <div>
            <div onClick={() => setOpen(!open)} className={`${open ? 'left-64' : 'left-12'} duration-300 cursor-pointer hover:bg-gray-100 hover:dark:bg-slate-900 bg-white shadow-md dark:bg-slate-800 flex fixed z-30 border-b border-l border-r rounded-full justify-end border-gray-100 dark:border-slate-700 p-3 hover:shadow-lg`}>
                <ChevronDoubleLeftIcon className={`hidden text-gray-900 h-6 md:inline-flex cursor-pointer dark:text-white ${!open && 'rotate-180'}`}/>
            </div>
            <div className={`grid grid-cols-1 justify-start bg-white dark:bg-slate-800 border-r dark:border-slate-700 p-6 h-[calc(100vh-71px)] z-20 fixed -left-96 ${open ? 'w-72' : 'w-20'} lg:left-0 peer-focus:left-0 peer:transition ease-out duration-300`}>
                <div className='flex flex-col justify-start items-center'>
                    <div className='my-4 border-b border-gray-100 dark:border-slate-700 pb-4'>
                        <div className={`${!open && 'w-12'} flex hover:scale-105 transition-all duration-150 ease-out active:scale-100 mb-2 justify-start items-center gap-4 hover:bg-gray-100 hover:dark:bg-slate-900 p-3 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                            <HomeIcon className='hidden text-gray-900 h-6 md:inline-flex cursor-pointer dark:text-white'/>
                            <h3 className={`font-semibold text-gray-900 dark:text-white ${!open && 'hidden'}`}>Dashboard</h3>
                        </div>
                        <div className={`${!open && 'w-12'} flex hover:scale-105 transition-all duration-150 ease-out active:scale-100 mb-2 justify-start items-center gap-4 hover:bg-gray-100 hover:dark:bg-slate-900 p-3 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                            <BugAntIcon className='hidden text-gray-900 h-6 md:inline-flex cursor-pointer dark:text-white'/>
                            <h3 className={`font-semibold text-gray-900 dark:text-white  ${!open && 'hidden'}`}>Bugs</h3>
                        </div>
                        <div className={` ${!open && 'w-12'} flex hover:scale-105 transition-all duration-150 ease-out active:scale-100 mb-2 justify-start items-center gap-4 hover:bg-gray-100 hover:dark:bg-slate-900 p-3 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                            <UserGroupIcon className='hidden text-gray-900 h-6 md:inline-flex cursor-pointer dark:text-white'/>
                            <h3 className={`font-semibold text-gray-900 dark:text-white ${!open && 'hidden'} `}>Organization</h3>
                        </div>
                        <div className={` ${!open && 'w-12'} flex hover:scale-105 transition-all duration-150 ease-out active:scale-100 mb-2 justify-start items-center gap-4 hover:bg-gray-100 hover:dark:bg-slate-900 p-3 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                            <AdjustmentsHorizontalIcon className='hidden text-gray-900 h-6 md:inline-flex cursor-pointer dark:text-white'/>
                            <h3 className={`font-semibold text-gray-900 dark:text-white ${!open && 'hidden'} `}>Settings</h3>
                        </div>
                        <div onClick={() => { signOut({ redirect: true, callbackUrl: '/auth/signin', }); }} className={`${!open && 'w-12'} flex hover:scale-105 transition-all duration-150 ease-out active:scale-100 mb-2 justify-start items-center gap-4 hover:bg-gray-100 hover:dark:bg-slate-900 p-3 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                            <ArrowLeftOnRectangleIcon className='hidden text-gray-900 h-6 md:inline-flex cursor-pointer dark:text-white'/>
                            <h3 className={`${!open && 'hidden'} duration-300 font-semibold text-gray-900 dark:text-white`}>Sign out</h3>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
  )
}

export default SideNav
