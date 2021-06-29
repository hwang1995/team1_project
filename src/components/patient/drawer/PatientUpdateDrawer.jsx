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

const PatientUpdateDrawer = ({
  isUpdateOpened,
  setUpdateOpened,
  readPatientData,
  setReadPatientData,
  dateRemoveClick,
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
  const [patientInfo, setPatientInfo] = useState({
    patient_id: '',
    patient_name: '',
    patient_birth: '',
    patient_addr1: '',
    patient_addr2: '',
    patient_postal: '',
    patient_tel: '',
    patient_height: '',
    patient_weight: '',
    patient_gender: '',
  });

  useEffect(() => {
    if (breakpoint !== undefined) {
      console.log('Current breakpoint is', breakpoint);
    }
  }, [breakpoint]);

  useEffect(() => {
    console.log('실행', readPatientData);
    setPatientInfo(readPatientData);
  }, [readPatientData]);

  const toggleDrawer = (open) => (e) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setUpdateOpened(open);
  };

  const updateHandleClick = () => {
    if (
      patientInfo.patient_name !== readPatientData.patient_name ||
      patientInfo.patient_birth !== readPatientData.patient_birth ||
      patientInfo.patient_addr1 !== readPatientData.patient_addr1 ||
      patientInfo.patient_postal !== readPatientData.patient_postal ||
      patientInfo.patient_tel !== readPatientData.patient_tel ||
      patientInfo.patient_height !== readPatientData.patient_height ||
      patientInfo.patient_weight !== readPatientData.patient_weight ||
      patientInfo.patient_addr2 !== readPatientData.patient_addr2 ||
      readPatientData.patient_gender !== gender
    ) {
      if (readPatientData.patient_gender !== gender) {
        patientInfo.patient_gender = gender;
      }
      setReadPatientData(patientInfo);
      setStatus('update');
      dispatch(setGenderStatus(''));
      setChange(true);
    } else {
      handleAlert('error', '변경된 사항이 없습니다.');
    }
  };

  const addressClick = ({ fullAddress, postalcode }) => {
    setPatientInfo({
      ...patientInfo,
      patient_postal: postalcode,
      patient_addr1: fullAddress,
    });
  };

  const deleteHandleClick = () => {
    setStatus('remove');
    dispatch(setGenderStatus(''));
    dateRemoveClick(readPatientData);
    setChange(true);
  };

  const updateHandleChange = (event) => {
    setPatientInfo({
      ...patientInfo,
      [event.target.name]: event.target.value,
    });
  };

  const dateUpdateHandleChange = (date) => {
    const birth = moment(date).format('YYYY/MM/DD/');
    setPatientInfo({
      ...patientInfo,
      patient_birth: birth,
    });
  };

  const findAddressHandleClick = () => {
    console.log('클릭 실행');
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
      setUpdateOpened(false);
      setChange(false);
    }
    if (removeOrUpdate === 'remove') {
      setStatus('');
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
                  name="patient_name"
                  value={patientInfo.patient_name}
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
                <SelectedUpdateGender
                  genderValue={patientInfo.patient_gender}
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
                  value={patientInfo.patient_birth}
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
                  name="patient_tel"
                  value={patientInfo.patient_tel}
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
                  name="patient_height"
                  style={{ width: '53%' }}
                  value={patientInfo.patient_height}
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
                  name="patient_weight"
                  style={{ width: '53%' }}
                  value={patientInfo.patient_weight}
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
                  value={patientInfo.patient_postal}
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
                  value={patientInfo.patient_addr1}
                  readOnly
                />
              </Grid>
              <Grid item xs={12}>
                <StyledInputBase
                  name="patient_addr2"
                  onChange={updateHandleChange}
                  value={
                    patientInfo.patient_addr2 !== false &&
                    patientInfo.patient_addr2
                  }
                  placeholder="상세 주소를 입력하세요."
                />
              </Grid>
              <Grid item xs={6} style={{ marginTop: '2em' }}>
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
              <Grid item xs={6} style={{ marginTop: '2em' }}>
                <div style={{ textAlign: 'center' }}>
                  <StyledButton
                    bgColor="#1E4C7C"
                    width="80%"
                    style={{ color: 'white' }}
                    onClick={deleteHandleClick}
                  >
                    환자 삭제
                  </StyledButton>
                </div>
              </Grid>
            </Grid>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div>
                <img src="/assets/image/accept.png" />
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
