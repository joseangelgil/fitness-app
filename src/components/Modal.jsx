import { Box } from '@mui/material'
import TarjetaNuevaComida from './TarjetaNuevaComida'
import TarjetaModificarComida from './TarjetaModificarComida'
import TarjetaNuevoIngrediente from './TarjetaNuevoIngrediente'
import TarjetaModificarIngrediente from './TarjetaModificarIngrediente'
import { useGlobalContext } from '../utils/context'

const Modal = () => {

  const { comidaOIngrediente, modal } = useGlobalContext()

  return (
    <Box sx={{
        position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
        }} 
        display= {modal}>
          {comidaOIngrediente === 'nuevaComida' && <TarjetaNuevaComida />}
          {comidaOIngrediente === 'modificarComida' && <TarjetaModificarComida />}
          {comidaOIngrediente === 'nuevoIngrediente' && <TarjetaNuevoIngrediente />}
          {comidaOIngrediente === 'modificarIngrediente' && <TarjetaModificarIngrediente />}
        </Box>
  )
}

export default Modal