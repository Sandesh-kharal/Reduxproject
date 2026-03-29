import React, { use } from 'react'
import { AppDispatch, RootState } from '../Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { toggleHabit } from '../Redux/habit-slice'
import { removehabit } from '../Redux/habit-slice'


const HabitList: React.FC = () => {

const dispatch = useDispatch<AppDispatch>()
  const { habits } = useSelector((state: RootState) => state.habits)
  const today = new Date().toISOString().split('T')[0]
  



  return (
    <div className='flex flex-col gap-2 mt-14  rounded-2xl  '>
      {habits.map((habit) => (
        <>
          <div key={habit.id} className='p-5 border rounded-md bg-gray-100 shadow-md h-35 flex   items-center justify-between '>

            <div>
                <h3 className='text-lg font-semibold'>{habit.name}</h3>
            <Typography variant="body2" color="textSecondary text-transform:capitalize">
              {habit.frequency}
            </Typography>
            </div>


            <div className='flex gap-2 mr-10'>

            <div>
              <Button
                variant='outlined'
                color={
                  habit.completedDate.includes(today) ? 'success' : 'primary'
                }
                startIcon={<CheckCircleIcon />}
                onClick={() => dispatch(toggleHabit({ id: habit.id, date: today }))}
              >
                {habit.completedDate.includes(today) ? 'Completed' : 'Mark Complete'}
              
              </Button>
            </div>

            <div>
              <Button
                variant='outlined'
                color='error'
                startIcon={<DeleteIcon />}
                onClick={() => dispatch(removehabit({ id: habit.id, date: today }))}>
{habit.completedDate.includes(today) ? 'Delete' : 'Delete'}

                </Button>
            </div>
            </div>
          


          </div>



        </>

      ))}
    </div>
  )
}

export default HabitList
