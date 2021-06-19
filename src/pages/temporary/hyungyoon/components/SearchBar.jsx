import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GrSearch } from 'react-icons/gr';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  }
}));

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

  const classes = useStyles();

  return (
    <div>
      <RadiusContainer
        onChange={handleChange}
        disableUnderline="true"
        placeholder="제목을 입력해주세요."
        className={classes.margin}
        startAdornment={
          <InputAdornment position="start">
            <GrSearch
              style={{
                margin: 10,
              }}
            />
          </InputAdornment>
        }
      ></RadiusContainer>
    </div>
  );
}

export default ColorRadiusContainer;
