import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const ClrButton = styled(Button)`
  display: flex;
  background-color: ${(props) => props.setcolor};
  
  & + & {
    margin-left: 0.5rem;
  }
`;

ClrButton.defaultProps = {
  setcolor: 'white',
};

export default ClrButton;
