'use client'

import React from 'react'
import { Button } from '@mui/material'
import { addhabit } from '../Redux/habit-slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../Redux/store'


const AddHabitForm = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [Name, setName] = React.useState<string>('')
  const [frequency, setFrequency] = React.useState<'daily' | 'weekly' | 'monthly'>('daily')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Name.trim() === '') {
      alert('Please enter a habit name')
      return
    }

    dispatch(addhabit({ name: Name, frequency }))
    setName('')
    setFrequency('daily')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex-col gap-3 container mx-auto">
          <div>
            <input
              type="text"
              placeholder="Enter Habit Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 border-gray-300 border p-2"
            />
          </div>

          <div className="mt-10">
            <select
              className="h-10 border-gray-300 border p-2 w-full"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="flex justify-center items-center mt-10">
            <Button type="submit" variant="contained" color="secondary" fullWidth>
              Add Habit
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddHabitForm