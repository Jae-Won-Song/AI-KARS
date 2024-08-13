import Input from '../components/Input';

const SignUp = () => {
  return (
    <div className="signUp">
      <div className="signUp__wrapper">
        <div className="signUp__wrapper__box">
          <div className="signUp__wrapper__box_title">회원가입</div>
          <div className="signUp__wrapper__box_input">
            <Input placeholder="이름" />
            <div className="signUp__wrapper__box_input_box">
              <Input placeholder="연락처 ('-'을 제외한 숫자만 입력)" size="small" />
              <button>인증요청</button>
            </div>
            <div className="signUp__wrapper__box_input_box">
              <Input placeholder="아이디 (한글/특수문자 제외)" size="small" />
              <button>중복확인</button>
            </div>

            <Input placeholder="비밀번호(영문자/숫자/특수문자 사용 가능, 8-16자)" type="password" />
            <Input placeholder="비밀번호 재확인" type="password" />
            <Input placeholder="사원번호" />
            <Input placeholder="이메일" type="email" />
          </div>
          <div className="signUp__wrapper__box_button">
            <button>회원가입</button>
          </div>
          <div className="signUp__wrapper__box_text">
            <span>이미 계정이 있으신가요? </span>
            <span className="link">로그인하기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;