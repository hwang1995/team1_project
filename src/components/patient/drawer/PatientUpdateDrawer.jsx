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
import SelectedUpdateGender from '../SelectedGender/selectedUpdateGender';
import { modifyPatient, deletePatient } from 'apis/patientAPI';

const PatientUpdateDrawer = ({
  isUpdateOpened,
  setUpdateOpened,
  readPatientData,
  setDisplay,
}) => {
  const { breakpoint } = useWindowSize();

  const gender = useSelector((state) => state.member.gender);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, {
      variant,
    });
  };

  const [isUpdateModalOpened, setUpdateModalOpened] = useState(false);
  const [changeView, setChange] = useState(false);
  const [removeOrUpdate, setStatus] = useState('');
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(() => {
    if (breakpoint !== readPatientData) {
      console.log('Current breakpoint is', breakpoint);
    }
  }, [breakpoint]);

  useEffect(() => {
    if (isUpdateOpened) {
      const [year, month, date] = readPatientData.patientBirth;
      setPatientInfo({
        ...readPatientData,
        patientBirth: year + '/' + month + '/' + date,
      });
    }
  }, [readPatientData, isUpdateOpened]);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      setPatientInfo({});
      return;
    }
    setStatus('');
    setChange(false);
    dispatch(setGenderStatus(''));
    setUpdateOpened(open);
  };

  const updateHandleClick = async () => {
    const [year, month, date] = readPatientData.patientBirth;
   
    const getBirth = year + "/" + month + "/" + date;
    const birth = moment(getBirth).format('yyyy/MM/DD');
    const updateBirth = moment(patientInfo.patientBirth).format('yyyy/MM/DD');
    if (
      patientInfo.patientName !== readPatientData.patientName ||
      updateBirth !== birth ||
      patientInfo.patientAddr1 !== readPatientData.patientAddr1 ||
      patientInfo.patientPostal !== readPatientData.patientPostal ||
      patientInfo.patientTel !== readPatientData.patientTel ||
      patientInfo.patientHeight !== readPatientData.patientHeight ||
      patientInfo.patientWeight !== readPatientData.patientWeight ||
      patientInfo.patientAddr2 !== readPatientData.patientAddr2 ||
      patientInfo.patientGender !== gender
    ) {
      try {
        patientInfo.patientGender = gender;
        patientInfo.patientBirth = moment(patientInfo.patientBirth).format('yyyy-MM-DD');
        setPatientInfo(patientInfo);
        const { data } = await modifyPatient(patientInfo);
        handleAlert('success', '내용이 변경 되었습니다.');
      } catch (error) {
        handleAlert('error', '내용이 변경되지 않았습니다.');
      } finally {
        setStatus('update');
        dispatch(setGenderStatus(''));
        setChange(true);
      }
    } else {
      handleAlert('error', '변경된 사항이 없습니다.');
    }
  };

  const addressClick = ({ fullAddress, postalcode }) => {
    setPatientInfo({
      ...patientInfo,
      patientPostal: postalcode,
      patientAddr1: fullAddress,
      patientAddr2: '',
    });
  };



  const updateHandleChange = (event) => {
    setPatientInfo({
      ...patientInfo,
      [event.target.name]: event.target.value,
    });
  };

  const dateUpdateHandleChange = (date) => {
    const birth = moment(date).format('YYYY-MM-DD');
    setPatientInfo({
      ...patientInfo,
      patientBirth: birth,
    });
  };

  const findAddressHandleClick = () => {
    setUpdateModalOpened(true);
  };

  const closeHandleClick = () => {
    setStatus('');
    setChange(false);
    dispatch(setGenderStatus(''));
    setUpdateOpened(false);
  };

  const BackTotheMain = () => {
    if (removeOrUpdate === 'update') {
      setStatus('');
      setDisplay(true);
      setUpdateOpened(false);
      setChange(false);
    }
  
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
                  value={patientInfo.patientBirth}
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
                  {removeOrUpdate === 'update' && '수정이 완료되었습니다.'}
                  {removeOrUpdate === 'remove' && '삭제가 완료되었습니다.'}
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
      <AddressModal
        isModalOpened={isUpdateModalOpened}
        setModalOpened={setUpdateModalOpened}
        addressClick={addressClick}
      />
    </Fragment>
  );
};

export default PatientUpdateDrawer;
