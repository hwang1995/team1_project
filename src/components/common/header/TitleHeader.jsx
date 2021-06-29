import styled from 'styled-components';

const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;

  span:first-child {
    font-weight: 700;
    font-size: 1.8rem;
    margin-right: 1rem;
  }

  span:nth-child(2) {
    font-size: 1.8rem;
    font-weight: 300;
  }
`;

export default TitleHeader;
