import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const ClrButton = styled(Button)`
  background-color: ${(props) => props.setcolor};
`;

ClrButton.defaultProps = {
  setcolor: 'white',
};

export default ClrButton;
