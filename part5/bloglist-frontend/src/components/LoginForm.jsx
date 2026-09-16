import Notification from './Notification'
import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  notification,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          label="username"
          value={username}
          onChange={handleUsernameChange}
          margin="normal"
        />
        <br />
        <TextField
          variant="standard"
          label="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
