import axios from 'axios';

/**
 * * 목적 : 진단 검사의 ID(diagTestId)로 진단 검사 상세 리스트를 출력
 * 
 * @param {number} diagTestId 
 * @returns {List<DiagnosticTestRecordsVO>} diagnosticTestRecordList
 * * [DiagnosticInspections Entity]
 * * * !String bundleCode (그룹 코드)
 * * * !String bundleName (그룹 명)
 * * * !String presCode (처방 코드)
 * * * !String presName (처방 명)
 * * * !String presVessel (처방 용기)
 * * * !String presSpecimenName (처방 검체 명)
 * * [DiagnosticTestRecords VO]
 * * * !String diagTestAvgValue (진단 검사 평균 값)
 * * [DiagnosticTestRecords Entity]
 * * * !int diagTestRecordId (진단 검사 상세의 ID)
 * * * double diagTestValue (진단 검사의 결과 값)
 * * * !String diagTestStatus (진단 검사의 상태)
 * * [Members Entity - Doctor]
 * * * !String doctorName (의사의 이름)
 * * [Members Entity - Inspector]
 * * * String inspectorName (검사자의 이름)
 * @throws
 * * HTTP Status 400 - Bad Request
 * * * status : "no_diag_test_id"
 * * * message : "올바른 진단 검사 ID를 입력해주세요"
 * * HTTP Status 204 - No Content
 * > 진단 검사의 결과 값이 없는 경우 Throw
 */
export const showDiagnosticTestListByDiagTestId = async (diagTestId) => {
    const result = await axios.get(`/diagnosis/inspection/${diagTestId}`)
    return result.data.data;
}

/**
 * * 목적 : 병원 코드로 startDate ~ endDate 기간 동안의 진단 검사 기록 리스트를 가져오기 위한 API
 * 
 * @param {DateWithHospitalCode} hospitalInfo 
 * * !String startDate (yyyy-MM-dd 형식)
 * * !String endDate (yyyy-MM-dd 형식)
 * * !String hospitalCode (병원 코드)
 * @returns {List<DiagnosticVO>} weeklyTestList
 * * [DiagnosticTests Entity]
 * * * !int diagTestId (진단 검사 ID)
 * * * !String createdDate (진단 검사의 생성 일자)
 * * * !String inspectionStatus (진단 검사의 상태)
 * * [Patients Entity]
 * * * !String patientName (환자의 이름)
 * * * !String patientBirth (환자의 생일)
 * * * !String patientGender (환자의 성별)
 * * [Members Entity]
 * * * !String doctorRoom (의사의 진료실)
 * 
 * @throws 
 * * HTTP Status 400 - Bad Request
 * * * status : "no_date_with_hospital_info"
 * * * message : "올바른 정보를 입력해주세요."
 * * HTTP Status 204 - No Content
 * * * status : "no_contents" || "no_member_and_patient"
 * * * message : "이번 주에는 진단 검사가 존재하지 않습니다." || "임직원과 환자 정보가 존재하지 않습니다"
 */
export const showWeeklyDiagnosticTestListByHospitalCode = async (hospitalInfo) => {
    const result = await axios.post("/diagnosis/inspection", hospitalInfo);
    return result.data.data;
}

/**
 * * 목표 : 진단 검사의 상태를 COMPLETED, PROCESSING, PENDING으로 변경하는 API
 * @param {object} statusInfo 
 * * !String status (completed || processing || pending)
 * * !int diagTestId (진단 검사의 ID)
 * @returns {boolean} result
 * @throws 
 * * HTTP Status 400 - Bad Request
 * * * status : "not_diag_test_id"
 * * * message : "올바르지 않은 진단 검사의 식별자입니다."
 * * HTTP Status 409 - Conflict Request
 * * * status : "not_updated_diag_test_status"
 * * * message : "진단 검사의 상태가 변경되지 않았습니다."
 */
export const diagnosticChangeStatus = async (statusInfo) => {
    const result = await axios.put("/diagnosis/inspection/status", statusInfo);
    return result.data.data;
}

/**
 * * 목표 : 진단 검사 상세의 상태를 COMPLETED, PROCESSING, PENDING으로 변경하는 API
 * @param {object} statusInfo 
 * * !String status (completed || processing || pending)
 * * !int diagTestId (진단 검사의 ID)
 * @returns {boolean} result
 * @throws 
 * * HTTP Status 400 - Bad Request
 * * * status : "not_diag_test_id"
 * * * message : "올바르지 않은 진단 검사의 식별자입니다."
 * * HTTP Status 409 - Conflict Request
 * * * status : "not_updated_diag_test_status"
 * * * message : "진단 검사의 상태가 변경되지 않았습니다."
 */
export const diagnosticTestRecordChangeStatus = async (statusInfo) => {
    const result = await axios.put("/diagnosis/inspection/diagTestStatus", statusInfo);
    return result.data.data;
}


/**
 * * 목표 : [미구현 사항] 해당 환자의 진단 검사 상세에서 결과를 입력시에 값을 추가
 * @param {object} testInfos 
 * * !int inspector_member_id (검사자 임직원의 ID)
 * * !List<DiagnosticTestResultVO>
 * * * !int diag_test_record_id (진단 검사 상세의 ID)
 * * * !double diag_test_value (진단 검사 상세의 결과 값)
 * @return {Boolean} result
 */
export const changeDiagnosticTestValue = async (testInfos) => {
    const result = await axios.put("/diagnosis/inspection/", testInfos);
    return result.data.data;
}

/**
 * * 목표 : 진단 검사의 상세 ID와 검사자의 ID를 넘거 바코드를 출력시의 상태를 바꿔준다.
 * @param {List<DiagnosticTestResultVO} barcodeInfo 
 *  * * !List<DiagnosticTestResultVO>
 * * * !int diagTestRecordId (진단 검사 상세의 ID)
 * * * !int inspectorMemberId (검사자의 ID)
 * @returns {boolean} true | false
 */
export const changeStatusToRegisterWithMemberId = async (barcodeInfo) => {
    const result = await axios.put('/diagnosis/inspection/barcodePrint', barcodeInfo);
    return result.data.data;
}

/**
 * * 목표 : 진단 검사의 상세 ID와 검사자의 ID를 넘거 상태를 취소로 바꿔준다.
 * @param {List<DiagnosticTestResultVO} barcodeInfo 
 *  * * !List<DiagnosticTestResultVO>
 * * * !int diagTestRecordId (진단 검사 상세의 ID)
 * * * !int inspectorMemberId (검사자의 ID)
 * @returns {boolean} true | false
 */
export const changeStatusToPendingWithMemberId = async (diagnosticInfo) => {
    const result = await axios.put('/diagnosis/inspection/pending', diagnosticInfo);
    return result.data.data;
}

/**
 * * 목표 : 진단 검사의 상세 ID와 검사자의 ID를 넘거 상태를 완료로 바꿔준다.
 * @param {List<DiagnosticTestResultVO} barcodeInfo 
 *  * * !List<DiagnosticTestResultVO>
 * * * !int diagTestRecordId (진단 검사 상세의 ID)
 * * * !int inspectorMemberId (검사자의 ID)
 * @returns {boolean} true | false
 */
export const changeStatusToCompletedWithMemberId = async (diagnosticInfo) => {
    const result = await axios.put('/diagnosis/inspection/completed', diagnosticInfo);
    return result.data.data;
}