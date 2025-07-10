import { Stack, Typography } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import Icon from '../assets/icon2.png'

const PlantillaIngrediente = ({handleIngredientClick, name, author, id, kcal, hc, p, g, url}) => {

  const { activeColor } = useGlobalContext()

  return (
    <Stack 
      className='ingredient-card' 
      justifyContent= 'space-evenly' 
      alignItems='center' 
      sx={{
        padding: '5px', 
        width: {lg: '250px', sm: '225px', xs: '200px'}, 
        height:{ lg: '350px', sm: '300px', xs: '250px'}, 
        borderRadius:'10px', 
        boxShadow:'0 2px 3px 1px rgba(0,0,0,0.7)', 
        backgroundColor: `${activeColor.suave}`, 
        cursor: 'pointer', 
        fontSize: { lg: '1.1rem', sm: '0.95rem', xs: '0.8rem'}, 
        position: 'relative'
      }} 
      onClick={() => handleIngredientClick(id)}>
      <Typography variant='p' sx={{position: 'absolute', top: '5px', right: '5px', fontSize: {lg: '0.9rem', md:'0.8rem', xs: '0.7rem'}, color: 'gray'}}>{author}</Typography>
      <img src={url ? url : Icon} alt="img" width='120px' height='120px' style={{borderRadius: '15px', marginTop: '12px', marginBottom: '-5px'}}/>
      <Typography variant="h6" sx={{fontSize: { lg: '1.4rem', sm: '1.2rem', xs: '1rem'}}}>{name}</Typography>
      <Typography variant='p'>Macronutrientes por 100g</Typography>
      <Typography variant='p'>{kcal} Kcal</Typography>
      <Typography variant='p'>{hc}g HC</Typography>
      <Typography variant='p'>{p}g Proteinas</Typography>
      <Typography variant='p'>{g}g Grasas</Typography>
    </Stack>
  )
}

export default PlantillaIngrediente