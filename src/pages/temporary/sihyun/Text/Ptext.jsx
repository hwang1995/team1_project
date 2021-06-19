import styled from 'styled-components';

const Ptext = styled.p`
  font-size: ${(props) => props.textsize || '0.9em'};
  font-weight: ${(props) => props.fontweight || "600"};
  
`;

export default Ptext;
