import styled from 'styled-components';

const GreyBox = styled.div`
  width: 100%;
  height: 40%;
  flex-shrink: 0;

  padding: 20px;

  border-radius: 10px;
  background: var(--Basic-GrayScale-Gray-200, #efefef);
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 12px;
`;

const WhiteBox = styled.div`
  width: 100%;
  height: 70%;
  flex-shrink: 0;

  padding: 20px;
  border-radius: 10px;
  background: var(--Basic-White, #fff);
`;

const ToDetailButton = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  cursor: pointer;

  color: var(--Basic-White, #fff);
  text-align: center;

  /* Button1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */

  border-radius: 10px;
  background: var(--Color-Primary, #01d281);
`;

const RepairIngBox = () => {
  const result01 = ['', '', ''];
  return (
    <GreyBox>
      <div className="h1" style={{ textAlign: 'left', margin: '0px 0px 10px 10px' }}>
        진행중인 수리
      </div>
      <RowWrapper style={{ gap: '15px', justifyContent: 'left' }}>
        {result01.map((item, index) => (
          <div key={index}>
            <WhiteBox>
              <ColumnWrapper>
                <div className="h2" style={{ textAlign: 'left' }}>
                  서울특별시 동작구 상도로 369
                </div>
                <div className="body2" style={{ color: '#3C66FF', textAlign: 'left' }}>
                  문/창문 수리
                </div>
                <RowWrapper style={{ justifyContent: 'left', gap: '12px' }}>
                  <div className="body2" style={{ color: '#1F1F1F' }}>
                    요청날짜
                  </div>
                  <div className="body1" style={{ color: '#1F1F1F' }}>
                    2024. 11. 20
                  </div>
                </RowWrapper>
              </ColumnWrapper>
              <div style={{ width: '100%', height: '25px' }} />
              <ToDetailButton>자세히 보기</ToDetailButton>
            </WhiteBox>
          </div>
        ))}
      </RowWrapper>
    </GreyBox>
  );
};

export default RepairIngBox;
