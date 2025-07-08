import { Stack } from '@mui/material'
import { useGlobalContext } from '../utils/context'

const TotalTable = () => {

  const { cantidadObjetivo, sumaDiariaTotal, activeWeekDay, activeColor } = useGlobalContext()

  return (
    <Stack sx={{ fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}}>
      <table style={{ textAlign: 'center'}}>
        <thead>
          <tr style={{backgroundColor: `${activeColor.claro}`}}>
            <th style={{width: '30%'}}>Macros Totales</th>
            <th>Kcal</th>
            <th>Hidratos de Carbono (g)</th>
            <th>Proteinas (g)</th>
            <th>Grasas (g)</th>
          </tr>
        </thead>
         <tbody>
          <tr height='30px'>
            <td >Objetivo diario</td>
            <td>{cantidadObjetivo.kcal}</td>
            <td>{cantidadObjetivo.hc}</td>
            <td>{cantidadObjetivo.p}</td>
            <td>{cantidadObjetivo.g}</td>
          </tr>
          <tr height='30px'>
            <td>Suma diaria total</td>
            <td>{sumaDiariaTotal[activeWeekDay].kcal}</td>
            <td>{sumaDiariaTotal[activeWeekDay].hc}</td>
            <td>{sumaDiariaTotal[activeWeekDay].p}</td>
            <td>{sumaDiariaTotal[activeWeekDay].g}</td>
          </tr>
          <tr height='30px'>
            <th>Restante hasta objetivo</th>
            <th>{Number((cantidadObjetivo.kcal - sumaDiariaTotal[activeWeekDay].kcal || 0).toFixed(1))}</th>
            <th>{Number((cantidadObjetivo.hc - sumaDiariaTotal[activeWeekDay].hc || 0).toFixed(1))}</th>
            <th>{Number((cantidadObjetivo.p - sumaDiariaTotal[activeWeekDay].p || 0).toFixed(1))}</th>
            <th>{Number((cantidadObjetivo.g - sumaDiariaTotal[activeWeekDay].g || 0).toFixed(1))}</th>
          </tr>
        </tbody>
      </table>
    </Stack>
  )
}

export default TotalTable