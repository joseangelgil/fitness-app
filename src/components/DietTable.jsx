import { Stack } from '@mui/material'
import { useState } from 'react'
import { Button, Typography } from '@mui/material'

const DietTable = ({ name, time, eliminarComida, setDisplay, setComidaOIngrediente }) => {

  const [ingredientes, setIngredientes] = useState([
    {name: 'Queso', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
    {name: 'Espaguetis', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
    {name: 'Bacon', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
    {name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
  ])

  const calculateTotal = (macroNutriente) => {
    let total = 0;
    ingredientes.forEach(ingrediente => total += +ingrediente[macroNutriente])

    return total
  }

  const quitarIngrediente = (name) => {
    const nuevosIngredientes = ingredientes.filter(ingrediente => ingrediente.name !== name)
    setIngredientes(nuevosIngredientes)
  }

  return (
    <Stack className='tabla-comida' sx={{ fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}}>
      <table style={{ textAlign: 'center'}}>
        <thead>
          <tr style={{ cursor: 'pointer'}} onClick={() => {eliminarComida(name)}}>
            <th style={{width: '30%'}}>
              <Stack direction='row' justifyContent='space-evenly'>
                <Typography variant='p'>{name}</Typography>
                <Typography variant='p'>{time}</Typography>
              </Stack>
            </th>
            <th>Kcal</th>
            <th>Hidratos de Carbono (g)</th>
            <th>Proteinas (g)</th>
            <th>Grasas (g)</th>
            {/* <th style={{backgroundColor: 'white', border: 'none'}}><div className='eliminar-btn'><Button sx={{ fontSize: { lg: '1.1rem', xs: '0.5rem'}}} variant='contained' color='error' onClick={() => {eliminarComida(name)}}>Eliminar</Button></div></th> */}
          </tr>
        </thead>
        <tbody>
          {ingredientes.map(ingrediente => {
            return (
              <tr key={ingrediente.name} onClick={() => {quitarIngrediente(ingrediente.name)}} style={{ cursor: 'pointer'}}>
                <td>{ingrediente.cantidad}g {ingrediente.name}</td>
                {/* <td>{ingrediente.cantidad}g {ingrediente.name} <span className='quitar-btn'><Button variant='text' color='error' sx={{fontSize: { lg: '0.7rem', xs: '0.5rem'}}} onClick={() => {quitarIngrediente(ingrediente.name)}}>quitar</Button></span></td> */}
                <td>{ingrediente.kcal}</td>
                <td>{ingrediente.hc}</td>
                <td>{ingrediente.prot}</td>
                <td>{ingrediente.gras}</td>
              </tr>
            )
          })}
          <tr className='total-fila'>
            <td><Button variant='text' sx={{ fontSize: { lg: '1rem', sm: '0.8rem', xs: '0.6rem'}}} onClick={() => {setDisplay(); setComidaOIngrediente('ingrediente')}}>+ añadir ingrediente</Button></td>
            <td>{calculateTotal('kcal')}</td>
            <td>{calculateTotal('hc')}</td>
            <td>{calculateTotal('prot')}</td>
            <td>{calculateTotal('gras')}</td>
          </tr>
        </tbody>
      </table>
    </Stack>
  )
}

export default DietTable
