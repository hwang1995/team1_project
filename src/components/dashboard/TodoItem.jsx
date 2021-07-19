import moment from 'moment';
import {
  MdRemoveCircleOutline,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ListItem, IconButton } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import DeleteTodoModal from 'components/todo/modal/DeleteTodoModal';
import { modifyCheckedOut, modifyCheckedIn } from 'apis/todoAPI';

const NoticeContainer = styled.div`
  border: 0.25px solid rgba(0, 0, 0, 0.12);
  padding: 0.75rem;
  width: 100%;

  .title,
  .divider {
    margin-bottom: 0.25rem;
  }

  .description {
    margin-top: 0.25rem;
    display: flex;
    .text-margin {
      margin-left: 0.4rem;
    }
  }
`;

/**
 * 이 페이지 컴포넌트는 할 일(TODO)의 리스트를 보여주는 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - TodoItem
 * @returns {JSX.Element}
 * @author HYEONG YUN KIM
 */
const TodoItem = ({ data, setChanged, loginMemberId }) => {
  // 부모 컴포넌트에서 받은 TODO의 data  
  const { todoContent, createdDate, todoId, memberId, memberName } = data;
  // DeleteTodoDrawer의 Open 여부를 설정하기 위한 State
  const [isOpenModal, setOpenModal] = useState(false);
  // Checked 여부를 설정하기 위한 State
  const [isChecked, setChecked] = useState(data.checked);

  // Checked의 상태를 수정하기 위한 함수
  const handleModify = async () => {
    try {
      // Checked의 상태값이 True일 경우
      if (isChecked) {
        await modifyCheckedOut(todoId);
        // 이전의 상태값(boolean)으로 변경
        setChecked((prevState) => !prevState);
        return;
      }
      await modifyCheckedIn(data.todoId);
      // 이전의 상태값(boolean)으로 변경
      setChecked((prevState) => !prevState);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ListItem>
      <NoticeContainer>
        <StyledTypography
          variant="h5"
          component="h5"
          weight={5}
          className="title"
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isChecked ? (
              <div
                className="text"
                style={{ flex: 9, textDecoration: 'line-through', textDecorationColor: 'rgb(255, 107, 107)'
              }}
              >
                {todoContent}
              </div>
            ) : (
              <div className="text" style={{ flex: 9 }}>
                {todoContent}
              </div>
            )}
            {memberId === loginMemberId ? (
              <div
                style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}
              >
                <IconButton onClick={handleModify}>
                  {isChecked ? (
                    <MdCheckBox size={20} style={{ color: '#ff6b6b' }} />
                  ) : (
                    <MdCheckBoxOutlineBlank
                      size={20}
                      style={{ color: '#ff6b6b' }}
                    />
                  )}
                </IconButton>
              </div>
            ) : (
              <div style={{ flex: 1 }}></div>
            )}
          </div>
        </StyledTypography>
        <div
          className="description"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div className="text" style={{ flex: 9 }}>
            <StyledTypography variant="subtitle1" component="span" weight={4}>
              작성일자 :
            </StyledTypography>

            <StyledTypography
              variant="subtitle1"
              component="span"
              weight={2}
              className="text-margin"
            >
              {moment(createdDate).subtract(1, 'months').format('YY-MM-DD')}
            </StyledTypography>
            <StyledTypography
              variant="subtitle1"
              component="span"
              weight={2}
              className="text-margin"
            >
              |
            </StyledTypography>
            <StyledTypography
              variant="subtitle1"
              component="span"
              weight={4}
              className="text-margin"
            >
              작성자 :
            </StyledTypography>

            <StyledTypography
              variant="subtitle1"
              component="span"
              weight={2}
              className="text-margin"
            >
              {memberName}
            </StyledTypography>
          </div>
          {memberId === loginMemberId ? (
            <div
              style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}
              onClick={() => {
                setOpenModal((prevState) => !prevState);
              }}
            >
              <DeleteTodoModal
                isOpenModal={isOpenModal}
                setOpenModal={setOpenModal}
                todoId={todoId}
                setChanged={setChanged}
              />
              <IconButton>
                <MdRemoveCircleOutline size={20} style={{ color: '#ff6b6b' }} />
              </IconButton>
            </div>
          ) : (
            <div style={{ flex: 1 }}></div>
          )}
        </div>
      </NoticeContainer>
    </ListItem>
  );
};

export default React.memo(TodoItem);
