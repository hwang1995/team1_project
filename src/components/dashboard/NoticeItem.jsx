import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import StyledTypography from 'components/common/typography/StyledTypography';
import { ListItem } from '@material-ui/core';


const NoticeContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 1rem;
  width: 100%;

  .title,
  .divider {
    margin-bottom: 0.5rem;
  }

  .description {
    margin-top: 1rem;
    display: flex;
    .text-margin {
      margin-left: 0.5rem;
    }
  }
`;

/**
 * 이 페이지 컴포넌트는 공지사항의 리스트를 보여주는 컴포넌트입니다.
 * 들어가야할 내용은 다음과 같습니다.
 * - NoticeItem
 * @returns {JSX.Element}
 * @author HYEONG YUN KIM
 */
const NoticeItem = ({ data }) => {
  // 부모 컴포넌트에서 받은 NOTICE의 data  
  const { noticeTitle, createDate, noticeAuthor } = data;
  return (
    <ListItem>
      <NoticeContainer>
        <StyledTypography
          variant="h5"
          component="h4"
          weight={9}
          className="title"
        >
          {noticeTitle}
        </StyledTypography>
        <Divider className="divider" />
        <div className="description">
          <StyledTypography variant="subtitle1" component="span" weight={7}>
            작성일 :
          </StyledTypography>

          <StyledTypography
            variant="subtitle1"
            component="span"
            weight={3}
            className="text-margin"
          >
            {moment(createDate).format('YY-MM-DD')}
          </StyledTypography>
          <StyledTypography
            variant="subtitle1"
            component="span"
            weight={3}
            className="text-margin"
          >
            |
          </StyledTypography>
          <StyledTypography
            variant="subtitle1"
            component="span"
            weight={7}
            className="text-margin"
          >
            작성자 :
          </StyledTypography>

          <StyledTypography
            variant="subtitle1"
            component="span"
            weight={3}
            className="text-margin"
          >
            {noticeAuthor}
          </StyledTypography>
        </div>
      </NoticeContainer>
    </ListItem>
  );
};

export default React.memo(NoticeItem);
