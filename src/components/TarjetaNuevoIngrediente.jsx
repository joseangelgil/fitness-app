import { Stack, Typography, Button } from '@mui/material'
import { useGlobalContext } from '../utils/context'

const TarjetaNuevoIngrediente = () => {

  const { añadirIngrediente, setDisplay, cantidadNuevoIngrediente, setCantidadNuevoIngrediente, activeFood } = useGlobalContext()

  const macros = {
    kcal: 700,
    hc: 41,
    prot: 12,
    gras: 8
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
      <Typography variant='h5'>Ingrediente</Typography>
      <Typography variant='p'>Macronutrientes por 100g</Typography>
      <Typography variant='p'>{macros.kcal} Kcal</Typography>
      <Typography variant='p'>{macros.hc}g HC</Typography>
      <Typography variant='p'>{macros.prot}g Proteinas</Typography>
      <Typography variant='p'>{macros.gras}g Grasas</Typography>
      <Typography variant='p'>{macros.kcal} Kcal</Typography>
      <Typography variant='p'>{macros.hc}g HC</Typography>
      <Typography variant='p'>{macros.prot}g Proteinas</Typography>
      <Typography variant='p'>{macros.gras}g Grasas</Typography>
      <input className='nueva-comida' style={{width: '150px'}} type="number" min='0' placeholder='Cantidad en gramos' value={cantidadNuevoIngrediente} onChange={(e) => setCantidadNuevoIngrediente(e.target.value)} />
      <Stack direction='row' justifyContent='space-evenly' gap='50px'>
        <Button variant='outlined' color='error' sx={{padding: '10px 20px'}} onClick={() => {setDisplay()}}>Cancelar</Button>
        <Button variant='outlined' sx={{padding: '10px 20px'}} onClick={(e) => {
          if(!cantidadNuevoIngrediente || cantidadNuevoIngrediente < 1) {
            alert('Por favor, introduce una cantidad para continuar.'); 
            return
          }  
          añadirIngrediente(activeFood, 'Nuevo Ingrediente', cantidadNuevoIngrediente, macros.kcal, macros.hc, macros.prot, macros.gras); 
          setDisplay()
          }}>Aceptar</Button>
      </Stack>
    </Stack>
  )
}

export default TarjetaNuevoIngrediente