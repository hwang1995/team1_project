import axios from 'axios';

/**
 * * 목적 : 오늘 해당 병원의 해당 의사가 진료를 봐야하는 환자의 리스트를 가져오기 위한 API
 * @param {UserInfoVO} userInfo 
 * * !String authToken // JWT Token
 * * !int memberId
 * * !String memberEmail
 * * !String memberAuthority
 * * !String hospitalCode
 * 
 * @returns {List<DiagnosisListVO>} diagnosisList
 * * [Patients Entity]
 * * !int patientId 
 * * !String patientName
 * * !String patientGender
 * * !String patientBirth (LocalDateTime > String)
 * * [Diagnosis Entity]
 * * !int diagId
 * * !String startDate (LocalDateTime > String)
 * * !String visitPurpose (방문 목적)
 * 
 * @throws
 * * HTTP Status 400 - Bad Request
 * * * status - "no_user_info"
 * * * message - "UserInfoVO의 값이 정상적으로 들어오지 않았습니다."
 * * HTTP Status 204 - No Content
 * > 검색 결과가 존재하지 않을 경우 throw
 * * HTTP Status 409 - Conflict Request
 * * * status - "no_patient_info"
 * * * message - "환자의 정보가 존재하지 않습니다."
 */
export const getDiagnosisList = async (userInfo) => {
    const result = await axios.post('/diagnosis', userInfo);
    return result.data.data;
}

/**
 * * 목적 : 해당 병원의 해당 의사가 진료를 등록하기 위한 API
 * @param {RegistDiagnosisVO} diagnosisInfo 
 * * !int patientId (환자의 PK)
 * * !int memberId (임직원 (의사)의 PK)
 * * !int diagId (진료의 PK)
 * * !String hospitalCode (병원 코드)
 * * !String drOpinion (의사 의견)
 * * List<MedicineVO> medicines (약품 정보들)
 * * * int medicineId (Medicines 엔티티의 PK)
 * * * int medicineDose (약품 수량)
 * * * String medicineType (약품 타입)
 * * List<MedicineVO> injectors (주사 정보들)
 * * List<Integer> diagnostics (진단 검사 정보들)
 * * VitalVO vital (바이탈 검사 정보)
 * * * !int bloodPressure (혈압)
 * * * !int pulse (맥박)
 * * * !int respirationRate (호흡 수)
 * * * !int temperature (온도)
 * @returns {boolean} result (등록 성공 여부)
 * 
 * @throws
 * * HTTP Status 400 - Bad Request
 * * * status : "no_diagnosis_info"
 * * * message : "진료 등록 정보가 올바르지 않습니다. 다시 시도해주세요."
 * * HTTP Status 409 - Conflict Request
 * * * status : "not_updated_diagnosis_info" || "not_updated_medicines_info" || "not_updated_injectors_info" || "not_updated_diagnostics_info" || "not_updated_vital_info"
 * * * message : "알 수 없는 이유로 진료가 등록되지 않았습니다. 다시 시도해주세요."
 */
export const registDiagnosisInfo = async (diagnosisInfo) => {
    const result = await axios.put('/diagnosis', diagnosisInfo);
    return result.data.data;
}

/**
 * * 목적 : 환자의 식별자 (patientId)를 통해 진료 기록 리스트를 가져오기 위한 API

 * @param {number} patientId 
 * @returns {List<DiagnosisHistoryVO>} data
 * * !String startDate // 진료를 시작한 날짜 (LocalDateTime > String)
 * * !String visitPurpose // 병원에 내방한 이유
 * * !String drOpinion // 의사 소견
 * * List<MedicineRecordVO> medicines // 약 처방 기록
 * * * !String medicineCode // 약품 코드
 * * * !String medicineType // 약품 타입
 * * * !String medicineUnit // 내복약, 외용약, 주사약 등등..
 * * * !String medicineExplain // 약과 관련된 상세 설명
 * * * !int medicineDose // 처방 양
 * * !List<MedicineRecordVO> injectors // 주사 처방 기록
 * * !List<DiagnosticTestRecordVO> diagnostics // 진단 검사 기록
 * * * [DiagnosisTestRecords Entity]
 * * * * double diagTestValue // 진단 검사의 결과 값
 * * * * !String diagTestStatus // 진단 검사의 상태
 * * * [DiagnosticInspections Entity]
 * * * * !String bundleCode // 그룹 코드
 * * * * !String bundleName // 그룹 명
 * * * * !String presCode // 처방 코드
 * * * * !String presName // 처방 명
 * * * * !String presUnit // 처방 규격
 * * * * !double presLowerLimit // 하한 값
 * * * * double presUpperLimit // 상한 값
 * * VitalRecordsDTO vital // 바이탈 검사 기록
 * 
 * @throws
 * * HTTP Status 400 - Bad Request
 * * * status : "no_patient_id"
 * * * message : "회원의 식별자가 입력되지 않았습니다."
 * * HTTP Status 204 - No Content
 * > 환자가 진료를 안 받는 것이 이상한 것이 아니므로 No Content
 * 
 */
export const showDiagnosisHistoryByPatientId = async (patientId) => {
    const result = await axios.get("/diagnosis/history", {
        params: {
            patientId
        }
    });
    return result.data.data;
}