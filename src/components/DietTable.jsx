import { Stack } from '@mui/material'
import { useState } from 'react'
import { Button } from '@mui/material'

const DietTable = ({ name, time, eliminarComida }) => {

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
    <Stack className='tabla-comida'>
      <table style={{ textAlign: 'center'}}>
        <thead>
          <tr>
            <th style={{width: '30%'}}>
              <Stack direction='row'>
                <p>{name}</p>
                <p>{time}</p>
              </Stack>
            </th>
            <th>Kcal</th>
            <th>Hidratos de Carbono (g)</th>
            <th>Proteinas (g)</th>
            <th>Grasas (g)</th>
            <th style={{backgroundColor: 'white'}}><div className='eliminar-btn'><Button variant='contained' color='error' onClick={() => {eliminarComida(name)}}>Eliminar</Button></div></th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map(ingrediente => {
            return (
              <tr key={ingrediente.name}>
                <td>{ingrediente.cantidad}g {ingrediente.name} <span className='quitar-btn'><Button variant='text' color='error' sx={{fontSize: '0.7rem'}} onClick={() => {quitarIngrediente(ingrediente.name)}}>quitar</Button></span></td>
                <td>{ingrediente.kcal}</td>
                <td>{ingrediente.hc}</td>
                <td>{ingrediente.prot}</td>
                <td>{ingrediente.gras}</td>
              </tr>
            )
          })}
          <tr className='total-fila'>
            <td><Button variant='text'>+ añadir ingrediente</Button></td>
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
