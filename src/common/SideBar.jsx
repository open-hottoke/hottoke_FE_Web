import styled, { css } from 'styled-components';
import AlarmIcn from '../assets/AlarmIcn.png';
import DefaultProfile from '../assets/DefaultProfile.png';
import DashBoard from '../assets/Icn_dashBoard.png';
import My from '../assets/Icn_my.png';
import Repair from '../assets/Icn_repair.png';
import Search from '../assets/Icn_Search.png';
import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  height: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--Basic-White, #fff);
  overflow-y: auto;
  width: 15vw;
  min-width: 190px; //최소 너비를 절대적으로

  border-radius: 0px 20px 20px 0px;
  border: 2px solid var(--Basic-GrayScale-Gray-200, #efefef);
  box-shadow: 4px 0px 20px 0px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Header = styled.div`
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Header_Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  gap: 10px;
`;

const NavBar_Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const NavBar_Btn = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;

  padding: 15px 10px;
  margin: 5px 10px;
  border-radius: 10px;
  // 자체적으로 패딩 주어 잘 눌리게

  ${props =>
    props.state
      ? css`
          background-color: #efefef;
        `
      : css``}

  &:hover {
    background-color: #efefef;
  }
`;

const NavBar_Btn_Icn = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
`;

const NavBar_Btn_Text = styled.div`
  ${props =>
    props.state
      ? css`
          color: #1f1f1f;
        `
      : css`
          color: #9a9a9a;
        `}
`;

const SideBar = () => {
  const [activeNav, setActiveNav] = useState(3); // 초기 상태: 홈
  const location = useLocation(); // 현재 주소를 참조함
  const navigate = useNavigate();

  // 1: 대시보드 dashboard 2: 수리모아보기 allRepair 3: 수리찾기 findRepair 4: 마이페이지 myPage
  useEffect(() => {
    if (location.pathname.startsWith('/findRepair')) {
      setActiveNav(3);
    }
    // 지금은 /으로 들어와도 바로 수리 찾기 페이지로
    else {
      navigate('/findRepair');
      setActiveNav(3);
    }
    // else if (location.pathname.startsWith('/allRepair')) {
    //   setActiveNav(2);
    // } else if (location.pathname.startsWith('/myPage')) {
    //   setActiveNav(4);
    // } else if (location.pathname.startsWith('/dashboard')) {
    //   setActiveNav(1);
    // }
  }, [location]);

  return (
    <Container>
      <Header>
        <Header_Box>
          <img style={{ width: 25, objectFit: 'cover' }} src={DefaultProfile} />
          <div className="body2">
            <span className="h3">기술자</span>님, 환영해요
          </div>
        </Header_Box>
        <img style={{ width: 20, objectFit: 'cover' }} src={AlarmIcn} />
      </Header>
      <NavBar_Box>
        <Link to="/dashboard" className="nav-link" style={{ width: '100%' }}>
          <NavBar_Btn state={activeNav === 1}>
            <NavBar_Btn_Icn src={DashBoard} />
            <NavBar_Btn_Text state={activeNav === 1} className="h3">
              대시보드
            </NavBar_Btn_Text>
          </NavBar_Btn>
        </Link>
        <Link to="/allRepair" className="nav-link" style={{ width: '100%' }}>
          <NavBar_Btn state={activeNav === 2}>
            <NavBar_Btn_Icn src={Repair} />
            <NavBar_Btn_Text state={activeNav === 2} className="h3">
              수리 모아보기
            </NavBar_Btn_Text>
          </NavBar_Btn>
        </Link>
        <Link to="/findRepair" className="nav-link" style={{ width: '100%' }}>
          <NavBar_Btn state={activeNav === 3}>
            <NavBar_Btn_Icn src={Search} />
            <NavBar_Btn_Text state={activeNav === 3} className="h3">
              수리 찾기
            </NavBar_Btn_Text>
          </NavBar_Btn>
        </Link>
        <Link to="/myPage" className="nav-link" style={{ width: '100%' }}>
          <NavBar_Btn state={activeNav === 4}>
            <NavBar_Btn_Icn src={My} />
            <NavBar_Btn_Text state={activeNav === 4} className="h3">
              마이페이지
            </NavBar_Btn_Text>
          </NavBar_Btn>
        </Link>
      </NavBar_Box>
    </Container>
  );
};

export default SideBar;
