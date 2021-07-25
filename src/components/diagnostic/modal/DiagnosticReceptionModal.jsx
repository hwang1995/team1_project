import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Modal,
  Backdrop,
  IconButton,
  Grid,
  Button,
} from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';

import { setDiagnosticModal } from 'redux/features/diagnostic/diagnosticSlice';
import {
  changeStatusToPendingWithMemberId,
  diagnosticChangeStatus,
} from 'apis/diagnosisInsepctionAPI';

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

/**
 * * 진단 검사에서 접수 취소를 클릭시에 나오는 Modal 컴포넌트 (Template)
 * @returns {JSX.Element} view
 * @author SUNG WOOK HWANG
 */
const DiagnosticReceptionModal = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();

  const isOpened = useSelector(
    (state) => state.diagnostic.modalStatus.reception,
  );
  const diagTestId = useSelector((state) => state.diagnostic.currentDiagTestId);
  const diagnosticList = useSelector(
    (state) => state.diagnostic.currentDiagTestList,
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const handleClose = () =>
    dispatch(
      setDiagnosticModal({
        name: 'reception',
        status: false,
      }),
    );

  const handleReceptionCancel = async () => {
    try {
      // 1. 진단 검사 상세의 상태를 대기로 바꾼다.
      await diagnosticChangeStatus({
        status: 'pending',
        diagTestId,
      });
      // 2. 진단 검사의 상태를 대기로 바꾼다.
      const sendInfo = diagnosticList.map(({ diagTestRecordId }) => ({
        diagTestRecordId,
        diagTestValue: 0,
        inspectorMemberId: null,
      }));

      console.log(sendInfo);

      await changeStatusToPendingWithMemberId(sendInfo);
      handleAlert('success', '접수의 상태가 대기로 변경되었습니다.');
      handleClose();
      // 3. 끝났다고 알려준다.
    } catch (error) {
      const { message } = error.response.data;
      handleAlert('error', message);
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
        BackdropProps={{ timeout: 500 }}
      >
        <SpringFade in={isOpened}>
          <div
            className={classes.paper}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <ResponsiveContainer breakpoint={breakpoint} style={{ flex: 1 }}>
              <DrawerHeader breakpoint={breakpoint}>
                <StyledTypography variant="h5" component="h5" weight={7}>
                  접수 취소
                </StyledTypography>
                <div>
                  <IconButton onClick={handleClose}>
                    <AiOutlineClose size={24} />
                  </IconButton>
                </div>
              </DrawerHeader>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <img
                    src="/assets/image/question.jpeg"
                    width="100%"
                    alt="question"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <StyledTypography variant="h5" component="h5" weight={7}>
                    정말로 진단 검사를{' '}
                  </StyledTypography>
                  <StyledTypography variant="h5" component="h5" weight={7}>
                    취소하시나요?
                  </StyledTypography>
                  <div
                    style={{
                      marginTop: '1rem',
                      display: 'flex',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        minWidth: '6rem',
                        marginRight: '0.5rem',
                      }}
                      onClick={() => handleReceptionCancel()}
                    >
                      네
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        minWidth: '6rem',
                        marginRight: '0.5rem',
                      }}
                      onClick={handleClose}
                    >
                      아니요
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </ResponsiveContainer>
          </div>
        </SpringFade>
      </Modal>
    </Fragment>
  );
};

export default DiagnosticReceptionModal;
