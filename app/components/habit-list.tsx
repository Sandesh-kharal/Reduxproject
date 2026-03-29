import React, { use } from 'react'
import { AppDispatch, RootState } from '../Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { capitalize, Typography } from '@mui/material'
import { Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { Habit, toggleHabit } from '../Redux/habit-slice'
import { removehabit } from '../Redux/habit-slice'
import LinearProgress from '@mui/material/LinearProgress'


const HabitList: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { habits } = useSelector((state: RootState) => state.habits)
  const today = new Date().toISOString().split('T')[0]

  const getstreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];

      if (habit.completedDate.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  return (
    <div className='flex flex-col gap-2 mt-14  rounded-2xl   '>
      {habits.map((habit) => (
        <>
          <div key={habit.id} className='p-5 border rounded-md bg-gray-100 shadow-md h-35 flex   items-center justify-between w-full '>

            <div >
              <h3 className='text-lg font-semibold first-letter:uppercase'>{habit.name}</h3>
              <Typography className='first-letter:uppercase!' variant="body2" color="textSecondary">
                {habit.frequency}
              </Typography>
              <Typography variant="body2" color="Secondary">
                Streak: {getstreak(habit)} {getstreak(habit) === 1 ? 'day' : 'days'}
              </Typography>
              < LinearProgress 
                variant="determinate"
                value={(getstreak(habit) / 30) * 100}
                sx={{ width:'100%', mt: 1, height: 10, borderRadius: 5}}
               />

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
                  onClick={() => dispatch(removehabit({ id: habit.id }))}>
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
