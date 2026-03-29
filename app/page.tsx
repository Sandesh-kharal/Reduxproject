"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import { Typography } from '@mui/material'
import AddHabitForm from './components/add-habit-form'
import Habitlist from './components/habit-list'
const page = () => {
  return (
   <Provider store={store}>
    <div className='container mx-auto flex flex-col items-center justify-center'>
      <div className='container mx-auto text-center  mt-10'>
       <Typography className='font-bold! text-4xl! '> Habit Tracker</Typography>
   
      </div>
      <div className='mt-30 w-full  h-15'>
         <AddHabitForm />
         <Habitlist></Habitlist>
      </div>
     
    </div>
      
      
    </Provider>
  )
}

export default page
