import axios from 'axios';

/**
 * * 목표 : 약품의 이름을 검색하면 약품의 대한 리스트를 출력하는 API
 * @param {string} medicineName 
 * @returns {List<MedicinesDTO>} medicineResults
 * * [Medicines Entity]
 * * !int medicineId (약품의 ID)
 * * !String medicineCode (약품 코드)
 * * !String medicineName (약품 영문 명)
 * * !String medicineType (약품 구분)
 * * !String medicineUnit (약 혹은 주사의 단위)
 * * !String medicineExplain (약 혹은 주사의 상세 설명)
 * @throws
 * * HTTP Status 400 - Bad Request
 * * * status : "no_medicine_name"
 * * * message : "약품 이름이 입력되지 않았거나, 공백입니다."
 * * HTTP Status 204 - No Content
 * * * status : "no_medicines_content"
 * * * message : "약품이 존재하지 않습니다."
 * @author SUNG WOOK HWANG
 */
export const searchMedicineList = async (medicineName) => {
    const result = await axios.get("/search/medicine", {
        params: {
            medicineName
        }
    });
    return result.data.data;
};

/**
 * * 목표 : 주사의 이름을 검색하면 주사의 대한 리스트를 출력하는 API
 * @param {string} medicineName 
 * @returns {List<MedicinesDTO>} medicineResults
 * * [Medicines Entity]
 * * !int medicineId (약품의 ID)
 * * !String medicineCode (약품 코드)
 * * !String medicineName (약품 영문 명)
 * * !String medicineType (약품 구분)
 * * !String medicineUnit (약 혹은 주사의 단위)
 * * !String medicineExplain (약 혹은 주사의 상세 설명)
 * @throws
 * * HTTP Status 400 - Bad Request
 * * * status : "no_medicine_name"
 * * * message : "약품 이름이 입력되지 않았거나, 공백입니다."
 * * HTTP Status 204 - No Content
 * * * status : "no_medicines_content"
 * * * message : "약품이 존재하지 않습니다."
 * @author SUNG WOOK HWANG
 */
export const searchInjectorList = async (medicineName) => {
    const result = await axios.get("/search/injector", {
        params: {
            medicineName
        }
    });
    return result.data.data;

};


/**
 * * 목표 : 진단 검사의 그룹 명 (bundleName)을 검색하면 진단 검사에 대한 리스트를 출력하기 위한 API
 * @param {string} bundleName 
 * @returns {List<DiagnosticInspectionsDTO>} inspectionResults
 * * [DiagnosticInspections Entity]
 * * * !int diagInspectionId (진단 검사 리스트의 ID)
 * * * !String bundleCode (그룹 코드 || 묶음 코드)
 * * * !String bundleName (그룹 명 || 묶음 명)
 * * * !String presCode (처방 코드)
 * * * !String presName (처방 명)
 * * * !String presUnit (단위)
 * * * !double presLowerLimit (하한치)
 * * * !double presUpperLimit (상한치)
 * * * String presVessel (용기)
 * * * String presSpecimenName (검체명)
 * @throws
 * * HTTP Status 400 - Bad Request
 * * * status : "no_bundle_name"
 * * * message : "그룹 명이 입력되지 않았거나, 공백입니다."
 * * HTTP Status 204 - No Content
 * * * status : "no_diagnostic_inspection_content"
 * * * message : "진단 검사가 존재하지 않습니다."
 * @author SUNG WOOK HWANG
 */
export const searchDiagnosticList = async (bundleName) => {
    const result = await axios.get("/search/diagnostic", {
        params: {
            bundleName
        }
    });
    return result.data.data;

};

/**
 * * 목표 : 진단 검사의 그룹 코드 (bundleCode)를 검색하면 진단 검사에 대한 리스트를 출력하기 위한 API
 * @param {string} bundleCode 
 * @returns {List<DiagnosticInspectionsDTO>} inspectionResults
 * * [DiagnosticInspections Entity]
 * * * !int diagInspectionId (진단 검사 리스트의 ID)
 * * * !String bundleCode (그룹 코드 || 묶음 코드)
 * * * !String bundleName (그룹 명 || 묶음 명)
 * * * !String presCode (처방 코드)
 * * * !String presName (처방 명)
 * * * !String presUnit (단위)
 * * * !double presLowerLimit (하한치)
 * * * !double presUpperLimit (상한치)
 * * * String presVessel (용기)
 * * * String presSpecimenName (검체명)
 * @throws
 * * HTTP Status 400 - Bad Request
 * * * status : "no_bundle_name"
 * * * message : "그룹 명이 입력되지 않았거나, 공백입니다."
 * * HTTP Status 204 - No Content
 * * * status : "no_diagnostic_inspection_content"
 * * * message : "진단 검사가 존재하지 않습니다."
 * @author SUNG WOOK HWANG
 */
export const searchDiagnosticListByCode = async (bundleCode) => {
    const result = await axios.get("/search/diagnostic-code", {
        params: {
            bundleCode
        }
    });
    return result.data.data;
};

/**
 * * 목표 : 병원 정보와 환자의 이름을 통해 환자의 리스트를 출력하기 위한 API
 * @param {PatientSearchVO} patientInfo 
 * * !String hospitalCode (병원 코드)
 * * !String patientName (환자 이름)
 * @returns {List<PatientVO>} patientInfos
 * * !int patientId (환자의 ID)
 * * !String patientName (환자 이름)
 * * !String patientGender (환자의 성별)
 * * !String patientBirth (환자의 생일, LocalDateTime > String으로 변환함)
 * * !String hospitalCode (병원 코드)
 * @throws
 * * HTTP Status 400 - Bad Request
 * * * status : "no_patient_search_info"
 * * * message : "병원 코드 혹은 환자의 이름이 없습니다"
 * * HTTP Status 204 - No Content
 * * * status : "no_result"
 * * * message : "검색 결과 존재하지 않습니다."
 * @author SUNG WOOK HWANG
 */
export const searchPatientInfoByName = async (patientInfo) => {
    const result = await axios.post("/search/patient", patientInfo);
    return result.data.data;
}


/**
 * * 목표 : 진료의 식별자로 환자의 ID를 알아내고 진료 정보를 만들어 내어 리턴하는 API
 * @param {number} diagId 
 * @returns {DiagnosisInfoVO} result
 * * !int diagId (진료 ID)
 * * !String visitPurpose (내방 목적)
 * * !String patientName (환자 이름)
 * * !String patientGender (환자 성별)
 * * !String patientBirth (환자 생년월일)
 */
export const getDiagnosisInfo = async (diagId) => {
    return await axios.get("/search/diagnosisInfo", {
        params: {
            diagId
        }
    })
};

export const showDiagnosticTestListByPatientId = async (patientId) => {
    const result = await axios.get('/search/diagnosticInfo', {
        params: {
            patientId
        }
    });

    return result.data.data;
}