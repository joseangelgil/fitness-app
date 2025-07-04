import { Box, Stack, Typography, Button } from '@mui/material'
import { useGlobalContext } from '../utils/context'

const TarjetaDePerfil = () => {

  const { perfilActivo } = useGlobalContext()

  return (
    <Stack justifyContent='space-around' sx={{
      backgroundColor:'lightblue',
      width: '850px',
      minHeight: '800px',
      maxWidth: '95vw',
      margin: '0 auto',
      borderRadius: '20px',
      padding: '60px 30px 30px',
      position: 'relative',
      boxShadow: '0 0 5px 3px rgba(0,0,0,0.3)'
    }}>
      <Typography variant='h5' sx={{position: 'absolute', top: '20px', left: '30px'}}>Información de Perfil - {perfilActivo}</Typography>
      <Stack direction='row' alignItems='center' gap='10px' flexWrap='wrap' sx={{justifyContent: {xs: 'center', sm: 'flex-end'}}}>
          <Typography variant='p' sx={{fontSize: '1.1rem'}}>Color del tema: </Typography>
          <Stack direction='row' gap='10px'>
            <Button variant='contained' sx={{width: '25px', minWidth: '25px', height: '30px', borderRadius: '50%'}} color='primary'></Button>
            <Button variant='contained' sx={{width: '25px', minWidth: '25px', height: '30px', borderRadius: '50%'}} color='error'></Button>
            <Button variant='contained' sx={{width: '25px', minWidth: '25px', height: '30px', borderRadius: '50%'}} color='success'></Button>
            <Button variant='contained' sx={{width: '25px', minWidth: '25px', height: '30px', borderRadius: '50%'}} color='warning'></Button>
            <Button variant='contained' sx={{width: '25px', minWidth: '25px', height: '30px', borderRadius: '50%'}} color='secondary'></Button>            
          </Stack>
        </Stack>
      <Stack direction='row' flexWrap='wrap' sx={{padding: '20px 0', justifyContent: {sm: 'space-between', xs:'center'}, gap: {xs: '20px', sm: 'auto' }}}>
        <Stack gap='5px'>
          <label htmlFor="info-nombre">Nombre de Perfil</label>
          <input className='casilla-info' id='info-nombre' type="text" />
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-peso">Peso en Kg</label>
          <input className='casilla-info' id='info-peso' type="number" min='0' />
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-altura">Altura en cm</label>
          <input className='casilla-info' id='info-altura' type="number" min='0' />
        </Stack>
        <Stack gap='5px'>
          <label htmlFor="info-sexo">Sexo</label>
          <select className='casilla-info' name="selector-sexo" id="info-sexo">
          <option value=""></option>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
        </select>
        </Stack>
      </Stack>
      <Stack gap='5px'>
          <label htmlFor="info-actividad">Actividad Fisica</label>
          <select style={{width: '100%', padding: '10px', fontSize: '1.1rem'}} name="selector-actividad" id="info-actividad">
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
            <input className='casilla-info' id='info-proteinas' type="number" min='0' max='3' step='0.1' placeholder='g por Kg de peso'/>
        </Stack>
        <Stack gap='5px'>
            <label htmlFor="info-grasas">Grasas</label>
            <input className='casilla-info' id='info-grasas' type="number" min='0' max='3' step='0.1' placeholder='g por Kg de peso'/>
        </Stack>
      </Stack>
      <Button variant='contained' sx={{padding: '10px', width: '100%', fontSize: '1.1rem'}}>Calcular macronutrientes (H&B)</Button>
      <Stack direction='row' flexWrap='wrap' sx={{width: '100%', padding: '20px 0', justifyContent: {lg: 'space-between', xs:'center'}, gap: {xs: '10px', lg: 'auto' }}}>
        <Button variant='contained' color='error' sx={{padding: '10px', width: '100%', maxWidth: '370px', fontSize: '1.1rem'}}>Añadir Déficit -50Kcal</Button>
        <Button variant='contained' color='success' sx={{padding: '10px', width: '100%', maxWidth: '370px', fontSize: '1.1rem'}}>Añadir Superávit +50Kcal</Button>
      </Stack>
      <Box sx={{borderRadius: '20px', padding: '10px', boxShadow: '0 0 3px 2px rgba(0,0,0,0.3)'}}>        
        <Typography variant='h5' textAlign='center'>OBJETIVO DE MACRONUTRIENTES DIARIO</Typography>
        <hr style={{width: '75%', maxWidth: '400px', margin: '0 auto', borderColor: 'rgba(0,0,0,0.5'}}/>
        <Stack direction='row' justifyContent='space-evenly' mt='20px'>          
          <Stack>
            <Typography variant='h5' textAlign='center'>Kcal</Typography>       
            <Typography variant='h5' textAlign='center'>2434</Typography>        
            <Typography variant='h5' textAlign='center'>%</Typography>
          </Stack>
          <Stack>
            <Typography variant='h5' textAlign='center'>Hidratos de Carbono</Typography>       
            <Typography variant='h5' textAlign='center'>2434</Typography>        
            <Typography variant='h5' textAlign='center'>%</Typography>
          </Stack>
          <Stack>
            <Typography variant='h5' textAlign='center'>Proteinas</Typography>       
            <Typography variant='h5' textAlign='center'>2434</Typography>        
            <Typography variant='h5' textAlign='center'>%</Typography>
          </Stack>
          <Stack>
            <Typography variant='h5' textAlign='center'>Grasas</Typography>       
            <Typography variant='h5' textAlign='center'>2434</Typography>        
            <Typography variant='h5' textAlign='center'>%</Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}

export default TarjetaDePerfil