import { Box, Container, Paper, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'

import Friends from './Friends'
import StoreProvider from './Store'
import View from './View'

const store = {
  name: 'jack',
  age: 34,
  friends: ['mark', 'james', 'martin'],
}

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}))

const HeaderSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}))

const ContentSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: '60vh',
}))

const DemoGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}))

function Context() {
  return (
    <PageContainer maxWidth="lg">
      <HeaderSection elevation={0}>
        <Typography variant="h3" component="h1" gutterBottom>
          React Context API Demo
        </Typography>
        <Typography variant="h6">
          Learn how React Context API manages state and handles re-renders
        </Typography>
      </HeaderSection>

      <ContentSection elevation={3}>
        <Typography variant="h5" gutterBottom color="primary">
          Interactive Context Demo
        </Typography>
        <Typography variant="body1" paragraph>
          This demo showcases how Context API propagates state changes and
          triggers re-renders. Watch the render indicators to understand when
          components re-render.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <StoreProvider initialState={store}>
          <DemoGrid>
            <Friends />
            <View />
          </DemoGrid>
        </StoreProvider>
      </ContentSection>
    </PageContainer>
  )
}

export default Context
