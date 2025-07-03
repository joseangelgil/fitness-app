import { Stack } from '@mui/material'

const TotalTable = () => {
  return (
    <Stack sx={{ fontSize: { lg: '1.1rem', sm: '0.9rem', xs: '0.7rem'}}}>
      <table style={{ textAlign: 'center'}}>
        <thead>
          <tr>
            <th style={{width: '30%'}}>Macronutrientes Totales</th>
            <th>Kcal</th>
            <th>Hidratos de Carbono (g)</th>
            <th>Proteinas (g)</th>
            <th>Grasas (g)</th>
          </tr>
        </thead>
         <tbody>
          <tr>
            <th style={{width: '30%'}}>Suma diaria total</th>
            <th>Kcal</th>
            <th>Hidratos de Carbono (g)</th>
            <th>Proteinas (g)</th>
            <th>Grasas (g)</th>
          </tr>
          <tr>
            <th style={{width: '30%'}}>Objetivo diario</th>
            <th>Kcal</th>
            <th>Hidratos de Carbono (g)</th>
            <th>Proteinas (g)</th>
            <th>Grasas (g)</th>
          </tr>
          <tr>
            <th style={{width: '30%'}}>Necesario para cumplir objetivo</th>
            <th>Kcal</th>
            <th>Hidratos de Carbono (g)</th>
            <th>Proteinas (g)</th>
            <th>Grasas (g)</th>
          </tr>
        </tbody>
      </table>
    </Stack>
  )
}

export default TotalTable