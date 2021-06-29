import styled from 'styled-components';

const ContainerDiv = styled.div`
  border: 1px solid black;
  width: ${props => props.widthvalue || "40%"};
  padding: 0.5em;
  margin: 0.5em;
`;

export default ContainerDiv;