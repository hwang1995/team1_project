import React, { useEffect, useState, Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SearchBar from './SearchBar';
import ColoredButton from './ColoredRadiusButton';
import CloseIcon from '@material-ui/icons/Close';
import { AiFillEdit } from 'react-icons/ai';
import AddEditer from '../../../../components/notice/drawer/AddEditer';
import ColorTable from '../utils/ColorTable';

function NoticeAddDrawer(props) {
  const [data, setData] = useState('');
  const [state, setState] = useState({
    right: false,
  });

  const handleChangePage = (event) => {};

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

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <ColoredButton
            onClick={toggleDrawer(anchor, true)}
            alignItems="center"
          >
            <AiFillEdit size={25}></AiFillEdit>
            글쓰기
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
                marginLeft: '35px',
                marginTop: '35px',
                marginBottom: '30px',
              }}
            >
              <h1
                style={{
                  fontWeight: 900,
                  flex: 1.5,
                }}
              >
                공지사항
              </h1>
              <CloseIcon onClick={toggleDrawer(anchor, false)} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '35px',
              }}
            >
              <h2
                style={{
                  fontWeight: '700',
                }}
              >
                제목
              </h2>
              <SearchBar
                style={{
                  marginTop: '10px',
                  marginLeft: '10px',
                }}
                setData={setData}
              />
            </div>
            <div
              style={{
                marginLeft: '35px',
              }}
            >
              <AddEditer />
            </div>
            <div
              style={{
                marginLeft: '20px',
                marginTop: '10px',
              }}
            >
              <ColoredButton color={ColorTable.color_add_info}>
                게시물 등록
              </ColoredButton>
              <ColoredButton color={ColorTable.color_info}>목록</ColoredButton>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default NoticeAddDrawer;
