import { Stack, Typography, Button, Box } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import { useState } from 'react'

const TarjetaNuevoIngrediente = () => {

  const { añadirIngrediente, setDisplay, cantidadNuevoIngrediente, setCantidadNuevoIngrediente, comidaSeleccionada, data } = useGlobalContext()
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const renderDropdown = () => {
    return (
      <ul style={{
        display: showDropdown ? 'flex' : 'none', 
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        flexWrap: 'nowrap',
        position: 'absolute', 
        top: '55px', 
        left: '0', 
        zIndex: 3, 
        backgroundColor: 'white', 
        border: '0.1px solid #444',
        borderRadius: '5px',
        width: '242px',
        maxHeight: '150px',
        overflowY: 'auto',
        margin: 0
      }}>
        {data.map(item => {
          return (
            <li style={{margin: '5px', listStyle: 'none'}} onClick={() => {setSearch(item.name)}}>{item.name}</li>
          )
        })}
      </ul>
    )
  }

  const macros = {
    kcal: 700,
    hc: 41,
    p: 12,
    g: 8
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
      <Box width='242px' position='relative' margin='0 auto'>
        <input style={{padding: '20px 10px', fontSize: '1.1rem', height:'55px'}} type="text" min='0' placeholder='Buscar ingrediente' value={search} onChange={(e) => setSearch(e.target.value)}/>
        {renderDropdown()}
      </Box>
      <Typography variant='p'>Macronutrientes por 100g</Typography>
      <Typography variant='p'>{macros.kcal} Kcal</Typography>
      <Typography variant='p'>{macros.hc}g HC</Typography>
      <Typography variant='p'>{macros.p}g Proteinas</Typography>
      <Typography variant='p'>{macros.g}g Grasas</Typography>
      <input style={{width: '150px', padding: '20px 10px', fontSize: '1.1rem'}} type="number" min='0' placeholder='Cantidad en gramos' value={cantidadNuevoIngrediente} onChange={(e) => setCantidadNuevoIngrediente(e.target.value)} />
      <Stack direction='row' justifyContent='space-evenly' gap='50px'>
        <Button variant='outlined' color='error' sx={{padding: '10px 20px'}} onClick={() => {setDisplay()}}>Cancelar</Button>
        <Button variant='outlined' sx={{padding: '10px 20px'}} onClick={(e) => {
          if(!cantidadNuevoIngrediente || cantidadNuevoIngrediente < 1) {
            alert('Por favor, introduce una cantidad para continuar.'); 
            return
          }  
          añadirIngrediente(comidaSeleccionada, 'Nuevo Ingrediente', cantidadNuevoIngrediente, macros.kcal, macros.hc, macros.p, macros.g); 
          setDisplay()
          }}>Aceptar</Button>
      </Stack>
    </Stack>
  )
}

export default TarjetaNuevoIngrediente