import LoginOutButton from './LoginOutButton';
import ColorTable from '../utils/ColorTable'
function Header() {

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <h2
        style={{
          fontSize: '1.5rem',
          flex: 1,
          fontWeight: 1000,
        }}
      >
        Header
      </h2>

      <LoginOutButton color={ColorTable.color_login}>
        로그인
      </LoginOutButton>
    </div>
  );
}

export default Header;