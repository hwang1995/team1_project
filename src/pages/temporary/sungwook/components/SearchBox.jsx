import React, { Fragment, useState } from 'react';
import { useTheme } from '@material-ui/styles';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { AiOutlineSearch } from 'react-icons/ai';

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
  font-family: 'Lato', 'Noto Sans KR', sans-serif;
  font-weight: 700;
`;

const SearchBox = ({ setSearchVal }) => {
  const [inputVal, setInputVal] = useState('');

  const handleChange = (event) => {
    setInputVal(event.target.value);
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (key === 'Enter' && inputVal) {
      setSearchVal(inputVal);
    } else if (key === 'Enter' && !inputVal) {
      alert('값이 존재하지 않습니다.');
    }
  };

  const handleClick = () => {
    if (inputVal === '') {
      alert('공백입니다. 나중에 띄우자.');
      return;
    }
    setSearchVal(inputVal);
  };
  return (
    <Fragment>
      <SearchContainer>
        <SearchBase
          placeholder="약 이름을 입력해주세요."
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <IconButton type="submit" onClick={handleClick}>
          <AiOutlineSearch />
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

export default SearchBox;
