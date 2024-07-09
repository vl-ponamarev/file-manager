import React from 'react'
import { Backdrop } from '@mui/material'
import { StyledCircularProgress } from '../circularProgress'

export function StyledBackdrop() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Backdrop
        sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <StyledCircularProgress />
      </Backdrop>
    </div>
  )
}
