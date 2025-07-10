import { Stack, Typography, Button } from '@mui/material'
import { useGlobalContext } from "../utils/context"
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'

const TarjetaCrearIngrediente = () => {

  const {setData, setDisplay, perfilActivo } = useGlobalContext()

  const [nuevoIngrediente, setNuevoIngrediente] = useState({id: uuidv4(), author: `${perfilActivo}`, url: '', name: '', kcal: '', hc: '', p: '', g: ''})

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
      fontSize: '1.1rem'
    }}>
      <Typography variant='h5'>Nuevo Ingrediente</Typography>
      <label>Nombre: <input type='text' style={{padding: '5px', width: '200px', fontSize: '1.1rem'}} value={nuevoIngrediente.name} onChange={(e) => setNuevoIngrediente(prevNuevoIng => ({...prevNuevoIng, name: e.target.value}))}/></label>
      <Typography variant='p'>Macronutrientes por 100g</Typography>
      <label>Kcal: <input type='number' min='0' className='crearIngredienteInput' value={nuevoIngrediente.kcal} onChange={(e) => setNuevoIngrediente(prevNuevoIng => ({...prevNuevoIng, kcal: e.target.value}))}/></label>
      <label>HC: <input type='number' min='0' className='crearIngredienteInput' value={nuevoIngrediente.hc} onChange={(e) => setNuevoIngrediente(prevNuevoIng => ({...prevNuevoIng, hc: e.target.value}))}/></label>
      <label>Proteinas: <input type='number' min='0' className='crearIngredienteInput' value={nuevoIngrediente.p} onChange={(e) => setNuevoIngrediente(prevNuevoIng => ({...prevNuevoIng, p: e.target.value}))}/></label>
      <label>Grasas: <input type='number' min='0' className='crearIngredienteInput' value={nuevoIngrediente.g} onChange={(e) => setNuevoIngrediente(prevNuevoIng => ({...prevNuevoIng, g: e.target.value}))}/></label>
      <Stack direction='row' justifyContent='space-evenly' gap='50px'>
        <Button variant='outlined' color='error' sx={{padding: '10px 20px'}} onClick={() => setDisplay()}>Cancelar</Button>
        <Button variant='outlined' sx={{padding: '10px 20px'}} onClick={() => {setData(prevData => ([...prevData, nuevoIngrediente])); setDisplay();}}>Crear</Button>
      </Stack>
    </Stack>
  )
}

export default TarjetaCrearIngrediente