import styled from 'styled-components';
import Button from '@material-ui/core/Button';


const ColoredButton = styled(Button)`
  /* background: linear-gradient(45deg, #cbc0f5 10%, ${(props) =>
    props.color} 75%); */
  background: ${(props) => props.color};
  border: 0;
  border-radius: 15px;
  /* box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3); */
  color: ${(props) => props.fontcolor || 'white'};
  font-weight: bolder;
  height: 40px;
  padding: 0 30px;
  margin-left: 15px;
  margin-top: 5px;
  align-items: center;
`;

export default ColoredButton;

