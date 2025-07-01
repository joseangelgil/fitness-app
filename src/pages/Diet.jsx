import Navbar from '../components/Navbar'
import DietTable from '../components/DietTable'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import Modal from '../components/Modal'

const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

function Diet() {

  const [activeWeekDay, setActiveWeekDay] = useState('Lunes')
  const[comidas, setComidas] = useState([{name: 'Almuerzo', time: '10:00'}, {name: 'Comida', time: '14:00'}, {name: 'Cena', time: '21:00'}])
  const [modal, setModal] = useState('none')
  const [nombreNuevaComida, setNombreNuevaComida] = useState('')
  const [horaNuevaComida, setHoraNuevaComida] = useState('')
  const [comidaOIngrediente, setComidaOIngrediente] = useState('')
  const [cantidadNuevoIngrediente, setCantidadNuevoIngrediente] = useState('')


  const changeActiveButton = (weekDay) => {
    setActiveWeekDay(weekDay)
  }

  const chooseVariant = (weekDay) => {
    return activeWeekDay === weekDay ? 'contained' : 'outlined'
  }

  const setDisplay = () => {
    if(modal === 'none') setModal('block')
    else setModal('none')
    setNombreNuevaComida('')
    setHoraNuevaComida('')
  }

  const añadirComida = () => {
    const nuevaComida = {name: nombreNuevaComida, time: horaNuevaComida}
    const comidasActualizadas = [...comidas, nuevaComida]

    const comidasOrdenadas = comidasActualizadas.sort((a,b) => {
      if(a.time > b.time) return 1
      else if(a.time < b.time) return -1
      else return 0
    })

    setComidas(comidasOrdenadas)
    setDisplay()
  }  

  const eliminarComida = (name) => {
    const nuevasComidas = comidas.filter(comida => comida.name !== name )
    setComidas(nuevasComidas)
  }

  return(
    <Box style={{padding: '10px'}}>
      <Navbar />
      <Box sx={{
        width: '90%',
        maxWidth: '1400px',
        margin: 'auto'
      }}>
        {weekDays.map((weekDay) => {
          return (
            <Button key={weekDay} value={weekDay} onClick={() => changeActiveButton(weekDay)} variant={chooseVariant(weekDay)} sx={{ margin: '5px', fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}}>{weekDay}</Button>
          )
        })}
        <Button variant='text' sx={{display: 'block', mt: '15px', fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}} onClick={() => {setDisplay(); setComidaOIngrediente('comida')}}>+ Añadir comida</Button>
        {comidas.map(comida => {
          return (
            <DietTable key={comida.name} name={comida.name} time={comida.time} eliminarComida={eliminarComida} setDisplay={setDisplay} setComidaOIngrediente={setComidaOIngrediente}/>
          )
        })}
      </Box>
      <Modal modal={modal} añadirComida={añadirComida} setDisplay={setDisplay} nombreNuevaComida={nombreNuevaComida} horaNuevaComida={horaNuevaComida} setHoraNuevaComida={setHoraNuevaComida} setNombreNuevaComida={setNombreNuevaComida} comidaOIngrediente={comidaOIngrediente} cantidadNuevoIngrediente={cantidadNuevoIngrediente} setCantidadNuevoIngrediente={setCantidadNuevoIngrediente}/>
    </Box>
  )
}

export default Diet

