import { Box, Stack, Button, Typography } from '@mui/material'

const Modal = ({ modal, añadirComida, setDisplay, nombreNuevaComida, setNombreNuevaComida, horaNuevaComida, setHoraNuevaComida}) => {
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
            <Typography variant='h5'>Añadir nueva comida</Typography>
            <input className='nueva-comida' type="text" placeholder='Nombre de la comida' value={nombreNuevaComida} onChange={(e) => setNombreNuevaComida(e.target.value)} />
            <input className='nueva-comida' type="text" placeholder='Hora de la comida (Formato, 00:00)' value={horaNuevaComida} onChange={(e) => setHoraNuevaComida(e.target.value)} />
            <Stack direction='row' justifyContent='space-evenly'>
              <Button variant='outlined' color='error' sx={{padding: '10px 20px'}} onClick={() => {setDisplay()}}>Cerrar</Button>
              <Button variant='outlined' sx={{padding: '10px 20px'}} onClick={() => añadirComida()}>Aceptar</Button>
            </Stack>
          </Stack>
        </Box>
  )
}

export default Modal