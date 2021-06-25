import React, { Fragment, useEffect, useState } from 'react';
import {
  SwipeableDrawer,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import StyledInputBase from 'components/common/input/StyledInputBase';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';
import PostalCodeModal from '../modal/PostalCodeModal';
import { setModalStatus } from 'redux/features/member/memberSlice';
import { useDispatch, useSelector } from 'react-redux';

const MemberUpdateDrawer = ({
  isUpdateOpened,
  setUpdateOpened,
  memberData,
  setMember,
  member,
}) => {
  const { breakpoint } = useWindowSize();
  const [selectVal, setSelectVal] = useState('');
  const [memberPw, setMemberPw] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberPostal, setMemberPostal] = useState('');
  const [memberAddr1, setMemberAddr1] = useState('');
  const [memberAddr2, setMemberAddr2] = useState('');
  // const [isLoading, setLoading] = useState(false);
  //const [isEmailChecked, setIsEmailChecked] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === 'memberName') {
      setMemberName(event.target.value);
    } else if (event.target.name === 'memberPassword') {
      setMemberPw(event.target.value);
    } else if (event.target.name === 'memberAddress1') {
      setMemberPostal(event.target.value);
    } else if (event.target.name === 'memberAddress2') {
      setMemberAddr1(event.target.value);
    } else if (event.target.name === 'memberAddress3') {
      setMemberAddr2(event.target.value);
    }
  };

  useEffect(() => {
    console.log('isUpdateOpened발생');
    setMemberPw(memberData.member_pw);
    setMemberName(memberData.member_name);
    setMemberPostal(memberData.member_postal);
    setMemberAddr1(memberData.member_addr1);
    setMemberAddr2(memberData.member_addr2);
    let memberAuthority = '';
    if (memberData.member_authority === 'ROLE_DOCTOR') {
      memberAuthority = '의사';
    } else if (memberData.member_authority === 'ROLE_NURSE') {
      memberAuthority = '간호사';
    } else if (memberData.member_authority === 'ROLE_INSPECTOR') {
      memberAuthority = '검사자';
    }
    setSelectVal(memberAuthority);
  }, [isUpdateOpened]);

  const dispatch = useDispatch();
  const isModalOpened = useSelector((state) => state.member.modalStatus);
  const { member_postal, member_addr1 } = useSelector(
    (state) => state.member.addressInfo,
  );

  useEffect(() => {
    setMemberPostal(member_postal);
    setMemberAddr1(member_addr1);
  }, [member_postal, member_addr1]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const member_pw = event.target.memberPassword.value;
    const member_name = event.target.memberName.value;
    const member_postal = event.target.memberAddress1.value;
    const member_addr1 = event.target.memberAddress2.value;
    const member_addr2 = event.target.memberAddress3.value;

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
    const newMember = {
      member_pw,
      member_name,
      member_authority,
      member_postal,
      member_addr1,
      member_addr2,
    };

    console.log(newMember);

    const row = member.find((row) => row.member_id === memberData.member_id);
    console.log(row);
    row.member_name = member_name;
    row.member_pw = member_pw;
    row.member_postal = member_postal;
    row.member_addr1 = member_addr1;
    row.member_addr2 = member_addr2;

    alert('임직원 정보가 변경 되었습니다.');
    setMember(member);
    setUpdateOpened(false);
  };

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
    setUpdateOpened(open);
  };

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isUpdateOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <form onSubmit={handleSubmit}>
          <ResponsiveContainer breakpoint={breakpoint}>
            <DrawerHeader breakpoint={breakpoint}>
              <h1>직원 정보 변경 - {memberData.member_name}님</h1>
              <div>
                <AiOutlineClose
                  size={32}
                  onClick={() => setUpdateOpened(false)}
                />
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
                  비밀번호
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase
                  name="memberPassword"
                  type="password"
                  value={memberPw || ''}
                  onChange={handleChange}
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
                <StyledTypography variant="h6" component="h5" weight={5}>
                  이름
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase
                  name="memberName"
                  value={memberName || ''}
                  onChange={handleChange}
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
                  value={memberPostal || ''}
                  onChange={handleChange}
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
                >
                  주소 찾기
                </StyledButton>
              </Grid>
              <Grid item xs={12}>
                <StyledInputBase
                  name="memberAddress2"
                  placeholder="주소"
                  value={memberAddr1 || ''}
                  onChange={handleChange}
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <StyledInputBase
                  name="memberAddress3"
                  placeholder="상세 주소를 입력하세요."
                  value={memberAddr2 || ''}
                  onChange={handleChange}
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
                정보 변경
              </StyledButton>
            </div>
            <PostalCodeModal />
          </ResponsiveContainer>
        </form>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default MemberUpdateDrawer;
