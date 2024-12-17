import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f6f6;

  /* 좌측 하단바와 내용물 flex로 배치 */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export default Container;
