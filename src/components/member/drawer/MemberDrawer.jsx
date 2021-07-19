import React, { Fragment, useEffect, useState } from 'react';
import {
  SwipeableDrawer,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
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
import ImageUploader from 'react-images-upload';
import StyledContainer from 'components/common/container/StyledContainer';
import { IoManOutline, IoWomanOutline } from 'react-icons/io5';
import { useSnackbar } from 'notistack';
import { addMember, memberImageUpload, isExistedEmail } from 'apis/memberAPI';
import { CirclePicker } from 'react-color';

/**
 * 이 DRAWER 컴포넌트는 추가할 임직원 정보를 입력하기 위한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * DRAWER (SwipeableDrawer)
 * * * 주소 검색 (PostalCodeModal)
 * * * 성별 선택 (IoManOutline, IoWomanOutline)
 * * * 생년월일 입력 (KeyboardDatePicker)
 * * * 이미지 업로드 (ImageUploader)
 * * * 색상 선택 (CirclePicker)
 * @returns {JSX.Element}
 * @author Jong Hyun Hong
 */
const MemberDrawer = ({ isOpened, setOpened, currentUser, showMember }) => {
  const { breakpoint } = useWindowSize();

  // 임직원의 권한을 설정할때 저장하는 상태
  const [selectVal, setSelectVal] = useState('의사');

  // 임직원의 이메일 중복체크의 확인여부를 저장하는 상태
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  // 임직원의 이메일 값을 입력받는 상태
  const [memberEmail, setMemberEmail] = useState('');

  // 임직원의  생년월일 상태, 날짜 에러메세지(최대 및 최소 값 값 제대로 입력)
  const [keyboardDate, handleKeyDateChange] = useState(new Date());
  const [dateErrorMessage, setDateErrorMessage] = useState('');

  // 임직원의 색상을 저장하기 위한 상태
  const [currentColor, setCurrentColor] = useState('');

  // 임직원의 이미지VO 값을 저장하는 상태
  const [pictures, setPictures] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  //Drawer창 on/off시 동작(데이터 초기화)
  useEffect(() => {
    setPictures('');
    setMemberEmail('');
    setSelectedGender({
      female: false,
      male: false,
    });
    setCurrentColor('');
  }, [isOpened]);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  // 색상 변경시 동작
  const colorChange = (color, event) => {
    if (color) {
      setCurrentColor(color.hex);
      console.log(color.hex);
    }
  };

  // 이미지를 업로드하거나 취소할때의 동작
  const onDrop = async (event, picture) => {
    if (event.length === 1) {
      let imageName = '';
      imageName = event[0].name;
      let imageInfo = {
        hospitalCode: currentUser.hospitalCode,
        imageName,
        base64Content: picture[0],
      };
      setPictures(imageInfo);
      console.log(imageInfo);
      // const { data, status } = await memberImageUpload(pictures);
      // console.log(data);
    } else {
      //창 닫을때
      console.log('창닫힘', picture);
      setPictures('');
    }
  };

  const dispatch = useDispatch();

  const isModalOpened = useSelector((state) => state.member.modalStatus);

  const { member_postal, member_addr1 } = useSelector(
    (state) => state.member.addressInfo,
  );

  const [selectedGender, setSelectedGender] = useState({
    male: false,
    female: false,
  });

  // 성별을 선택할때의 동작
  const handleChangeGender = (name) => {
    console.log(name);
    if (name === 'male') {
      //남성일때
      setSelectedGender({
        female: false,
        male: true,
      });
    } else {
      //여성일때
      setSelectedGender({
        male: false,
        female: true,
      });
    }
  };

  //drawer창 on/off 될때마다 주소값 초기화
  useEffect(() => {
    dispatch(
      setAddressInfo({
        member_postal: '',
        member_addr1: '',
      }),
    );
  }, [dispatch]);

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
  const handleEmailChecked = async () => {
    if (memberEmail === '') {
      handleAlert('error', '이메일을 입력해주세요.');
      return;
    }

    //유효성 검사
    const regExpEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const isValidEmail = regExpEmail.test(memberEmail);
    if (!isValidEmail) {
      handleAlert('error', '이메일을 올바른 형식으로 입력해주세요.');
      return;
    }
    try {
      const { data, status } = await isExistedEmail(memberEmail);
      console.log('이메일검사 결과: ', data);
      handleAlert('success', '이메일을 사용해도 좋습니다.');
      setIsEmailChecked(true);
    } catch (error) {
      handleAlert('error', '중복된 이메일 입니다. 다른 이메일을 사용해주세요.');
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

  //임직원 추가 버튼(submit)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 이메일 정규 표현식
    const regExpEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // 비밀번호 정규 표현식
    // 숫자, 특수문자 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력
    const regExpPw =
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

    // 전화번호 정규표현식
    const regExpTel =
      /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

    let memberAuthority = '';
    if (selectVal === '병원장') {
      memberAuthority = 'ROLE_DIRECTOR';
    } else if (selectVal === '의사') {
      memberAuthority = 'ROLE_DOCTOR';
    } else if (selectVal === '간호사') {
      memberAuthority = 'ROLE_NURSE';
    } else if (selectVal === '검사자') {
      memberAuthority = 'ROLE_INSPECTOR';
    }

    const memberEmail = event.target.memberEmail.value;
    const memberPw = event.target.memberPassword.value;
    const memberName = event.target.memberName.value;
    const memberTel = event.target.memberTel.value;
    const memberBirth = event.target.memberBirth.value;
    const memberPostal = event.target.memberAddress1.value;
    const memberAddr1 = event.target.memberAddress2.value;
    const memberAddr2 = event.target.memberAddress3.value;
    let memberImage = '';
    const memberIntroduction = event.target.memberIntroduce.value;
    const memberColor = currentColor;

    let gender = '';
    if (selectedGender['male'] === true) {
      gender = 'male';
    } else if (selectedGender['female'] === true) {
      gender = 'female';
    }
    const memberGender = gender;

    //유효성 검사
    const isValidEmail = regExpEmail.test(memberEmail);
    const isValidPW = regExpPw.test(memberPw);
    const isValidTel = regExpTel.test(memberTel);

    if (!isEmailChecked) {
      handleAlert('error', '이메일 중복 체크를 해주세요.');
      return;
    } else if (!isValidEmail) {
      handleAlert('error', '이메일을 올바른 형식으로 입력해주세요.');
      return;
    } else if (!isValidPW) {
      handleAlert(
        'error',
        '비밀번호를 숫자, 특수문자 각 1회 이상, 영문은 2글자 이상 입력하고 총 8자 이상이 되어야 합니다.',
      );
      return;
    } else if (memberGender === '') {
      handleAlert('error', '성별을 선택해주세요.');
      return;
    } else if (memberName === '') {
      handleAlert('error', '이름이 공백입니다.');
      return;
    } else if (!isValidTel) {
      handleAlert(
        'error',
        '전화번호를 올바르게 입력해주세요.(공백 또는 ' - ' 사용)',
      );
      return;
    } else if (memberBirth === '') {
      handleAlert('error', '생년월일 값을 입력해주세요.');
      return;
    } else if (!(dateErrorMessage === '')) {
      console.log(dateErrorMessage);
      handleAlert(
        'error',
        `생년월일에서 ${dateErrorMessage} 다시 한번 확인해주세요.`,
      );
      return;
    } else if (memberPostal === '' || memberAddr1 === '') {
      handleAlert('error', '주소가 공백입니다. 주소 검색을 해주세요.');
      return;
    } else if (memberAddr2 === '') {
      handleAlert('error', '상세주소가 공백입니다. 상세주소를 입력해주세요.');
      return;
    } else if (memberColor === '') {
      handleAlert('error', '색상이 입력되지 않았습니다. 색상을 골라주세요.');
      return;
    }

    //pictures 데이터가 존재
    if (pictures !== '') {
      const { data, status } = await memberImageUpload(pictures);
      console.log('이미지가 등록됨: ', data);
      memberImage = data;
    }

    try {
      let memberInfo = {
        hospitalCode: currentUser.hospitalCode,
        memberPw,
        memberBirth,
        memberEmail,
        memberGender,
        memberName,
        memberTel,
        memberAuthority,
        memberPostal,
        memberAddr1,
        memberAddr2,
        memberEnabled: 1,
        memberImage,
        memberIntroduction,
        memberColor,
      };
      console.log(memberInfo);
      const { data, status } = await addMember(memberInfo);
      console.log(data);
    } catch (error) {
      handleAlert('error', '추가도중에 오류가 발생하였습니다.');
    }
    showMember();
    handleAlert('success', '임직원이 추가되었습니다.');
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
                  성별
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <div
                  style={{
                    display: 'flex',
                    maxWidth: '400px',
                    height: '100px',
                  }}
                >
                  <StyledContainer
                    bgColor="rgb(62,63,70)"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={() => handleChangeGender('male')}
                  >
                    {selectedGender.male && (
                      <Fragment>
                        <IoManOutline color="rgb(244,213,51)" size={64} />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1,
                          }}
                        >
                          <StyledTypography
                            variant="subtitle1"
                            weight={7}
                            style={{
                              color: 'rgb(244,213,51)',
                              fontFamily: 'Lato',
                            }}
                          >
                            남자 (Male)
                          </StyledTypography>
                        </div>
                      </Fragment>
                    )}
                    {!selectedGender.male && (
                      <Fragment>
                        <IoManOutline color="white" size={64} />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1,
                          }}
                        >
                          <StyledTypography
                            variant="subtitle1"
                            weight={7}
                            style={{
                              color: 'white',
                              fontFamily: 'Lato',
                            }}
                          >
                            남자 (Male)
                          </StyledTypography>
                        </div>
                      </Fragment>
                    )}
                  </StyledContainer>
                  <StyledContainer
                    bgColor="rgb(62,63,70)"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={() => handleChangeGender('female')}
                  >
                    {selectedGender.female && (
                      <Fragment>
                        <IoWomanOutline color="rgb(244,213,51)" size={64} />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1,
                          }}
                        >
                          <StyledTypography
                            variant="subtitle1"
                            weight={7}
                            style={{
                              color: 'rgb(244,213,51)',
                              fontFamily: 'Lato',
                            }}
                          >
                            여자 (Female)
                          </StyledTypography>
                        </div>
                      </Fragment>
                    )}
                    {!selectedGender.female && (
                      <Fragment>
                        <IoWomanOutline color="white" size={64} />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1,
                          }}
                        >
                          <StyledTypography
                            variant="subtitle1"
                            weight={7}
                            style={{
                              color: 'white',
                              fontFamily: 'Lato',
                            }}
                          >
                            여자 (Female)
                          </StyledTypography>
                        </div>
                      </Fragment>
                    )}
                  </StyledContainer>
                </div>
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
                  전화번호
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase name="memberTel" />
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
                  format="yyyy-MM-DD"
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
            <div>
              <StyledTypography variant="h6" component="h5" weight={5}>
                이미지
              </StyledTypography>
              <ImageUploader
                name="memberImage"
                withIcon={true}
                buttonText="이미지를 선택해주세요."
                onChange={onDrop}
                imgExtension={['.jpg', '.png', '.jpeg']}
                fileSizeError="파일사이즈가 너무 큽니다. 최대크기(5242880)"
                fileTypeError="파일확장자가 잘못되었습니다."
                label="최대 파일 크기: 5mb, 확장자: jpg, png만 가능"
                maxFileSize={5242880}
                singleImage
                withPreview
              />
            </div>
            <div>
              <StyledTypography variant="h6" component="h5" weight={5}>
                자기소개
              </StyledTypography>
              <TextField
                name="memberIntroduce"
                label="간단한 소개인사를 적어주세요."
                multiline
                rows={4}
                variant="outlined"
                fullWidth
              />
            </div>
            <div
              style={{
                marginTop: 15,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledTypography
                variant="h6"
                component="h5"
                weight={5}
                style={{ marginRight: 15 }}
              >
                색상선택
              </StyledTypography>
              <CirclePicker onChange={colorChange} />
              <Paper
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: 30,
                  backgroundColor: currentColor,
                }}
              />
            </div>
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
