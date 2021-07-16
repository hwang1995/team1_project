import axios from 'axios';

/**
 * * 목적 : hospitalCode에 맞는 병원의 환자 목록을 가져오기 위한 API
 * @param {String} hospitalCode
 * @returns {List<PatientsDTO>} patientList
 * * [Patients Entity]
 * * !int patientId
 * * !String patientName
 * * !String patientSsn;
 * * !String patientGender
 * * !String patientTel
 * * !String patientPostal
 * * !String patientAddr1
 * * String patientAddr2
 * * !int patientHeight
 * * !int patientWeight
 * * !LocalDateTime recentDate
 * * !LocalDate patientBirth
 * * !String hospitalCode
 * @author SI HYUN PARK
 */
export const getPatientsList = async (hospitalCode) => {
  return await axios.get(`/patient/search/${hospitalCode}`);

};

/**
 * * 목적 : 환자 정보를 검색 할때 보여지는 환자의 리스트를 가져오기 위한 API
 * @param {PatientSearchVO} searchInfo
 * * !String hospitalCode
 * * !String patientName
 * @returns {List<PatientsDTO>} patientSearchList
 * * [Patients Entity]
 * * !int patientId
 * * !String patientName
 * * !String patientSsn;
 * * !String patientGender
 * * !String patientTel
 * * !String patientPostal
 * * !String patientAddr1
 * * String patientAddr2
 * * !int patientHeight
 * * !int patientWeight
 * * !LocalDateTime recentDate
 * * !LocalDate patientBirth
 * * !String hospitalCode
 * @author SI HYUN PARK
 */
export const getSearchPatientList = async (searchInfo) => {
  return await axios.post('/patient/search', searchInfo);
};

/**
 * * 목적 : 환자에 대한 정보를 해당 병원에 추가시키기 위한 API
 * @param {PatientsDTO} patientInfo
 * * [Patients Entity]
 * * !String patientName
 * * !String patientSsn;
 * * !String patientGender
 * * !String patientTel
 * * !String patientPostal
 * * !String patientAddr1
 * * String patientAddr2
 * * !int patientHeight
 * * !int patientWeight
 * * !LocalDateTime recentDate
 * * !LocalDate patientBirth
 * * !String hospitalCode
 * @returns {boolean} result (등록 성공 여부)
 * @author SI HYUN PARK
 */
export const registerPatientInfo = async (patientInfo) => {
  return await axios.post('/patient', patientInfo);
};

/**
 * * 목적 : 환자에 대한 정보 수정을 위한 API
 * @param {PatientsDTO} updatePatientInfo
 * * [Patients Entity]
 * * !String patientName
 * * !String patientSsn;
 * * !String patientGender
 * * !String patientTel
 * * !String patientPostal
 * * !String patientAddr1
 * * String patientAddr2
 * * !int patientHeight
 * * !int patientWeight
 * * !LocalDateTime recentDate
 * * !LocalDate patientBirth
 * * !String hospitalCode
 * @returns {boolean} result (수정 성공 여부)
 * @author SI HYUN PARK
 */
export const modifyPatient = async (updatePatientInfo) => {
  return await axios.put('/patient', updatePatientInfo);
};

/**
 * * 목적 : 환자에 대한 정보 삭제를 위한 API
 * @param {int} patientId
 * @returns {boolean} result (삭제 성공 여부)
 * @author SI HYUN PARK
 */
export const deletePatient = async (patientId) => {
  return await axios.delete(`/patient/${patientId}`);
};
