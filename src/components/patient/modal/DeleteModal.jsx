import React, { Fragment } from 'react';
import { makeStyles, Modal, Backdrop, } from '@material-ui/core';
import SpringFade from 'components/common/fade/SpringFade';
import Grid from "@material-ui/core/Grid";
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

const DeleteModal = ({ deleteOpened, setDeleteOpened }) => {
  const classes = useStyles();
  const { breakpoint } = useWindowSize();

  const handleClose = () => setDeleteOpened(false);


  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={deleteOpened}
        onClose={() => handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <SpringFade in={deleteOpened}>
          <div
            className={classes.paper}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ResponsiveContainer breakpoint={breakpoint} style={{ flex: 1 }}>
              <DrawerHeader breakpoint={breakpoint}></DrawerHeader>
              <Grid contanier justify="center">
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <img
                    src="/assets/image/accept.png"
                    alt="accept"
                    width="50%"
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <h1>삭제가 완료되었습니다.</h1>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ textAlign: 'center', marginTop: '2em' }}
                >
                  <StyledButton width="50%" bgColor="#1E4C7C" color="white" onClick={handleClose}>
                    확인
                  </StyledButton>
                </Grid>
              </Grid>
            </ResponsiveContainer>
          </div>
        </SpringFade>
      </Modal>
    </Fragment>
  );
};

export default DeleteModal;
