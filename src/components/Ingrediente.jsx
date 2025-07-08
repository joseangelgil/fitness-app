import { Stack, Typography } from "@mui/material"
import { useGlobalContext } from "../utils/context"

const Ingrediente = ({ search }) => {

  const { data, setIngredienteSeleccionado, setDisplay, setComidaOIngrediente } = useGlobalContext()

  const handleIngredientClick = (id) => {
    setComidaOIngrediente('nuevoIngrediente'); 
    setIngredienteSeleccionado(id)
    setDisplay();
  }

  return (
    <Stack direction='row' alignItems='flex-start' justifyContent='center' flexWrap='wrap' gap='50px' padding='50px 10px'>
      {search ? 
        data.map(item => {
          if(item.name.toLowerCase().includes(search.toLowerCase().trim())) {
            return (
              <Stack key={item.id} className='ingredient-card' justifyContent= 'space-evenly' alignItems='center' width='250px' height='350px' sx={{borderRadius:'10px', boxShadow:'0 2px 3px 1px rgba(0,0,0,0.7)', cursor: 'pointer', fontSize: '1.1rem'}} onClick={() => handleIngredientClick(item.id)}>
                <img src="#" alt="img" width='120px' height='120px' style={{border: '1px solid black'}}/>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant='p'>Macronutrientes por 100g</Typography>
                <Typography variant='p'>{item.kcal} Kcal</Typography>
                <Typography variant='p'>{item.hc}g HC</Typography>
                <Typography variant='p'>{item.p}g Proteinas</Typography>
                <Typography variant='p'>{item.g}g Grasas</Typography>
              </Stack>
            )
          }}) :      
        data.map(item => {
          return (
            <Stack key={item.id} className='ingredient-card' justifyContent= 'space-evenly' alignItems='center' width='250px' height='350px' sx={{borderRadius:'10px', boxShadow:'0 2px 3px 1px rgba(0,0,0,0.7)', cursor: 'pointer', fontSize: '1.1rem'}} onClick={() => handleIngredientClick(item.id)}>
              <img src="#" alt="img" width='120px' height='120px' style={{border: '1px solid black'}}/>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant='p'>Macronutrientes por 100g</Typography>
              <Typography variant='p'>{item.kcal} Kcal</Typography>
              <Typography variant='p'>{item.hc}g HC</Typography>
              <Typography variant='p'>{item.p}g Proteinas</Typography>
              <Typography variant='p'>{item.g}g Grasas</Typography>
            </Stack> 
          )
        })}
    </Stack>
  )
}

export default Ingrediente