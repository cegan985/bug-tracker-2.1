import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import {db} from '../firebase'
import React, { useEffect, useState } from 'react'
import Post from './Post'
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Filter from './Filter'





function Posts() {
  const [ posts, setPosts ] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
        onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
          setPosts(snapshot.docs)
        })
  }, [])

  return (   
  <div>
  <div class="container mx-auto px-4 sm:px-8 w-full mr-9">
    <div class="fixed  z-30">
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
                <select onChange={e => setSearch(e.target.value)} className='bg-gray-50 dark:bg-slate-900 dark:text-gray-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-slate-700 rounded-md focus:ring-[rgb(72,69,210)] focus:border-[rgb(72,69,210)]'>
                    <option className='text-gray-500'>All Bugs</option>
                    <option className='text-gray-500'>Open</option>
                    <option className='text-gray-500'>Closed</option>
                    <option className='text-gray-500'>In Progress</option>
                </select> 
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
    <div className='pt-16'>
        {posts.filter((post) => {
          return search.toLowerCase() === '' ? post : post.data().username.toLowerCase().includes(search) || post.data().severity.toLowerCase().includes(search) || post.data().status.toLowerCase().includes(search)
        }).map((post) => (
            <Post
            key={post.id}
            id={post.id}
            bug={post.data().bug}
            reporter={post.data().username}
            date={post.data().timestamp}
            startdate={post.data().startdate}
            endDate={post.data().endDate}
            status={post.data().status}
            assignee={post.data().assignee}
            severity={post.data().severity}
            />
        ))}
        
    </div>
  </div>
  )
}

export default Posts
