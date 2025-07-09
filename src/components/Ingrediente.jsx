import { Stack, Typography, Button } from "@mui/material"
import { useGlobalContext } from "../utils/context"
import { BsSearch } from "react-icons/bs";

const Ingrediente = ({ search }) => {

  const { data, setIngredienteSeleccionado, setDisplay, setComidaOIngrediente, activeColor } = useGlobalContext()

  const handleIngredientClick = (id) => {
    setComidaOIngrediente('nuevoIngrediente'); 
    setIngredienteSeleccionado(id)
    setDisplay();
  }

  return (
    <Stack direction='row' alignItems='flex-start' justifyContent='center' flexWrap='wrap' gap='50px' padding='40px 10px 10px'>
      {search ? (
        data.filter(item => item.name.toLowerCase().includes(search.toLowerCase().trim())).length ?
          data.map(item => {
            if(item.name.toLowerCase().includes(search.toLowerCase().trim())) {
              return (
                <Stack key={item.id} className='ingredient-card' justifyContent= 'space-evenly' alignItems='center' sx={{width: {lg: '250px', sm: '225px', xs: '200px'}, height:{ lg: '350px', sm: '300px', xs: '250px'}, borderRadius:'10px', boxShadow:'0 2px 3px 1px rgba(0,0,0,0.7)', backgroundColor: `${activeColor.suave}`, cursor: 'pointer', fontSize: { lg: '1.1rem', sm: '0.95rem', xs: '0.8rem'}}} onClick={() => handleIngredientClick(item.id)}>
                  <img src="#" alt="img" width='120px' height='120px' style={{border: '1px solid black'}}/>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant='p'>Macronutrientes por 100g</Typography>
                  <Typography variant='p'>{item.kcal} Kcal</Typography>
                  <Typography variant='p'>{item.hc}g HC</Typography>
                  <Typography variant='p'>{item.p}g Proteinas</Typography>
                  <Typography variant='p'>{item.g}g Grasas</Typography>
                </Stack>
              )
            }
          }) : 
            <Stack gap='25px'>
              <Typography variant="p" sx={{fontSize: { lg: '1.1rem', sm:'0.95rem', xs: '0.8rem'}, textTransform: 'uppercase'}}>No hay coincidencias entre los ingredientes guardados</Typography>
              <Stack direction='row' justifyContent='center' gap='20px'>
                <Button variant="outlined" color={activeColor.name} sx={{padding:'15px', fontSize: { lg: '1.1rem', sm: '0.90rem', xs: '0.7rem'}}}><BsSearch style={{marginRight: '8px'}}/> Buscar en OpenFoodFacts</Button>
                <Button variant="outlined" color={activeColor.name} sx={{padding:'15px', fontSize: { lg: '1.1rem', sm: '0.90rem', xs: '0.7rem'}}}>+ crear nuevo ingrediente</Button>
              </Stack>
            </Stack>
        ) :      
        data.map(item => {
          return (
            <Stack key={item.id} className='ingredient-card' justifyContent= 'space-evenly' alignItems='center' sx={{width: {lg: '250px', sm: '225px', xs: '200px'}, height:{ lg: '350px', sm: '300px', xs: '250px'}, borderRadius:'10px', borderRadius:'10px', boxShadow:'0 2px 3px 1px rgba(0,0,0,0.7)', backgroundColor: `${activeColor.suave}`, cursor: 'pointer', fontSize: { lg: '1.1rem', sm: '0.95rem', xs: '0.8rem'}}} onClick={() => handleIngredientClick(item.id)}>
              <img src="https://images.openfoodfacts.net/images/products/848/000/056/6614/front_es.34.100.jpg
" alt="img" width='120px' height='120px' style={{border: '1px solid rgba(0,0,0,0.5)', borderRadius: '10px'}}/>
              <Typography variant="h6" sx={{fontSize: { lg: '1.1rem', xs: '1rem'}}}>{item.name}</Typography>
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