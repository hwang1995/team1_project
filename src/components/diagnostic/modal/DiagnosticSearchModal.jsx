import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Modal,
  Backdrop,
  IconButton,
  Grid,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { AiOutlineClose } from 'react-icons/ai';
import SpringFade from 'components/common/fade/SpringFade';
import StyledTypography from 'components/common/typography/StyledTypography';
import useWindowSize from 'hooks/useWindowSize';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { setDiagnosticModal } from 'redux/features/diagnostic/diagnosticSlice';
import SearchBox from 'components/common/search/SearchBox';

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

const DiagnosticSearchModal = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { breakpoint } = useWindowSize();

  const isOpened = useSelector((state) => state.diagnostic.modalStatus.search);

  const handleClose = () => {
    dispatch(
      setDiagnosticModal({
        name: 'search',
        status: false,
      }),
    );
  };

  const rows = [
    { id: 1, name: '정지훈', birth: '93-08-25' },
    { id: 2, name: '박지훈', birth: '95-11-16' },
    { id: 3, name: '김형윤', birth: '97-03-11' },
    { id: 4, name: '황성욱', birth: '99-04-25' },
    { id: 5, name: '홍종현', birth: '90-07-29' },
  ];

  const columns = [
    { field: 'id', headerName: '순번', width: 150 },
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'birth', headerName: '생년월일', width: 150 },
  ];

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
                  환자 검색
                </StyledTypography>
                <div>
                  <IconButton onClick={handleClose}>
                    <AiOutlineClose size={24} />
                  </IconButton>
                </div>
              </DrawerHeader>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <SearchBox />
                </Grid>
                <Grid item xs={12} style={{ marginTop: '2em' }}>
                  <div style={{ height: 300, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
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

export default DiagnosticSearchModal;
