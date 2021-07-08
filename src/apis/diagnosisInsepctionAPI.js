import axios from 'axios';

/**
 * * 목적 : 진단 검사의 ID(diagTestId)로 진단 검사 상세 리스트를 출력
 * 
 * @param {number} diagTestId 
 * @returns {List<DiagnosticTestRecordsVO>} diagnosticTestRecordList
 * * [DiagnosticInspections Entity]
 * * * !String bundleCode
 * * * !String bundleName
 * * * !String presCode
 * * * !String presName
 * * * !String presVessel
 * * * !String presSpecimenName
 * * [DiagnosticTestRecords VO]
 * * * !String diagTestAvgValue
 * * [DiagnosticTestRecords Entity]
 * * * !int diagTestRecordId
 * * * double diagTestValue
 * * * !String diagTestStatus
 * * [Members Entity - Doctor]
 * * * !String doctorName
 * * [Members Entity - Inspector]
 * * * String inspectorName
 */
export const showDiagnosticTestListByDiagTestId = async (diagTestId) => {
    return await axios.get(`/diagnosis/inspection/${diagTestId}`);
}

/**
 * * 목적 : 병원 코드로 startDate ~ endDate 기간 동안의 진단 검사 기록 리스트를 가져오기 위한 API
 * 
 * @param {DateWithHospitalCode} hospitalInfo 
 * @returns {List<DiagnosticVO>} weeklyTestList
 */
export const showWeeklyDiagnosticTestListByHospitalCode = async (hospitalInfo) => {
    return await axios.get("/diagnosis/inspection", hospitalInfo);
}