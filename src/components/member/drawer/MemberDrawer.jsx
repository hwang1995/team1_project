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
import { KeyboardDatePicker } from '@material-ui/pickers';

const MemberDrawer = ({ isOpened, setOpened, setMember, member }) => {
  const { breakpoint } = useWindowSize();
  const [selectVal, setSelectVal] = useState('의사');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');

  //생년월일 상태, 날짜 에러메세지(최대 및 최소 값 값 제대로 입력)
  const [keyboardDate, handleKeyDateChange] = useState(new Date());
  const [dateErrorMessage, setDateErrorMessage] = useState('');

  const dispatch = useDispatch();

  const isModalOpened = useSelector((state) => state.member.modalStatus);

  const { member_postal, member_addr1 } = useSelector(
    (state) => state.member.addressInfo,
  );

  //drawer창 on/off 될때마다 주소값 초기화
  useEffect(() => {
    dispatch(
      setAddressInfo({
        member_postal: '',
        member_addr1: '',
      }),
    );
  }, [isOpened]);

  useEffect(() => {
    if (breakpoint !== undefined) {
      console.log('Current breakpoint is', breakpoint);
    }
  }, [breakpoint]);

  //생년월일 입력에러시 나오는 문구
  const handleDateError = (data, error) => {
    if (data) {
      console.log(data);
      setDateErrorMessage(data);
    } else {
      console.log('올바른 값을 입력하셨습니다.');
      setDateErrorMessage('');
    }
  };

  //fuction(open){function(e){}}
  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpened(open);
  };

  //이메일 중복체크
  const handleEmailChecked = () => {
    // 이메일 정규 표현식
    const regExpEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const isValidEmail = regExpEmail.test(memberEmail);
    if (!isValidEmail) {
      alert('이메일을 올바른 형식으로 입력해주세요.');
      return;
    }
    const isInfo = member.find((member) => member.member_email === memberEmail);
    if (!isInfo) {
      alert('확인되었습니다.');
      setIsEmailChecked(true);
    } else {
      alert('중복된 이메일 입니다. 다른 이메일을 사용해주세요.');
      return;
    }
  };

  //이메일 input값 상태저장
  const handleChange = (event) => {
    setMemberEmail(event.target.value);
  };

  //이메일 변경될때마다 중복상태 설정
  useEffect(() => {
    setIsEmailChecked(false);
  }, [memberEmail]);

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

    if (!isEmailChecked) {
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
    } else if (member_birth === '') {
      alert('생년월일 값을 입력해주세요.');
      return;
    } else if (!(dateErrorMessage === '')) {
      console.log(dateErrorMessage);
      alert(dateErrorMessage + ' 다시 한번 확인해주세요^^');
      return;
    } else if (member_postal === '' || member_addr1 === '') {
      alert('주소가 공백입니다. 주소 검색을 해주세요.');
      return;
    } else if (member_addr2 === '') {
      alert('상세주소가 공백입니다. 상세주소를 입력해주세요.');
      return;
    }

    const newMember = {
      member_id: '임시ID',
      member_pw,
      member_birth,
      member_email,
      member_name,
      member_authority,
      member_postal,
      member_addr1,
      member_addr2,
    };
    console.log(newMember);

    setMember((member) => [...member, newMember]);

    alert('임직원이 추가되었습니다.');
    console.log(member);
    //setMember(member);
    setOpened(false);
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
                <StyledInputBase
                  name="memberEmail"
                  onChange={handleChange}
                  value={memberEmail}
                />
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
                  onClick={() => handleEmailChecked()}
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
                <KeyboardDatePicker
                  name="memberBirth"
                  disableFuture
                  openTo="year"
                  format="yyyy/MM/DD"
                  views={['year', 'month', 'date']}
                  value={keyboardDate}
                  onChange={handleKeyDateChange}
                  onError={handleDateError}
                  invalidDateMessage="잘못된 값을 입력하셨습니다."
                  maxDateMessage="미래의 값은 입력할 수 없습니다."
                  minDateMessage="1900/01/01부터 입력할 수 있습니다."
                />
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
