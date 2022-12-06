import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getfirestore, getCountFromServer, query, where } from 'firebase/firestore'
import { BugAntIcon, CurrencyDollarIcon, LockOpenIcon } from '@heroicons/react/24/outline'
import BarChart from './BarChart'



function BugInfo() {
   const [ numBugs, setNumBugs ] = useState([])
   const [ numOpen, setNumOpen ] = useState([])
   const [ numClosed, setNumClosed ] = useState([])
   const [ numInProgress, setNumInProgress ] = useState([])
 
    useEffect(() => {
        const asyncGetCountFromServer = async () => {
            const coll = collection(db, "posts");
            const snapshot = await getCountFromServer(coll);
            console.log('count: ', snapshot.data().count)
            setNumBugs(snapshot.data().count); 
        }
        asyncGetCountFromServer()
    }, [])
    
    useEffect(() => {
        const asyncGetCountFromServer = async () => {
            const coll = collection(db, "posts");
            const query_ = query(coll, where('status', '==', 'Open'));
            const snapshot = await getCountFromServer(query_);
            console.log('count: ', snapshot.data().count);
            setNumOpen(snapshot.data().count)
        }
        asyncGetCountFromServer()
    }, [])

    useEffect(() => {
        const asyncGetCountFromServer = async () => {
            const coll = collection(db, "posts");
            const query_ = query(coll, where('status', '==', 'Closed'));
            const snapshot = await getCountFromServer(query_);
            console.log('count: ', snapshot.data().count);
            setNumClosed(snapshot.data().count)
        }
        asyncGetCountFromServer()
    }, [])

    useEffect(() => {
        const asyncGetCountFromServer = async () => {
            const coll = collection(db, "posts");
            const query_ = query(coll, where('status', '==', 'In Progress'));
            const snapshot = await getCountFromServer(query_);
            console.log('count: ', snapshot.data().count);
            setNumInProgress(snapshot.data().count)
        }
        asyncGetCountFromServer()
    }, [])
    
    

    
   
  return (
    <div className='mt-10 ml-28 mr-8'>
        <div className='flex flex-wrap lg:flex-nowrap justify-center'>
            <div className='bg-white shadow-md text-white dark:text-white dark:bg-slate-800 h-44 rounded-3xl w-full lg:w-80 p-8 pt-9 m-3'>
                <div className='flex justify-between items-center'>
                    <div>
                    <p className='font-bold text-gray-500'>Total Number of Bugs</p>
                    <div className='mt-2 p-2 bg-[rgb(165,180,251)] rounded-full w-12 items-center shadow-md'>
                    <p className='text-2xl text-[rgb(71,69,210)] justify-center items-center flex'>{numBugs}</p>
                    </div>
                    </div>

                </div>

            </div>
            <div className='bg-white shadow-md text-white dark:text-white dark:bg-slate-800 h-44 rounded-3xl w-full lg:w-80 p-8 pt-9 m-3'>
                <div className='flex justify-between items-center'>
                    <div>
                    <p className='font-bold text-gray-500'>Bugs Open</p>
                    <div className='mt-2 p-2 bg-[rgb(221,251,232)] rounded-full w-12 items-center shadow-md'>
                    <p className='text-2xl text-[rgb(124,202,156)] justify-center items-center flex'>{numOpen}</p>
                    </div>
                    </div>

                </div>

            </div>
            <div className='bg-white shadow-md text-white dark:text-white dark:bg-slate-800 h-44 rounded-3xl w-full lg:w-80 p-8 pt-9 m-3'>
                <div className='flex justify-between items-center'>
                    <div>
                    <p className='font-bold text-gray-500'>Bugs In Progress</p>
                    <div className='mt-2 p-2 bg-[rgb(254,235,212)] rounded-full w-12 items-center shadow-md'>
                    <p className='text-2xl text-[rgb(124,45,18)] justify-center items-center flex'>{numInProgress}</p>
                    </div>
                    </div>

                </div>

            </div>
            <div className='bg-white shadow-md text-white dark:text-white dark:bg-slate-800 h-44 rounded-3xl w-full lg:w-80 p-8 pt-9 m-3'>
                <div className='flex justify-between items-center'>
                    <div>
                    <p className='font-bold text-gray-500'>Bugs Closed</p>
                    <div className='mt-2 p-2 bg-[rgb(254,229,228)] rounded-full w-12 items-center shadow-md'>
                    <p className='text-2xl text-[rgb(127,28,29)] justify-center items-center flex'>{numClosed}</p>
                    </div>
                    </div>

                </div>

            </div>

        </div>
        <div className='flex gap-10 flex-wrap justify-center'>
            <div className='bg-white dark:bg-slate-800 m-3 p-4 rounded-3xl md:w-1/2'>
                <div className='flex justify-between '>
                    <p className='font-semibold text-xl'>Bug Updates</p>
                    <div className='flex items-center gap-4'>
                        <p className='flex items-center gap-2 text-gray-600'>
                            <span><CurrencyDollarIcon className='h-5 w-5'/></span>
                            <span>Expense</span>
                        </p>
                        <p className='flex items-center gap-2 text-green-400'>
                            <span><CurrencyDollarIcon className='h-5 w-5'/></span>
                            <span>Budget</span>
                        </p>
                    </div>
                </div>
                <div className='mt-10 flex gap-10 flex-wrap justify-center'>
                    <div className='border-r-2 border-gray-200 m-4 pr-10'>
                        <div className='mt-8'>
                            <p>
                                <span className='text-3xl font-semibold'>{numBugs}</span>
                                <span className='p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs'>+1</span>
                            </p>
                            <p className='text-gray-500 mt-1'>Total number of bugs</p>
                        </div>
                        <div className='mt-5'>
                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BugInfo