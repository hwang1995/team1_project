import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { useSnackbar } from 'notistack';
import AddIcon from '@material-ui/icons/Add';

const SearchContainer = styled.div`
  padding: 0.5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background-color: aliceblue;
`;

const SearchBase = styled(InputBase)`
  margin-left: 8px;
  flex: 1;
  font-family: 'Spoqa Han Sans Neo', 'Noto Sans KR', sans-serif;
  font-weight: 700;
`;

const InputCommentBox = ({ setInputComment, placeholder, noRemove }) => {
  const [inputVal, setInputVal] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };
  const handleChange = (event) => {
    setInputVal(event.target.value);
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (key === 'Enter' && inputVal) {
      setInputComment(inputVal);
      if (noRemove === undefined) {
        setTimeout(() => {
          setInputVal('');
        }, 10);
      }
    } else if (key === 'Enter' && !inputVal) {
      handleAlert('error', '값이 존재하지 않습니다.');
    }
  };

  const handleClick = () => {
    if (inputVal === '') {
      handleAlert('error', '값이 입력되지 않았습니다.');

      return;
    }
    setInputComment(inputVal);
    if (noRemove === undefined) {
      setTimeout(() => {
        setInputVal('');
      }, 10);
    }
  };

  return (
    <Fragment>
      <SearchContainer>
        <SearchBase
          value={inputVal}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <IconButton type="submit" onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </SearchContainer>
    </Fragment>
  );
};

// const SearchBox = styled(InputBase)`
//   width: 100%;
//   border-radius: 2px;
//   padding-left: 4px;
//   padding-right: 4px;
//   font-family: 'Lato', 'Noto Sans KR', sans-serif;
//   border: 0.5px solid #868e96;
// `;

export default InputCommentBox;