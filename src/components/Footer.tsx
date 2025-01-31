import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
   
    <Box
    component="footer"
    sx={{
      textAlign: "center",
      padding: 2,
      backgroundColor: "#021126",
      color: "#fff",
      marginTop: "auto", // Mantiene el footer al final
    }}
  >
    <Typography variant="body2">
      © 2025 Gym Admin. All rights reserved. Developed by Brian De Vita.
    </Typography>
  </Box>

  )
}
