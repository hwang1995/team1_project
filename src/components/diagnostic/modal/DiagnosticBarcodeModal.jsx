import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Modal,
  Backdrop,
  IconButton,
  Button,
} from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import bwipjs from 'bwip-js';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';

import { setDiagnosticModal } from 'redux/features/diagnostic/diagnosticSlice';
import {
  changeStatusToRegisterWithMemberId,
  diagnosticChangeStatus,
} from 'apis/diagnosisInsepctionAPI';
import { sendMqttMessage } from 'apis/pushAPI';

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
 * * 진단 검사에서 바코드를 보고 출력하기 위한 Modal 컴포넌트 (Template)
 * @returns {JSX.Element} view
 * @author SUNG WOOK HWANG
 */
const DiagnosticBarcodeModal = () => {
  const classes = useStyles();

  // React-print의 instance를 저장하기 위한 Reference
  const componentRef = useRef();

  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };
  const isOpened = useSelector((state) => state.diagnostic.modalStatus.barcode);
  const diagTestId = useSelector((state) => state.diagnostic.currentDiagTestId);
  const diagnosticList = useSelector(
    (state) => state.diagnostic.currentDiagTestList,
  );

  const loginInfo = useSelector((state) => state.common.loginInfo);

  // 진단 검사의 정보를 토대로 바코드 이미지의 상태를 저장하기 위함.
  const [barcodeList, setBarcodeList] = useState([]);

  // 바코드 생성이 완료 되었는지의 상태를 저장하기 위함.
  const [isCompleted, setCompleted] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrintAndStatus = async () => {
    try {
      handlePrint();
      const { hospitalCode } = loginInfo;
      const { diagTestStatus } = diagnosticList[0];
      if (
        diagTestStatus === 'DIAGNOSTIC_REGISTER' ||
        diagTestStatus === 'DIAGNOSTIC_COMPLETED'
      ) {
        console.log('그냥 출력만 할거입니다.');
        return;
      }
      // 1. 진단 검사의 상태를 진행중으로 바꿔준다.
      await diagnosticChangeStatus({
        status: 'register',
        diagTestId,
      });

      // 2. 진단 검사 상세의 상태를 진행중으로 바꿔준다.

      const sendInfo = diagnosticList.map(({ diagTestRecordId }) => {
        const inspectorMemberId = loginInfo.memberId;
        return {
          diagTestRecordId,
          inspectorMemberId,
        };
      });

      await changeStatusToRegisterWithMemberId(sendInfo);

      const sendMessageInfo = {
        topic: `/${hospitalCode}/inspector`,
        priority: 'success',
        message: `진단 검사의 상태가 접수로 변경되었습니다.`,
      };
      await sendMqttMessage(sendMessageInfo);
      // handleAlert('success', '진단 검사의 상태가 접수로 변경되었습니다.');
    } catch (error) {
      const { message } = error.response.data;
      handleAlert('error', message);
    }
  };

  const handleClose = () =>
    dispatch(
      setDiagnosticModal({
        name: 'barcode',
        status: false,
      }),
    );

  /**
   * Modal이 열렸을 시에 (effect) 바코드를 생성하고 보여주기 위한 side-effect
   */
  useEffect(() => {
    if (isOpened) {
      setCompleted(false);

      // eslint-disable-next-line array-callback-return
      diagnosticList.map(({ presCode, presVessel }, index) => {
        const canvas = document.createElement('canvas');
        const today = moment(new Date()).format('YYMMDD');
        const barcodeText = `${diagTestId}-${presCode}-${presVessel.toUpperCase()}-${today}`;
        bwipjs.toCanvas(canvas, {
          bcid: 'hibccode128',
          text: barcodeText,
          scale: 4,
          height: 10,
          includetext: true,
          textxalign: 'center',
        });

        if (index === 0) {
          setBarcodeList([canvas.toDataURL('image/png')]);
        } else {
          setBarcodeList((prevState) => {
            const newState = prevState;
            newState.push(canvas.toDataURL('image/png'));
            return newState;
          });
        }
      });
      setCompleted(true);
      // setBarcodeUrl(canvas.toDataURL('image/png'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);
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
            <ResponsiveContainer
              breakpoint={breakpoint}
              style={{ flex: 1 }}
              className="printArea"
            >
              <DrawerHeader breakpoint={breakpoint}>
                <StyledTypography variant="h5" component="h5" weight={7}>
                  바코드 출력
                </StyledTypography>
                <div>
                  <IconButton onClick={handleClose}>
                    <AiOutlineClose size={24} />
                  </IconButton>
                </div>
              </DrawerHeader>
              <div
                style={{
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handlePrintAndStatus()}
                >
                  프린트 하기
                </Button>
              </div>

              <div
                style={{
                  display: 'block',
                  // justifyContent: 'center',
                  // flexDirection: 'column',
                  height: '30vh',
                  minHeight: '300px',
                  overflowY: 'scroll',
                }}
              >
                <div ref={componentRef}>
                  {isCompleted &&
                    barcodeList &&
                    barcodeList.map((url, index) => (
                      <div
                        key={'barcode' + index}
                        style={{
                          padding: '0.5rem',
                        }}
                      >
                        <img src={url} alt="barcode" width="100%" />
                      </div>
                    ))}
                </div>

                {/* {barcodeUrl && (
   
                )} */}
              </div>

              {/* <canvas id="barcodeCanvas"></canvas> */}
            </ResponsiveContainer>
          </div>
        </SpringFade>
      </Modal>
    </Fragment>
  );
};

export default DiagnosticBarcodeModal;
