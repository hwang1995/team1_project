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

const NoticeItem = ({ data }) => {
  console.log(data);
  const { title, createDate, author } = data;
  return (
    <ListItem>
      <NoticeContainer>
        <StyledTypography
          variant="h5"
          component="h4"
          weight={9}
          className="title"
        >
          {title}
        </StyledTypography>
        <Divider className="divider" />
        <div className="description">
          <StyledTypography variant="subtitle1" component="span" weight={7}>
            작성일자 :
          </StyledTypography>

          <StyledTypography
            variant="subtitle1"
            component="span"
            weight={3}
            className="text-margin"
          >
            {createDate}
          </StyledTypography>
          <StyledTypography
            variant="subtitle1"
            component="span"
            weight={3}
            className="text-margin"
          >
            |
          </StyledTypography>

          {/* <span className="text-margin">|</span> */}
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
            {author}
          </StyledTypography>
        </div>
      </NoticeContainer>
    </ListItem>
  );
};

export default React.memo(NoticeItem);