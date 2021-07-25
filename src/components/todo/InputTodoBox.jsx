import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { useSnackbar } from 'notistack';
import AddIcon from '@material-ui/icons/Add';
import { createTodo } from 'apis/todoAPI';

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

/**
 * 이 페이지 컴포넌트는 할 일(TODO)을 작성하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - InputBox
 * @returns {JSX.Element}
 * @author HYEONG YUN KIM
 */
const InputBox = ({
  setTodoInput,
  placeholder,
  noRemove,
  memberName,
  memberId,
  hospitalCode,
  setChanged,
}) => {
  // 부모 컴포넌트(setTodoInput)로 입력한 inputVal을 보내준다.
  const [inputVal, setInputVal] = useState('');

  // 알림 셋팅
  const { enqueueSnackbar } = useSnackbar();
  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };
  // 할 일(TODO)을 추가하기 위한 함수
  const handleAdd = async (event) => {
    try {
      setTodoInput(inputVal);
      const sendInfo = {
        createdDate: new Date().toJSON(),
        todoContent: inputVal,
        memberId,
        hospitalCode,
        memberName,
      };
      if (inputVal === '') {
        handleAlert('error', '값이 입력되지 않았습니다.');
        return;
      }
      await createTodo(sendInfo);
      // 입력값을 비워주기
      setInputVal('');
      handleAlert('success', '등록이 완료되었습니다.');
      // 상태값이 변경되었음을 부모 컴포넌트로 보내준다.
      setChanged(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // 할 일의 입력값이 변할 경우 이를 inputVal에 셋팅한다.
  const handleChange = (event) => {
    setInputVal(event.target.value);
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (key === 'Enter' && inputVal) {
      setTodoInput(inputVal);
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

export default InputBox;
