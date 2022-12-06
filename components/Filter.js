import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import {db} from '../firebase'
import React, { useEffect, useState } from 'react'
import Posts from './Posts'
import Post from './Post'

function Filter() {
    const [search, setSearch] = useState('')
    
  return (
    <div class="container mx-auto px-4 sm:px-8 w-full mr-9">
    <div class="fixed z-30">
      <div class="-mx-4 sm:-mx-8 sm:px-8 overflow-x-auto">
        <div
          class="hidden md:inline-block min-w-full overflow-hidden"
        >
            <div className='bg-gray-100 dark:bg-slate-900 dark:border-slate-700 border-t-2 border-b-2 border-gray-200 flex '>
            <div className='relative p-3 rounded-md'>
                <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                    <MagnifyingGlassIcon className='h-5 w-5 text-gray-500'/>
                </div>
                <input onChange={e => setSearch(e.target.value)} className='bg-gray-50 dark:bg-slate-900 dark:text-gray-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-slate-700 rounded-md focus:ring-[rgb(72,69,210)] focus:border-[rgb(72,69,210)]' type='text' placeholder='Search by Names, Bugs or Other'/>
            </div> 
            <div className='relative p-3 rounded-md'>
                <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                    <AdjustmentsHorizontalIcon className='h-5 w-5 text-gray-500'/>
                </div>
                <select className='bg-gray-50 dark:bg-slate-900 dark:text-gray-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-slate-700 rounded-md focus:ring-[rgb(72,69,210)] focus:border-[rgb(72,69,210)]'>
                    <option className='text-gray-500'>All Bugs</option>
                    <option className='text-gray-500'>Open Bugs</option>
                    <option className='text-gray-500'>Closed Bugs</option>
                    <option className='text-gray-500'>In Progress</option>
                </select>
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Filter