import { Stack } from '@mui/material'
import { useGlobalContext } from '../utils/context'
import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import IngredientesMenu from './IngredientesMenu'

const DietTable = ({ comidaId, name, time, ingredientes, macros }) => {

  const { setDisplay, setComidaOIngrediente, setComidaSeleccionada, setIngredienteSeleccionado, setNombreNuevaComida, setHoraNuevaComida, mostrarMenuIngredientes, setMostrarMenuIngredientes, setCantidadNuevoIngrediente, activeColor } = useGlobalContext()

  const handleComidaAction = ()  => {
    setComidaOIngrediente('modificarComida');
    setNombreNuevaComida(name)
    setHoraNuevaComida(time)
    setComidaSeleccionada(comidaId)
    setDisplay()
  }

  const handleIngredienteAction = (ingredienteId)  => {
    setComidaOIngrediente('modificarIngrediente');    
    setComidaSeleccionada(comidaId)
    setCantidadNuevoIngrediente(() => (ingredientes.find(ingrediente => ingrediente.id === ingredienteId).cantidad))
    setIngredienteSeleccionado(ingredienteId)    
    setDisplay()
  }

  return (
    <Stack sx={{ fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}}>
      <table style={{ textAlign: 'center'}}>
        <thead>
          <tr style={{ cursor: 'pointer', backgroundColor: `${activeColor.claro}`}} onClick={() => {handleComidaAction()}}>
            <th style={{width: '30%'}}>
              <Stack direction='row' justifyContent='space-evenly' flexWrap='wrap'>
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
          {ingredientes.map((ingrediente => {
              return (
                <tr key={ingrediente.id} onClick={() => {handleIngredienteAction(ingrediente.id)}} style={{ cursor: 'pointer'}}>
                  <td>{ingrediente.cantidad}g {ingrediente.name}</td>
                  <td>{ingrediente.kcal}</td>
                  <td>{ingrediente.hc}</td>
                  <td>{ingrediente.p}</td>
                  <td>{ingrediente.g}</td>
                </tr>
              )
          }))}
          <tr>
            <th><Button variant='text' color={activeColor.name} sx={{ fontSize: { lg: '1rem', sm: '0.8rem', xs: '0.6rem'}}} value={comidaId} onClick={(e) => {setComidaSeleccionada(e.target.value); setMostrarMenuIngredientes(true)}}>+ añadir ingrediente</Button></th>
            <th>{macros?.kcal || 0}</th>
            <th>{macros?.hc || 0}</th>
            <th>{macros?.p || 0}</th>
            <th>{macros?.g || 0}</th>
          </tr>
        </tbody>
      </table>
      {mostrarMenuIngredientes && <IngredientesMenu />}
    </Stack>
  )
}

export default DietTable