import { Stack, Typography, Button } from '@mui/material'
import { useGlobalContext } from '../utils/context'

const TarjetaModificarIngrediente = () => {

  const { menu, activeWeekDay, modificarIngrediente, setDisplay, cantidadNuevoIngrediente, setCantidadNuevoIngrediente, comidaSeleccionada, ingredienteSeleccionado, quitarIngrediente, data } = useGlobalContext()

  let macros = {}
  
  menu[activeWeekDay].forEach(item => {
    if(item.id === comidaSeleccionada) {
      item.ingredientes.forEach(ingrediente => {
        if(ingrediente.id === ingredienteSeleccionado) {
          macros = {
            kcal: data.find(item => item.name === ingrediente.name).kcal,
            hc: data.find(item => item.name === ingrediente.name).hc,
            p: data.find(item => item.name === ingrediente.name).p,
            g: data.find(item => item.name === ingrediente.name).g
          }
        }
      })
    }
  })

  const desplegarInfoIngrediente = () => {
    let nombre = ''
    let cantidad = ''
    menu[activeWeekDay].forEach(item => {
      if(item.id === comidaSeleccionada) {
        nombre = item.ingredientes.find(ingrediente => ingrediente.id === ingredienteSeleccionado).name
        cantidad = item.ingredientes.find(ingrediente => ingrediente.id === ingredienteSeleccionado).cantidad
        }
    })
    return {nombre, cantidad}
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
      <Typography variant='h5'>{desplegarInfoIngrediente().nombre}</Typography>
      <Typography variant='p'>Macronutrientes por 100g</Typography>
      <Typography variant='p'>{macros.kcal} Kcal</Typography>
      <Typography variant='p'>{macros.hc}g HC</Typography>
      <Typography variant='p'>{macros.p}g Proteinas</Typography>
      <Typography variant='p'>{macros.g}g Grasas</Typography>
      <input style={{width: '150px', padding: '20px 10px', fontSize: '1.1rem'}} type="number" min='0' placeholder='Cantidad en gramos' value={cantidadNuevoIngrediente} onChange={(e) => setCantidadNuevoIngrediente(e.target.value)} />
      <Stack direction='row' justifyContent='space-evenly' gap='50px'>
        <Button variant='outlined' color='error' sx={{padding: '10px 20px'}} onClick={() => {quitarIngrediente(comidaSeleccionada, ingredienteSeleccionado)}}>Eliminar</Button>
        <Button variant='outlined' sx={{padding: '10px 20px'}} onClick={(e) => {
          if(!cantidadNuevoIngrediente || cantidadNuevoIngrediente < 1) {
            alert('Por favor, introduce una cantidad para continuar.'); 
            return
          }  
          modificarIngrediente(comidaSeleccionada, ingredienteSeleccionado, cantidadNuevoIngrediente, macros.kcal, macros.hc, macros.p, macros.g); 
          setDisplay()
          }}>Modificar</Button>
      </Stack>
    </Stack>
  )
}

export default TarjetaModificarIngrediente