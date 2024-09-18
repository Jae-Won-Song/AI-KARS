import { useState } from 'react';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import { validateName, validatePhoneNumber, validateCertNo } from '../../utils/inputValidationUtils';
import { fetchCheckCertNo, fetchSendCertNo } from '../../api/auth/authApi';

const FindUser = () => {
  const [focusedBtn, setFocusedBtn] = useState('findId');

  // input value 관리
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [certNo, setCertNo] = useState('');

  // input state 관리
  // 이름
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  // 연락처
  const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);
  const [PhoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
  // 인증번호
  const [isCertNoError, setIsCertNoError] = useState(false);
  const [certNoErrorMessage, setCertNoErrorMessage] = useState('');
  const [isCertNoSuccess, setIsCertNoSuccess] = useState(false);
  const [certNoSuccessMessage, setCertNoSuccessMessage] = useState('');

  const [isCertNoRequested, setIsCertNoRequested] = useState(false);

  // button state 관리
  const [isCertNoRequestBtnDisabled, setIsCertNoRequestBtnDisabled] = useState(true);
  const [isCertNoCheckBtnDisabled, setIsCertNoCheckBtnDisabled] = useState(false);

  // 인증번호를 입력하는 input 추가
  const [addCertNoInput, setAddCertNoInput] = useState(false);
  // 타이머 시간 관리
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const handleTimeUp = () => {
    setIsTimeUp(true);
  };

  // 아이디 찾기 요청 때 필요한 api response에서 받아온 정보
  const [certNoCheckToken, setCertNoCheckToken] = useState('');

  const handleBtnClick = (buttonType: string) => {
    setFocusedBtn(buttonType);
  };

  const checkIfInputsFilled = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: filledInput, value } = e.target;

    // 이름, 연락처
    if (filledInput === 'name') {
      setName(value);
    }
    if (filledInput === 'phoneNumber') {
      setPhoneNumber(value);
    }

    const updatedName = filledInput === 'name' ? value : name;
    const updatedPhoneNumber = filledInput === 'phoneNumber' ? value : phoneNumber;

    if (updatedName !== '' && updatedPhoneNumber !== '') {
      setIsCertNoRequestBtnDisabled(false);
    } else {
      setIsCertNoRequestBtnDisabled(true);
    }

    // 인증번호
    if (filledInput === 'certNo') {
      setCertNo(value);
    }
  };

  // 인증요청
  // 인증번호
  const handleClickCertNoRequestBtn = () => {
    let isValid = true;

    if (validateName(name)) {
      setIsNameError(true);
      setNameErrorMessage('이름은 2~4글자, 한글만 입력해주세요');
      isValid = false;
    } else {
      setIsNameError(false);
    }

    if (validatePhoneNumber(phoneNumber)) {
      setIsPhoneNumberError(true);
      setPhoneNumberErrorMessage('연락처는 11글자, 숫자만 입력해주세요');
      isValid = false;
    } else {
      setIsPhoneNumberError(false);

      const payload = {
        type: 'FindId',
        phoneNumber,
      };

      console.log('api 요청 전');

      fetchSendCertNo(payload)
        .then((response) => {
          console.log('api 요청은 됨');
          if (response.data.code === 3103) {
            console.log('인증번호 발송 요청 성공');
            setIsCertNoRequested(true);
          }
          if (isValid) {
            setAddCertNoInput(true);
          }
        })
        .catch((error) => {
          console.error('인증번호 발송 오류', error);
          if (error.response.data.code === 3153) {
            setIsPhoneNumberError(true);
            setPhoneNumberErrorMessage('회원정보가 존재합니다');
            isValid = false;
          }
          if (isValid) {
            setAddCertNoInput(false);
          }
        });
    }
  };

  // 인증번호
  const handleClickCertNoCheckBtn = () => {
    if (isTimeUp) {
      setIsTimeUp(false);
    }

    if (validateCertNo(certNo)) {
      setIsCertNoError(true);
      setCertNoErrorMessage('유효한 인증번호가 아닙니다');
    } else {
      setIsCertNoError(false);

      // 인증 api 요청
      const payload = {
        type: 'SignUp',
        phoneNumber,
        certNo,
      };

      fetchCheckCertNo(payload)
        .then((response) => {
          if (response.data.code === 3104) {
            setIsCertNoSuccess(true);
            setCertNoSuccessMessage('인증되었습니다');
            setIsCertNoError(false);
            setCertNoErrorMessage('');
            setIsCertNoCheckBtnDisabled(true);
            // 토큰 저장
            setCertNoCheckToken(response.data.data.certNoCheckToken);
          }
        })
        .catch(() => {
          setIsCertNoError(true);
          setCertNoErrorMessage('인증번호가 올바르지 않습니다');
          setIsCertNoSuccess(false);
          setCertNoSuccessMessage('');
        });
    }
  };

  return (
    <div className="findId">
      <div className="findId__wrapper">
        <div className="findId__wrapper__box">
          <div className="findId__wrapper__box_title">
            <button className={focusedBtn === 'findId' ? 'focused' : ''} onClick={() => handleBtnClick('findId')}>
              아이디 찾기
            </button>
            <button className={focusedBtn === 'findPw' ? 'focused' : ''} onClick={() => handleBtnClick('findPw')}>
              비밀번호 찾기
            </button>
          </div>
          {focusedBtn === 'findId' && (
            <>
              <div className="findId__wrapper__box_input">
                <Input
                  placeholder="이름"
                  name="name"
                  value={name}
                  onChange={checkIfInputsFilled}
                  isError={isNameError}
                  errorMessage={nameErrorMessage}
                />
                <div className="findId__wrapper__box_input_inner">
                  <Input
                    placeholder="연락처('-'을 제외한 숫자만 입력)"
                    size="small"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={checkIfInputsFilled}
                    isError={isPhoneNumberError}
                    errorMessage={PhoneNumberErrorMessage}
                  />
                  <Button
                    type="button"
                    state={isCertNoRequestBtnDisabled ? 'disabled' : 'default_deepBlue'}
                    width="5.417vw"
                    height="4.815vh"
                    fontSize="0.781vw"
                    onClick={handleClickCertNoRequestBtn}>
                    {isCertNoRequested ? '재전송' : '인증요청'}
                  </Button>
                </div>
              </div>

              {addCertNoInput && (
                <div className="signUp__wrapper__box_input_box">
                  <Input
                    placeholder="인증번호"
                    size="small"
                    name="certNo"
                    value={certNo}
                    onChange={checkIfInputsFilled}
                    isError={isCertNoError}
                    errorMessage={certNoErrorMessage}
                    isSuccess={isCertNoSuccess}
                    successMessage={certNoSuccessMessage}
                    timer
                    onTimeUp={handleTimeUp}
                    resetTrigger={resetTimer}
                  />
                  <div className="signUp__wrapper__box_input_box_button">
                    <Button
                      type="button"
                      state={isCertNoCheckBtnDisabled ? 'disabled' : 'default'}
                      width="5.417vw"
                      height="4.815vh"
                      fontSize="0.781vw"
                      onClick={handleClickCertNoCheckBtn}>
                      확인
                    </Button>
                  </div>
                </div>
              )}

              <div className="findId__wrapper__box_button">
                <Button type="button" state="default" width="20.833vw" height="5.926vh">
                  아이디 찾기
                </Button>
              </div>
            </>
          )}
          {focusedBtn === 'findPw' && (
            <>
              <div className="findId__wrapper__box_input">
                <Input placeholder="아이디 (한글/특수문자 제외)" />
                <Input placeholder="이름" />
                <div className="findId__wrapper__box_input_inner">
                  <Input placeholder="연락처('-'을 제외한 숫자만 입력)" size="small" />
                  <Button type="button" state="disabled" width="5.417vw" height="4.815vh">
                    인증요청
                  </Button>
                </div>
              </div>
              <div className="findId__wrapper__box_button">
                <Button type="button" state="default" width="20.833vw" height="5.926vh">
                  확인
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindUser;
