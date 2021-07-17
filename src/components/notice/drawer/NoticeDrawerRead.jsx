import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsPencilSquare, BsListUl, BsFillTrashFill } from 'react-icons/bs';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser';
import Typography from '@material-ui/core/Typography';
import { MdRemoveCircleOutline } from 'react-icons/md';
import {
  IconButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  List,
} from '@material-ui/core';
import moment from 'moment';
import DeleteCommentModal from '../modal/DeleteCommentModal';
import { setActiveStep } from 'redux/features/notice/noticeSlice';
import SyncSpinner from 'components/common/spinner/SyncSpinner';
import StyledButton from 'components/common/button/StyledButton';
import DeleteModal from 'components/notice/modal/DeleteModal';
import { getNoticeList, getNoticeCommentsList } from 'apis/noticeAPI';
import TitleHeaderComment from 'components/common/header/TitleHeaderComment';
import InputCommentBox from 'components/common/input/InputCommentBox';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const NoticeDrawerRead = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenCommentModal, setOpenCommentModal] = useState(false);
  const [notice, setNotice] = React.useState({});
  const [comment, setComment] = React.useState([]);
  const [inputComment, setInputComment] = useState('');
  const [changed, setChanged] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const currentIndex = useSelector((state) => state.notice.noticeCurrentIndex);
  const memberName = useSelector((state) => state.common.loginInfo.memberName);
  const memberId = useSelector((state) => state.common.loginInfo.memberId);

  useEffect(() => {
    setLoading(true);
    const getContentWithComment = async () => {
      try {
        // 1. 게시물 가져오기
        const noticeContent = await getNoticeList(currentIndex);
        setNotice(noticeContent);

        // return `${year}/${month}/${day} ${hour}시 ${minute}분`;
        // 2. 덧글 가져오기
        const commentContent = await getNoticeCommentsList(currentIndex);
        // console.log("commentContent : ", commentContent);
        // if (commentContent === undefined) {
        //   setComment([]);
        // }
        setComment(commentContent);
        // 3. 로딩 상태 바꾸기
        setLoading(false);
        setChanged(false);
      } catch (error) {
        // console.log(error.response.data.content);
        if (error.response.data.content === 'uri=/api/v1/notice/comments') {
          setComment([]);
        }
        setLoading(false);
        setChanged(false);
      }
    };
    getContentWithComment();
  }, [changed]);

  // useEffect(() => {
  //   const work = async () => {
  //     try {
  //       const responseComment = await getNoticeCommentsList(currentIndex);
  //       setComment(responseComment);
  //       setChanged(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   work();
  // }, [changed]);

  const handleChange = (e) => {
    setInputComment(e.target.value);
    // console.log(e.target.value);
  };

  // console.log("notice.noticeContent :", notice.noticeContent)
  // const noticeText = notice.noticeContent.replace(/<(?:.|\n)*?>/gm, '');

  return (
    <Fragment>
      {isLoading && (
        <div
          style={{
            width: '100%',
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SyncSpinner />
        </div>
      )}
      {!isLoading && (
        <Fragment>
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <div className="left-side" style={{ display: 'flex', flex: 1 }}>
              <img src="/assets/image/doctorface.png" alt="Logo" width="70%" />
            </div>
            <div
              className="left-side"
              style={{
                flex: 8,
                display: 'flex',
                marginLeft: '5px',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div className="avatar-container">
                <h3 style={{ fontWeight: '600' }}>{notice.noticeAuthor}</h3>
              </div>
              <div className="textDate-container">
                <div
                  style={{ fontWeight: '500', marginTop: '5px', color: 'gray' }}
                >
                  {moment(notice.createDate).format('YY-MM-DD dd요일 a h:mm')}
                </div>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                fontWeight: '500',
                marginTop: '5px',
                color: 'gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              조회수 : {notice.noticeCount}
            </div>
          </div>
          <div
            style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex' }}
          >
            <h2
              style={{
                fontWeight: '600',
                fontSize: '2rem',
                // textDecoration: 'underline',
                // textDecorationColor: '#ced4da',
                // textUnderlineOffset: '10px',
              }}
            >
              {notice.noticeTitle}
            </h2>
          </div>
          <hr />
          <div style={{ display: 'flex' }}>
            <h2
              style={{
                fontWeight: '500',
                padding: '0.5rem',
                display: 'flex',
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                alignItems: 'center',
              }}
            >
              {/* {notice.noticeContent} */}
              {parse(notice.noticeContent.toString())}
            </h2>
          </div>

          <hr />
          <TitleHeaderComment>
            <span>댓글 보기</span>
          </TitleHeaderComment>
          <div>
            <InputCommentBox
              onChange={handleChange}
              setInputComment={setInputComment}
              memberName={memberName}
              memberId={memberId}
              noticeId={currentIndex}
              setChanged={setChanged}
              placeholder="댓글을 입력해주세요. "
            />
          </div>

          {comment.map((data, index) => (
            <List className={classes.root} key={'commentNum' + index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={data.comment}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {data.memberName}
                      </Typography>
                    </React.Fragment>
                  }
                />
                {memberId === data.memberId ? (
                  <IconButton
                    onClick={() => {
                      setOpenCommentModal((prevState) => !prevState);
                    }}
                  >
                    <DeleteCommentModal
                      isOpenCommentModal={isOpenCommentModal}
                      setOpenCommentModal={setOpenCommentModal}
                      noticeCommentId={data.noticeCommentId}
                      setChanged={setChanged}
                    />
                    <MdRemoveCircleOutline
                      size={20}
                      style={{ color: '#ff6b6b' }}
                    />
                  </IconButton>
                ) : (
                  <Fragment></Fragment>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}

          {notice.memberId === memberId ? (
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
              }}
            >
              <div style={{ flex: '2', marginRight: '10px' }}>
                <StyledButton
                  bgColor="rgb(8,78,127)"
                  color="white"
                  onClick={() => dispatch(setActiveStep('MAIN'))}
                >
                  <BsListUl style={{ marginRight: '5px' }} />
                  목록
                </StyledButton>
              </div>
              <div style={{ flex: '2', marginRight: '10px' }}>
                <StyledButton
                  bgColor="rgb(226,153,51)"
                  color="white"
                  onClick={() => dispatch(setActiveStep('MODIFY'))}
                >
                  <BsPencilSquare style={{ marginRight: '5px' }} />
                  수정
                </StyledButton>
              </div>
              <div style={{ flex: '2' }}>
                <StyledButton
                  bgColor="rgb(216,89,56)"
                  color="white"
                  onClick={() => {
                    setOpenModal((prevState) => !prevState);
                  }}
                >
                  <DeleteModal
                    isOpenModal={isOpenModal}
                    setOpenModal={setOpenModal}
                    noticeId={currentIndex}
                    comment={comment}
                  />
                  <BsFillTrashFill style={{ marginRight: '5px' }} />
                  삭제
                </StyledButton>
              </div>
              <div style={{ flex: '6' }}></div>
            </div>
          ) : (
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
              }}
            >
              <div style={{ flex: '2', marginRight: '10px' }}>
                <StyledButton
                  bgColor="rgb(8,78,127)"
                  color="white"
                  onClick={() => dispatch(setActiveStep('MAIN'))}
                >
                  <BsListUl style={{ marginRight: '5px' }} />
                  목록
                </StyledButton>
              </div>
              <div style={{ flex: '2', marginRight: '10px' }}></div>
              <div style={{ flex: '2', marginRight: '10px' }}></div>
              <div style={{ flex: '4' }}></div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default NoticeDrawerRead;
