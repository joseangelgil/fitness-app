import { Stack } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import { Button, Typography } from '@mui/material'

const DietTable = ({ comidaId, name, time, comida }) => {

  const { eliminarComida, setDisplay, setComidaOIngrediente, quitarIngrediente, calculateTotal, setActiveFood } = useGlobalContext()

  return (
    <Stack sx={{ fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}}>
      <table style={{ textAlign: 'center'}}>
        <thead>
          <tr style={{ cursor: 'pointer'}} onClick={() => {eliminarComida(comidaId)}}>
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
          {comida.ingredientes.map((ingrediente => {
              return (
                <tr key={ingrediente.id} onClick={() => {quitarIngrediente(comidaId, ingrediente.id)}} style={{ cursor: 'pointer'}}>
                  <td>{ingrediente.cantidad}g {ingrediente.name}</td>
                  <td>{ingrediente.kcal}</td>
                  <td>{ingrediente.hc}</td>
                  <td>{ingrediente.prot}</td>
                  <td>{ingrediente.gras}</td>
                </tr>
              )
          }))}
          <tr>
            <th><Button variant='text' sx={{ fontSize: { lg: '1rem', sm: '0.8rem', xs: '0.6rem'}}} value={comida.id} onClick={(e) => {setActiveFood(e.target.value), setDisplay(); setComidaOIngrediente('ingrediente')}}>+ añadir ingrediente</Button></th>
            <th>{calculateTotal(comida, 'kcal') || ''}</th>
            <th>{calculateTotal(comida, 'hc') || ''}</th>
            <th>{calculateTotal(comida, 'prot') || ''}</th>
            <th>{calculateTotal(comida, 'gras') || ''}</th>
          </tr>
        </tbody>
      </table>
    </Stack>
  )
}

export default DietTable
