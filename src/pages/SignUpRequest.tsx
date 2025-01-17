import { useEffect, useState, useCallback } from 'react';
import instance from '../api/apiConfig';
import SearchBar from '../components/Common/SearchBar';
import Table from '../components/Common/Table';
import Tab from '../components/Tab';
import Modal from '../components/Common/Modal';
import Toast from '../components/Common/Toast';
import check from '../assets/check-signup-request.svg';

interface UserData {
  cursorId: number;
  name: string;
  empNo: string;
  phoneNum: string;
  email: string;
  signUpRequestDateTime: string;
}

interface ApiResponse {
  data: {
    contents: UserData[];
  };
}

interface TableData {
  번호: number;
  체크박스: JSX.Element;
  이름: string;
  사원번호: string;
  연락처: string;
  이메일: string;
  가입요청일: string;
  승인버튼: JSX.Element;
  반려버튼: JSX.Element;
}

const SignUpRequest = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [selectedEmpNos, setSelectedEmpNos] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'approve' | 'reject' | null>(null);
  const [toast, setToast] = useState<{ mode: 'success' | 'failed'; title: string; content: string } | null>(null);

  const handleCheckboxChange = useCallback((empNo: string) => {
    setSelectedEmpNos((prevSelectedEmpNos) =>
      prevSelectedEmpNos.includes(empNo)
        ? prevSelectedEmpNos.filter((no) => no !== empNo)
        : [...prevSelectedEmpNos, empNo],
    );
  }, []);

  const handleApprove = useCallback(() => {
    setModalMode('approve');
    setIsModalOpen(true);
  }, []);

  const handleReject = useCallback(() => {
    setModalMode('reject');
    setIsModalOpen(true);
  }, []);

  const confirmApprove = useCallback(async () => {
    if (selectedEmpNos.length > 0) {
      try {
        const response = await instance.post('/api/v1/admin/approve-user', {
          userList: selectedEmpNos.map((empNo) => ({ empNo })),
        });
        console.log('API 호출 성공', response.data);
        setIsModalOpen(false);
        setToast({
          mode: 'success',
          title: '승인 완료',
          content: '회원가입 요청이 승인되었습니다.',
        });
      } catch (error) {
        console.error('API 호출 실패', error);
        setToast({
          mode: 'failed',
          title: '승인 실패',
          content: '회원가입 요청 승인에 실패했습니다.',
        });
      }
    }
  }, [selectedEmpNos]);

  const confirmReject = useCallback(async () => {
    if (selectedEmpNos.length > 0) {
      try {
        const response = await instance.post('/api/v1/admin/reject-user', {
          userList: selectedEmpNos.map((empNo) => ({ empNo })),
        });
        console.log('API 호출 성공', response.data);
        setIsModalOpen(false);
        setToast({
          mode: 'success',
          title: '반려 완료',
          content: '회원가입 요청이 반려되었습니다.',
        });
      } catch (error) {
        console.error('API 호출 실패', error);
        setToast({
          mode: 'failed',
          title: '반려 실패',
          content: '회원가입 요청 반려에 실패했습니다.',
        });
      }
    }
  }, [selectedEmpNos]);

  useEffect(() => {
    const fetchSignUpRequests = async () => {
      try {
        const response = await instance.get<ApiResponse>('/api/v1/admin/approve-user');
        const { data } = response.data || {};
        if (data && Array.isArray(data.contents)) {
          setUserData(data.contents);

          const formattedData = data.contents.map((item, index) => ({
            번호: index + 1,
            체크박스: (
              <input
                className="checkBox"
                type="checkbox"
                onChange={() => handleCheckboxChange(item.empNo)}
                checked={selectedEmpNos.includes(item.empNo)}
              />
            ),
            이름: item.name,
            사원번호: item.empNo,
            연락처: item.phoneNum,
            이메일: item.email,
            가입요청일: item.signUpRequestDateTime,
            승인버튼: <button onClick={handleApprove}>승인</button>,
            반려버튼: <button onClick={handleReject}>반려</button>,
          }));
          setTableData(formattedData);
        }
      } catch (error) {
        console.error('가입요청 못가져옴:', error);
      }
    };

    fetchSignUpRequests();
  }, [handleApprove, handleReject, handleCheckboxChange, selectedEmpNos]);

  return (
    <div className="sign-up-request">
      <div className="sign-up-request__container">
        <SearchBar>
          <Tab styleName="hover" content="반려" onClick={handleReject} />
          <Tab styleName="active" content="승인" onClick={handleApprove} />
        </SearchBar>
        <Table
          columns={[
            { name: '번호', width: '6.25vw', rowHeight: '5.926vh', columnHeight: '5.556vh' },
            {
              name: '체크박스',
              img: (
                <img
                  style={{ display: 'flex', justifyContent: 'center', width: '17px', height: '17px' }}
                  src={check}
                  alt="체크박스"
                />
              ),
              width: '6.25vw',
            },
            { name: '이름', width: '8.333vw' },
            { name: '사원번호', width: '8.75vw' },
            { name: '연락처', width: '17.708vw' },
            { name: '이메일', width: '21.875vw' },
            { name: '가입요청일', width: '13.542vw' },
          ]}
          data={tableData}
        />
      </div>

      {isModalOpen && (
        <>
          <div className="modal-overlay" />
          <Modal
            title={modalMode === 'approve' ? '가입 승인' : '가입 반려'}
            content={
              modalMode === 'approve' ? '회원가입 요청을 승인하시겠습니까?' : '회원가입 요청을 반려하시겠습니까?'
            }
            btnContentOne="취소"
            btnContentTwo={modalMode === 'approve' ? '승인' : '반려'}
            add="blue"
            mode="default"
            onClickOne={() => setIsModalOpen(false)}
            onClickTwo={modalMode === 'approve' ? confirmApprove : confirmReject}
          />
        </>
      )}

      {toast && (
        <Toast
          mode={toast.mode === 'success' ? 'blue' : 'red'}
          title={toast.title}
          content={toast.content}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default SignUpRequest;
