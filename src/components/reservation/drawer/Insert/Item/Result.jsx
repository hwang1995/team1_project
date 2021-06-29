

/*
  환자 검색 결과가 없을 때 세팅하는 컴포넌트이다.
*/
const ResultValue = () => {

  return (
    <div style={{ alignItems: 'center' }}>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img
          src="/assets/image/notFound.png"
          width="100%"
          alt="confirmPicture"
        />
      </div>
      <div
        style={{
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '1em',
          }}
        >
          <h1>검색 결과가 없습니다 </h1>
        </div>
      </div>
    </div>
  );
}

export default ResultValue;