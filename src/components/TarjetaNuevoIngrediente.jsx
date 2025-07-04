import { Stack, Typography, Button, Box } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import { useState, useEffect } from 'react'

const TarjetaNuevoIngrediente = () => {

  const { añadirIngrediente, setDisplay, cantidadNuevoIngrediente, setCantidadNuevoIngrediente, comidaSeleccionada, data } = useGlobalContext()
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [macros, setMacros] = useState({})

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
        {results.map(item => {
          return (
            <li key={item.id} style={{margin: '5px', listStyle: 'none'}} onClick={() => {setSearch(item.name); setShowDropdown(false)}}>{item.name}</li>
          )
        })}
      </ul>
    )
  }

  useEffect(() => {
    const searching = data.filter(item => item.name.startsWith(search))
    if(searching.length && searching[0].name !== search && search) {
      setResults(searching)
      setShowDropdown(true)
    }
    else {
      setResults([])
      setShowDropdown(false)
    }

    if(data.find(item => item.name === search.trim())) {
      setMacros(prevMacros => (
        {...prevMacros, 
          kcal: data.find(item => item.name === search.trim()).kcal,
          hc: data.find(item => item.name === search.trim()).hc,
          p: data.find(item => item.name === search.trim()).p,
          g: data.find(item => item.name === search.trim()).g, 
        }
      ))      
    }
  }, [search])  

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
      {data.find(item => item.name === search.trim()) ? data.map((item, index) => {
        if(item.name === search.trim()) {
          return (
            <Stack key={index} justifyContent= 'space-between' alignItems='center' height='40%'>
              <Typography variant='p'>Macronutrientes por 100g</Typography>
              <Typography variant='p'>{item.kcal} Kcal</Typography>
              <Typography variant='p'>{item.hc}g HC</Typography>
              <Typography variant='p'>{item.p}g Proteinas</Typography>
              <Typography variant='p'>{item.g}g Grasas</Typography>
            </Stack> 
          )
        }}) :
            <Stack justifyContent= 'space-between' alignItems='center' height='40%'>
              <Typography variant='p'>Macronutrientes por 100g</Typography>
              <Typography variant='p'>Kcal</Typography>
              <Typography variant='p'>HC</Typography>
              <Typography variant='p'>Proteinas</Typography>
              <Typography variant='p'>Grasas</Typography>
            </Stack>  
      }
      <input style={{width: '150px', padding: '20px 10px', fontSize: '1.1rem'}} type="number" min='0' placeholder='Cantidad en g' value={cantidadNuevoIngrediente} onChange={(e) => setCantidadNuevoIngrediente(e.target.value)} />
      <Stack direction='row' justifyContent='space-evenly' gap='50px'>
        <Button variant='outlined' color='error' sx={{padding: '10px 20px'}} onClick={() => {setDisplay()}}>Cancelar</Button>
        <Button variant='outlined' sx={{padding: '10px 20px'}} onClick={(e) => {
          if(!cantidadNuevoIngrediente || cantidadNuevoIngrediente < 1 || !macros.kcal) {
            alert('Por favor, selecciona un ingrediente e introduce una cantidad para continuar.'); 
            return
          }  
          añadirIngrediente(comidaSeleccionada, search, cantidadNuevoIngrediente, macros.kcal, macros.hc, macros.p, macros.g); 
          setSearch('')
          setDisplay()
          }}>Aceptar</Button>
      </Stack>
    </Stack>
  )
}

export default TarjetaNuevoIngrediente