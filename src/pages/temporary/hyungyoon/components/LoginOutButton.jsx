import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const LoginOutButton = styled(Button)`
  background: white;
  border: solid rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  font-weight: 1000;
  font-size: medium;
  padding: 0 30px;
  color: ${(props) => props.color || 'black'};
  height: 40px;
  
`;
  export default LoginOutButton;

