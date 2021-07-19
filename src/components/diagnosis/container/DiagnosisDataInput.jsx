import React, { Fragment } from 'react';
import { InputBase, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setDiagnosisInfo } from 'redux/features/diagnosis/diagnosisSlice';

const SearchBase = styled(InputBase)`
  flex: 1;
  width: 90%;
  border-radius: 0.5rem;
  padding-left: 1rem;
  font-weight: 500;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
`;

const DiagnosisLabel = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: 700;
`;

const DiagnosisTextarea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  padding: 0.5rem 0 0.5rem 0.5rem;
  /* padding: 0.5rem; */
  height: 100px;
  resize: none;
  font-family: 'Noto Sans KR';
`;

/**
 * * 진료의 정보를 보여주기 위한 Template 컴포넌트
 * @returns {JSX.Element} View
 * @author SUNG WOOK HWANG
 */
const DiagnosisDataPage = () => {
  // Redux store에 저장되어 있는 회원 정보
  const { memberId } = useSelector((state) => state.common.loginInfo);

  // Redux store에 저장되어 있는 환자의 정보
  const patientInfo = useSelector((state) => state.diagnosis.patient);
  const dispatch = useDispatch();

  // 정보를 입력시에 포인팅을 다른곳으로 옮겼을 시에 작동하는 이벤트 함수
  const handleBlurOut = (e) => {
    const { diagId, patientId } = patientInfo;
    const drOpinion = e.target.value;
    dispatch(
      setDiagnosisInfo({
        diagId,
        memberId,
        patientId,
        drOpinion,
      }),
    );
  };

  return (
    <Fragment>
      <Grid container style={{ padding: '1rem' }}>
        <Grid item xs={6} md={3} style={{ marginBottom: '1rem' }}>
          <DiagnosisLabel>이름</DiagnosisLabel>
        </Grid>
        <Grid item xs={6} md={3}>
          <SearchBase readOnly value={patientInfo.patientName} />
        </Grid>
        <Grid item xs={6} md={3} style={{ marginBottom: '1rem' }}>
          <DiagnosisLabel>생년월일</DiagnosisLabel>
        </Grid>
        <Grid item xs={6} md={3}>
          <SearchBase readOnly value={patientInfo.patientBirth} />
        </Grid>
        <Grid item xs={6} md={3} style={{ marginBottom: '1rem' }}>
          <DiagnosisLabel>성별</DiagnosisLabel>
        </Grid>
        <Grid item xs={6} md={3}>
          <SearchBase readOnly value={patientInfo.patientGender} />
        </Grid>
        <Grid item xs={6} md={3} style={{ marginBottom: '1rem' }}>
          <DiagnosisLabel>내원사유</DiagnosisLabel>
        </Grid>
        <Grid item xs={6} md={3}>
          <SearchBase readOnly value={patientInfo.visitPurpose} />
        </Grid>
        <Grid item xs={12} md={3} style={{ marginBottom: '1rem' }}>
          <DiagnosisLabel>의사소견</DiagnosisLabel>
        </Grid>
        <Grid item xs={12} md={9} style={{ marginBottom: '1rem' }}>
          {/* <DiagnosisTextarea onChange={handleChange} /> */}
          <DiagnosisTextarea onBlur={handleBlurOut} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DiagnosisDataPage;
