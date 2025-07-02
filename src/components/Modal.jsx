import { Box } from '@mui/material'
import TarjetaNuevaComida from './TarjetaNuevaComida'
import TarjetaNuevoIngrediente from './TarjetaNuevoIngrediente'
import { useGlobalContext } from '../utils/context'

const Modal = () => {

  const { comidaOIngrediente, modal } = useGlobalContext()

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
          {comidaOIngrediente === 'comida' && <TarjetaNuevaComida />}
          {comidaOIngrediente === 'ingrediente' && <TarjetaNuevoIngrediente />}
        </Box>
  )
}

export default Modal