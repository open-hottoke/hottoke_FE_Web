import { RouterProvider, useLocation, useNavigate } from 'react-router-dom';
import router from './Router';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
