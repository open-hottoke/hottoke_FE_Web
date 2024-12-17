import Container from '../../common/StyledComponents/Container';
import TransparentContainer from '../../common/StyledComponents/TransparentContainer';
import SideBar from '../../common/SideBar';
import ContentContainer from '../../common/StyledComponents/ContentContainer';
import styled from 'styled-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HotImg_2 from '../assets/HotImg_2.jpeg';
import { transformDate } from '../../functions/transformDate';
import axios from 'axios';

const RepairDetail = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;

  width: 39%;
  margin-right: 0.5%;

  scrollbar-width: 10px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #9a9a9a; /* 스크롤바 색상 */
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 1); /*스크롤바 뒷 배경 색상*/
  }
`;

const RepairWrite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: 2px solid #dedede;
  height: 100vh;
  width: 60%;
  overflow-y: hidden;

  padding-left: 40px;
`;

const RequestContentWrapper = styled.div`
  display: flex;
  width: 95%;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const WriteWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;

  flex-grow: 1;
`;

const InputMoney = styled.input`
  display: flex;
  width: 100%;
  height: 44px;
  padding: 13px 15px;
  align-items: flex-start;
  gap: 10px;

  border-radius: 6px;
  border: 1px solid var(--Basic-GrayScale-Gray-300, #dedede);
  background: var(--Basic-GrayScale-Gray-100, #fafafb);

  color: var(--Basic-GrayScale-Gray-800, #1f1f1f);

  outline: none;
  /* Body2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

const SelectDateButton = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding: 0px 4px;
  opacity: ${props => (props.selected ? '1' : '0.7')};
  border-radius: 6px;
  border: 1px solid var(--Color-Primary, #01d281);
  background-color: ${props => (props.selected ? '#01D281' : '#fff')};
  color: ${props => (props.selected ? '#fff' : '#01D281')};
  /* Button2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */

  cursor: pointer;
`;

const SelectTimeButton = styled.div`
  display: flex;
  width: 80px;
  height: 34px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 30px;

  opacity: ${props => (props.selected ? '1' : '0.7')};
  border: 1px solid var(--Color-Primary, #01d281);
  background-color: ${props => (props.selected ? '#01D281' : '#fff')};
  color: ${props => (props.selected ? '#fff' : '#01D281')};

  text-align: center;

  /* Button2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */

  cursor: pointer;
`;

const InputComment = styled.textarea`
  display: flex;
  width: 100%;
  height: 178px;
  padding: 13px 15px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  border-radius: 6px;
  border: 1px solid var(--Basic-GrayScale-Gray-300, #dedede);
  background: var(--Basic-GrayScale-Gray-100, #fafafb);

  color: var(--Basic-GrayScale-Gray-800, #1f1f1f);

  outline: none;

  /* Body2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

const SendButton = styled.div`
  display: flex;
  width: 240px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  cursor: pointer;

  border-radius: 10px;
  opacity: ${props => (props.state === 'active' ? '1' : '0.3')};
  background: var(--Color-Primary, #01d281);

  color: var(--Basic-White, #fff);
  text-align: center;

  /* Button1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;

const HotImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

const FindRepair_Write = () => {
  const location = useLocation();

  console.log(location.state);
  const requestId = location.state.requestId;
  const category = location.state.category;
  const created_at = location.state.created_at;
  const address = location.state.address;
  const description = location.state.description;
  const schedule = location.state.schedule;
  console.log(schedule);

  // 1. 견적 금액
  const [amount, setAmount] = useState(''); // 견적 금액 입력 상태
  const handleAmountChange = e => setAmount(e.target.value);
  // 2. 방문 날짜
  const [selectedDate, setSelectedDate] = useState('');
  const visitDates = Object.keys(schedule);

  // 3. 방문 시간
  const [selectedTime, setSelectedTime] = useState('');
  const visitTimes = Object.values(schedule);

  // 날짜에 따른 시간 렌더링
  const selectedIndex = visitDates.indexOf(selectedDate);
  const timesOnSelectedDate = visitTimes[selectedIndex] || [];

  // 4. 견적 코멘트
  const [comment, setComment] = useState('');
  const handleCommentChange = e => setComment(e.target.value);

  // 5. 견적서 보내기 버튼 클릭
  const navigate = useNavigate();
  

  const postEstimate = async () => {
    try {
    const res = await axios.post('https://api.hotketokweb.shop/vendor/estimate', {
      request_id: requestId,
      estimate_price: amount,
      estimate_time: `${selectedDate}, ${selectedTime}`,
      additional_comment: comment,
    });
    console.log(res); alert("견적서가 전송되었습니다."); navigate('/findRepair');}
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ background: '#ffffff' }}>
      <TransparentContainer />
      <SideBar />
      <ContentContainer style={{ display: 'flex', flexDirection: 'row' }}>
        <RepairDetail>
          {/* 수리 요청서 섹션 */}
          <div className="h2" style={{ textAlign: 'left' }}>
            수리요청서
          </div>
          <div style={{ height: '30px' }} />
          <RequestContentWrapper>
            <RowWrapper>
              <div className="button2">수리 분야</div>
              <div className="h3">{category}</div>
            </RowWrapper>
            <div style={{ width: '100%' }}>
              <div className="button2" style={{ textAlign: 'left' }}>
                요청 날짜
              </div>
              <RowWrapper>
                <div />
                <div className="body2" style={{ justifyContent: 'right' }}>
                  {created_at}
                </div>
              </RowWrapper>
            </div>
            <RowWrapper>
              <div className="button2">주소</div>
              <div className="h3">{address}</div>
            </RowWrapper>
            <div>
              <div className="button2" style={{ textAlign: 'left' }}>
                증상 사진
              </div>
              <RowWrapper style={{ justifyContent: 'right', gap: '2px' }}>
                <HotImg src="/image33.png" />
                <HotImg src={HotImg_2} />
              </RowWrapper>
            </div>

            <ColumnWrapper>
              <div className="button2" style={{ textAlign: 'left', marginBottom: '8px' }}>
                증상 설명
              </div>
              <DescriptionBox style={{ width: '100%' }}>
                <div className="body2" style={{ textAlign: 'left', width: '100%', color: '#565656' }}>
                  {description}
                </div>
              </DescriptionBox>
            </ColumnWrapper>
          </RequestContentWrapper>
        </RepairDetail>
        <RepairWrite>
          {/* 견적서 작성하기 섹션 */}
          <WriteWrapper>
            <div className="h2" style={{ textAlign: 'left' }}>
              견적서 작성하기
            </div>
            {/* 1. 견적 금액*/}
            <div style={{ width: '100%' }}>
              <div className="h3" style={{ textAlign: 'left', marginBottom: '10px' }}>
                견적 금액
              </div>
              <RowWrapper>
                <InputMoney
                  placeholder="견적 금액을 입력해 주세요"
                  value={amount}
                  onChange={handleAmountChange}
                  style={{ margin: '0px 7px 0px 0px' }}
                />
                <div className="h3">원</div>
              </RowWrapper>
            </div>

            {/* 2. 방문 날짜*/}
            <div style={{ width: '100%' }}>
              <div className="h3" style={{ textAlign: 'left', marginBottom: '10px' }}>
                방문날짜
              </div>
              <RowWrapper style={{ justifyContent: 'left', gap: '5px' }}>
                {visitDates.slice().reverse().map((date, index) => (
                  <SelectDateButton key={index} selected={selectedDate === date} onClick={() => setSelectedDate(date)}>
                    {transformDate(date)}
                  </SelectDateButton>
                ))}
              </RowWrapper>
            </div>

            {/* 3. 방문 시간*/}
            <div style={{ width: '100%' }}>
              <div className="h3" style={{ textAlign: 'left', marginBottom: '10px' }}>
                방문 시간
              </div>
              <RowWrapper style={{ justifyContent: 'left', gap: '5px' }}>
                {timesOnSelectedDate.map((time, index) => (
                  <SelectTimeButton key={index} selected={selectedTime === time} onClick={() => setSelectedTime(time)}>
                    {time}
                  </SelectTimeButton>
                ))}
              </RowWrapper>
            </div>

            {/* 4. 견적 코멘트*/}
            <div style={{ width: '100%' }}>
              <div className="h3" style={{ textAlign: 'left', marginBottom: '10px' }}>
                견적 코멘트
              </div>
              <InputComment
                value={comment}
                onChange={handleCommentChange}
                placeholder="수리에 대해 추가로 남길 말씀을 작성해주세요."
              />
            </div>
          </WriteWrapper>

          <RowWrapper>
            <div />
            <SendButton
              state={amount && selectedDate && selectedTime && comment ? 'active' : null}
              onClick={amount && selectedDate && selectedTime && comment ? postEstimate : null}
            >
              견적서 보내기
            </SendButton>
          </RowWrapper>
        </RepairWrite>
      </ContentContainer>
    </Container>
  );
};

export default FindRepair_Write;
