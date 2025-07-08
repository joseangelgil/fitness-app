import { Stack, Typography, Button } from '@mui/material'
import { useGlobalContext } from '../utils/context'

const TarjetaNuevoIngrediente = ({ macros }) => {

  const { añadirIngrediente, setDisplay, cantidadNuevoIngrediente, setCantidadNuevoIngrediente, comidaSeleccionada, ingredienteSeleccionado, setIngredienteSeleccionado, data, setMostrarMenuIngredientes } = useGlobalContext()
  
  data.forEach(ingrediente => {
    if(ingrediente.id === ingredienteSeleccionado) {
      macros = {
        kcal: data.find(item => item.name === ingrediente.name).kcal,
        hc: data.find(item => item.name === ingrediente.name).hc,
        p: data.find(item => item.name === ingrediente.name).p,
        g: data.find(item => item.name === ingrediente.name).g
      }
    }
  })

  const desplegarInfoIngrediente = () => {
    let nombre = ''
    data.forEach(item => {
      if(item.id === ingredienteSeleccionado) {
        nombre = item.name
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
      top: '50vh',
      left: '50vw',
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
      <input style={{width: '150px', padding: '20px 10px', fontSize: '1.1rem'}} type="number" min='0' placeholder='Cantidad en gramos' value={cantidadNuevoIngrediente} onChange={(e) => setCantidadNuevoIngrediente(e.target.value)} />
      <Stack direction='row' justifyContent='space-evenly' gap='50px'>
        <Button variant='outlined' color='error' sx={{padding: '10px 20px'}} onClick={() => {setDisplay(); setCantidadNuevoIngrediente('');}}>Cancelar</Button>
        <Button variant='outlined' sx={{padding: '10px 20px'}} onClick={() => {
          if(!cantidadNuevoIngrediente || cantidadNuevoIngrediente < 1) {
            alert('Por favor, introduce una cantidad para continuar.'); 
            return
          }  
          añadirIngrediente(comidaSeleccionada, desplegarInfoIngrediente(), cantidadNuevoIngrediente, macros.kcal, macros.hc, macros.p, macros.g); 
          setDisplay();
          }}>Aceptar</Button>
      </Stack>
    </Stack>
  )
}

export default TarjetaNuevoIngrediente