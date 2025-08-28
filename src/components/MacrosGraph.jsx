import { Box, Typography, Stack } from '@mui/material'
import MacrosPercentageBar from './MacroPercentageBar'
import { useGlobalContext } from '../context'

const MacrosGraph = () => {

  const { cantidadObjetivo, sumaDiariaTotal, activeWeekDay} = useGlobalContext()

  let hcPercentage = Number((sumaDiariaTotal[activeWeekDay].hc / cantidadObjetivo.hc * 100) || 0).toFixed(0)
  let pPercentage = Number((sumaDiariaTotal[activeWeekDay].p / cantidadObjetivo.p * 100) || 0).toFixed(0)
  let gPercentage = Number((sumaDiariaTotal[activeWeekDay].g / cantidadObjetivo.g * 100) || 0).toFixed(0)

  if(hcPercentage > 100) hcPercentage = 100
  if(pPercentage > 100) pPercentage = 100
  if(gPercentage > 100) gPercentage = 100

  return (
    <Box width='100%' my={5} py={3} border={'1px solid #444'} borderRadius='25px'>
      <Typography variant='h6' textAlign='center' textTransform='capitalize' mb='20px' sx={{ fontSize: { lg: '1.4rem', sm: '1.2rem', xs: '1rem'}}}>Cantidad de Macros cubierta según objetivo</Typography>
      <MacrosPercentageBar 
        text='Hidratos' 
        darkColor='#FBC02D' 
        lightColor='#FFF9C4'
        percentage={hcPercentage}>
      </MacrosPercentageBar>
      <MacrosPercentageBar 
        text='Proteínas' 
        darkColor='#43A047' 
        lightColor='#C8E6C9'
        percentage={pPercentage}>
      </MacrosPercentageBar>
      <MacrosPercentageBar 
        text='Grasas' 
        darkColor='#FB8C00' 
        lightColor='#FFE0B2'
        percentage={gPercentage}>        
      </MacrosPercentageBar>
    </Box>
  )
}

export default MacrosGraph