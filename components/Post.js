import { Menu, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import React, { Fragment, useEffect, useState } from 'react'
import PostHeader from './PostHeader'
import {menuState} from '../atoms/bugDropAtom'
import { useRecoilState } from 'recoil'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import moment from 'moment'
import Posts from './Posts'
import { LockClosedIcon, LockOpenIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { doc, deleteDoc, firestore, collection, updateDoc } from "firebase/firestore";
import { async } from '@firebase/util'
import { db } from '../firebase'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Post({ bug, reporter, date, status, assignee, severity, id }) {
  const {data: session} = useSession()
  const [state, setState] = useState(false)

  const statusColor = () => {
    setState(!state)
  }
  
  const closeStatus = async () => {
    await updateDoc(doc(db, 'posts', id), {
      status: 'Closed'
    })  
  }

  const openStatus = async () => {
    await updateDoc(doc(db, 'posts', id), {
      status: 'Open'
    })  
  }


  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    
  }


  return (
    <div className='container mx-auto sm:px-8 w-full overflow-visible z-10'>
      <div class="-mx-4 sm:-mx-8 px-4 group/item sm:px-8  overflow-visible z-10 ">
      <div
        class="inline-block min-w-full shadow-md overflow-visible z-10"
      >
      <table className='min-w-full leading-normal overflow-visible z-10'>
    <tbody className='overflow-visible z-10'>
            <tr className='cursor-pointer duration-300 ml-3 overflow-visible z-10 '>
              <td class="px-5 py-5 border-b border-gray-200 group/edit group-hover/item:dark:bg-slate-700 dark:border-slate-700 bg-white dark:bg-slate-800 w-52 text-sm">
                <p class="text-gray-900 dark:text-white whitespace-no-wrap overflow-y-scroll">{bug}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 group/edit group-hover/item:dark:bg-slate-700 dark:border-slate-700 overflow-y-scroll bg-white dark:bg-slate-800 w-10 sm:w-44 text-sm">
                <div class="flex">
                  <div class="flex-shrink-0 w-10 h-10 overflow-y-scroll">
                    <img
                      class="w-full h-full rounded-full"
                      src={session.user.image}
                      alt=""
                    />
                  </div>
                  <div class="flex items-center ml-3">
                    <p class="text-gray-900 dark:text-white whitespace-no-wrap">
                      {reporter}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 group/edit group-hover/item:dark:bg-slate-700 dark:border-slate-700 bg-white dark:bg-slate-800 w-36 text-sm">
                <p class="text-gray-900 dark:text-white whitespace-no-wrap">{date && moment(date.toDate()).format("MMM Do YY")}</p>
                <p class="text-gray-600 dark:text-slate-200 whitespace-no-wrap">Due in 3 days</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 group/edit group-hover/item:dark:bg-slate-700 dark:border-slate-700 bg-white dark:bg-slate-800 sm:w-32 md:w-32 text-sm">
                <span
                  class={"relative inline-block px-3 py-1 font-semibold text-green-900 dark:text-green-300 leading-tight" + (status === 'Closed' ? 'relative inline-block px-3 py-1 font-semibold text-red-900 dark:text-red-900 leading-tight' : '')}
                >
                  <span
                    aria-hidden
                    class={"absolute inset-0 bg-green-200 opacity-50 rounded-full" + (status === 'Closed' ? 'absolute inset-0 bg-red-200 opacity-50 rounded-full' : '')}
                  ></span>
                  <span class="relative">{status}</span>
                </span>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 overflow-visible z-10 group/edit group-hover/item:dark:bg-slate-700 dark:border-slate-700 bg-white dark:bg-slate-800 sm:w-32 text-sm">
                <p class="text-gray-900 dark:text-white whitespace-no-wrap">{assignee}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 overflow-visible z-10 group/edit group-hover/item:dark:bg-slate-700 dark:border-slate-700 bg-white dark:bg-slate-800 sm:w-28 text-sm">
                <p class="text-gray-900 dark:text-white whitespace-no-wrap">{severity}</p>
              </td>
              
              <td
                class="px-5 py-5 border-b border-gray-200 group/edit group-hover/item:dark:bg-slate-700 dark:border-slate-700 items-center bg-white dark:bg-slate-800 text-sm text-right"
              >
                <Menu as="div" className="relative inline-block text-left">
                  <div> 
                  <Menu.Button
                  type="button"
                  class="inline-block text-gray-500 dark:hover:text-gray-300 hover:text-gray-700"
                  >
                  <svg
                    class="inline-block h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                    />
                  </svg>
                  </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-[rgb(72,69,210)] rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black dark:ring-[rgb(72,69,210)] ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-violet-500 text-white' : 'dark:text-white text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <EditActiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <EditInactiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                            <button onClick={closeStatus} className='flex w-full items-center rounded-md group px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-gray-900 dark:text-white' >
                              <LockClosedIcon className='h-5 w-5 mr-2 text-violet-500 group-hover:text-white ' />
                              
                              Close
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button onClick={openStatus}  className='flex w-full items-center rounded-md group px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-gray-900 dark:text-white' >
                              <LockOpenIcon className='h-5 w-5 mr-2 text-violet-500 group-hover:text-white' />
                              
                              Open
                            </button>
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-violet-500 text-white' : 'text-gray-900 dark:text-white'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <ArchiveActiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ArchiveInactiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              Archive
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-violet-500 text-white' : 'text-gray-900 dark:text-white'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <MoveActiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <MoveInactiveIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              Move
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                            onClick={() => handleDelete(id)}
                              className={`${
                                active ? 'bg-violet-500 text-white' : 'text-gray-900 dark:text-white'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <DeleteActiveIcon
                                  className="mr-2 h-5 w-5 text-violet-400"
                                  aria-hidden="true"
                                />
                              ) : (
                                <DeleteInactiveIcon
                                  className="mr-2 h-5 w-5 text-violet-400"
                                  aria-hidden="true"
                                />
                              )}
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </td>  
            </tr>
            <tr>  
            </tr> 
          </tbody>
          </table>
          </div>
          </div>
          </div>
  )
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  )
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  )
}



function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function ArchiveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  )
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  )
}



export default Post
