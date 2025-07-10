import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  Chip,
  Fade,
  Alert,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext, memo, useEffect, useState } from 'react'

import StoreContext from './StoreContext'
import ViewChild from './ViewChild'

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isRendering',
})(({ theme, isRendering }) => ({
  height: '100%',
  position: 'relative',
  transition: 'all 0.3s ease',
  border: isRendering
    ? `2px solid ${theme.palette.info.main}`
    : '1px solid transparent',
  boxShadow: isRendering
    ? `0 0 20px ${theme.palette.info.main}40`
    : theme.shadows[1],
}))

const RenderIndicator = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.info.main,
  color: theme.palette.info.contrastText,
}))

const AgeDisplay = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}))

function View() {
  const { setStore, store } = useContext(StoreContext)
  const [renderCount, setRenderCount] = useState(0)
  const [isRendering, setIsRendering] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    setRenderCount((prev) => prev + 1)
    setIsRendering(true)
    const timer = setTimeout(() => setIsRendering(false), 500)
    return () => clearTimeout(timer)
  }, [store])

  return (
    <StyledCard isRendering={isRendering}>
      <Fade in={isRendering}>
        <RenderIndicator label={`Render #${renderCount}`} size="small" />
      </Fade>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h5" color="primary" flex={1}>
            View Component
          </Typography>
          <IconButton
            size="small"
            onClick={() => setShowInfo(!showInfo)}
            color="info"
          >
            <InfoIcon />
          </IconButton>
        </Box>

        <Fade in={showInfo}>
          <Alert
            severity="info"
            sx={{ mb: 2, display: showInfo ? 'flex' : 'none' }}
          >
            This component subscribes to the entire store context. Any change in
            the context will trigger a re-render, even if this component doesn't
            use that specific value.
          </Alert>
        </Fade>

        <Typography variant="body2" color="text.secondary" paragraph>
          Current user: {store.name || 'No name'}
        </Typography>

        <AgeDisplay>
          <Typography variant="h2" color="primary">
            {store.age}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Current Age
          </Typography>
        </AgeDisplay>

        <Stack spacing={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setStore({ age: store.age + 1 })}
          >
            Increase Age
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="large"
            fullWidth
            startIcon={<PersonOffIcon />}
            onClick={() => setStore({ name: null })}
          >
            Clear Name
          </Button>
        </Stack>

        <Box sx={{ mt: 3 }}>
          <ViewChild />
        </Box>
      </CardContent>
    </StyledCard>
  )
}

export default memo(View)
