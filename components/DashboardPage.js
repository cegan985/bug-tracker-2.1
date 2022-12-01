import { useSession } from 'next-auth/react'
import React from 'react'
import BugInfo from './BugInfo'
import SideNav from './SideNav'

function DashboardPage() {
    const { data: session } = useSession()
  return (
    <main className='grid w-full grid-cols-1 flex-shrink sm:w-full md:grid-cols-5 md:max-w-full xl:grid-cols-5 xl:max-w-full overflow-scroll'>
      <section className='hidden xl:inline-grid max-w-full md:col-span-1 sm:col-span-1'>
      <SideNav />
      </section>
      {session && (
      <section className='flex-shrink col-span-1 sm:col-span-5 md:col-span-5 lg:col-span-5 bg-gray-100 dark:bg-slate-900 overflow-scroll'> 
      <BugInfo />
      </section>
      )}
    </main>
  )
}

export default DashboardPage