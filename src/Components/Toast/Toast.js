import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export default ({ open, hadleClose, children, severety }) => (
  <Snackbar
    open={open}
    onClose={hadleClose}
    autoHideDuration={2000}
  >
    <Alert onClose={hadleClose} variant='filled' severity={severety}>
      {children}
    </Alert>
  </Snackbar>
)