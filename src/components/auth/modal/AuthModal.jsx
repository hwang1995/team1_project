import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthToken,
  setHeaderInfo,
  setLoginInfo,
} from 'redux/features/common/commonSlice';
import {
  makeStyles,
  Modal,
  Backdrop,
  IconButton,
  Grid,
  InputBase,
  Button,
  Hidden,
} from '@material-ui/core';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { RiHospitalLine, RiLockPasswordLine } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import { useSnackbar } from 'notistack';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import useInput from 'hooks/useInput';
import { getAuthentication } from 'apis/authAPI';
import { addAuthHeader } from 'apis/axiosConfig';

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

const InputBox = styled.div`
  display: flex;
  align-items: center;
  border: 1.75px solid #74c0fc;
  border-radius: 6px;
  /* background-color: #e9ecef; */
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;

  .icon-area {
    height: 30px;
    display: flex;
    align-items: center;
    padding-right: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;

    border-right: 1.35px solid #74c0fc;
  }

  .input-area {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 0.8rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-family: --apple-system, BlinkMacSystemFont, 'Spoqa Han Sans Neo',
      'Lato';
    font-weight: 400;
  }
`;

const AuthModal = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();

  const history = useHistory();

  const hospitalCode = useInput('');
  const memberEmail = useInput('');
  const memberPw = useInput('');
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 2000,
    });
  };

  const isOpened = useSelector((state) => state.common.headerInfo.auth);
  const handleClose = () =>
    dispatch(
      setHeaderInfo({
        name: 'auth',
        status: false,
      }),
    );

  const handleLogin = async (e) => {
    const hospital = hospitalCode.value;
    const email = memberEmail.value;
    const password = memberPw.value;
    try {
      const { data } = await getAuthentication({
        hospitalCode: hospital,
        memberEmail: email,
        memberPw: password,
      });

      const { authToken, ...rest } = data;

      addAuthHeader(authToken);

      dispatch(setAuthToken(authToken));
      dispatch(setLoginInfo(rest));

      sessionStorage.setItem('authToken', authToken);
      sessionStorage.setItem('userInfo', JSON.stringify(rest));

      handleAlert('success', '로그인에 성공하였습니다.');

      handleClose();
      history.push('/dashboard');
    } catch (error) {
      // alert(error.response);
      const { message } = error.response.data;
      handleAlert('error', message);
    }
  };
  const handleKeyPress = async (event) => {
    const { key } = event;

    const hospital = hospitalCode.value;
    const email = memberEmail.value;
    const password = memberPw.value;
    if (key === 'Enter' && hospital && email && password) {
      try {
        const { data } = await getAuthentication({
          hospitalCode: hospital,
          memberEmail: email,
          memberPw: password,
        });

        const { authToken, ...rest } = data;

        addAuthHeader(authToken);

        dispatch(setAuthToken(authToken));
        dispatch(setLoginInfo(rest));

        sessionStorage.setItem('authToken', authToken);
        sessionStorage.setItem('userInfo', JSON.stringify(rest));

        handleAlert('success', '로그인에 성공하였습니다.');

        handleClose();
        history.push('/dashboard');
      } catch (error) {
        // alert(error.response);
        const { message } = error.response.data;
        handleAlert('error', message);
      }
    } else if (key === 'Enter' && !hospital && !email && !password) {
      handleAlert('error', '값을 올바르게 채워주세요.');
    }
  };
  return (
    <Fragment>
      <Modal
        className={classes.modal}
        open={isOpened}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <SpringFade in={isOpened}>
          <div
            className={classes.paper}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <ResponsiveContainer
              breakpoint={breakpoint}
              style={{ flex: 1 }}
              onKeyPress={handleKeyPress}
            >
              <DrawerHeader breakpoint={breakpoint}>
                <StyledTypography variant="h5" component="h5" weight={7}>
                  로그인
                </StyledTypography>
                <div>
                  <IconButton onClick={() => handleClose()}>
                    <AiOutlineClose size={24} />
                  </IconButton>
                </div>
              </DrawerHeader>

              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{
                    padding: '0.5rem',
                  }}
                >
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={5}
                    style={{
                      marginTop: '1rem',
                    }}
                  >
                    병원 코드
                  </StyledTypography>
                  <InputBox>
                    <div className="icon-area">
                      <RiHospitalLine size={24} color="black" />
                    </div>
                    <InputBase
                      // type="text"
                      className="input-area"
                      {...hospitalCode}
                      autoCapitalize="true"
                    />
                  </InputBox>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={5}
                  >
                    이메일
                  </StyledTypography>
                  <InputBox>
                    <div className="icon-area">
                      <HiOutlineMail size={24} color="black" />
                    </div>
                    <InputBase
                      type="email"
                      className="input-area"
                      {...memberEmail}
                    />
                  </InputBox>
                  <StyledTypography
                    variant="subtitle1"
                    component="h5"
                    weight={5}
                  >
                    비밀번호
                  </StyledTypography>
                  <InputBox>
                    <div className="icon-area">
                      <RiLockPasswordLine size={24} color="black" />
                    </div>
                    <InputBase
                      type="password"
                      className="input-area"
                      {...memberPw}
                    />
                  </InputBox>

                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                      marginTop: '2rem',
                    }}
                    onClick={() => handleLogin()}
                  >
                    로그인
                  </Button>
                </Grid>
                <Grid
                  item
                  sm={6}
                  style={{
                    padding: '0.5rem',
                  }}
                >
                  <Hidden xsDown>
                    <img
                      src="/assets/image/dashboard_1.png"
                      alt="random"
                      width="100%"
                    />
                  </Hidden>
                </Grid>
              </Grid>
            </ResponsiveContainer>
          </div>
        </SpringFade>
      </Modal>
    </Fragment>
  );
};

export default AuthModal;
