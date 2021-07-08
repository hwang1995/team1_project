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
 */
export const getAuthentication = async (loginInfo) => {
    return await axios.get('/auth', loginInfo);
}