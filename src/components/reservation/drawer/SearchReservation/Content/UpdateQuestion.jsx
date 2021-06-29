import StyledButton from "components/common/button/StyledButton";


const UpdateQuestion = ({setCheckPage, setVisible,setReadOpened, setPageResult}) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <img src="/assets/image/accept.png" alt="accept"/>
      </div>
      <div>
        <h1 style={{ fontWeight: 'bold', marginBottom: '2em' }}>
          수정이 완료되었습니다.
        </h1>
      </div>
      <div>
        <StyledButton
          width="60%"
          bgColor="#DDB892"
          color="white"
          onClick={() => {
            setCheckPage('');
            setVisible(false);
            setReadOpened(false);
            setPageResult(false);
          }}
        >
          이전 화면으로 돌아가기
        </StyledButton>
      </div>
    </div>
  );
}

export default UpdateQuestion;