import { Stack, Typography } from "@mui/material"
import { useGlobalContext } from "../utils/context"
import Icon from '../assets/icon2.png'

const Ingrediente = ({ search }) => {

  const { data, menu, activeWeekDay, setOpenSnackbar, setSnackbarMessage, setIngredienteSeleccionado, setDisplay, setComidaOIngrediente, activeColor, comidaSeleccionada } = useGlobalContext()

  const handleIngredientClick = (id) => {     

    if(menu[activeWeekDay].find(comida => comida.id === comidaSeleccionada).ingredientes.find(ingrediente => ingrediente.id === `${comidaSeleccionada}-${id}`)){
      setSnackbarMessage('El ingrediente ya esta en el menu. Pincha sobre el para modificar la cantidad')
      setTimeout(() => setOpenSnackbar(true), 100)
      return
    }
    setIngredienteSeleccionado(id)
    setComidaOIngrediente('nuevoIngrediente'); 
    setDisplay();
  }

  return (
    <Stack direction='row' alignItems='flex-start' justifyContent='center' flexWrap='wrap' gap='50px' padding='40px 10px 10px' sx={{ maxHeight: {lg: '400px', sm: '350px', xs: '300px'},
      overflow: 'hidden'}}>
      {search ? (
        data.filter(item => item.name.toLowerCase().includes(search.toLowerCase().trim())).length ?
          data.filter(item => item.name.toLowerCase().includes(search.toLowerCase().trim())).map(item => {
              return (
                <Stack key={item.id} className='ingredient-card' justifyContent= 'space-evenly' alignItems='center' sx={{padding: '5px', width: {lg: '250px', sm: '225px', xs: '200px'}, height:{ lg: '350px', sm: '300px', xs: '250px'}, borderRadius:'10px', boxShadow:'0 2px 3px 1px rgba(0,0,0,0.7)', backgroundColor: `${activeColor.suave}`, cursor: 'pointer', fontSize: { lg: '1.1rem', sm: '0.95rem', xs: '0.8rem'}, position: 'relative'}} onClick={() => handleIngredientClick(item.id)}>
                  <Typography variant='p' sx={{position: 'absolute', top: '5px', right: '5px', fontSize: {lg: '0.9rem', md:'0.8rem', xs: '0.7rem'}, color: 'gray'}}>{item.author}</Typography>
                  <img src={item.url ? item.url : Icon} alt="img" width='120px' height='120px' style={{borderRadius: '15px', marginTop: '12px', marginBottom: '-5px'}}/>
                  <Typography variant="h6" sx={{fontSize: { lg: '1.4rem', sm: '1.2rem', xs: '1rem'}}}>{item.name}</Typography>
                  <Typography variant='p'>Macronutrientes por 100g</Typography>
                  <Typography variant='p'>{item.kcal} Kcal</Typography>
                  <Typography variant='p'>{item.hc}g HC</Typography>
                  <Typography variant='p'>{item.p}g Proteinas</Typography>
                  <Typography variant='p'>{item.g}g Grasas</Typography>
                </Stack>
              )
          }) : 
            
          <Typography variant="p" sx={{fontSize: { lg: '1.1rem', sm:'0.95rem', xs: '0.8rem'}, textTransform: 'uppercase'}}>No hay coincidencias entre los ingredientes guardados</Typography>
        ) :      
        data.map(item => {
          return (
            <Stack key={item.id} className='ingredient-card' justifyContent= 'space-evenly' alignItems='center' sx={{padding: '5px', width: {lg: '250px', sm: '225px', xs: '200px'}, height:{ lg: '350px', sm: '300px', xs: '250px'}, borderRadius:'10px', borderRadius:'10px', boxShadow:'0 2px 3px 1px rgba(0,0,0,0.7)', backgroundColor: `${activeColor.suave}`, cursor: 'pointer', fontSize: { lg: '1.1rem', sm: '0.95rem', xs: '0.8rem'}, position: 'relative'}} onClick={() => handleIngredientClick(item.id)}>
              <Typography variant='p' sx={{position: 'absolute', top: '5px', right: '5px', fontSize: {lg: '0.9rem', md:'0.8rem', xs: '0.7rem'}, color: 'gray'}}>{item.author}</Typography>
              <img src={item.url ? item.url : Icon} alt="img" width='120px' height='120px' style={{borderRadius: '15px', marginTop: '12px', marginBottom: '-5px'}}/>
              <Typography variant="h6" sx={{fontSize: { lg: '1.4rem', sm: '1.2rem', xs: '1rem'}}}>{item.name}</Typography>
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

// https://images.openfoodfacts.net/images/products/848/000/056/6614/front_es.34.100.jpg