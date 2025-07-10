import AddIcon from '@mui/icons-material/Add'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Fade,
  Alert,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { memo, useContext, useEffect, useState } from 'react'

import StoreContext from './StoreContext'

const ChildCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isRendering',
})(({ theme, isRendering }) => ({
  marginTop: theme.spacing(2),
  position: 'relative',
  transition: 'all 0.3s ease',
  border: isRendering
    ? `2px solid ${theme.palette.success.main}`
    : '1px solid transparent',
  boxShadow: isRendering
    ? `0 0 15px ${theme.palette.success.main}40`
    : theme.shadows[1],
}))

const RenderIndicator = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
}))

const ViewChild = () => {
  const {
    setStore,
    store: { age },
  } = useContext(StoreContext)
  const [renderCount, setRenderCount] = useState(0)
  const [isRendering, setIsRendering] = useState(false)

  useEffect(() => {
    setRenderCount((prev) => prev + 1)
    setIsRendering(true)
    const timer = setTimeout(() => setIsRendering(false), 500)
    return () => clearTimeout(timer)
  }, [age])

  return (
    <ChildCard isRendering={isRendering}>
      <Fade in={isRendering}>
        <RenderIndicator label={`Render #${renderCount}`} size="small" />
      </Fade>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <ChildCareIcon color="success" sx={{ mr: 1 }} />
          <Typography variant="h6" color="success.main">
            Child Component
          </Typography>
        </Box>

        <Alert severity="success" sx={{ mb: 2 }}>
          This child component only subscribes to the 'age' property from
          context. It demonstrates selective context consumption.
        </Alert>

        <Box
          sx={{
            p: 2,
            backgroundColor: 'success.light',
            borderRadius: 1,
            textAlign: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h4" color="success.contrastText">
            {age}
          </Typography>
          <Typography variant="body2" color="success.contrastText">
            Age from Child Context
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="success"
          size="medium"
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => setStore({ age: age + 1 })}
        >
          Increment Age from Child
        </Button>
      </CardContent>
    </ChildCard>
  )
}

export default memo(ViewChild)
