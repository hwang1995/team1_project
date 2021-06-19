import styled from 'styled-components';
import Input  from '@material-ui/core/Input';

const InputComponent = styled(Input)`
  color: black;
  border: ${(props) => {
    if (props.bordervalue ==="true") {
      return '1px solid black';
    } else {
      return 'none';
    }
  }};
  border-radius: 12px;
  margin-left: 0.6em;
  padding-left: ${(props) => {
    if (props.paddingvalue === "true") {
      return '1em';
    } else {
      return '0em';
    }
  }};
  font-size: 0.8em;
  text-align: center;
  width: ${({ widthvalue }) => widthvalue || '16em'};
`;

export default InputComponent;