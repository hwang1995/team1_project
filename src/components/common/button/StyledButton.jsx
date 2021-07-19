import styled from 'styled-components';
import Button from '@material-ui/core/Button';

/**
 * 버튼의 색상을 여러가지로 입력 가능한 컴포넌트 (Atom)
 * 사용법 : <StyledButton width={120} bgColor="red" color="red"/>
 * width는 버튼의 폭을 설정할 수 있으며
 * bgColor는 배경 색을 설정할 수 있으며
 * color는 글자의 색을 설정할 수 있습니다.
 * @author SUNG WOOK HWANG
 */
const StyledButton = styled(Button)`
  width: ${({ width }) => width};
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  background-color: ${({ bgColor }) => bgColor || 'purple'};
  color: ${({ color }) => color};

  & + & {
    margin-left: 0.5rem;
  }
`;

StyledButton.defaultProps = {
  width: '100%',
  color: 'default',
};

export default StyledButton;
