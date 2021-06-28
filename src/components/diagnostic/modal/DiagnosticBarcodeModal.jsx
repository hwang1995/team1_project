import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Modal, Backdrop, IconButton } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import bwipjs from 'bwip-js';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';

import { setDiagnosticModal } from 'redux/features/diagnostic/diagnosticSlice';

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

const DiagnosticBarcodeModal = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();

  const isOpened = useSelector((state) => state.diagnostic.modalStatus.barcode);
  const [barcodeUrl, setBarcodeUrl] = useState('');
  const handleClose = () =>
    dispatch(
      setDiagnosticModal({
        name: 'barcode',
        status: false,
      }),
    );

  useEffect(() => {
    const canvas = document.createElement('canvas');
    bwipjs.toCanvas(canvas, {
      bcid: 'hibccode128',
      text: new Date().getTime().toString(),
      scale: 4,
      height: 10,
      includetext: true,
      textxalign: 'center',
    });
    setBarcodeUrl(canvas.toDataURL('image/png'));
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
            <ResponsiveContainer breakpoint={breakpoint} style={{ flex: 1 }}>
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
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                {barcodeUrl && (
                  <Fragment>
                    <img src={barcodeUrl} alt="barcode" width="100%" />
                    <img src={barcodeUrl} alt="barcode" width="100%" />
                  </Fragment>
                )}
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
