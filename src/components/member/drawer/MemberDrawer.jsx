import React, { Fragment, useEffect, useState } from 'react';
import {
  SwipeableDrawer,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import {
  setModalStatus,
  setAddressInfo,
} from 'redux/features/member/memberSlice';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';

import useWindowSize from 'hooks/useWindowSize';
import StyledInputBase from 'components/common/input/StyledInputBase';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';
import PostalCodeModal from '../modal/PostalCodeModal';

const MemberDrawer = ({ isOpened, setOpened }) => {
  const { breakpoint } = useWindowSize();
  const [selectVal, setSelectVal] = useState('의사');
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const dispatch = useDispatch();

  const isModalOpened = useSelector((state) => state.member.modalStatus);
  const { member_postal, member_addr1 } = useSelector(
    (state) => state.member.addressInfo,
  );

  useEffect(() => {
    if (breakpoint !== undefined) {
      console.log('Current breakpoint is', breakpoint);
    }
  }, [breakpoint]);

  //fuction(open){function(e){}}
  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
  };

  //submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // 이메일 정규 표현식
    const regExpEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // 비밀번호 정규 표현식
    // 숫자, 특수문자 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
    const regExpPw =
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

    // 생년월일 정규 표현식 (1995-08-10 이런식으로 입력해줘야 됨.)
    const regExpBirth =
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    let member_authority = '';
    if (selectVal === '병원장') {
      member_authority = 'ROLE_ADMIN';
    } else if (selectVal === '의사') {
      member_authority = 'ROLE_DOCTOR';
    } else if (selectVal === '간호사') {
      member_authority = 'ROLE_NURSE';
    } else if (selectVal === '검사자') {
      member_authority = 'ROLE_INSPECTOR';
    }

    const member_email = event.target.memberEmail.value;
    const member_pw = event.target.memberPassword.value;
    const member_name = event.target.memberName.value;
    const member_birth = event.target.memberBirth.value;
    const member_postal = event.target.memberAddress1.value;
    const member_addr1 = event.target.memberAddress2.value;
    const member_addr2 = event.target.memberAddress3.value;

    const isValidEmail = regExpEmail.test(member_email);
    const isValidPW = regExpPw.test(member_pw);
    const isValidBirth = regExpBirth.test(member_birth);

    if (isEmailChecked) {
      alert('이메일 중복 체크를 해주세요. ');
      return;
    } else if (!isValidEmail) {
      alert('이메일을 올바른 형식으로 입력해주세요.');
      return;
    } else if (!isValidPW) {
      alert(
        '비밀번호를 숫자, 특수문자 각 1회 이상, 영문은 2글자 이상 입력하고 총 8자 이상이 되어야 합니다.',
      );
      return;
    } else if (member_name === '') {
      alert('이름이 공백입니다.');
      return;
    } else if (member_birth === '' || !isValidBirth) {
      alert('생년월일이 공백이거나 yyyy-mm-dd 형식으로 되어있지 않습니다.');
      return;
    } else if (member_postal === '' || member_addr1 === '') {
      alert('주소가 공백입니다. 주소 검색을 해주세요.');
      return;
    }

    const member = {
      member_email,
      member_pw,
      member_name,
      member_birth,
      member_authority,
      member_postal,
      member_addr1,
      member_addr2,
    };
    console.log(member);
  };

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <form onSubmit={handleSubmit}>
          <ResponsiveContainer breakpoint={breakpoint}>
            <DrawerHeader breakpoint={breakpoint}>
              <h1>직원 추가</h1>
              <div>
                <AiOutlineClose size={32} onClick={() => setOpened(false)} />
              </div>
            </DrawerHeader>

            <Grid container spacing={1} style={{ padding: '1rem' }}>
              <Grid
                item
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledTypography variant="h6" component="h5" weight={5}>
                  직책
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <FormControl style={{ width: '100%' }} variant="outlined">
                  <InputLabel id="form-label">의사</InputLabel>
                  <Select
                    labelId="form-label"
                    id="select-label"
                    label="직책"
                    onChange={(e) => setSelectVal(e.target.value)}
                    value={selectVal}
                  >
                    <MenuItem value="의사" onClick={() => setSelectVal('의사')}>
                      의사
                    </MenuItem>
                    <MenuItem
                      value="간호사"
                      onClick={() => setSelectVal('간호사')}
                    >
                      간호사
                    </MenuItem>
                    <MenuItem
                      value="검사자"
                      onClick={() => setSelectVal('검사자')}
                    >
                      검사자
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledTypography variant="h6" component="h5" weight={5}>
                  이메일
                </StyledTypography>
              </Grid>
              <Grid item xs={7}>
                <StyledInputBase name="memberEmail" />
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledButton
                  bgColor="lightgray"
                  onClick={() => setIsEmailChecked(!isEmailChecked)}
                >
                  중복 체크
                </StyledButton>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledTypography variant="h6" component="h5" weight={5}>
                  비밀번호
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase name="memberPassword" type="password" />
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledTypography variant="h6" component="h5" weight={5}>
                  이름
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase name="memberName" />
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledTypography variant="h6" component="h5" weight={5}>
                  생년월일
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase name="memberBirth" />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledTypography variant="h6" component="h5" weight={5}>
                  주소
                </StyledTypography>
              </Grid>

              <Grid item xs={9}>
                <StyledInputBase
                  name="memberAddress1"
                  placeholder="우편 번호"
                  value={member_postal}
                  readOnly
                />
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledButton
                  bgColor="lightgray"
                  onClick={() => dispatch(setModalStatus(!isModalOpened))}
                  // onClick={() => setOpenModal(true)}
                >
                  주소 찾기
                </StyledButton>
              </Grid>
              <Grid item xs={12}>
                <StyledInputBase
                  name="memberAddress2"
                  placeholder="주소"
                  value={member_addr1}
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <StyledInputBase
                  name="memberAddress3"
                  placeholder="상세 주소를 입력하세요."
                />
              </Grid>
            </Grid>
            <div
              style={{
                position: 'fixed',
                bottom: 30,
                right: 20,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <StyledButton type="submit" bgColor="lightgray">
                임직원 추가
              </StyledButton>
            </div>
            <PostalCodeModal />
          </ResponsiveContainer>
        </form>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default MemberDrawer;
