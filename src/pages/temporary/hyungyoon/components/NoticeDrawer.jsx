import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AddIcon from '@material-ui/icons/Add';
import ColorTable from '../utils/ColorTable';
import ColoredButton from './ColoredRadiusButton';
import CloseIcon from '@material-ui/icons/Close';
import FontColorTable from '../utils/FontColorTable';
import SearchBar from './SearchBar';
import notice from '../resources/notice.json';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import doctorface from '../resources/doctorface.png';
import styled from 'styled-components';
import hell from '../resources/hell.jpg';
import NoticeAddDrawer from '../components/NoticeAddDrawer';

const NoticeItem = styled.div`
  display: flex;

  .left-side {
    margin-left: 15px;
    padding: 10px;
    display: flex;
    flex: 2;
    flex-direction: column;
    .avatar-container {
      display: flex;
      flex-direction: row;
      margin: 0.5rem;
      flex: 2;
      align-items: center;
      font-weight: 600;
    }
    .textTitle-container {
      margin-left: 15px;
      font-weight: 750;
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
    .textContent-container {
      margin-left: 15px;
      margin-bottom: 10px;
      color: gray;
    }
    .textDate-container {
      margin-left: 15px;
      color: rgb(107, 104, 104);
    }
  }
  .right-side {
    flex: 1;
  }
`;

function Row(props) {
  const { row } = props;
  return (
    <React.Fragment>
      <NoticeItem>
        <div className="left-side">
          <div className="avatar-container">
            <img src={doctorface} alt="Logo" width="25" />
            <h4 style={{ marginLeft: '5px' }}>Dr {row.notice_writer}</h4>
          </div>
          <div className="textTitle-container">
            <TableRow align="left">{row.notice_title}</TableRow>
          </div>
          <div className="textContent-container">
            <TableRow align="left">{row.notice_content}</TableRow>
          </div>
          <div className="textDate-container">
            <TableRow align="left">{row.notice_date}</TableRow>
          </div>
        </div>
        <div className="right-side">
          <img src={hell} alt="Logo" width="100%" />
        </div>
      </NoticeItem>
    </React.Fragment>
  );
}

function DrawerComponent2(props) {
  const [data, setData] = useState('');
  const [state, setState] = useState({
    right: false,
  });

  // const handleClick = () => {
  //   setInputVal(data);
  // };

  const matchData = notice.filter((notice) =>
    notice.notice_title.includes(data),
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, notice.length - page * rowsPerPage);

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <ColoredButton
            fontcolor={FontColorTable.color_moresee}
            onClick={toggleDrawer(anchor, true)}
            alignItems="center"
          >
            <AddIcon /> 더보기
          </ColoredButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '2rem',
              }}
            >
              <h1
                style={{
                  fontWeight: 900,
                  flex: 1,
                }}
              >
                공지사항
              </h1>
              <CloseIcon onClick={toggleDrawer(anchor, false)} />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '1rem',
              }}
            >
              <ColoredButton
                color={ColorTable.color_add_info}
                style={{
                  marginRight: '10px',
                }}
              >
                <NoticeAddDrawer />
              </ColoredButton>
              <SearchBar
                setData={setData}
                style={{
                  marginTop: '10px',
                }}
              />
              {/* <ColoredButton
                color={ColorTable.color_info}
                style={{
                  marginBottom: '8px',
                  marginLeft: '10px',
                }}
                // onClick={handleClick}
              >
                검색
              </ColoredButton> */}
            </div>

            <Paper>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableBody>
                    {matchData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row) => (
                        <Row key={matchData.notice_id} row={row} />
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
                count={notice.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default DrawerComponent2;
