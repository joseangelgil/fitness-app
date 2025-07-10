import { Stack, Typography } from "@mui/material"
import { useGlobalContext } from "../utils/context"
import PlantillaIngrediente from './PlantillaIngrediente'

const Ingredientes = ({ search }) => {

  const { data, menu, activeWeekDay, setOpenSnackbar, setSnackbarMessage, setIngredienteSeleccionado, setDisplay, setComidaOIngrediente, comidaSeleccionada } = useGlobalContext()

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
                <PlantillaIngrediente key={item.id} handleIngredientClick={handleIngredientClick} name={item.name} author={item.author} id={item.id} kcal={item.kcal} hc={item.hc} p={item.p} g={item.g} url={item.url}/>
              )
          }) :             
          <Typography variant="p" sx={{fontSize: { lg: '1.1rem', sm:'0.95rem', xs: '0.8rem'}, textTransform: 'uppercase'}}>No hay coincidencias entre los ingredientes guardados</Typography>
        ) :      
        data.map(item => {
          return (
            <PlantillaIngrediente key={item.id} handleIngredientClick={handleIngredientClick} name={item.name} author={item.author} id={item.id} kcal={item.kcal} hc={item.hc} p={item.p} g={item.g} url={item.url}/>
          )
        })}
    </Stack>
  )
}

export default Ingredientes