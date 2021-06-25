import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import notfoundhistory from '../resources/notfoundhistory.png';


import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from '@material-ui/core/TablePagination';
import treatmentHistory from '../resources/treatmentHistory.json';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const classes = useRowStyles();
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow classdate={classes.root}>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.symptom}</TableCell>
        <TableCell align="right">{row.drOpinion}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>의사 소견</TableCell>
                    <TableCell>{row.drOpinion}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>바이탈체크</TableCell>
                    <TableRow>
                      {row.vitalRecord ? (
                        <div></div>
                      ) : (
                        <div>
                          <img
                            src={notfoundhistory}
                            alt="Logo"
                            width="100"
                            style={{
                              display: 'flex',
                            }}
                          />
                          <TableCell>기록이 존재하지 않습니다.</TableCell>
                        </div>
                      )}
                    </TableRow>
                  </TableRow>
                  <TableRow>
                    <TableCell>약 처방 기록</TableCell>
                    <TableRow>
                      {row.medicineRecord ? (
                        <div></div>
                      ) : (
                        <div>
                          <img
                            src={notfoundhistory}
                            alt="Logo"
                            width="100"
                            style={{
                              display: 'flex',
                            }}
                          />
                          <TableCell>기록이 존재하지 않습니다.</TableCell>
                        </div>
                      )}
                    </TableRow>
                    <TableCell>주사 처방 기록</TableCell>
                    <TableRow>
                      {row.injectionRecord ? (
                        <div></div>
                      ) : (
                        <div>
                          <img
                            src={notfoundhistory}
                            alt="Logo"
                            width="100"
                            style={{
                              display: 'flex',
                            }}
                          />
                          <TableCell>기록이 존재하지 않습니다.</TableCell>
                        </div>
                      )}
                    </TableRow>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ patientName }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, treatmentHistory.length - page * rowsPerPage);

  const matchData = treatmentHistory.filter((data) =>
    data.patient_name.includes(patientName),
  );
  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {matchData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row key={row.patient_id} row={row} />
              ))}
          </TableBody>
          {emptyRows > 0 && (
            <TableRow style={{ height: emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={matchData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
