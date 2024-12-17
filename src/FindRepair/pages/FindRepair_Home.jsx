import SideBar from '../../common/SideBar';
import Container from '../../common/StyledComponents/Container';
import ContentContainer from '../../common/StyledComponents/ContentContainer';
import TransparentContainer from '../../common/StyledComponents/TransparentContainer';
import RepairBox from './RepairBox';
import styled from 'styled-components';
import RepairListBox from './RepairListBox';
import RepairIngBox from './RepairIngBox';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RowWrapper = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const CenterWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const FindRepair_Home = () => {
  const [clickRepairRequest, setClickRepairRequest] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);

  const showRepairRequest = (id) => {
    setClickRepairRequest(id);
    
  };

  const getRepairList = async () => {
    try {
      const res = await axios.get('https://api.hotketokweb.shop/vendor/search');
      console.log(res.data);
      setFetchedData(res.data.slice().reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRepairList();
  }, []);

  return (
    <Container>
      <TransparentContainer />
      <SideBar />
      <ContentContainer>
        <div>
          {/* flex 연속 중첩으로 인한 자식 자동 늘어남 방지 div */}
          <div className="h1" style={{ margin: '0px 0px 15px 14px', textAlign: 'left' }}>
            수리 찾기
          </div>
          <RowWrapper>
            {clickRepairRequest !== null ? (
              <RepairBox data={fetchedData[clickRepairRequest]} />
            ) : (
              <CenterWrapper className="h3"> 오른쪽에 있는 요청서들을 클릭해보세요!</CenterWrapper>
            )}
            <RepairListBox onEnter={showRepairRequest} data={fetchedData}/>
          </RowWrapper>
          <div style={{ width: '100%', height: '18px' }} />
          <RepairIngBox />
        </div>
      </ContentContainer>
    </Container>
  );
};

export default FindRepair_Home;
