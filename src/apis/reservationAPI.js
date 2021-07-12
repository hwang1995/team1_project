import axios from 'axios';

/**
 * * 목적 : 진료 접수(예약) 목록 보기를 위한 API
 * @param {WeekNoWithMemberVO} weekNoWithMember
 * * !int weekNo
 * * !int memberId
 * * !String hospitalCode
 * @returns {List<ReservationVO>} result
 * * !String category (time)
 * * !String color (white)
 * * [Diagnosis Entity]
 * * !int id (diagId, 진료 pk)
 * * !int calendarId (=weekNo)
 * * !LocalDateTime start (예약 시작 시간)
 * * !LocalDateTime end (예약 마감 시간)
 * * !String visitPurpose (방문 목적)
 * * [Patients Entity]
 * * !String title (환자 이름)
 * * !int patientId (환자 pk)
 * * !String patientName (환자 이름)
 * * !LocatDate patientBirth (환자 생년월일)
 * * [Members Entity]
 * * !int memberId
 * * !String bgColor (의사마다의 고유 색)
 * * !String doctorName (의사 이름)
 * * !String doctorRoom (의사 방 이름)
 * @author SI HYUN PARK
 */
export const getReservationInfo = async (WeekNoWithMemberVO) => {
  return await axios.post('/reservation/data', WeekNoWithMemberVO);
};

/**
 * * 목적 : 진료 접수(예약)을 추가하기 위한 API
 * @param {DiagnosisDTO} diagnosisInfo
 * * !int weekNo
 * * !LocalDateTime startDate
 * * !LocalDateTime endDate
 * * !String visitPurpose
 * * String drOpinion (null)
 * * !boolean isPharmacy (false)
 * * !boolean isInjector (false)
 * * !boolean isDiagnosticTest (false)
 * * !boolean isVital (false)
 * * !String reservationStatus (RESERVATION_REGISTER)
 * * !int memberId
 * * !int patientId
 * * !String hospitalCode
 * @returns {boolean} result (등록 성공 여부)
 * @author SI HYUN PARK
 */
export const registerReservationInfo = async (diagnosisInfo) => {
  return await axios.post('/reservation', diagnosisInfo);
};

/**
 * * 목적 : 진료 접수 내용 (방문 목적)을 수정하기 위한 API
 * @param {diagnosisUpdateVO} diagnosisUpdateVO
 * * !int diagId
 * * !int patientId
 * * !int memberId
 * * !String hospitalCode
 * * !String visitPurpose
 * @returns {boolean} result (수정 성공 여부)
 * @author SI HYUN PARK
 */
export const modifyReservationInfo = async (diagnosisUpdateVO) => {
  return await axios.put('/reservation', diagnosisUpdateVO);
};

/**
 * * 목적 : 진료 접수 내용을 삭제 (status 수정)하기 위한 API
 * @param {int} diagId
 * @returns {boolean} result (삭제 성공 여부)
 * @author SI HYUN PARK
 */
export const removeReservationInfo = async (diagId) => {
  return await axios.put(`/reservation/${diagId}`);
};

/**
 * 목적 : 예약 추가시 등록할 환자를 검색하기 위한 API
 * @param {PatientSearchVO} patientVO
 * * !String hospitalCode
 * * !String patientName
 * @returns {List<PatientDTO>} data
 * * !int patientId
 * * !String patientName
 * * !String patientSsn
 * * !String patientGender
 * * !String patientTel
 * * !String patientAddr1
 * * String patientAddr2
 * * !String patientPostal
 * * !int patientHeight
 * * !int patientWeight
 * * !LocalDateTime recentDate
 * * !LocalDate patientBirth
 * * !String hospitalCode
 * @author SI HYUN PARK
 */
export const getPatientInfo = async (patientVO) => {
  return await axios.get('/reservation/patient', patientVO);
};

/**
 * 목적 : 화면 렌더링 될때 select에 의사 정보를 세팅할 데이터를 가져오기 위한 API
 * @param {String} hospitalCode
 * @returns {List<MemberDTO>} data
 * * !int memberId
 * * !String memberName
 * * !String doctorRoom
 * * !String hospitalCode
 * * !String memberColor
 * @author SI HYUN PARK
 */
export const getDoctorInfo = async (hospitalCode) => {
  return await axios.get(`/reservation/doctor/${hospitalCode}`);
};

/**
 * * 목적 : 예약 환자 검색
 * @param {PatientSearchVO} patientSearchVO
 * * !String hospitalCode
 * * !String patientName
 * @returns {List<ReservationVO>} data
 * * !String category (time)
 * * !String color (white)
 * * [Diagnosis Entity]
 * * !int id (diagId, 진료 pk)
 * * !int calendarId (=weekNo)
 * * !LocalDateTime start (예약 시작 시간)
 * * !LocalDateTime end (예약 마감 시간)
 * * !String visitPurpose (방문 목적)
 * * [Patients Entity]
 * * !String title (환자 이름)
 * * !int patientId (환자 pk)
 * * !String patientName (환자 이름)
 * * !LocatDate patientBirth (환자 생년월일)
 * * [Members Entity]
 * * !int memberId
 * * !String bgColor (의사마다의 고유 색)
 * * !String doctorName (의사 이름)
 * * !String doctorRoom (의사 방 이름)
 * @author SI HYUN PARK
 */
export const getSearchReservationPatient = async (patientSearchVO) => {
  return await axios.get('/reservation/waitingPatient', patientSearchVO);
};
