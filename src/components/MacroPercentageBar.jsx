import { Box, Typography, Stack } from '@mui/material'

const MacrosPercentageBar = ({ text, darkColor, lightColor, percentage }) => {
  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%' m='5px'>
      <Typography variant='h6' mx='20px' textAlign='center' sx={{ fontSize: { lg: '1.2rem', sm: '1rem', xs: '0.8rem'},  minWidth: { lg: '100px', sm: '75px', xs: '60px'}}}>{text}</Typography>
      <Box m='5px' backgroundColor={lightColor} flex={1} borderRadius='10px' height={12}>
        <Box backgroundColor={darkColor} borderRadius='inherit' width={`${percentage}%`} height='100%'></Box>
      </Box>
      <Typography variant='h6' mx='15px' minWidth='50px' sx={{ fontSize: { lg: '1.2rem', sm: '1rem', xs: '0.8rem'}}}>{percentage}%</Typography>
    </Stack>
  )
}

export default MacrosPercentageBar