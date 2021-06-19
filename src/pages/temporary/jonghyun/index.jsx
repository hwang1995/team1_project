import React, { useState } from 'react';
import ColoredButton from './components/ColoredButton';
import { GoSearch } from 'react-icons/go';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import { AiOutlineClose } from 'react-icons/ai';
import clsx from 'clsx';
import {
  Avatar,
  Button,
  createMuiTheme,
  Divider,
  Grid,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import TableCode from './components/TableCode';
import DenseTable from './components/patientTable';

// 입력전용 부모 컴포넌트
const InputDiv = styled.div`
  width: 300px;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 60px;
  border: 2px solid lightgray;
`;

//Drawer 한묶음
const DrawerContent = styled('div')({
  border: (props) => props.border,
  height: 100,
  display: 'flex',
  background: (props) => props.bg_color || 'black',
  padding: 20,
});

const testP = styled('p')({
  display: 'flex',
});

//환자 정보
const PatientInfo = styled('p')({
  fontSize: 30,
  fontWeight: 'bold',
  margin: 20,
});

//drawer 헤더
const DrawerHeader = styled('div')({
  display: 'flex',
  padding: 20,
});

//drawer창 제목
const DrawerTitle = styled('h1')({
  width: 300,
  marginTop: 20,
  height: 50,
});

//drawer 종료버튼
const DrawerExitButton = styled(AiOutlineClose)({
  align: 'center',
});

const Profile = styled('div')({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

//이미지
const PatientImage = styled(Avatar)({
  display: 'flex',
  height: 50,
  width: 50,
  margin: 20,
});

// drawer창 크기 조정
const useStyles = makeStyles({
  list: {
    width: 500,
  },
  fullList: {
    width: 'auto',
  },
});

// 메인
const JonghyunPage = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  //anchor,open => event
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

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <drawerIn name="drawerInfo">
        <div style={{ width: '100%' }}>
          <DrawerHeader>
            <DrawerTitle>환자 상세정보</DrawerTitle>
            <DrawerExitButton size={30} />
          </DrawerHeader>
          <DrawerContent bg_color="#f1f3f5">
            <PatientImage src="http://localhost:3000/image/dorge.jpg" />
            <Profile>
              <p>김도지 / 남자</p>
              <p>2013-12-05</p>
            </Profile>
          </DrawerContent>
          <PatientInfo>연락처</PatientInfo>
          <PatientInfo>몸무게</PatientInfo>
          <PatientInfo>키</PatientInfo>
          <PatientInfo>주소</PatientInfo>
          <List>
            {['연락처', '몸무게', '키', '주소'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
                <Button>asd</Button>
              </ListItem>
            ))}
          </List>
        </div>
      </drawerIn>
    </div>
  );

  return (
    <>
      <div>
        <p>환자,임직원 관리</p>
        <p>버튼 컴포넌트</p>
        <hr />

        <ColoredButton
          bg_color="#1E4C7C"
          hv_color="navy"
          onClick={toggleDrawer('right', true)}
        >
          더보기
        </ColoredButton>
        <hr />

        <ColoredButton bg_color="#fb8500" hv_color="orange" width="250px">
          환자 정보 변경하기
        </ColoredButton>
        <hr />

        <ColoredButton bg_color="#fb8500" hv_color="orange" width="250px">
          환자 정보 수정
        </ColoredButton>
        <hr />

        <ColoredButton
          size="small"
          color="gray"
          bg_color="white"
          border="5px solid gray"
        >
          주소 찾기
        </ColoredButton>
        <hr />

        <ColoredButton bg_color="#1E4C7C" hv_color="navy">
          검색
        </ColoredButton>
        <hr />

        <ColoredButton bg_color="#2A64F6" hv_color="blue">
          추가
        </ColoredButton>
        <hr />

        <ColoredButton bg_color="#fb8500" hv_color="orange">
          변경
        </ColoredButton>
        <hr />

        <ColoredButton bg_color="#d90429" hv_color="red">
          삭제
        </ColoredButton>
        <hr />

        <ColoredButton bg_color="#DDB892" hv_color="#99582a">
          취소
        </ColoredButton>
        <hr />

        <ColoredButton
          size="small"
          color="gray"
          bg_color="white"
          border="5px solid gray"
        >
          중복 체크
        </ColoredButton>
        <hr />

        <ColoredButton bg_color="#2A64F6" width="250px" hv_color="blue">
          직원 추가
        </ColoredButton>
        <hr />

        <ColoredButton bg_color="#fb8500" hv_color="orange" width="250px">
          직원 정보 변경
        </ColoredButton>
        <hr />

        <ColoredButton bg_color="#2A64F6" width="200px" hv_color="blue">
          추가 진행하기
        </ColoredButton>
      </div>

      <div>
        <p>입력 컴포넌트</p>
        <InputDiv>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GoSearch size={25} />
                </InputAdornment>
              ),
            }}
            placeholder="환자 이름을 입력해주세요."
            fullWidth
          />
        </InputDiv>
        <hr />

        <InputDiv>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GoSearch size={25} />
                </InputAdornment>
              ),
            }}
            placeholder="임직원 이름을 입력해주세요."
            fullWidth
          />
        </InputDiv>
        <hr />

        <Input placeholder="나머지 텍스트 입력 필드들" fullWidth />
        <hr />
      </div>

      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>

      <TableCode />
    </>
  );
};

// 종현
// - 임직원 관리
//     - 임직원 검색
//     - 임직원 추가
//     - 임직원 상세 보기
//     - 임직원 수정
//     - 임직원 삭제
// - 환자 관리
//     - 환자 검색
//     - 환자 상세 보기
//     - 환자 정보 변경하기

export default JonghyunPage;
