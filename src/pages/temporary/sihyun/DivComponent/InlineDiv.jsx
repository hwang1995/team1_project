import styled from 'styled-components';


const InlineDiv = styled.div`
  padding: 0.5em 0.5em 0.4em 1em;
  color: black;
  border: ${props => {
    if(props.bordervalue === "true"){
      return '1px solid black';
    }else{
      return "none";
    }
  }};
  border-radius: 30px;
  display: inline-block;
  margin-right: 1em;
;
`;

export default InlineDiv;