import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, CircularProgress } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Suspense fallback={<CircularProgress />}>
          {routing}
        </Suspense>
      </ThemeProvider>
    </RecoilRoot>
  );;
}

export default App;
