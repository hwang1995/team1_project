import axios from 'axios';

/**
 * * 목적 : 해당 병원의 식별자 코드(hospitalCode)로 NOTICE 리스트를 출력하기 위한 API
 *
 * @param {String} hospitalCode
 * @returns {List<NoticesDTO>} list
 * * [notices Entity]
 * * * !String noticeTitle
 * * * !String noticeAuthor
 * * * !String createDate
 * * * !String noticeHeadText
 * * * String noticeHeadImage
 * * * !int noticeCount
 */
export const getNoticesList = async (hospitalCode) => {
  return await axios.get('https://localhost/api/v1/notice/', {
    params: {
      hospitalCode,
    },
  });
};

/**
 * * 목적 : 해당 공지사항의 댓글 리스트를 출력하기 위한 API
 *
 * @param {number} noticeId
 * @returns {List<NoticeCommentsDTO>} list
 * * [noticeComments Entity]
 * * * !String memberName
 * * * !String createdDate
 * * * !String comment
 */
export const getNoticeCommentsList = async (noticeId) => {
  return await axios.get('https://localhost/api/v1/notice/comments', {
    params: {
      noticeId,
    },
  });
};

/**
 * * 목적 : 해당 공지사항의 상세정보 + 조회수 증가를 위한 API
 *
 * @param {number} noticeId
 * @returns {List<NoticeCommentsDTO>} list
 * * [notices Entity]
 * * * !String noticeTitle
 * * * !String noticeContent
 * * * !String noticeAuthor
 */
export const getNoticeList = async (noticeId) => {
  return await axios.get('https://localhost/api/v1/notice/detail', {
    params: {
      noticeId,
    },
  });
};

/**
 * * 목적 : 해당 공지사항의 검색(제목)을 포함한 게시물 위한 API
 *
 * @param {SearchNoticeByHospitalCodeAndTitleVO} searchNoticeByHospitalAndTitle
 * * [SearchNoticeByHospitalCodeAndTitleVO Entity]
 * * * !String noticeTitle
 * * * !String hospitalCode
 * @returns {List<NoticesDTO>} list
 * * [notices Entity]
 * * * !String noticeTitle
 * * * !String noticeAuthor
 * * * !String createDate
 * * * !String noticeHeadText
 * * * String noticeHeadImage
 * * * !int noticeCount
 */
export const getNoticesListByTitle = async (searchNoticeByHospitalAndTitle) => {
  return await axios.get('https://localhost/api/v1/notice/search', {
    params: {
      searchNoticeByHospitalAndTitle,
    },
  });
};

/**
 * * 목적 : 해당 공지사항을 등록하기 위한 API
 *
 * @param {NoticesDTO} noticeInfo
 * * [notices Entity]
 * * * !String noticeTitle
 * * * !String noticeContent
 * * * !String noticeAuthor
 * * * !LocalDateTime createDate
 * * * !String hospitalCode
 * * * !int memberId
 * * * !String noticeAuthor
 * * * !String noticeHeadText
 * * * String noticeHeadImage
 * @returns {boolean} result
 * 성공: True, 실패: False
 */
export const createNotice = async (noticeInfo) => {
  return await axios.post('https://localhost/api/v1/notice/', {
    params: {
      noticeInfo,
    },
  });
};

/**
 * * 목적 : 해당 공지사항의 댓글을 등록하기 위한 API
 *
 * @param {NoticeCommentsDTO} noiceCommentInfo
 * * [noticeComments Entity]
 * * * !int noticeCommentId
 * * * !int memberId
 * * * !int noticeId
 * * * !String memberName
 * * * !String comment
 * @returns {boolean} result
 * 성공: True, 실패: False
 */
export const addComment = async (noiceCommentInfo) => {
  return await axios.post('https://localhost/api/v1/notice/comment', {
    params: {
      noiceCommentInfo,
    },
  });
};

/**
 * * 목적 : 해당 공지사항의 이미지를 서버에 올리고 클라이언트에 URL을 전달하기 위한 API
 *
 * @param {AddNoticeImageVO} noticeImageInfo
 * * [AddNoticeImageVO Entity]
 * * * !String hospitalCode
 * * * !String String
 * * * !String base64Content
 * @returns {String} filePath
 * * filePath : 파일저장 경로
 */
export const addNoticeImage = async (noticeImageInfo) => {
  return await axios.post('https://localhost/api/v1/notice/images', {
    params: {
      noticeImageInfo,
    },
  });
};

/**
 * * 목적 : 해당 공지사항을 수정하기 위한 API
 *
 * @param {NoticesDTO} noticeInfo
 * * [notices Entity]
 * * * !String noticeTitle
 * * * !String noticeContent
 * * * !String noticeHeadText
 * * * String noticeHeadImage
 * * * !int noticeId
 * @returns {boolean} result
 * 성공: True, 실패: False
 */
export const modifyNotice = async (noticeInfo) => {
  return await axios.put('https://localhost/api/v1/notice', {
    params: {
      noticeInfo,
    },
  });
};

/**
 * * 목적 : 해당 댓글을 수정하기 위한 API
 *
 * @param {UpdateNoticeCommentVO} updateCommentInfo
 * * [UpdateNoticeCommentVO Entity]
 * * * !int noticeCommentId
 * * * !String comment
 * @returns {boolean} result
 * 성공: True, 실패: False
 */
export const modifyComment = async (updateCommentInfo) => {
  return await axios.put('https://localhost/api/v1/notice/comment', {
    params: {
      updateCommentInfo,
    },
  });
};

/**
 * * 목적 : 해당 공지사항을 삭제하기 위한 API
 *
 * @param {number} noticeId
 * @returns {boolean} result
 * 성공: True, 실패: False
 */
export const removeNotice = async (noticeId) => {
  return await axios.delete('https://localhost/api/v1/notice', {
    params: {
      noticeId,
    },
  });
};

/**
 * * 목적 : 해당 댓글을 삭제하기 위한 API
 *
 * @param {number} noticeCommentId
 * @returns {boolean} result
 * 성공: True, 실패: False
 */
export const removeComment = async (noticeCommentId) => {
  return await axios.delete('https://localhost/api/v1/notice/comment', {
    params: {
      noticeCommentId,
    },
  });
};
