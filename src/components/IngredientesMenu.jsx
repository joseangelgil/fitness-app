import { Stack, Box } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import { useState, useEffect } from 'react'
import Ingrediente from './Ingrediente'

const IngredientesMenu = () => {

  const { data } = useGlobalContext()
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

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
        left: '0', 
        zIndex: 3, 
        backgroundColor: 'white', 
        border: '0.1px solid #444',
        borderRadius: '5px',
        width: '242px',
        maxHeight: '150px',
        overflowY: 'auto',
        margin: 0
      }}>
        {results.map(item => {
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
      <Ingrediente search={search}/>
    </Stack>
  )
}

export default IngredientesMenu