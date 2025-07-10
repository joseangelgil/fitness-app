import { Stack, Typography, Button } from '@mui/material'
import { useGlobalContext } from '../utils/context'

const TarjetaModificarIngrediente = () => {

  const { menu, activeWeekDay, modificarIngrediente, setDisplay, cantidadNuevoIngrediente, setCantidadNuevoIngrediente, comidaSeleccionada, ingredienteSeleccionado, quitarIngrediente, data } = useGlobalContext()

  let macros = {}

  const ingredienteData = data.find(item => `${comidaSeleccionada}-${item.id}` === ingredienteSeleccionado)
  if (ingredienteData) {
    macros = {
      kcal: ingredienteData.kcal,
      hc: ingredienteData.hc,
      p: ingredienteData.p,
      g: ingredienteData.g
    }
  }

  const desplegarInfoIngrediente = () => {
    let nombre = ''
    menu[activeWeekDay].forEach(item => {
      if(item.id === comidaSeleccionada) {
        nombre = item.ingredientes.find(ingrediente => ingrediente.id === ingredienteSeleccionado)?.name || ''
        }
    })
    return nombre
  }

  return (
    <Stack justifyContent= 'space-between' alignItems='center' sx={{
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
      <Typography variant='h5'>{desplegarInfoIngrediente()}</Typography>
      <Typography variant='p'>Macronutrientes por 100g</Typography>
      <Typography variant='p'>{macros.kcal} Kcal</Typography>
      <Typography variant='p'>{macros.hc}g HC</Typography>
      <Typography variant='p'>{macros.p}g Proteinas</Typography>
      <Typography variant='p'>{macros.g}g Grasas</Typography>
      <input style={{width: '150px', padding: '20px 10px', fontSize: '1.1rem', textAlign: 'center'}} type="number" min='0' placeholder='Cantidad en g' value={cantidadNuevoIngrediente} onChange={(e) => setCantidadNuevoIngrediente(e.target.value)} />
      <Stack direction='row' justifyContent='space-evenly' gap='50px'>
        <Button variant='outlined' color='error' sx={{padding: '10px 20px'}} onClick={() => {quitarIngrediente(comidaSeleccionada, ingredienteSeleccionado)}}>Eliminar</Button>
        <Button variant='outlined' sx={{padding: '10px 20px'}} onClick={(e) => {
          if(!cantidadNuevoIngrediente || cantidadNuevoIngrediente < 1) {
            alert('Por favor, introduce una cantidad para continuar.'); 
            return
          }  
          modificarIngrediente(comidaSeleccionada, ingredienteSeleccionado, cantidadNuevoIngrediente, macros.kcal, macros.hc, macros.p, macros.g); 
          setDisplay();
          }}>Modificar</Button>
      </Stack>
    </Stack>
  )
}

export default TarjetaModificarIngrediente