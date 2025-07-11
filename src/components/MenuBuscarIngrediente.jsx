import { Box, Typography, Stack, Button } from "@mui/material"
import { useGlobalContext } from "../utils/context"
import PlantillaIngrediente from "./PlantillaIngrediente"

const MenuBuscarIngrediente = () => {

  const { openFoodFactsData, setOpenFoodFactsData, setDisplay } = useGlobalContext()

  return (
    <Box sx={{position: 'fixed', width: '95vw', height: '90vh', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', borderRadius: '25px', overflow: 'hidden',
        display: "flex",
        flexDirection: "column",}}>
      <Box sx={{position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'inherit', padding: '20px 25px 0'}}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>        
          <Typography variant="h4" sx={{color: '#444', fontSize: {sm: '2rem', xs: '1.2rem'}}}>OPENFOODFACTS</Typography>
          <Button variant='text' color='error' onClick={() => {setOpenFoodFactsData([]); setDisplay();}}>Cancelar</Button>
        </Stack>
        <hr style={{margin: '5px 0', border: '1px solid #444'}}/>
      </Box>      
      <Stack direction='row' flexWrap='wrap' gap='40px'  justifyContent='center' sx={{flex: '1', padding: '30px', overflowY: 'auto'}}>
        {openFoodFactsData.map(item => {
          if(item.name && item.kcal && item.hc && item.p && item.g){            
            return (
              <PlantillaIngrediente key={item.id} name={item.name} author={item.author} id={item.id} kcal={item.kcal} hc={Number(item.hc).toFixed(1)} p={Number(item.p).toFixed(1)} g={Number(item.g).toFixed(1)} url={item.url}/>
            )
          }
        })}
      </Stack>
    </Box>
  )
}

export default MenuBuscarIngrediente