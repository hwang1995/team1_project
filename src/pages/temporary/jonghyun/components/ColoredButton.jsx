import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const ColoredButton = styled(Button)`
  font-weight: bold;
  margin: 5px 10px;
  border-radius: 60px;
  color: ${(props) => props.color || 'white'};
  background-color: ${(props) => props.bg_color || 'black'};
  padding: 7px 14px;
  &:hover {
    background-color: ${(props) => props.hv_color};
  }
  border: ${(props) => props.border};
  width: ${(props) => props.width};
`;

export default ColoredButton;
