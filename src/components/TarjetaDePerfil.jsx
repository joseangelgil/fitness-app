import { Box, Stack, Typography, Button, Snackbar } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import { useState, useEffect } from 'react'

const TarjetaDePerfil = () => {

  const { perfilActivo, cantidadObjetivo, setCantidadObjetivo, activeColor, setActiveColor, esNuevoPerfil, setEsNuevoPerfil, perfiles, setPerfiles, setPerfilActivo } = useGlobalContext()

  const [ datosDePerfil, setDatosDePerfil ] = useState(JSON.parse(localStorage.getItem(`${perfilActivo}-datos`)) || {nombre: '', peso: '', altura: '', edad: '', sexo: '', actividad: '', proteinas: '', grasas: ''})
  const [errores, setErrores] = useState({nombre: '', peso: '', altura: '', edad: '', sexo: '', actividad: '', proteinas: '', grasas: ''})
  const [datosValidos, setDatosValidos] = useState(true)
  const [openSnackbar, setOpenSnackbar] = useState(true)
  const [snackbarMessage, setSnackbarMessage] = useState('Hay campos vacíos o con errores')


  // Modificar datos de perfil y controlar errores en campo
  const modificarCampo = (e, campo, min, max) => {
    if(e.target.value < min || e.target.value > max) {
      setErrores(prevErrores => ({...prevErrores, [campo]: `Debe estar entre ${min} y ${max}`}))
    } else {
      setErrores(prevErrores => ({...prevErrores, [campo]: ''}))
    }    
    setDatosDePerfil(prevDatos => ({...prevDatos, [campo]: e.target.value}))
  }

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
      (!esNuevoPerfil || (esNuevoPerfil && datosDePerfil.nombre !== '' && !perfiles.includes(datosDePerfil.nombre))) &&
      (peso > 0 && peso <= 250) && 
      (altura > 0 && altura <= 250) && 
      (edad > 0 && edad <= 120) && 
      sexo != 0 && 
      actividad != 0 && 
      (proteinas >= 0 && proteinas <= 3) &&
      (grasas >= 0 && grasas <= 3)
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
      setSnackbarMessage('Hay campos vacíos o con errores')
      setDatosValidos(false)
      setTimeout(() => setOpenSnackbar(true), 100)
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
        setActiveColor({name: 'primary', oscuro: '#1976D2', claro: '#ADD8E6'})
        break
      case 'error':
        setActiveColor({name: 'error', oscuro: '#D32F2F', claro: '#FFB6C1'})
        break
      case 'success':
        setActiveColor({name: 'success', oscuro: '#2E7D32', claro: '#A8E6A3'})
        break
      case 'warning':
        setActiveColor({name: 'warning', oscuro: '#ED6C02', claro: '#FFE7A3'})
        break
      case 'secondary':
        setActiveColor({name: 'secondary', oscuro: '#9C27B0', claro: '#D9C7FF'})
        break
      default:
        setActiveColor({name: 'primary', oscuro: '#1976D2', claro: '#ADD8E6'})
        break
    }
  }

  // Guardar datos de perfil en perfilActivo cuando estos cambien
  useEffect(() => {
    if(perfilActivo) {
      localStorage.setItem(`${perfilActivo}-datos`, JSON.stringify(datosDePerfil))
    }
  }, [datosDePerfil])

  // Devolver los datos de perfil cuando perfilActivo cambie
  useEffect(() => {
    if(perfilActivo) {
      setDatosDePerfil(JSON.parse(localStorage.getItem(`${perfilActivo}-datos`)))
    } else {
      setDatosDePerfil({nombre: '', peso: '', altura: '', edad: '', sexo: '', actividad: '', proteinas: '', grasas: ''})
    }
  }, [perfilActivo])

  // Guardar datos de cantidad objetivo cada vez que estas varien
  useEffect(() => {
    if(perfilActivo) localStorage.setItem(`${perfilActivo}-cantidad`, JSON.stringify({kcal: cantidadObjetivo.kcal, hc: cantidadObjetivo.hc, p: cantidadObjetivo.p, g: cantidadObjetivo.g}))
  }, [cantidadObjetivo])

  const guardarEliminarPerfil = () => {
    setDatosValidos(true)
    if(esNuevoPerfil) {      
      if(datosDePerfil.nombre === '' || perfiles.includes(datosDePerfil.nombre)) {
        setSnackbarMessage('El nombre de perfil elegido esta vacio o ya existe')
        setDatosValidos(false)
        setTimeout(() => setOpenSnackbar(true), 100)
        return
      } else{        
        setPerfiles(prevPerfiles => {
          const nuevosPerfiles = [...prevPerfiles, datosDePerfil.nombre]          
          localStorage.setItem('perfiles', JSON.stringify(nuevosPerfiles))
          return nuevosPerfiles
        })      
        localStorage.setItem(`${datosDePerfil.nombre}-datos`, JSON.stringify(datosDePerfil))
        localStorage.setItem(`${datosDePerfil.nombre}-color`, JSON.stringify(activeColor))
        localStorage.setItem(`${datosDePerfil.nombre}-menu`, JSON.stringify({'Lunes': [], 'Martes': [], 'Miercoles': [], 'Jueves': [], 'Viernes': [], 'Sabado': [], 'Domingo': []}))
        localStorage.setItem(`${datosDePerfil.nombre}-cantidad`, JSON.stringify({kcal: cantidadObjetivo.kcal, hc: cantidadObjetivo.hc, p: cantidadObjetivo.p, g: cantidadObjetivo.g}))
        setEsNuevoPerfil(false)
        setPerfilActivo(datosDePerfil.nombre)
      }
    } else {
      localStorage.removeItem(`${datosDePerfil.nombre}-datos`);
      localStorage.removeItem(`${datosDePerfil.nombre}-color`);
      localStorage.removeItem(`${datosDePerfil.nombre}-menu`);      
      localStorage.removeItem(`${datosDePerfil.nombre}-cantidad`); 
      setPerfiles(() => {
          const nuevosPerfiles = perfiles.filter(perfil => perfil !== datosDePerfil.nombre)          
          localStorage.setItem('perfiles', JSON.stringify(nuevosPerfiles))
          return nuevosPerfiles
      })  
      setEsNuevoPerfil(true)
      setPerfilActivo('')
    }
  }  

  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
  }

  const unirNombreConEspacios = (nombre) => {
    return (nombre.replace(/\s/g, '\u00A0'))
  }

  return (
    <Stack justifyContent='space-around' sx={{
      backgroundColor: `${activeColor.claro}`,
      width: '1200px',
      minHeight: '800px',
      maxWidth: '95vw',
      margin: '0 auto',
      borderRadius: '20px',
      padding: '30px 30px',
      pt: {xs: '100px', sm: '60px'},
      position: 'relative',
      border: `3px solid ${activeColor.oscuro}`
    }}>
      <Typography variant='h5' sx={{position: 'absolute', top: '20px', left: '30px'}}>Información de Perfil - {unirNombreConEspacios(datosDePerfil.nombre)}</Typography>
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
          {!esNuevoPerfil ? <Typography variant='p' sx={{fontSize: '1.4rem', textAlign: 'center'}}>{datosDePerfil.nombre}</Typography> : <input className={perfiles.includes(datosDePerfil.nombre) ? 'casilla-info campo-error' : 'casilla-info'} id='info-nombre' type="text" maxlength="15" value={datosDePerfil.nombre} onChange={(e) => setDatosDePerfil(prevDatos => ({...prevDatos, nombre: e.target.value}))}/>}  
          {(esNuevoPerfil && perfiles.includes(datosDePerfil.nombre)) && <Typography variant='caption' color='error'>El perfil ya existe</Typography>}        
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-peso">Peso en Kg</label>
          <input className={errores.peso ? 'casilla-info campo-error' : 'casilla-info'} id='info-peso' type="number" min='0' max='250' value={datosDePerfil.peso} onChange={(e) => modificarCampo(e, 'peso', 1, 250)}/>
          {errores.peso && <Typography variant='caption' color='error'>{errores.peso}</Typography>}
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-altura">Altura en cm</label>
          <input className={errores.altura ? 'casilla-info campo-error' : 'casilla-info'} id='info-altura' type="number" min='0' max='250' value={datosDePerfil.altura} onChange={(e) => modificarCampo(e, 'altura', 1, 250)}/>
          {errores.altura && <Typography variant='caption' color='error'>{errores.altura}</Typography>}
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-edad">Edad</label>
          <input className={errores.edad ? 'casilla-info campo-error' : 'casilla-info'} id='info-edad' type="number" min='0' max='120' value={datosDePerfil.edad} onChange={(e) => modificarCampo(e, 'edad', 1, 120)}/>
          {errores.edad && <Typography variant='caption' color='error'>{errores.edad}</Typography>}
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-sexo">Sexo</label>
          <select             
            className= 'casilla-info'
            name="selector-sexo" 
            id="info-sexo"
            value={datosDePerfil.sexo}
            onChange={(e) => setDatosDePerfil(prevDatos => ({...prevDatos, sexo: e.target.value}))}>
          <option value="none"></option>
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
          <option value="none"></option>
          <option value="poca">Poca o ninguna</option>
          <option value="ligera">Ligera (1-3 días a la semana)</option>
          <option value="moderada">Moderada (3-5 días a la semana)</option>
          <option value="intensa">Intensa (6-7 días a la semana)</option>
          <option value="muy-intensa">Muy intensa (2 veces al día)</option>
        </select>
      </Stack>
      <Stack direction='row' flexWrap='wrap' alignItems='center' sx={{justifyContent: {sm: 'space-between', xs:'center'}, gap: {xs: '20px', sm: 'auto' }}}>
        <Stack direction='row' flexWrap='wrap' sx={{padding: '20px 0', justifyContent: {sm: 'flex-start', xs:'center'}, gap: {xs: '20px', sm: 'auto' }}}>        
          <Stack gap='5px'>
              <label htmlFor="info-proteinas">Proteína por Kg</label>
              <input className={errores.proteinas ? 'casilla-info campo-error' : 'casilla-info'} id='info-proteinas' type="number" min='0' max='3' step='0.1' placeholder='g por Kg de peso' value={datosDePerfil.proteinas} onChange={(e) => modificarCampo(e, 'proteinas', 0, 3)}/>
              {errores.proteinas && <Typography variant='caption' color='error'>{errores.proteinas}</Typography>}
          </Stack>
          <Stack gap='5px'>
              <label htmlFor="info-grasas">Grasas por Kg</label>
              <input className={errores.grasas ? 'casilla-info campo-error' : 'casilla-info'} id='info-grasas' type="number" min='0' max='3' step='0.1' placeholder='g por Kg de peso' value={datosDePerfil.grasas} onChange={(e) => modificarCampo(e, 'grasas', 0, 3)}/>
              {errores.grasas && <Typography variant='caption' color='error'>{errores.grasas}</Typography>}
          </Stack>
        </Stack>
        <Button variant='text' color={esNuevoPerfil ? activeColor.name : 'error'} sx={{padding: '5px 10px', fontSize: '1.1rem', mb: {xs: '30px', sm: '0'}}} onClick={() => guardarEliminarPerfil()}>{esNuevoPerfil ? 'Guardar Perfil' : 'Eliminar Perfil'}</Button>
      </Stack>
      <Button variant='contained' color={activeColor.name} sx={{padding: '10px', width: '100%', fontSize: '1.1rem'}} onClick={() => calcularMacros()}>Calcular macronutrientes (Mifflin&nbsp;&&nbsp;St&nbsp;Jeor)</Button>
      <Stack direction='row' flexWrap='wrap' justifyContent='space-evenly' sx={{width: '100%', padding: '10px'}}>
        <Button variant='text' color='error' sx={{padding: '10px', fontSize: '1.1rem'}} onClick={() => añadirDeficit()}>Añadir Déficit -50Kcal</Button>
        <Button variant='text' color='success' sx={{padding: '10px', fontSize: '1.1rem'}} onClick={() => añadirSuperavit()}>Añadir Superávit +50Kcal</Button>
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
            <Typography variant='h5' textAlign='center' sx={{color: 'gray'}}>{Math.round(cantidadObjetivo.hc * 4 * 100 / cantidadObjetivo.kcal) || 0}%</Typography>
          </Stack>
          <Stack gap='5px'>
            <Typography variant='h5' textAlign='center'>Proteinas</Typography>       
            <Typography variant='h5' textAlign='center'>{cantidadObjetivo.p}g</Typography>        
            <Typography variant='h5' textAlign='center' sx={{color: 'gray'}}>{Math.round(cantidadObjetivo.p * 4 * 100 / cantidadObjetivo.kcal) || 0}%</Typography>
          </Stack>
          <Stack gap='5px'>
            <Typography variant='h5' textAlign='center'>Grasas</Typography>       
            <Typography variant='h5' textAlign='center'>{cantidadObjetivo.g}g</Typography>        
            <Typography variant='h5' textAlign='center' sx={{color: 'gray'}}>{Math.round(cantidadObjetivo.g * 9 * 100 / cantidadObjetivo.kcal) || 0}%</Typography>
          </Stack>
        </Stack>
      </Box>      
      {!datosValidos && <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openSnackbar} onClose={handleSnackbarClose} message={snackbarMessage} />}
    </Stack>
  )
}

export default TarjetaDePerfil