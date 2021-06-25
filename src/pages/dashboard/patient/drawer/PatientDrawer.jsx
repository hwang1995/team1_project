import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setDiagnosisModal,
} from 'redux/features/diagnosis/diagnosisSlice';
import {
  SwipeableDrawer,
  Grid,
} from '@material-ui/core';
import StyledTypography from 'components/common/typography/StyledTypography';
import DrawerHeader from 'components/common/drawer/DrawerHeader';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from 'hooks/useWindowSize';
import StyledInputBase from 'components/common/input/StyledInputBase';
import ResponsiveContainer from 'components/common/container/ResponsiveContainer';
import StyledButton from 'components/common/button/StyledButton';

const PatientDrawer = ({ isOpened, setOpened, address, setAddress }) => {
  const { breakpoint } = useWindowSize();
  const [confirm, setConfirm] = useState(false);
  // const [isLoading, setLoading] = useState(false);
  const [isPatient, setPatient] = useState({
    patient_id: '',
    patient_name: '',
    patient_ssn1: '',
    patient_ssn2: '',
    patient_addr1: '',
    patient_addr2: '',
    patient_postal: '',
    patient_tel: '',
    patient_height: '',
    patient_weight: '',
  });
  const [isOpenModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

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
    const member = {
      memberEmail: event.target.memberEmail.value,
      memberPassword: event.target.memberPassword.value,
      memberName: event.target.memberName.value,
      memberBirth: event.target.memberBirth.value,
    };
    console.log(member);
  };

  const ssnHandleClick = () => {
   if(isPatient.patient_ssn2.length === 7 && isPatient.patient_ssn1.length === 6){
     setConfirm(true);
   }else {
     alert("다시 입력해주세요")
   }
  }

  const handleChange = (event) => {
    setPatient({
      ...isPatient,
      [event.target.name]: event.target.value
     }
    )
  }

  return (
    <Fragment>
      <SwipeableDrawer
        anchor="right"
        open={isOpened}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
      >
        <ResponsiveContainer breakpoint={breakpoint}>
          <DrawerHeader breakpoint={breakpoint}>
            <h1>직원 추가</h1>
            <div>
              <AiOutlineClose
                size={32}
                onClick={() => {
                  setOpened(false);
                  setAddress({});
                }}
              />
            </div>
          </DrawerHeader>

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
              <StyledInputBase name="patient_name" onChange={handleChange} />
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
                주민등록번호
              </StyledTypography>
            </Grid>
            <Grid item xs={3}>
              <StyledInputBase name="patient_ssn1" onChange={handleChange} />
            </Grid>
            <Grid item xs={1}>
              <div style={{ textAlign: 'center' }}>
                <h2>-</h2>
              </div>
            </Grid>
            <Grid item xs={3} >
              <StyledInputBase name="patient_ssn2" onChange={handleChange} type="password"/>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StyledButton bgColor="#a9e34b" onClick={ssnHandleClick}>
                확인
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
                연락처
              </StyledTypography>
            </Grid>
            <Grid item xs={9}>
              <StyledInputBase name="patient_tel" onChange={handleChange} />
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
                style={{ width: '60%' }}
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
                몸무게(kg)
              </StyledTypography>
            </Grid>
            <Grid item xs={9}>
              <StyledInputBase
                name="patient_weight"
                style={{ width: '60%' }}
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
                name="patient_postal"
                value={address.zonecode}
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
                bgColor="#a9e34b"
                onClick={() => {
                  dispatch(setDiagnosisModal(true));
                }}
              >
                주소 찾기
              </StyledButton>
            </Grid>
            <Grid item xs={12}>
              <StyledInputBase
                name="patient_addr1"
                value={
                  address.address !== ''
                    ? address.address
                    : address.jibunAddress
                }
                onChange={handleChange}
                readOnly
              />
            </Grid>
            <Grid item xs={12}>
              <StyledInputBase
                name="patient_addr2"
                onChange={handleChange}
                placeholder="상세 주소를 입력하세요."
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '2em' }}>
            <div style={{ textAlign: 'center' }}>
              <StyledButton
                bgColor="#1E4C7C"
                width="80%"
                style={{ color: 'white' }}
                onClick={() => {
                  console.log('patientData', isPatient);
                }}
              >
                환자 추가
              </StyledButton>
            </div>
          </Grid>
        </ResponsiveContainer>
      </SwipeableDrawer>
    </Fragment>
  );
};

export default PatientDrawer;
