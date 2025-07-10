import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PersonIcon from '@mui/icons-material/Person'
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Box,
  Chip,
  Fade,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { memo, useContext, useEffect, useState } from 'react'

import StoreContext from './StoreContext'

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isRendering',
})(({ theme, isRendering }) => ({
  height: '100%',
  position: 'relative',
  transition: 'all 0.3s ease',
  border: isRendering
    ? `2px solid ${theme.palette.warning.main}`
    : '1px solid transparent',
  boxShadow: isRendering
    ? `0 0 20px ${theme.palette.warning.main}40`
    : theme.shadows[1],
}))

const RenderIndicator = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
}))

const FriendsList = styled(List)(({ theme }) => ({
  maxHeight: 300,
  overflow: 'auto',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
}))

function Friends() {
  const {
    setStore,
    store: { friends },
  } = useContext(StoreContext)
  const [renderCount, setRenderCount] = useState(0)
  const [isRendering, setIsRendering] = useState(false)

  useEffect(() => {
    setRenderCount((prev) => prev + 1)
    setIsRendering(true)
    const timer = setTimeout(() => setIsRendering(false), 500)
    return () => clearTimeout(timer)
  }, [friends])

  const handleAddFriend = () => {
    const newFriends = [...friends, rand()]
    setStore({ friends: newFriends })
  }

  return (
    <StyledCard isRendering={isRendering}>
      <Fade in={isRendering}>
        <RenderIndicator label={`Render #${renderCount}`} size="small" />
      </Fade>
      <CardContent>
        <Typography variant="h5" gutterBottom color="primary">
          Friends List Component
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This component subscribes to the friends array in context. Adding a
          friend triggers a re-render.
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Total Friends: {friends.length}
          </Typography>
        </Box>

        <FriendsList>
          {Array.isArray(friends) &&
            friends.map((friend, index) => (
              <Fade in key={index} timeout={300 * (index + 1)}>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={friend}
                    secondary={`Friend #${index + 1}`}
                  />
                </ListItem>
              </Fade>
            ))}
        </FriendsList>

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          startIcon={<GroupAddIcon />}
          onClick={handleAddFriend}
          sx={{ mt: 2 }}
        >
          Add Friend
        </Button>
      </CardContent>
    </StyledCard>
  )
}

function rand() {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

export default memo(Friends)
