import { Alert } from '@mui/material'

const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const alertSeverity = (type === 'error' || type === 'success') ? type : 'info'

  return (
    <Alert severity={alertSeverity} sx={{ mb: 2 }}>
      {message}
    </Alert>
  )
}

export default Notification