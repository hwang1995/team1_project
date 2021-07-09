import axios from 'axios';


/**
 * * 목적 : 로그인을 수행하기 위한 API
 * * 경로 : /api/v1/auth
 * @param {LoginVO} loginInfo 
 * * !String hospitalCode
 * * !String memberEmail
 * * !String memberPw
 * 
 * @returns {UserInfoVO} userInfo
 * * !String authToken // JWT Token
 * * !int memberId // Member identify
 * * !String memberEmail
 * * !String memberAuthority 
 * * !String hospitalCode
 * 
 * @throws
 * * HTTP Status 401 - Unauthorized
 * * * status - "no_hospital"
 * * * message - "병원 정보가 존재하지 않습니다."
 * 
 * * HTTP Status 401 - Unauthorized
 * * * status - "no_account"
 * * * message - "존재하지 않습니다."
 */
export const getAuthentication = async (loginInfo) => {
    const result = await axios.post('/auth', loginInfo);
    const data = result.data.data;
    const status = result.status;

    return { data, status };
}