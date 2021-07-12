import axios from 'axios';

/**
 * * 목적 : 해당 병원의 모든 임직원 목록 가져오기
 *
 * @param {String} hospitalCode
 * @returns {List<MembersDTO>} memberInfo
 * * [Members Table Entity]
 * * * !int memberId (임직원 고유 코드)
 * * * !String memberEmail (임직원 이메일)
 * * * !String memberName (임직원 이름)
 * * * !String memberTel (임직원 전화번호)
 * * * !String memberAddr1 (임직원 상세주소1)
 * * * !String memberAddr2 (임직원 상세주소2)
 * * * !String memberPostal (임직원 우편번호)
 * * * String memberImage (임직원 프로필 사진)
 * * * !LocalDate memberBirth (임직원 생년월일)
 * * * String memberColor (임직원 색상)
 * @author JONG HYUN HONG
 */
export const showMembersListByHospitalCode = async (hospitalCode) => {
  return await axios.get(`/member`, {
    params: {
      hospitalCode,
    },
  });
};

/**
 * * 목적 : 검색된 키워드(이름)이 포함된 모든 임직원 목록 가져오기
 *
 * @param {MemberSearchVO} memberSearchInfo
 * * [MemberSearchVO Entity]
 * * * !String hospitalCode (병원 코드)
 * * * !String memberName (임직원 이름)
 * @returns {List<MembersDTO>} searchList
 * * [Members Entity]
 * * * !int memberId (임직원 고유 코드)
 * * * !String memberEmail (임직원 이메일)
 * * * !String memberName (임직원 이름)
 * * * !String memberTel (임직원 전화번호)
 * * * !String memberAddr1 (임직원 상세주소1)
 * * * !String memberAddr2 (임직원 상세주소2)
 * * * !String memberPostal (임직원 우편번호)
 * * * String memberImage (임직원 프로필 사진)
 * * * !LocalDate memberBirth (임직원 생년월일)
 * * * String memberColor (임직원 색상)
 * @author JONG HYUN HONG
 */
export const showMembersListByNameAndCode = async (memberSearchInfo) => {
  return await axios.get(`/member/search`, memberSearchInfo);
};

/**
 * * 목적 : 해당 병원의 해당 임직원을 추가하기
 *
 * @param {MembersDTO} memberInfo
 * * [Mermbers Entity]
 * * * !String memberEmail (임직원 이메일)
 * * * !String memberPw (임직원 비밀번호)
 * * * !String memberName (임직원 이름)
 * * * !String memberTel (임직원 전화번호)
 * * * !String memberAddr1 (임직원 상세주소1)
 * * * !String memberAddr2 (임직원 상세주소2)
 * * * !String memberPostal (임직원 우편번호)
 * * * !String memberAuthority (임직원 권한)
 * * * !boolean memberEnabled (임직원 활성화)
 * * * !String hospitalCode (병원코드)
 * * * String doctorRoom (진료실)
 * * * String memberImage (임직원 프로필 사진)
 * * * !String memberGender (임직원 성별)
 * * * !LocalDate memberBirth (임직원 생년월일)
 * * * !LocalDateTime joinedDate (임직원 가입일자)
 * * * String memberIntroduction (임직원 자기소개)
 * * * !String memberColor (임직원 색상)
 * @author JONG HYUN HONG
 * @returns {boolean} result 성공: true, 실패: false
 */
export const addMember = async (memberInfo) => {
  return await axios.post(`/member`, memberInfo);
};

/**
 * * 목적 : 해당 병원의 해당 임직원을 수정하기
 *
 * @param {MembersDTO} memberInfo
 * * [Mermbers Table]
 * * * !int memberId (임직원 고유 번호)
 * * * !String memberAuthority (임직원 권한)
 * * * !String memberName (임직원 이름)
 * * * !String memberTel (임직원 전화번호)
 * * * !String memberPostal (임직원 우편번호)
 * * * !String memberAddr1 (임직원 상세주소1)
 * * * !String memberAddr2 (임직원 상세주소2)
 * @returns {boolean} result 성공: true, 실패: false
 * @author JONG HYUN HONG
 */
export const modifyMemberInfo = async (memberInfo) => {
  return await axios.put(`/member`, memberInfo);
};

/**
 * * 목적 : 해당 병원의 해당 임직원을 삭제하기
 *
 * @param {int} memberId
 * @returns {boolean} result 성공: true, 실패: false
 * @author JONG HYUN HONG
 */
export const deleteMember = async (memberId) => {
  return await axios.delete(`/member`, {
    params: {
      memberId,
    },
  });
};

/**
 * * 목적 : 해당 병원의 해당 임직원에 대한 비밀번호 초기화하기
 *
 * @param {int} memberId
 * @returns {boolean} result 성공: true, 실패: false
 * @author JONG HYUN HONG
 */
export const intializeMemberPw = async (memberId) => {
  return await axios.put(`/member/initial-pw`, {
    params: {
      memberId,
    },
  });
};

/**
 * * 목적 : 해당 환자의 이미지 업로드 버튼을 눌렀을때 이미지를 base64로 전송해서 저장
 *
 * @param {AddNoticeImageVO} imageInfo
 * * [AddNoticeImageVO Entity]
 * * * !String hospitalCode (병원 코드)
 * * * !String imageName (이미지 이름)
 * * * !String base64Content (base64 텍스트)
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
 * * [EmailCheckVO Entity]
 * * * !String hospitalCode (병원 코드)
 * * * !String memberEmail (임직원 이메일)
 * @returns {boolean} result 성공: true, 실패: false
 * @author JONG HYUN HONG
 */
export const isExistedEmail = async (emailCheckInfo) => {
  return await axios.get(`/member/email-check`, emailCheckInfo);
};
