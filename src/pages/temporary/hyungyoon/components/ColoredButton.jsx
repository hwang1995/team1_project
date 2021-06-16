import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const ColoredButton = styled(Button)`
  background-color: ${(props) => props.color || 'black'};
  /* background-color: #6772e5; */
`;

export default ColoredButton;
