import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal_RequestDetail from '../components/Modal_RequestDetail';
import SeeDetailBtn from '../assets/SeeDetailBtn.png';
import HotImg_2 from '../assets/HotImg_2.jpeg';

const DetailBtn = styled.img`
  cursor: pointer;

  height: 24px;
  object-fit: cover;
`;

const WhiteBox = styled.div`
  display: flex;
  width: 50%;
  padding: 25px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  border-radius: 10px;
  border: 2px solid var(--Basic-GrayScale-Gray-200, #efefef);
  background: var(--Basic-White, #fff);
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RequestContentWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
`;

const DescriptionBox = styled.div`
  padding: 13px 15px;
  align-items: flex-start;
  align-self: stretch;

  border-radius: 6px;
  border: 1px solid var(--Basic-GrayScale-Gray-200, #efefef);
  background: var(--Basic-GrayScale-Gray-100, #fafafb);
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start gap 8px;
`;

const ImageBox = styled.div`
  display: flex;
  width: 50%;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
`;

const HotImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

const AddressText = styled.span`
  width:70%;
  font-family:'Pretendard-Medium';
  font-size: 14px;
  line-height: 20px;
  word-break: keep-all;
`;

const RepairBox = ({ data }) => {
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();

  const handleWrite = () => {
    navigate('/findRepair/write', {
      state: {
        requestId: data.request_id,
        category: data.category,
        created_at: data.created_at.slice(0, 10),
        address: data.address,
        description: data.request_description,
        schedule: data.request_schedule
      },
    });
    setModalState(false);
  };

  return (
    <WhiteBox>
      {modalState && (
        <Modal_RequestDetail handleClose={() => setModalState(false)} handleWrite={handleWrite} data={data} />
      )}
      <RowWrapper>
        <div className="h3">{data.address}</div>
        <DetailBtn onClick={() => setModalState(true)} src={SeeDetailBtn} />
      </RowWrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '10px',
        }}
      >
        <ImageBox>
          <RowWrapper style={{ width: '80%' }}>
            <HotImg src="/image33.png" />
            <HotImg src={HotImg_2} />
          </RowWrapper>
        </ImageBox>
        <RequestContentWrapper>
          <RowWrapper>
            <div className="button2">수리 분야</div>
            <div className="body2">{data.category}</div>
          </RowWrapper>
          <RowWrapper>
            <div className="button2">요청 날짜</div>
            <div>
              <div className="body2">{data.created_at.slice(0, 10)}</div>
            </div>
          </RowWrapper>
          <RowWrapper>
            <div className="button2">주소</div>
            <AddressText>{data.address}</AddressText>
          </RowWrapper>
          <ColumnWrapper>
            <div className="button2" style={{ textAlign: 'left', marginBottom: '8px' }}>
              증상 설명
            </div>
            <DescriptionBox style={{ width: '100%' }}>
              <div className="body2" style={{ textAlign: 'left', width: '100%', color: '#565656' }}>
                {data.request_description}
              </div>
            </DescriptionBox>
          </ColumnWrapper>
        </RequestContentWrapper>
      </div>
    </WhiteBox>
  );
};

export default RepairBox;
