import Navbar from '../components/Navbar'
import DietTable from '../components/DietTable'
import { Box, Button } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import Modal from '../components/Modal'
import TotalTable from '../components/TotalTable'

const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

function Diet() {

  const { setDisplay, setComidaOIngrediente, menu, changeActiveButton, chooseVariant, activeWeekDay } = useGlobalContext()

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
        {menu[activeWeekDay].map(comida => {
            return (
              <DietTable key={comida.id} comidaId={comida.id} name={comida.name} time={comida.time} ingredientes={comida.ingredientes} macros={comida.macros}/>
            )
          }
        )}        
      <TotalTable />
      </Box>
      <Modal />
    </Box>
  )
}

export default Diet

