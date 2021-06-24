import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useEffect, useState } from 'react';



const RadiusContainer = styled(Input)`
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #eaf2fe;
  height: 40px;
  align-items: center;
  width: 400px;
`;

function ColorRadiusContainer(props) {
  const [inputVal, setInputVal] = React.useState('');
  
  const handleChange = (e) => {
    setInputVal(e.target.value);
    props.setData(e.target.value);
  };

  useEffect(() => {
    console.log(inputVal);
  }, [inputVal]);

  return (
    <div>
      <RadiusContainer
        onChange={handleChange}
        disableUnderline="true"
        placeholder="제목을 입력해주세요."
        
      ></RadiusContainer>
    </div>
  );
}

export default ColorRadiusContainer;
