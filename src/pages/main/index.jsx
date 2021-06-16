import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledUl = styled.ul`
  padding: 1rem;
  li {
    margin-top: 0.7rem;
  }
  p {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const MainPage = () => {
  return (
    <div>
      <StyledUl>
        <p> 개인용 페이지에서 작업하세요 꼭! 아니면 merge 에러 뜹니다.</p>
        <li>
          <Link to="/temporary/sihyun">- 박시현</Link>
        </li>
        <li>
          <Link to="/temporary/hyungyoon">- 김형윤</Link>
        </li>
        <li>
          <Link to="/temporary/jonghyun">- 홍종현</Link>
        </li>
        <li>
          <Link to="/temporary/sungwook">- 황성욱</Link>
        </li>
      </StyledUl>
      <StyledUl>
        <p>
          {' '}
          주의 사항! 절대로 이 페이지에 우선 어떠한 컴포넌트도 배치하지 마시고, 개인용
          테스트 페이지 줄테니 참고만 하세요.
        </p>
        <p>
          건드린 사람은 벌금 50,000원
        </p>
        <li>
          <Link to="/dashboard/">- Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/diagnosis">- DiagnosisPage</Link>
        </li>
        <li>
          <Link to="/dashboard/diagnostic">- DiagnosticPage</Link>
        </li>

        <li>
          <Link to="/dashboard/member">- MemberPage</Link>
        </li>
        <li>
          <Link to="/dashboard/patient">- PatientPage</Link>
        </li>
        <li>
          <Link to="/dashboard/reservation">- ReservationPage</Link>
        </li>
      </StyledUl>
    </div>
  );
};

export default MainPage;
