import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Dialog, Transition } from '@headlessui/react'
import { db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';


function Modal() {
    const { data: session } = useSession()
    const [ open, setOpen ] = useRecoilState(modalState)
    const [ loading, setLoading ] = useState(false)
    const [bug , setBug] = useState('')
    const [assignee , setAssignee] = useState('')
    const bugRef = useRef(null)
    const dueDateRef = useRef(null)
    const severityRef = useRef(null)
    const assigneeRef = useRef(null)
    const [ startDate, setStartDate ] = useState(new Date)
    const [ endDate, setEndDate ] = useState(new Date)

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const handleBugChange = (event) => {
        setBug(event.target.value);
        console.log('Hello')
      };
    
    const handleAssigneeChange = (event) => {
        setAssignee(event.target.value);
      };
   
    

    const uploadPost = async () => {
        if(loading) return

        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.name,
            profileImg: session.user.image,
            bug: bugRef.current.value,
            severity: severityRef.current.value,
            startDate: startDate.toDateString(),
            endDate: endDate.toDateString(),
            assignee: assigneeRef.current.value,
            timestamp: serverTimestamp()
        })
        
        //console.log('New doc added', docRef.id)
        setOpen(false)
        setLoading(false)
    }

    
    

  return (
    <Transition.Root show={open} as={Fragment} >
        <Dialog as='div' className='fixed z-50 inset-0 overflow-y-auto' onClose={setOpen}>

            <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen min-w-full pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <Transition.Child 
                as={Fragment} 
                enter='ease-out duration-300' 
                enterFrom='opacity-0' 
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                    <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'/>
                </Transition.Child>
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                    &#8203;
                </span>
                <Transition.Child 
                as={Fragment} 
                enter='ease-out duration-300' 
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' 
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                    <div className='inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
                        <div className='text-center'>
                        <h1 className='justify-between font-semibold dark:text-white'>Add New Bug</h1>
                        </div>
                        <div className='pt-4'>
                        <h1 className='pb-2 text-sm'>Bug Description</h1>
                        <textarea onChange={handleBugChange} ref={bugRef} type='text' className='bugForm' placeholder='Bug Description'/>
                        </div>
                        <div className='pt-4'>
                        <h1 className='pb-2 text-sm'>Severity</h1>
                        <select ref={severityRef} className='bugForm'>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        </div>
                        <div className='pt-4'>
                        <h1 className='pb-2 text-sm'>Assign To</h1>
                        <input onChange={handleAssigneeChange} ref={assigneeRef} type='text' className='bugForm' placeholder='Assign To'/>
                        </div>
                        <div className='pt-4'>
                        <h1 className='pb-2 text-sm'>Due Date</h1>
                        <div ref={dueDateRef} className='overflow-x-scroll'>
                                <DateRangePicker
                                ranges={[selectionRange]}
                                minDate={new Date()}
                                rangeColors={['#4745d2']}
                                onChange={handleSelect}
                                />  
                        </div>
                        </div>
                        <div className='pt-4 flex justify-end'>
                        <button onClick={uploadPost} disabled={!bug || !assignee} type='button' className='disabled:cursor-not-allowed disabled:ring-0 disabled:text-white disabled:bg-gray-300 flex justify-end bg-[rgb(72,69,210)] text-white rounded-md hover:bg-white hover:text-[rgb(72,69,210)] hover:ring-1 hover:ring-[rgb(72,69,210)] hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-150 ease-out active:scale-100 p-2'>{loading ? 'Submitting...' : 'Submit'}</button>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>  
    </Transition.Root>
  )
}

export default Modal
