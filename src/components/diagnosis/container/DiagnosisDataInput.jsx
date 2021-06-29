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

const DiagnosisDataPage = () => {
  const patientInfo = useSelector((state) => state.diagnosis.patient);
  const dispatch = useDispatch();

  const handleBlurOut = (e) => {
    const { diag_id, member_id, patient_id } = patientInfo;
    const dr_opinion = e.target.value;
    dispatch(
      setDiagnosisInfo({
        diag_id,
        member_id,
        patient_id,
        dr_opinion,
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
          <SearchBase readOnly value={patientInfo.patient_name} />
        </Grid>
        <Grid item xs={6} md={3} style={{ marginBottom: '1rem' }}>
          <DiagnosisLabel>생년월일</DiagnosisLabel>
        </Grid>
        <Grid item xs={6} md={3}>
          <SearchBase readOnly value={patientInfo.patient_birth} />
        </Grid>
        <Grid item xs={6} md={3} style={{ marginBottom: '1rem' }}>
          <DiagnosisLabel>성별</DiagnosisLabel>
        </Grid>
        <Grid item xs={6} md={3}>
          <SearchBase readOnly value={patientInfo.patient_gender} />
        </Grid>
        <Grid item xs={6} md={3} style={{ marginBottom: '1rem' }}>
          <DiagnosisLabel>내원사유</DiagnosisLabel>
        </Grid>
        <Grid item xs={6} md={3}>
          <SearchBase readOnly value={patientInfo.visit_purpose} />
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
