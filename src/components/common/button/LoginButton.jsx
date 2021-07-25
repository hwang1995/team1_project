import { Button } from '@material-ui/core';
import styled from 'styled-components';

/**
 * 로그인 버튼 컴포넌트 (Atom)
 * @author SUNG WOOK HWANG
 */
const LoginButton = styled(Button)`
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-family: 'Lato';
  border-radius: 0.7rem;
  /* padding: 0.6rem; */
  color: ${({ islogined }) => (islogined !== 'false' ? '#1E4C7C' : 'black')};
  font-weight: 900;
  width: 6rem;
  font-size: 1rem;
`;

export default LoginButton;
