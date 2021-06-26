import React, { Fragment } from 'react';
import {
  makeStyles,
  Modal,
  Backdrop,
  IconButton,
  Grid,
} from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';

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

const DeleteModal = ({
  isOpenModal,
  setOpenModal,
  member_id,
  member,
  setMember,
}) => {
  const classes = useStyles();
  const { breakpoint } = useWindowSize();

  const handleClose = () => {
    setOpenModal(false);
  };

  const deleteMember = () => {
    const index = member.findIndex((member) => member.member_id === member_id);
    member.splice(index, 1);
    setMember(member);
    alert('삭제되었습니다.');
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
                  임직원 삭제 {member_id}번 회원
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
              <div>
                <h2
                  style={{
                    marginBottom: '1rem',
                    marginLeft: '10rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  정말 삭제하겠습니까?
                </h2>
                <img
                  src="http://localhost:3000/image/dorge.jpg"
                  alt="Logo"
                  width="100%"
                  height="300px"
                />
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
                  bgColor="blue"
                  color="white"
                  width="60"
                  onClick={() => deleteMember()}
                  display="flex"
                >
                  확인
                </StyledButton>
                <StyledButton
                  bgColor="lightgray"
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
