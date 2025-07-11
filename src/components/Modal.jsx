import { Box } from '@mui/material'
import TarjetaNuevaComida from './TarjetaNuevaComida'
import TarjetaModificarComida from './TarjetaModificarComida'
import TarjetaNuevoIngrediente from './TarjetaNuevoIngrediente'
import TarjetaModificarIngrediente from './TarjetaModificarIngrediente'
import TarjetaCrearIngrediente from './TarjetaCrearIngrediente'
import MenuBuscarIngrediente from './MenuBuscarIngrediente'
import { useGlobalContext } from '../context'

const Modal = () => {

  const { comidaOIngrediente, modal } = useGlobalContext()

  return (
    <Box sx={{
        position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)'
        }} 
        display= {modal}>
          {comidaOIngrediente === 'nuevaComida' && <TarjetaNuevaComida />}
          {comidaOIngrediente === 'modificarComida' && <TarjetaModificarComida />}
          {comidaOIngrediente === 'nuevoIngrediente' && <TarjetaNuevoIngrediente />}
          {comidaOIngrediente === 'modificarIngrediente' && <TarjetaModificarIngrediente />}
          {comidaOIngrediente === 'crearIngrediente' && <TarjetaCrearIngrediente />}
          {comidaOIngrediente === 'buscarIngrediente' && <MenuBuscarIngrediente />}
        </Box>
  )
}

export default Modal