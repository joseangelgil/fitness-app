import { Box, Stack, Typography, Button } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import { useState, useEffect } from 'react'

const TarjetaDePerfil = () => {

  const { perfilActivo, cantidadObjetivo, setCantidadObjetivo, activeColor, setActiveColor } = useGlobalContext()

  const [ datosDePerfil, setDatosDePerfil ] = useState({nombre: 'Juan', peso: 80, altura: 170, edad: 25, sexo: 'hombre', actividad: 'poca', proteinas: '1', grasas: '1'})

  const obtenerSexo = (sexo) => {
    switch(sexo) {
      case 'hombre':
        return 5
      case 'mujer':
        return -161
      default:
        return 0
    }
  }

  const obtenerActividad = (actividad) => {
    switch(actividad) {
      case 'poca':
        return 1.2
      case 'ligera':
        return 1.375
      case 'moderada':
        return 1.55
      case 'intensa':
        return 1.725
      case 'muy-intensa':
        return 1.9
      default:
        return 0
    }
  }

  const sonDatosValidos = (peso, altura, edad, sexo, actividad, proteinas, grasas) => {
    return (
      (peso > 0 && peso <= 200) && 
      (altura > 0 && altura <= 250) && 
      (edad > 0 && edad <= 100) && 
      sexo != 0 && 
      actividad != 0 && 
      (proteinas > 0 && proteinas <= 3) &&
      (grasas > 0 && grasas <= 3)
    )
  }

  const calcularMacros = () => {
    const peso = Number(datosDePerfil.peso)
    const altura = Number(datosDePerfil.altura)
    const edad = Number(datosDePerfil.edad)
    const sexo = obtenerSexo(datosDePerfil.sexo)
    const actividad = obtenerActividad(datosDePerfil.actividad)
    const proteinas = Number(datosDePerfil.proteinas)
    const grasas = Number(datosDePerfil.grasas)

    if(!sonDatosValidos(peso, altura, edad, sexo, actividad, proteinas, grasas)) {
      alert('Por favor, rellena todos los campos con datos válidos:\nPeso: 1 - 200\nAltura: min: 1 - 250\nEdad: 1 - 100\nSexo: Selecciona una opcion\nActividad: Selecciona una opcion\nProteinas: 0 - 3\nGrasas: 0 - 3')
      return
    }

    const TMB = (10 * peso) + (6.25 * altura) - (5 * edad) + sexo
    const caloriasDiarias = Math.ceil(TMB * actividad)

    const kcal = caloriasDiarias
    const p = Math.round(peso * proteinas)
    const g = Math.round(peso * grasas)
    const hc = Math.round((caloriasDiarias - (p * 4) - (g * 9))/4) // 4g HC = 1 Kcal, 4g Prot = 1 Kcal, 9g Grasas = 1 Kcal

    const macros = {kcal: kcal, hc: hc, p: p, g: g}
    setCantidadObjetivo(macros)
  }

  const añadirSuperavit = () => {    

    const nuevosHC = Math.round((cantidadObjetivo.kcal + 50 - (cantidadObjetivo.p * 4) - (cantidadObjetivo.g * 9))/4)

    setCantidadObjetivo(prevCantidad => (
      {...prevCantidad, 
        kcal: cantidadObjetivo.kcal + 50,
        hc: nuevosHC}
    ))
  }

  const añadirDeficit = () => {

    const nuevosHC = Math.round((cantidadObjetivo.kcal - 50 - (cantidadObjetivo.p * 4) - (cantidadObjetivo.g * 9))/4)

    setCantidadObjetivo(prevCantidad => (
      {...prevCantidad, 
        kcal: cantidadObjetivo.kcal - 50,
        hc: nuevosHC}
    ))
  }

  const cambiarColorDelTema = (color) => {
    switch(color) {
      case 'primary':
        setActiveColor({name: 'primary', oscuro: '#1976d2', claro: '#ADD8E6'})
        break
      case 'error':
        setActiveColor({name: 'error', oscuro: '#d32f2f', claro: '#FFB6C1'})
        break
      case 'success':
        setActiveColor({name: 'success', oscuro: '#2e7d32', claro: '#A8E6A3'})
        break
      case 'warning':
        setActiveColor({name: 'warning', oscuro: '#ed6c02', claro: '#FFE7A3'})
        break
      case 'secondary':
        setActiveColor({name: 'secondary', oscuro: '#9c27b0', claro: '#D9C7FF'})
        break
      default:
        setActiveColor({name: 'primary', oscuro: '#1976d2', claro: '#ADD8E6'})
        break
    }
  }

  return (
    <Stack justifyContent='space-around' sx={{
      backgroundColor: `${activeColor.claro}`,
      width: '1200px',
      minHeight: '800px',
      maxWidth: '95vw',
      margin: '0 auto',
      borderRadius: '20px',
      padding: '60px 30px 30px',
      position: 'relative',
      border: `3px solid ${activeColor.oscuro}`
    }}>
      <Typography variant='h5' sx={{position: 'absolute', top: '20px', left: '30px'}}>Información de Perfil - {perfilActivo}</Typography>
      <Stack direction='row' alignItems='center' gap='10px' flexWrap='wrap' sx={{justifyContent: {xs: 'center', sm: 'flex-end'}}}>
          <Typography variant='p' sx={{fontSize: '1.1rem'}}>Color del tema: </Typography>
          <Stack direction='row' gap='10px'>
            <Button variant='contained' sx={{width: '25px', minWidth: '25px', height: '30px', borderRadius: '8px'}} color='primary' onClick={(e) => cambiarColorDelTema('primary')}></Button>
            <Button variant='contained' sx={{width: '25px', minWidth: '25px', height: '30px', borderRadius: '8px'}} color='error' onClick={(e) => cambiarColorDelTema('error')}></Button>
            <Button variant='contained' sx={{width: '25px', minWidth: '25px', height: '30px', borderRadius: '8px'}} color='success' onClick={(e) => cambiarColorDelTema('success')}></Button>
            <Button variant='contained' sx={{width: '25px', minWidth: '25px', height: '30px', borderRadius: '8px'}} color='warning' onClick={(e) => cambiarColorDelTema('warning')}></Button>
            <Button variant='contained' sx={{width: '25px', minWidth: '25px', height: '30px', borderRadius: '8px'}} color='secondary' onClick={(e) => cambiarColorDelTema('secondary')}></Button>            
          </Stack>
        </Stack>
      <Stack direction='row' flexWrap='wrap' sx={{padding: '20px 0', justifyContent: {sm: 'space-between', xs:'center'}, gap: {xs: '20px', sm: 'auto' }}}>
        <Stack gap='5px'>
          <label htmlFor="info-nombre">Nombre de Perfil</label>
          <input className='casilla-info' id='info-nombre' type="text" value={datosDePerfil.nombre} onChange={(e) => setDatosDePerfil(prevDatos => ({...prevDatos, nombre: e.target.value}))}/>
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-peso">Peso en Kg</label>
          <input className='casilla-info' id='info-peso' type="number" min='0' value={datosDePerfil.peso} onChange={(e) => setDatosDePerfil(prevDatos => ({...prevDatos, peso: e.target.value}))}/>
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-altura">Altura en cm</label>
          <input className='casilla-info' id='info-altura' type="number" min='0' value={datosDePerfil.altura} onChange={(e) => setDatosDePerfil(prevDatos => ({...prevDatos, altura: e.target.value}))}/>
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-edad">Edad</label>
          <input className='casilla-info' id='info-edad' type="number" min='0' max='100' value={datosDePerfil.edad} onChange={(e) => setDatosDePerfil(prevDatos => ({...prevDatos, edad: e.target.value}))}/>
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-sexo">Sexo</label>
          <select 
            className='casilla-info' 
            name="selector-sexo" 
            id="info-sexo"
            value={datosDePerfil.sexo}
            onChange={(e) => setDatosDePerfil(prevDatos => ({...prevDatos, sexo: e.target.value}))}>
          <option value=""></option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
        </select>
        </Stack>
      </Stack>
      <Stack gap='5px'>
          <label htmlFor="info-actividad">Actividad Fisica</label>
          <select 
            style={{width: '100%', padding: '10px', fontSize: '1.1rem'}} 
            name="selector-actividad" 
            id="info-actividad" 
            value={datosDePerfil.actividad} 
            onChange={(e) => setDatosDePerfil(prevDatos => ({...prevDatos, actividad: e.target.value}))}>
          <option value=""></option>
          <option value="poca">Poca o ninguna</option>
          <option value="ligera">Ligera (1-3 días a la semana)</option>
          <option value="moderada">Moderada (3-5 días a la semana)</option>
          <option value="intensa">Intensa (6-7 días a la semana)</option>
          <option value="muy-intensa">Muy intensa (2 veces al día)</option>
        </select>
      </Stack>
      <Stack direction='row' flexWrap='wrap' sx={{padding: '20px 0', justifyContent: {sm: 'flex-start', xs:'center'}, gap: {xs: '20px', sm: 'auto' }}}>        
        <Stack gap='5px'>
            <label htmlFor="info-proteinas">Proteínas</label>
            <input className='casilla-info' id='info-proteinas' type="number" min='0' max='3' step='0.1' placeholder='g por Kg de peso' value={datosDePerfil.proteinas} onChange={(e) => setDatosDePerfil(prevDatos => ({...prevDatos, proteinas: e.target.value}))}/>
        </Stack>
        <Stack gap='5px'>
            <label htmlFor="info-grasas">Grasas</label>
            <input className='casilla-info' id='info-grasas' type="number" min='0' max='3' step='0.1' placeholder='g por Kg de peso' value={datosDePerfil.grasas} onChange={(e) => setDatosDePerfil(prevDatos => ({...prevDatos, grasas: e.target.value}))}/>
        </Stack>
      </Stack>
      <Button variant='contained' color={activeColor.name} sx={{padding: '10px', width: '100%', fontSize: '1.1rem'}} onClick={() => calcularMacros()}>Calcular macronutrientes (Mifflin&nbsp;&&nbsp;St&nbsp;Jeor)</Button>
      <Stack direction='row' flexWrap='wrap' justifyContent='space-evenly' sx={{width: '100%', padding: '10px'}}>
        <Button variant='text' color='error' sx={{padding: '5px', fontSize: '1.1rem'}} onClick={() => añadirDeficit()}>Añadir Déficit -50Kcal</Button>
        <Button variant='text' color='success' sx={{padding: '5px', fontSize: '1.1rem'}} onClick={() => añadirSuperavit()}>Añadir Superávit +50Kcal</Button>
      </Stack>
      <Box sx={{borderRadius: '20px', padding: '10px'}}>        
        <Typography variant='h5' textAlign='center'>OBJETIVO DE MACRONUTRIENTES DIARIO</Typography>
        <hr style={{width: '75%', maxWidth: '400px', margin: '0 auto', borderColor: 'rgba(0,0,0,0.5)'}}/>
        <Stack direction={{sm: 'row', xs: 'column'}} justifyContent='space-evenly' mt='20px' gap={{sm: 'auto', xs: '10px'}}>          
          <Stack gap='5px'>
            <Typography variant='h5' textAlign='center'>Kcal</Typography>       
            <Typography variant='h5' textAlign='center'>{cantidadObjetivo.kcal}</Typography>        
          </Stack>
          <Stack gap='5px'>
            <Typography variant='h5' textAlign='center'>Hidratos de Carbono</Typography>       
            <Typography variant='h5' textAlign='center'>{cantidadObjetivo.hc}g</Typography>        
            <Typography variant='h5' textAlign='center' sx={{color: 'gray'}}>{Math.round(cantidadObjetivo.hc * 4 * 100 / cantidadObjetivo.kcal)}%</Typography>
          </Stack>
          <Stack gap='5px'>
            <Typography variant='h5' textAlign='center'>Proteinas</Typography>       
            <Typography variant='h5' textAlign='center'>{cantidadObjetivo.p}g</Typography>        
            <Typography variant='h5' textAlign='center' sx={{color: 'gray'}}>{Math.round(cantidadObjetivo.p * 4 * 100 / cantidadObjetivo.kcal)}%</Typography>
          </Stack>
          <Stack gap='5px'>
            <Typography variant='h5' textAlign='center'>Grasas</Typography>       
            <Typography variant='h5' textAlign='center'>{cantidadObjetivo.g}g</Typography>        
            <Typography variant='h5' textAlign='center' sx={{color: 'gray'}}>{Math.round(cantidadObjetivo.g * 9 * 100 / cantidadObjetivo.kcal)}%</Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}

export default TarjetaDePerfil