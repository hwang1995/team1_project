import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';

const ProfileInfo = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  margin-right: 0.5rem;
  font-weight: 700;

  div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Profile = ({ data }) => {
  const { url, name, role } = data;

  return (
    <div
      style={{
        padding: '0.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
      }}
    >
      <ProfileInfo>
        <div>
          <h4 style={{ width: '100%' }}>{name}</h4>
          <h4 style={{ width: '100%' }}>{role}</h4>
        </div>
      </ProfileInfo>
      <Avatar src={url} />
    </div>
  );
};

export default Profile;
