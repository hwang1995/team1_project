import ColoredButton from './components/ColoredRadiusButton';
import ColorTable from './utils/ColorTable';
import FontColorTable from './utils/FontColorTable';
import NoticeDrawer from './components/NoticeDrawer';
import LoginOutButton from './components/LoginOutButton';
import Header from './components/Header';
import React from 'react';
import CollapsibleTable from './components/CollapsibleTable';
import SearchBar from './components/SearchBar';
import AddIcon from '@material-ui/icons/Add';
import notfound from './resources/notfound.png';
import notfoundhistory from './resources/notfoundhistory.png';
import { Link } from 'react-router-dom';

const HyungyoonPage = () => {
  return (
    <div>
      공지사항
      <NoticeDrawer />
      <hr />
      <div>
        buttons
        <ColoredButton color={ColorTable.color_info}>
          정보를 보여줘야 할 때에 (알려줄 때에)
        </ColoredButton>
        <ColoredButton color={ColorTable.color_warning}>
          정보를 수정해야 할 때에
        </ColoredButton>
        <ColoredButton color={ColorTable.color_error}>
          정보를 삭제 할 때에 (위험한 경우)
        </ColoredButton>
        <ColoredButton color={ColorTable.color_add_info}>
          정보를 추가해야할 경우
        </ColoredButton>
        <ColoredButton color={ColorTable.color_login}>
          로그인 버튼
        </ColoredButton>
        <ColoredButton color={ColorTable.color_reservation}>
          진료 예약
        </ColoredButton>
        <ColoredButton color={ColorTable.color_reservation_cancel}>
          진료 취소
        </ColoredButton>
        <ColoredButton color={ColorTable.color_injector_add}>
          주사 처방
        </ColoredButton>
        <ColoredButton color={ColorTable.color_medicine_add}>
          약 처방
        </ColoredButton>
        <ColoredButton color={ColorTable.color_hyungyoon}>
          내가만든버튼
        </ColoredButton>
        <ColoredButton fontcolor={FontColorTable.color_moresee}>
          <AddIcon />
          더보기
        </ColoredButton>
      </div>
      <hr />
      
      <div>
        LoginOutButton
        <LoginOutButton color={ColorTable.color_login}>로그인</LoginOutButton>
        <LoginOutButton>로그아웃</LoginOutButton>
      </div>
      <hr />
      <div>
        Header
        <Header />
      </div>
      <hr />
      <div>
        SearchBar
        <SearchBar />
      </div>
      <hr />
      <div>
        <img src={notfound} alt="Logo" width="200" />
        <img src={notfoundhistory} alt="Logo" width="100" />
      </div>
        <p> 개인용 페이지에서 작업하세요 꼭! 아니면 merge 에러 뜹니다.</p>
        <li>
          <Link to="/temporary/hyungyoon/diagnotic/index">- 진료기록</Link>
        </li>
        <li>
          <Link to="/temporary/hyungyoon/notice">- 공지사항</Link>
        </li>
        <li>
          <Link to="/temporary/hyungyoon/exercise">- 개인연습</Link>
        </li>
        
    </div>
    
  );
};

export default HyungyoonPage;
