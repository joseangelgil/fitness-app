import Navbar from '../components/Navbar'
import DietTable from '../components/DietTable'
import { Box, Stack, Button } from '@mui/material'
import { useState } from 'react'

const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

function Diet() {

  const [activeWeekDay, setActiveWeekDay] = useState('Lunes')
  const[comidas, setComidas] = useState([{name: 'Almuerzo', time: '10:00'}, {name: 'Comida', time: '14:00'}, {name: 'Cena', time: '21:00'}])
  const [modal, setModal] = useState('none')
  const [nombreNuevaComida, setNombreNuevaComida] = useState('')
  const [horaNuevaComida, setHoraNuevaComida] = useState('')


  const changeActiveButton = (weekDay) => {
    setActiveWeekDay(weekDay)
  }

  const chooseVariant = (weekDay) => {
    return activeWeekDay === weekDay ? 'contained' : 'outlined'
  }

  const setDisplay = () => {
    if(modal === 'none') setModal('block')
    else setModal('none')
    console.log(modal)
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
      <Box width='75%' margin='auto'>
        {weekDays.map((weekDay) => {
          return (
            <Button key={weekDay} value={weekDay} onClick={() => changeActiveButton(weekDay)} variant={chooseVariant(weekDay)} style={{ margin: '30px 5px 15px'}}>{weekDay}</Button>
          )
        })}
        <Button variant='text' style={{display: 'block'}} onClick={() => setDisplay()}>+ Añadir comida</Button>
        {comidas.map(comida => {
          return (
            <DietTable key={comida.name} name={comida.name} time={comida.time} eliminarComida={eliminarComida} />
          )
        })}
      </Box>
      <Box sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
        }} 
        display= {modal}>
          <Stack justifyContent= 'space-between' sx={{
            width: '360px',
            height: '420px',
            backgroundColor: 'white',
            margin: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '20px',
            padding: '25px',
            textAlign: 'center'
          }}>
            <h2>Añadir nueva comida</h2>
            <input className='nueva-comida' type="text" placeholder='Nombre de la comida' value={nombreNuevaComida} onChange={(e) => setNombreNuevaComida(e.target.value)} />
            <input className='nueva-comida' type="text" placeholder='Hora de la comida (Formato, 00:00)' value={horaNuevaComida} onChange={(e) => setHoraNuevaComida(e.target.value)} />
            <Stack direction='row' justifyContent='space-evenly'>
              <Button variant='outlined' color='error' sx={{padding: '10px 20px'}} onClick={() => {setDisplay()}}>Cerrar</Button>
              <Button variant='outlined' sx={{padding: '10px 20px'}} onClick={() => añadirComida()}>Aceptar</Button>
            </Stack>
          </Stack>
        </Box>
    </Box>
  )
}

export default Diet

