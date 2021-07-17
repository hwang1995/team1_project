import React, { Fragment } from 'react';
import { makeStyles, Modal, Backdrop, IconButton } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';
import { deleteMember } from 'apis/memberAPI';

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

const DeleteModal = ({ isOpenModal, setOpenModal, memberData, showMember }) => {
  const classes = useStyles();
  const { breakpoint } = useWindowSize();
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const removeMember = async () => {
    try {
      const { data, status } = await deleteMember(memberData.memberId);
      console.log(data);
      console.log(memberData.memberId);
      handleAlert('success', '삭제되었습니다.');
      showMember();
    } catch (error) {
      handleAlert('error', '삭제도중 오류가 발생하였습니다.');
    }
    setOpenModal(false);
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
                <StyledTypography variant="h5" component="h5" weight={7}>
                  임직원 삭제 - {memberData.memberName}님
                </StyledTypography>
                <div>
                  <IconButton>
                    <AiOutlineClose
                      size={24}
                      onClick={() => setOpenModal(false)}
                    />
                  </IconButton>
                </div>
              </DrawerHeader>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <StyledTypography variant="h4" component="h5" weight={6}>
                  정말 삭제하겠습니까?
                </StyledTypography>

                <div
                  style={{
                    maxWidth: '300px',
                    display: 'flex',
                  }}
                >
                  <img
                    src="http://localhost:3000/assets/image/question.jpeg"
                    alt="deleteImg"
                    width="100%"
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: '1rem',
                  marginBottom: '1rem',
                  marginLeft: '12rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledButton
                  bgColor="rgb(11, 83, 151)"
                  color="white"
                  width="60"
                  onClick={() => removeMember()}
                  display="flex"
                >
                  확인
                </StyledButton>
                <StyledButton
                  bgColor="rgba(165, 10, 17, 0.637)"
                  color="white"
                  width="60"
                  onClick={() => setOpenModal(false)}
                >
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
