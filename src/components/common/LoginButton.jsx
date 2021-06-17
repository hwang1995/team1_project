import { Button } from '@material-ui/core';
import styled from 'styled-components';

const LoginButton = styled(Button)`
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-family: 'Lato';
  border-radius: 0.7rem;
  /* padding: 0.6rem; */
  color: ${({ isLogined }) => (isLogined ? '#1E4C7C' : 'black')};
  font-weight: 900;
  width: 6rem;
  font-size: 1rem;
`;

export default LoginButton;
