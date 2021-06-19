import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const LogInOutButton = styled(Button)`
  background-color: white;
  color: ${({name}) => name || "black"};
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,1.2);
  margin-left: 10px;
  font-weight: 600;
  width: ${props => props.widthvalue || "100px"} 
`;


export default LogInOutButton;
