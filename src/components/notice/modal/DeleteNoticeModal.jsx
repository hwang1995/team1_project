import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveStep } from 'redux/features/notice/noticeSlice';
import { makeStyles, Modal, Backdrop, IconButton } from '@material-ui/core';
import { AiOutlineClose, AiOutlineCheckCircle } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { useSnackbar } from 'notistack';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';
import { removeComments, removeNotice } from 'apis/noticeAPI';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
  },
  paper: {
    minHeight: '400px',
    minWidth: '400px',
    maxWidth: '920px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.12)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

/**
 * 목적 : 공지사항의 게시글을 삭제하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * DeleteModal
 * @returns 
 * 성공: True, 실패: False
 * @author HYEONG YUN KIM
 */
const DeleteModal = ({ isOpenModal, setOpenModal, noticeId, comment }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { breakpoint } = useWindowSize();
  // 알람 셋팅
  const { enqueueSnackbar } = useSnackbar();
  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  // 취소 버튼 클릭시 Modal의 상태값을 false로 바꿔준다.
  const handleClose = () => {
    setOpenModal(false);
  };

  
  // 삭제 버튼 클릭시 해당 공지사항의 댓글을 먼저
  // 그리고 공지사항을 삭제한다.
  const handleRemoveNotice = async (event) => {
    try {
      if(comment.length !== 0) {
        await removeComments(noticeId);
      }
      await removeNotice(noticeId);
      handleAlert('success', '삭제가 완료되었습니다.');
      dispatch(setActiveStep('DELETE'));
    } catch (error) {      
      console.log(error.response);
    }
  };

  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={isOpenModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          justifyContent: 'center',
        }}
      >
        <SpringFade in={isOpenModal}>
          <div
            className={classes.paper}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <ResponsiveContainer breakpoint={breakpoint} style={{ flex: 1 }}>
              <DrawerHeader breakpoint={breakpoint}>
              
                <div>
                  <IconButton>
                    <AiOutlineClose size={24} onClose={handleClose} />
                  </IconButton>
                </div>
              </DrawerHeader>
              <div>
                <h2
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <StyledTypography
                    style={{
                      fontWeight: '800',
                      fontSize: '2.25rem',
                    }}
                  >
                    정말로 삭제하겠습니까?
                  </StyledTypography>
                  <img style={{border: "5px solid", borderColor: "rgba(0,0,0,0.1)"}}
                  src="/assets/image/notFound.png" alt="Logo" width="50%" />
                </h2>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '1rem'

                }}
              >
                <StyledButton
                  bgColor="rgb(8,78,127)"
                  color="white"
                  width="150px"
                  onClick={handleRemoveNotice}
                >
                  <AiOutlineCheckCircle style={{ marginRight: '5px' }} />
                  확인
                </StyledButton>
                <StyledButton
                  bgColor="rgb(216,89,56)"
                  color="white"
                  width="150px"
                  onClose={handleClose}
                >
                  <BsFillTrashFill style={{ marginRight: '5px' }} />
                  취소
                </StyledButton>
              </div>
            </ResponsiveContainer>
          </div>
        </SpringFade>
      </Modal>
    </Fragment>
  );
};

export default DeleteModal;
