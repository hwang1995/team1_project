import styled from 'styled-components';
import Button from '@material-ui/core/Button';


const InformationButton = styled(Button)`
  background-color: ${({ name }) => name};
  color: ${({ textname }) => textname || 'white'};
  border-radius: 10px;
  height: ${(props) => props.heightvalue || 'auto'};
  width: ${(props) => props.widthvalue || '1em'};
  border: ${(props) =>
    props.bordervalue === 'true' ? '1px solid black' : 'none'};
  font-weight: 500;
`;

export default InformationButton;
