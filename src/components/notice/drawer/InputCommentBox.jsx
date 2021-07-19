import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { useSnackbar } from 'notistack';
import AddIcon from '@material-ui/icons/Add';
import { addComment } from 'apis/noticeAPI';

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

const InputCommentBox = ({
  setInputComment,
  placeholder,
  noRemove,
  memberId,
  noticeId,
  memberName,
  setChanged,
}) => {
  const [inputVal, setInputVal] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleAdd = async (event) => {
    try {
      setInputComment(inputVal);
      const sendInfo = {
        createdDate: '2021-12-24T03:13',
        comment: inputVal,
        memberId,
        memberName,
        noticeId,
      };
      console.log('sendInfo : ', sendInfo);
      if (inputVal === '') {
        handleAlert('error', '값이 입력되지 않았습니다.');
        return;
      }
      await addComment(sendInfo);
      setInputVal('');
      handleAlert('success', '등록이 완료되었습니다.');
      setChanged(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

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

  return (
    <Fragment>
      <SearchContainer>
        <SearchBase
          value={inputVal}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <IconButton type="submit" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </SearchContainer>
    </Fragment>
  );
};

export default InputCommentBox;
