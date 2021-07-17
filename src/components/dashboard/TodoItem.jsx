import moment from 'moment';
import {
  MdRemoveCircleOutline,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';
import React, { useState } from 'react';
import styled from 'styled-components';
// import Divider from '@material-ui/core/Divider';
import { ListItem, IconButton } from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import DeleteTodoModal from 'pages/dashboard/front/modal/DeleteTodoModal';
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

const TodoItem = ({ data, setChanged, loginMemberId }) => {
  // console.log(data);
  const { todoContent, createdDate, todoId, memberId, memberName } = data;
  const [isOpenModal, setOpenModal] = useState(false);
  const [isChecked, setChecked] = useState(data.checked);
  const handleModify = async () => {
    try {
      console.log(data.todoId);
      if (isChecked) {
        await modifyCheckedOut(todoId);
        setChecked((prevState) => !prevState);
        return;
      }
      await modifyCheckedIn(data.todoId);
      setChecked((prevState) => !prevState);
      return;
      // await modifyCheckedOut(todoId);
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
                style={{ flex: 9, textDecoration: 'line-through' }}
              >
                {todoContent}
              </div>
            ) : (
              <div className="text" style={{ flex: 9 }}>
                {todoContent}
              </div>
            )}
            {/* <MdCheckBox /> */}
            {memberId === loginMemberId ? (
              <div style={{ flex: 1 }}>
                <IconButton onClick={handleModify}>
                  {isChecked ? (
                    <MdCheckBox style={{ color: '#ff6b6b' }} />
                  ) : (
                    <MdCheckBoxOutlineBlank style={{ color: '#ff6b6b' }} />
                  )}
                </IconButton>
              </div>
            ) : (
              <div style={{ flex: 1 }}></div>
            )}

            {/* <MdCheckBox style={{marginRight: "11px"}}/> */}
            {/* {todoContent} */}
          </div>
        </StyledTypography>

        {/* <Divider className="divider" /> */}
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
              {moment(createdDate).format('YY-MM-DD a h:mm')}
            </StyledTypography>
            <StyledTypography
              variant="subtitle1"
              component="span"
              weight={2}
              className="text-margin"
            >
              |
            </StyledTypography>

            {/* <span className="text-margin">|</span> */}
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
              style={{ flex: 1 }}
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
