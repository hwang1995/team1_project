import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  width: ${({ width }) => width};
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  background-color: ${({ bgColor }) => bgColor || 'purple'};
  color: ${({ color }) => color};
`;

StyledButton.defaultProps = {
  width: '100%',
  color: 'default',
};

export default StyledButton;
