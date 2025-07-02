import { Stack } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import { Button, Typography } from '@mui/material'

const DietTable = ({ name, time }) => {

  const { eliminarComida, setDisplay, setComidaOIngrediente, quitarIngrediente, ingredientes, calculateTotal } = useGlobalContext()

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
          </tr>
        </thead>
        <tbody>
          {ingredientes.map(ingrediente => {
            return (
              <tr key={ingrediente.name} onClick={() => {quitarIngrediente(ingrediente.name)}} style={{ cursor: 'pointer'}}>
                <td>{ingrediente.cantidad}g {ingrediente.name}</td>
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
