import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveStep } from 'redux/features/notice/noticeSlice';
import { BsPencilSquare, BsListUl, BsFillTrashFill } from 'react-icons/bs';
import StyledButton from 'components/common/button/StyledButton';
import DeleteModal from 'components/notice/modal/DeleteModal';
import { getNoticeList } from 'apis/noticeAPI';
import TitleHeaderComment from 'components/common/header/TitleHeaderComment';
import InputBox from 'components/common/input/InputBox';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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
  const currentIndex = useSelector((state) => state.notice.noticeCurrentIndex);
  const [isOpenModal, setOpenModal] = useState(false);
  const [notice, setNotice] = React.useState({  });
  const [inputComment, setInputComment] = useState('');


  useEffect(() => {
    const work = async () => {
      try {
        const response = await getNoticeList(currentIndex);
        setNotice(response.data.data);
        console.log("response", response);
      } catch (error) {
        console.log(error);
      }
    };
    work();
  }, [currentIndex]); //***** [] 없으면 무한실행합니다.

  const handleChange = (e) => {
    setInputComment(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Fragment>
      <div style={{ marginTop: '2rem', display: 'flex' }}>
        <div style={{ flex: 0.8, alignSelf: 'center' }}>
          <h2 style={{ fontWeight: '400' }}>{notice.noticeTitle}</h2>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <div className="left-side" style={{ flex: 1 }}>
          <img src="/assets/image/doctorface.png" alt="Logo" width="70%" />
        </div>
        <div
          className="left-side"
          style={{
            flex: 9,
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
            <div style={{ fontWeight: '500', marginTop: '5px', color: 'gray' }}>
              {notice.createDate}
            </div>
          </div>
        </div>
      </div>
      <hr />

      <h2 style={{ fontWeight: '500', padding: '1rem' }}>
        {notice.noticeHeadImage ? (
          <img src={notice.noticeHeadImage} alt="Logo" width="100%" />
        ) : (
          <div>
          </div>
        )}
        {notice.noticeHeadText}
      </h2>

      <hr />
      <TitleHeaderComment>
        <span>댓글 보기</span>
      </TitleHeaderComment>
      <div style={{ flex: 9 }}>
                          <InputBox
                            onChange={handleChange}
                            setInputComment={setInputComment}
                            placeholder="댓글을 입력해주세요. "/>
      </div>
      <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
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
            />
            <BsFillTrashFill style={{ marginRight: '5px' }} />
            삭제
          </StyledButton>
        </div>
        <div style={{ flex: '6' }}></div>
      </div>
    </Fragment>
  );
};
export default NoticeDrawerRead;
