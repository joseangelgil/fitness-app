import { Box, Typography, Stack } from '@mui/material'

const MacrosPercentageBar = ({ text, darkColor, lightColor, percentage }) => {
  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%' m='10px'>
      <Typography variant='h6' mx='20px' minWidth='200px' textAlign='center'>{text}</Typography>
      <Box m='5px' backgroundColor={lightColor} flex={1} borderRadius='10px' height={12}>
        <Box backgroundColor={darkColor} borderRadius='inherit' width={`${percentage}%`} height='100%'></Box>
      </Box>
      <Typography variant='h6' mx='15px' minWidth='5%' >{percentage}%</Typography>
    </Stack>
  )
}

export default MacrosPercentageBar