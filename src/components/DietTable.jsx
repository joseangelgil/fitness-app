import { Stack } from '@mui/material'
import { useState } from 'react'
import { Button } from '@mui/material'

const DietTable = ({ name, time }) => {

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

  return (
    <Stack>
      <table style={{ textAlign: 'center', width: '75%'}}>
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
          </tr>
        </thead>
        <tbody>
          {ingredientes.map(ingrediente => {
            return (
              <tr key={ingrediente.name}>
                <td>{ingrediente.cantidad} {ingrediente.name}</td>
                <td>{ingrediente.kcal}</td>
                <td>{ingrediente.hc}</td>
                <td>{ingrediente.prot}</td>
                <td>{ingrediente.gras}</td>
              </tr>
            )
          })}
          <tr className='total-fila'>
            <td><Button variant='text'>+ add ingredient</Button></td>
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
