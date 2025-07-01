import { Box, Stack, Button, Typography } from '@mui/material'
import TarjetaNuevaComida from './TarjetaNuevaComida'
import TarjetaNuevoIngrediente from './TarjetaNuevoIngrediente'

const Modal = ({ modal, añadirComida, setDisplay, nombreNuevaComida, setNombreNuevaComida, horaNuevaComida, setHoraNuevaComida, comidaOIngrediente, cantidadNuevoIngrediente, setCantidadNuevoIngrediente}) => {
  return (
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
          {comidaOIngrediente === 'comida' && <TarjetaNuevaComida añadirComida={añadirComida} setDisplay={setDisplay} nombreNuevaComida={nombreNuevaComida} setNombreNuevaComida={setNombreNuevaComida} horaNuevaComida={horaNuevaComida} setHoraNuevaComida={setHoraNuevaComida}/>}
          {comidaOIngrediente === 'ingrediente' && <TarjetaNuevoIngrediente añadirComida={añadirComida} setDisplay={setDisplay} cantidadNuevoIngrediente={cantidadNuevoIngrediente} setCantidadNuevoIngrediente={setCantidadNuevoIngrediente}/>}
        </Box>
  )
}

export default Modal