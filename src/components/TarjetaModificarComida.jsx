import { Stack, Typography, Button } from '@mui/material'
import { useGlobalContext } from '../context'

const TarjetaModificarComida = () => {

  const { comidaSeleccionada, nombreNuevaComida, setNombreNuevaComida, horaNuevaComida, setHoraNuevaComida, eliminarComida, modificarComida } = useGlobalContext()

  return (
    <Stack justifyContent= 'space-between' sx={{
      width: '360px',
      height: '95%',
      maxHeight: '420px',
      backgroundColor: 'white',
      margin: 'auto',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px',
      padding: '25px',
      textAlign: 'center'
    }}>
      <Typography variant='h5'>Modificar comida</Typography>
      <input style={{padding: '20px 10px', fontSize: '1.1rem'}} type="text" placeholder='Nombre de la comida' value={nombreNuevaComida} onChange={(e) => setNombreNuevaComida(e.target.value)} />
      <input style={{padding: '20px 10px', fontSize: '1.1rem'}} type="text" placeholder='Hora de la comida (Formato, 00:00)' value={horaNuevaComida} onChange={(e) => setHoraNuevaComida(e.target.value)} />
      <Stack direction='row' justifyContent='space-evenly'>
        <Button variant='outlined' color='error' sx={{padding: '10px 20px'}} onClick={() => {eliminarComida(comidaSeleccionada)}}>Eliminar</Button>
        <Button variant='outlined' sx={{padding: '10px 20px'}} onClick={() => modificarComida(comidaSeleccionada, nombreNuevaComida, horaNuevaComida)}>Modificar</Button>
      </Stack>
    </Stack>
  )
}

export default TarjetaModificarComida