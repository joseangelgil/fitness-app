import { Stack, Typography } from "@mui/material"
import { useGlobalContext } from "../context"
import PlantillaIngrediente from './PlantillaIngrediente'

const Ingredientes = ({ search }) => {

  const { data } = useGlobalContext()

  return (
    <Stack direction='row' alignItems='flex-start' justifyContent='center' flexWrap='wrap' gap='50px' padding='40px 10px 10px' sx={{ maxHeight: {lg: '400px', sm: '350px', xs: '300px'},
      overflow: 'hidden'}}>
      {search ? (
        data.filter(item => item.name.toLowerCase().includes(search.toLowerCase().trim())).length ?
          data.filter(item => item.name.toLowerCase().includes(search.toLowerCase().trim())).map(item => {
              return (
                <PlantillaIngrediente key={item.id} name={item.name} author={item.author} id={item.id} kcal={item.kcal} hc={item.hc} p={item.p} g={item.g} image={item.image}/>
              )
          }) :             
          <Typography variant="p" sx={{fontSize: { lg: '1.1rem', sm:'0.95rem', xs: '0.8rem'}, textTransform: 'uppercase'}}>No hay coincidencias entre los ingredientes guardados</Typography>
        ) :      
        data.map(item => {
          return (
            <PlantillaIngrediente key={item.id} name={item.name} author={item.author} id={item.id} kcal={item.kcal} hc={item.hc} p={item.p} g={item.g} image={item.image}/>
          )
        })}
    </Stack>
  )
}

export default Ingredientes