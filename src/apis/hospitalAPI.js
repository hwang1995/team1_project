import axios from 'axios';

/**
 * 목적 : 병원에 대한 정보 리스트를 가져오기 위한 API
 * @returns {List<HospitalDTO>} data
 * * !String hospitalCode
 * * !String hospitalName
 * * !String hospitalTel
 * * !String hospitalAddress
 */
export const getHospitalListInfo = async () => {
  return await axios.get('/hospital');
};

/**
 * 목적 : 병원에 대한 상세정보를 가져오기 위한 API
 * @param {String} hospitalCode
 * @returns
 * * !String hospitalCode
 * * !String hospitalName
 * * !String hospitalTel
 * * !String hospitalAddress
 */
export const getHospitalInfo = async (hospitalCode) => {
  return await axios.get(`/hospital/${hospitalCode}`);
};

/**
 * 목적 : 병원에 대한 정보를 추가하기 위한 API
 * @param {HosptialsDTO} hospitalInfo
 * * !String hospitalName
 * * !String hospitalTel
 * * !String hospitalAddress
 * @returns {boolean} result (등록 작업에 대한 성공 여부)
 */
export const registerHospitalInfo = async (hospitalInfo) => {
  return await axios.post('/hospital', hospitalInfo);
};

/**
 * 목적 : 병원에 대한 정보를 수정하기 위한 API
 * @param {HospitalsDTO} hospitalInfo
 * * !String hospitalCode
 * * !String hospitalName
 * * !String hospitalTel
 * * !String hospitalAddress
 * @returns {boolean} result (수정 작업에 대한 성공 여부)
 */
export const modifyHospitalsInfo = async (hospitalInfo) => {
  return await axios.put('/hospital', hospitalInfo);
};

/**
 * 목적 : 병원에 대한 정보를 삭제하기 위한 API
 * @param {String} hospitalCode
 * @returns {boolean} result (삭제 작업에 대한 성공 여부)
 */
export const removeHospitalInfo = async (hospitalCode) => {
  return await axios.delete(`/hospital/${hospitalCode}`);
};
