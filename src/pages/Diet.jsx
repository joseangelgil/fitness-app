import Navbar from '../components/Navbar'
import DietTable from '../components/DietTable'
import { Button } from '@mui/material'
import { useState } from 'react'

const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

function Diet() {

  const [activeWeekDay, setActiveWeekDay] = useState('Lunes')
  const[comidas, setComidas] = useState([{name: 'Almuerzo', time: '10:00'}, {name: 'Comida', time: '14:00'}, {name: 'Cena', time: '21:00'}])

  const changeActiveButton = (weekDay) => {
    setActiveWeekDay(weekDay)
  }

  const chooseVariant = (weekDay) => {
    return activeWeekDay === weekDay ? 'contained' : 'outlined'
  }

  return(
    <div style={{padding: '10px'}}>
      <Navbar />
      {weekDays.map((weekDay) => {
        return (
          <Button key={weekDay} value={weekDay} onClick={() => changeActiveButton(weekDay)} variant={chooseVariant(weekDay)} style={{ margin: '30px 5px 15px'}}>{weekDay}</Button>
        )
      })}
      {comidas.map(comida => {
        return (
          <DietTable key={comida.name} name={comida.name} time={comida.time} />
        )
      })}
    </div>
  )
}

export default Diet

