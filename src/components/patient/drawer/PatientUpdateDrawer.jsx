import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGenderStatus } from 'redux/features/member/memberSlice';
import moment from 'moment';
import { KeyboardDatePicker } from '@material-ui/pickers';
import 'react-datepicker/dist/react-datepicker.css';
import { SwipeableDrawer, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import StyledInputBase from 'components/common/input/StyledInputBase';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';
import AddressModal from '../modal/Modal';
import SelectedUpdateGender from '../selectedGender/SelectedUpdateGender';
import { modifyPatient } from 'apis/patientAPI';

/**
 * 이 페이지 컴포넌트는 환자를 수정하기 위해 작성한 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * * Sider
 * * Header
 * * 환자 관리 (PatientSearch, Table, ColoredButton)
 * @returns {JSX.Element}
 * @author SI HYUN PARK
 */
const PatientUpdateDrawer = ({
  isUpdateOpened,
  setUpdateOpened,
  readPatientData,
  setDisplay,
}) => {
  const { breakpoint } = useWindowSize();

  // 생년월일을 수정하기 위해 사용할 상태 데이터
  const [keyboardDate, handleKeyDateChange] = useState(new Date());
  // 성별을 수정하기 위해 사용할 리덕스
  const gender = useSelector((state) => state.member.gender);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  // 주소 API 창을 띄울 모달 창 상태 데이터
  const [isUpdateModalOpened, setUpdateModalOpened] = useState(false);

  // 수정 완료 클릭시 다시 한번 수정 하시겠습니까? 라는 컴포넌트를 띄어줄 상태 데이터
  const [changeView, setChange] = useState(false);

  //환자의 정보를 담을 상태 데이터
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(() => {
    if (breakpoint !== readPatientData) {
      console.log('Current breakpoint is', breakpoint);
    }
  }, [breakpoint, readPatientData]);


  // Drawer창이 열릴 때마다 props를 통해 받아온 readPatientData를 patientInfo와 keyboardDate에 세팅하는 부분
  useEffect(() => {
    if (isUpdateOpened) {
       handleKeyDateChange(readPatientData.patientBirth);
       setPatientInfo(readPatientData);
    }
  }, [readPatientData, isUpdateOpened, patientInfo.patientBirth]);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      setPatientInfo({});
      return;
    }
    setChange(false);
    dispatch(setGenderStatus(''));
    setUpdateOpened(open);
  };

  // 수정버튼 클릭시 일어나는 이벤트
  const updateHandleClick = async () => {
    // 유효성검사
    if (
      patientInfo.patientName !== readPatientData.patientName ||
      keyboardDate !== readPatientData.patientBirth ||
      patientInfo.patientAddr1 !== readPatientData.patientAddr1 ||
      patientInfo.patientPostal !== readPatientData.patientPostal ||
      patientInfo.patientTel !== readPatientData.patientTel ||
      patientInfo.patientHeight !== readPatientData.patientHeight ||
      patientInfo.patientWeight !== readPatientData.patientWeight ||
      patientInfo.patientAddr2 !== readPatientData.patientAddr2 ||
      patientInfo.patientGender !== gender
    ) {
      // 수정하는 부분
      try {
        patientInfo.patientGender = gender;
        patientInfo.patientBirth = moment(keyboardDate).format('yyyy-MM-DD');

        setPatientInfo(patientInfo);
        const { data } = await modifyPatient(patientInfo);
        console.log(data.data)
        handleAlert('success', '내용이 변경 되었습니다.');
        dispatch(setGenderStatus(''));
        setChange(true);
      } catch (error) {
        handleAlert('error', '내용이 변경되지 않았습니다.');
      }
    } else {
      handleAlert('error', '변경된 사항이 없습니다.');
    }
  };

  // 주소버튼 클릭시 주소 모달에 해당 함수를 넘겨 주소 정보를 담아오는 부분
  const addressClick = ({ fullAddress, postalcode }) => {
    setPatientInfo({
      ...patientInfo,
      patientPostal: postalcode,
      patientAddr1: fullAddress,
      patientAddr2: '',
    });
  };


  // 수정된 정보를 담는 부분
  const updateHandleChange = (event) => {
    setPatientInfo({
      ...patientInfo,
      [event.target.name]: event.target.value,
    });
  };

  // 생년월일을 변경하는 부분
  const dateUpdateHandleChange = (date) => {
    console.log('Date', keyboardDate);
    const birth = moment(date).format('yyyy/MM/DD');
    handleKeyDateChange(birth);
  };

  // 클릭시 주소 모달창이 열린다
  const findAddressHandleClick = () => {
    setUpdateModalOpened(true);
  };

  // 클릭시 드로어가 다친다
  const closeHandleClick = () => {
    setChange(false);
    dispatch(setGenderStatus(''));
    setUpdateOpened(false);
  };

  // 메인함수에서 값을 다시 받아오기 위해 실해하는 함수
  const BackTotheMain = () => {
      setDisplay(true);
      setUpdateOpened(false);
      setChange(false);
  };

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isUpdateOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer breakpoint={breakpoint}>
          <DrawerHeader breakpoint={breakpoint}>
            <h1>환자 정보 수정</h1>
            <div>
              <AiOutlineClose size={32} onClick={closeHandleClick} />
            </div>
          </DrawerHeader>
          {changeView === false ? (
            <Grid
              container
              spacing={1}
              alignItems="center"
              justify="center"
              style={{ padding: '1rem' }}
            >
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
                  name="patientName"
                  value={patientInfo.patientName}
                  onChange={updateHandleChange}
                  style={{ width: '53%' }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '1em',
                }}
              >
                <StyledTypography variant="h6" component="h5" weight={5}>
                  성별
                </StyledTypography>
              </Grid>
              <Grid item xs={9} style={{ marginTop: '1em' }}>
                <SelectedUpdateGender genderValue={patientInfo.patientGender} />
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledTypography
                  variant="h6"
                  component="h5"
                  weight={5}
                  style={{ marginTop: '1em', marginBottom: '1em' }}
                >
                  생년월일
                </StyledTypography>
              </Grid>
              <Grid
                item
                xs={9}
                style={{ marginTop: '1em', marginBottom: '1em' }}
              >
                <KeyboardDatePicker
                  disableFuture
                  openTo="year"
                  format="yyyy/MM/DD"
                  views={['year', 'month', 'date']}
                  value={keyboardDate}
                  onChange={dateUpdateHandleChange}
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
                  연락처
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase
                  name="patientTel"
                  value={patientInfo.patientTel}
                  onChange={updateHandleChange}
                  style={{ width: '80%' }}
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
                  키(cm)
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase
                  name="patientHeight"
                  style={{ width: '53%' }}
                  value={patientInfo.patientHeight}
                  onChange={updateHandleChange}
                  type="number"
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
                  몸무게(kg)
                </StyledTypography>
              </Grid>
              <Grid item xs={9}>
                <StyledInputBase
                  name="patientWeight"
                  style={{ width: '53%' }}
                  value={patientInfo.patientWeight}
                  onChange={updateHandleChange}
                  type="number"
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
                  placeholder="우편번호"
                  value={patientInfo.patientPostal}
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
                  onClick={findAddressHandleClick}
                  bgColor="#a9e34b"
                >
                  주소 찾기
                </StyledButton>
              </Grid>
              <Grid item xs={12}>
                <StyledInputBase
                  placeholder="주소를 입력해주세요"
                  value={patientInfo.patientAddr1}
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <StyledInputBase
                  name="patientAddr2"
                  onChange={updateHandleChange}
                  value={
                    patientInfo.patientAddr2 !== false &&
                    patientInfo.patientAddr2
                  }
                  placeholder="상세 주소를 입력하세요."
                />
              </Grid>
              <Grid item xs={8} style={{ marginTop: '2em' }}>
                <div style={{ textAlign: 'center' }}>
                  <StyledButton
                    bgColor="#1E4C7C"
                    width="80%"
                    style={{ color: 'white' }}
                    onClick={updateHandleClick}
                  >
                    환자 수정
                  </StyledButton>
                </div>
              </Grid>
            </Grid>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div>
                <img src="/assets/image/accept.png" alt="accept" />
              </div>
              <div>
                <h1 style={{ fontWeight: 'bold', marginBottom: '2em' }}>
                    수정이 완료되었습니다.
                </h1>
              </div>
              <div>
                <StyledButton
                  width="60%"
                  bgColor="#DDB892"
                  color="white"
                  onClick={BackTotheMain}
                >
                  메인 화면으로 돌아가기
                </StyledButton>
              </div>
            </div>
          )}
        </ResponsiveContainer>
      </SwipeableDrawer>

      {/* 주소 APi 모달 */}
      <AddressModal
        isModalOpened={isUpdateModalOpened}
        setModalOpened={setUpdateModalOpened}
        addressClick={addressClick}
      />
    </Fragment>
  );
};

export default PatientUpdateDrawer;
