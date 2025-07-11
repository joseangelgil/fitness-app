import { Stack, Box, Button, Snackbar } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import { useState, useEffect, useMemo } from 'react'
import Ingredientes from './Ingredientes'
import { BsSearch } from "react-icons/bs"

const IngredientesMenu = () => {

  const { data, activeColor, setComidaOIngrediente, setDisplay, openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage, handleSnackbarClose, setOpenFoodFactsData } = useGlobalContext()

  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  const uniqueResults = useMemo(() => {
    const noRepetidos = new Set();
    return results.filter(item => {
      if(noRepetidos.has(item.name)) return false;
      noRepetidos.add(item.name);
      return true;
    });
  }, [results]);

  const renderDropdown = () => {
    return (
      <ul style={{
        display: showDropdown ? 'flex' : 'none', 
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        flexWrap: 'nowrap',
        position: 'absolute', 
        top: '55px', 
        left: '12px', 
        zIndex: 3, 
        backgroundColor: 'white', 
        border: '0.1px solid #444',
        borderRadius: '5px',
        width: '219px',
        maxHeight: '150px',
        overflowY: 'auto',
        margin: 0
      }}>
        {uniqueResults.map(item => {
          return (
            <li key={item.id} style={{margin: '5px', listStyle: 'none'}} onClick={() => {setSearch(item.name); setShowDropdown(false)}}>{item.name}</li>
          )
        })}
      </ul>
    )
  }

  useEffect(() => {
    const searching = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase().trim()))
    if(searching.length && searching[0].name !== search && search) {
      setResults(searching)
      setShowDropdown(true)
    }
    else {
      setResults([])
      setShowDropdown(false)
    }

    let macros;

    if(data.find(item => item.name === search.trim())) {
      macros = {
        kcal: data.find(item => item.name === search.trim()).kcal,
        hc: data.find(item => item.name === search.trim()).hc,
        p: data.find(item => item.name === search.trim()).p,
        g: data.find(item => item.name === search.trim()).g, 
      }     
    }
  }, [search])  
  
  
  const fetchData = async (search) => {

    if(!search){
      setSnackbarMessage('Introduce el nombre del ingrediente para buscar en OpenFoodFacts')
      setOpenSnackbar(true)
      return
    } 

    try {
      const response = await fetch(`https://es.openfoodfacts.net/api/v2/search?categories_tags=${search}`)
      const data = await response.json()

      const products = data.products
      products.map(product => {
        setOpenFoodFactsData(prevData => (
          [...prevData, 
            {id: product.id, author: 'OpenFoodFacts', url: product.image_thumb_url, name: product.product_name, kcal: product.nutriments['energy-kcal_100g'], hc: product.nutriments.carbohydrates_100g, p: product.nutriments.proteins_100g, g: product.nutriments.fat_100g}
          ]
        ))
      })
    } catch(err) {
        console.error(err)
    }
  }


  return (
    <Stack justifyContent= 'space-between' alignItems='center' sx={{
      width: '100%',
      backgroundColor: 'white',
      padding: '25px',
      textAlign: 'center'
    }}>
      <Box width='242px' position='relative' margin='0 auto'>
        <input style={{padding: '20px 10px', fontSize: '1rem', height:'55px'}} type="text" min='0' placeholder='Buscar ingrediente' value={search} onChange={(e) => setSearch(e.target.value)}/>
        {renderDropdown()}
      </Box>
      <Ingredientes search={search}/>
      <Stack direction='row' justifyContent='center' gap='20px' mt='25px'>
        <Button variant="outlined" color={activeColor.name} sx={{padding:'15px', fontSize: { lg: '1.1rem', sm: '0.90rem', xs: '0.7rem'}}} onClick={() => {setComidaOIngrediente('buscarIngrediente'); setDisplay(); fetchData(search)}}><BsSearch style={{marginRight: '8px'}}/> Buscar en OpenFoodFacts</Button>
        <Button variant="outlined" color={activeColor.name} sx={{padding:'15px', fontSize: { lg: '1.1rem', sm: '0.90rem', xs: '0.7rem'}}} onClick={() => {setComidaOIngrediente('crearIngrediente'); setDisplay();}}>+ crear nuevo ingrediente</Button>
      </Stack>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openSnackbar} onClose={handleSnackbarClose} message={snackbarMessage} />
    </Stack>
  )
}

export default IngredientesMenu