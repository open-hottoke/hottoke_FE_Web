import FindRepair_Home from './FindRepair/pages/FindRepair_Home';
import FindRepair_Write from './FindRepair/pages/FindRepair_Write';
import { createBrowserRouter } from 'react-router-dom';

// 1: 대시보드 dashboard 2: 수리모아보기 allRepair 3: 수리찾기 findRepair 4: 마이페이지 myPage
const router = createBrowserRouter([
  // 대시보드

  // 수리 모아보기

  // 수리 찾기
  {
    path: '/',
    element: <FindRepair_Home />,
  },
  {
    path: '/findRepair',
    element: <FindRepair_Home />,
  },
  {
    path: '/findRepair/write',
    element: <FindRepair_Write />,
  },

  // 마이페이지
]);

export default router;
