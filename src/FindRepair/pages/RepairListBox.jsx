import styled from 'styled-components';

const GreyBox = styled.div`
  width: 47%;
  height: 350px;
  padding: 26px;

  overflow-y: scroll;

  border-radius: 10px;
  background: var(--Basic-GrayScale-Gray-200, #efefef);

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

const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; gap: 8px;
  width: 100%;
`;

const WhiteBox = styled.div`
  width: 100%;
  padding: 15px 23px;

  cursor: pointer;
  border-radius: 10px;
  border: 2px solid var(--Basic-GrayScale-Gray-200, #efefef);
  background: var(--Basic-White, #fff);
`;

const RepairListBox = ({ onEnter, data }) => {

  return (
    <GreyBox>
      <ColumnWrapper style={{ gap: ' 12px' }}>
        {data.map((item, index) => (
          <div key={index}>
            <WhiteBox onClick={() => onEnter(index)}>
              <RowWrapper>
                <ColumnWrapper style={{ gap: ' 12px' }}>
                  <div className="body1" style={{ textAlign: 'left' }}>
                    {item.address}
                  </div>
                  <div className="body2" style={{ color: '#3C66FF', textAlign: 'left' }}>
                    {item.category}
                  </div>
                </ColumnWrapper>
                <ColumnWrapper>
                  <div className="button1" style={{ textAlign: 'right' }}>
                    요청 날짜
                  </div>
                  <div className="body1" style={{ color: '#565656', textAlign: 'right' }}>
                    {item.created_at.slice(0,10)}
                    
                  </div>
                </ColumnWrapper>
              </RowWrapper>
            </WhiteBox>
          </div>
        ))}
      </ColumnWrapper>
    </GreyBox>
  );
};

export default RepairListBox;
