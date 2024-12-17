import styled, { css } from 'styled-components';
import WriteBtn from '../assets/WriteBtn.png';
import HotImg_2 from '../assets/HotImg_2.jpeg';
import { useEffect, useState } from 'react';
import { transformDate } from '../../functions/transformDate';

const OverLay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
`;

const Modal = styled.div`
  width: 70%;
  height: 90%;

  padding: 40px;

  border-radius: 30px;
  background-color: #ffffff;
`;

const WriteButton = styled.img`
  width: 120px;
  object-fit: cover;

  cursor: pointer;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WholeRowWrapper = styled(RowWrapper)`
  display: flex;
  gap: 10px;
`;

const RequestContentWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
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

const HotImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

const TimeContainer = styled.div`
  width: 40%;
`;

const Title = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: left;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

const SmallFont = styled.div`
  color: var(--GrayScale-Gray-600, #565656);
  text-align: center;

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */

  word-break: keep-all;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2.75px;
`;

const TimeSlot = styled.div`
  width: 26px;
  height: 32px;

  background-color: ${props => (props.selected ? '#01D281' : '#EAF6F5')};

  text-align: center;
  border-radius: 2.533px;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.selected ? '#148F77' : '#D3EDEE')};
  }
`;

const TimeSlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeText = styled.div`
  color: var(--GrayScale-Gray-600, #565656);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  width: 100%;
  text-align: left;
  color: ${props => (props.selected ? '#01D281' : '#000')};
`;

const times = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
];

// handleClose: 일반 닫기
// handleWrite: 작성 페이지로 이동
const Modal_RequestDetail = ({ handleClose, handleWrite, data }) => {
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      dates.push(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
      // `${new Date.getMonth() + 1}/${new Date.getDate()} (${getWeekday(new Date)})`
    }
    return dates;
  };

  const [selectedTimes, setSelectedTimes] = useState([]); // 날짜별 선택 상태
  const dates = generateDates(); // 동적으로 날짜 생성

  // const toggleTime = (date, time) => {
  //   setSelectedTimes(prev => {
  //     // 기존 날짜의 시간 배열을 찾음
  //     const dateEntry = prev.find(entry => entry.date === date);

  //     if (dateEntry) {
  //       // 날짜가 이미 존재하면 해당 날짜의 시간 배열 수정
  //       const isSelected = dateEntry.times.includes(time);
  //       const updatedTimes = isSelected
  //         ? dateEntry.times.filter(t => t !== time) // 선택 해제
  //         : [...dateEntry.times, time]; // 선택 추가

  //       return updatedTimes.length > 0
  //         ? prev.map(entry => (entry.date === date ? { ...entry, times: updatedTimes } : entry))
  //         : prev.filter(entry => entry.date !== date); // 시간 배열이 비었으면 삭제
  //     } else {
  //       // 날짜가 존재하지 않으면 새로 추가
  //       return [...prev, { date, times: [time] }];
  //     }
  //   });
  // };

  useEffect(() => {
    setSelectedTimes(Object.entries(data.request_schedule));
  }, []);

  console.log(selectedTimes);


  return (
    <OverLay>
      <Modal>
        <RowWrapper>
          <RowWrapper style={{ width: '26%' }}>
            <div className="h2">요청서 상세</div>
            <WriteButton src={WriteBtn} onClick={handleWrite} />
          </RowWrapper>
          <img src="/Xbutton.png" style={{ cursor: 'pointer' }} onClick={handleClose} />
        </RowWrapper>
        <div style={{ width: '100%', height: '30px' }} />
        <WholeRowWrapper>
          <RequestContentWrapper>
            <RowWrapper>
              <div className="button2">수리 분야</div>
              <div className="h3">{data.category}</div>
            </RowWrapper>
            <div style={{ width: '100%' }}>
              <div className="button2" style={{ textAlign: 'left' }}>
                요청 날짜
              </div>
              <RowWrapper>
                <div />
                <div className="body2" style={{ justifyContent: 'right' }}>
                  {data.created_at.slice(0, 10)}
                </div>
              </RowWrapper>
            </div>
            <RowWrapper>
              <div className="button2">주소</div>
              <div className="h3">{data.address}</div>
            </RowWrapper>
            <div>
              <div className="button2" style={{ textAlign: 'left' }}>
                증상 사진
              </div>
              <RowWrapper style={{ justifyContent: 'left', gap: '5px' }}>
                <HotImg src="/image33.png" width="20%" />
                <HotImg src={HotImg_2} width="20%" />
              </RowWrapper>
            </div>

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
          <TimeContainer>
            <Title style={{ fontSize: '12px' }}>오늘</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {dates.map(date => (
                <div key={date}>
                  <SmallFont style={{ textAlign: 'left', color: '#1F1F1F' }}>{transformDate(date)}</SmallFont>
                  <TimeGrid>
                    {times.map((time, index) => (
                      <TimeSlotContainer key={time}>
                        <TimeSlot
                          selected={selectedTimes.find(entry => entry[0] === date)?.[1].includes(time)}
                          
                        />
                        <TimeText selected={selectedTimes[date]?.includes(time)}>{time}</TimeText>
                      </TimeSlotContainer>
                    ))}
                  </TimeGrid>
                </div>
              ))}
            </div>
          </TimeContainer>
        </WholeRowWrapper>
      </Modal>
    </OverLay>
  );
};

export default Modal_RequestDetail;
