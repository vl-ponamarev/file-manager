import { Typography } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const ActivationPage = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ maxWidth: 275 }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography variant="h6" component="div" sx={{ mb: 1.5 }}>
            Для активации аккаунта в Family File Store перейдите по ссылке в
            письме, отправленном на вашу электронную почту, указанную при
            регистрации.
          </Typography>
          <Typography
            style={{ textAlign: 'center' }}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Это страницу можно закрыть.
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ActivationPage
