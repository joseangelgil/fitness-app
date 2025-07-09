import { Box, Stack, Typography } from '@mui/material'
import Navbar from '../components/Navbar'
import { useGlobalContext } from '../utils/context'

const IngredientsData = () => {

  const { data, activeColor } = useGlobalContext()

  return (
    <Box sx={{padding: '10px'}}>
      <Navbar />
      <Stack direction='row' alignItems='flex-start' justifyContent='center' flexWrap='wrap' gap='30px' sx={{padding:'30px 10px', backgroundColor:`${activeColor.claro}`, borderRadius:'20px', border: `3px solid ${activeColor.oscuro}`, minHeight: '90vh'}}>
        {data.map(item => {
            return (
              <Stack key={item.id} justifyContent= 'space-evenly' alignItems='center' width='200px' height='250px' sx={{borderRadius:'10px', backgroundColor:'white', userSelect: 'none', fontSize: '0.8rem', boxShadow: '0 0 3px 1px rgba(0,0,0,0.7)'}}>
                <img src="https://images.openfoodfacts.net/images/products/848/000/056/6614/front_es.34.100.jpg" alt="img" width='90px' height='90px' style={{border: '1px solid rgba(0,0,0,0.5)', borderRadius: '10px'}}/>
                <Typography variant="h6" fontSize='1rem'>{item.name}</Typography>
                <Typography variant='p'>Macronutrientes por 100g</Typography>
                <Typography variant='p'>{item.kcal} Kcal</Typography>
                <Typography variant='p'>{item.hc}g HC</Typography>
                <Typography variant='p'>{item.p}g Proteinas</Typography>
                <Typography variant='p'>{item.g}g Grasas</Typography>
              </Stack> 
            )
          })}
      </Stack>
    </Box>
  )
}

export default IngredientsData