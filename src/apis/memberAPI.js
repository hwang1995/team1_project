import axios from 'axios';

/**
 * * 목적 : 해당 병원의 모든 임직원 목록 가져오기
 *
 * @param {String} hospitalCode
 * @returns {List<MembersDTO>} memberInfo
 * * [Members Table]
 * * * !int memberId (임직원 고유 코드)
 * * * !String memberEmail (임직원 이메일)
 * * * !String memberName (임직원 이름)
 * * * !String memberTel (임직원 전화번호)
 * * * !String memberAddr1 (임직원 상세주소1)
 * * * !String memberAddr2 (임직원 상세주소2)
 * * * !String memberPostal (임직원 우편번호)
 * * * String memberImage (임직원 프로필 사진)
 * * * !String memberBirth (임직원 생년월일)
 * * * String memberColor (임직원 색상)
 * @author JONG HYUN HONG
 */
export const showMembersListByHospitalCode = async (hospitalCode) => {
  return await axios.get(`/member`, hospitalCode);
};

/**
 * * 목적 : 검색된 키워드(이름)이 포함된 모든 임직원 목록 가져오기
 *
 * @param {MemberSearchVO} memberSearchInfo
 * * [MemberSearchVO]
 * * * !String hospitalCode (병원 코드)
 * * * !String memberName (임직원 이름)
 * @returns {List<MembersDTO>} searchList
 * * [Members Table]
 * * * !memberId (임직원 고유 코드)
 * * * !memberEmail (임직원 이메일)
 * * * !memberName (임직원 이름)
 * * * !memberTel (임직원 전화번호)
 * * * !memberAddr1 (임직원 상세주소1)
 * * * !memberAddr2 (임직원 상세주소2)
 * * * !memberPostal (임직원 우편번호)
 * * * memberImage (임직원 프로필 사진)
 * * * !memberBirth (임직원 생년월일)
 * * * memberColor (임직원 색상)
 * @author JONG HYUN HONG
 */
export const showMembersListByNameAndCode = async (memberSearchInfo) => {
  return await axios.get(`/member/search`, memberSearchInfo);
};

/**
 * * 목적 : 해당 병원의 해당 임직원을 추가하기
 *
 * @param {MembersDTO} memberInfo
 * * [Mermbers Table]
 * * * !memberEmail (임직원 이메일)
 * * * !memberPw (임직원 비밀번호)
 * * * !memberName (임직원 이름)
 * * * !memberTel (임직원 전화번호)
 * * * !memberAddr1 (임직원 상세주소1)
 * * * !memberAddr2 (임직원 상세주소2)
 * * * !memberPostal (임직원 우편번호)
 * * * !memberAuthority (임직원 권한)
 * * * !memberEnabled (임직원 활성화)
 * * * !hospitalCode (병원코드)
 * * * doctorRoom (진료실)
 * * * memberImage (임직원 프로필 사진)
 * * * !memberGender (임직원 성별)
 * * * !memberBirth (임직원 생년월일)
 * * * !joinedDate (임직원 가입일자)
 * * * memberIntroduction (임직원 자기소개)
 * * * !memberColor (임직원 색상)
 * @author JONG HYUN HONG
 * @returns {boolean} result
 */
export const addMember = async (memberInfo) => {
  return await axios.post(`/member`, memberInfo);
};

/**
 * * 목적 : 해당 병원의 해당 임직원을 수정하기
 *
 * @param {MembersDTO} memberInfo
 * * [Mermbers Table]
 * * * !memberId (임직원 고유 번호)
 * * * !memberAuthority (임직원 권한)
 * * * !memberName (임직원 이름)
 * * * !memberTel (임직원 전화번호)
 * * * !memberPostal (임직원 우편번호)
 * * * !memberAddr1 (임직원 상세주소1)
 * * * !memberAddr2 (임직원 상세주소2)
 * @returns {boolean} result 
 * @author JONG HYUN HONG
 */
export const modifyMemberInfo = async (memberInfo) => {
  return await axios.put(`/member`, memberInfo);
};

/**
 * * 목적 : 해당 병원의 해당 임직원을 삭제하기
 *
 * @param {int} memberId
 * @returns {boolean} result
 * @author JONG HYUN HONG
 */
export const deleteMember = async (memberId) => {
  return await axios.delete(`/member`, memberId);
};

/**
 * * 목적 : 해당 병원의 해당 임직원에 대한 비밀번호 초기화하기
 *
 * @param {int} memberId
 * @returns {boolean} result
 * @author JONG HYUN HONG
 */
export const intializeMemberPw = async (memberId) => {
  return await axios.put(`/member/initial-pw`, memberId);
};

/**
 * * 목적 : 해당 환자의 이미지 업로드 버튼을 눌렀을때 이미지를 base64로 전송해서 저장
 *
 * @param {AddNoticeImageVO} imageInfo
 * * [AddNoticeImageVO]
 * * * !hospitalCode (병원 코드)
 * * * !imageName (이미지 이름)
 * * * !base64Content (base64 텍스트)
 * @returns {String} imageSrc
 * @author JONG HYUN HONG
 */
export const memberImageUpload = async (imageInfo) => {
  return await axios.post(`/member/image`, imageInfo);
};

/**
 * * 목적 : 중복된 이메일이 있는지에 대해 검사
 *
 * @param {EmailCheckVO} emailCheckInfo
 * * [EmailCheckVO]
 * * * !hospitalCode (병원 코드)
 * * * !memberEmail (임직원 이메일)
 * @returns {boolean} result
 * @author JONG HYUN HONG
 */
export const isExistedEmail = async (emailCheckInfo) => {
  return await axios.get(`/member/email-check`, emailCheckInfo);
};
