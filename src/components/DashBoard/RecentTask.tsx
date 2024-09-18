import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchmytaskData from '../../api/admin/adminApi';
import Table from '../Common/Table';
import rightArrow from '../../assets/chevron-right.svg';

const RecentTask = () => {
  const [cursorId, setCursorId] = useState('');
  const [cursorState, setCursorState] = useState(false);
  const navigate = useNavigate();
  const handleMyTask = () => {
    navigate('/my-task');
  };

  useEffect(() => {
    fetchmytaskData()
      .then((response) => {
        const cursorInfo = response.data.data;
        console.log(cursorInfo);
        setCursorId(cursorInfo.cursorId);
        setCursorState(cursorInfo.cursorState);
      })
      .catch((error) => {
        console.error('데이터 조회 실패:', error);
      });
  }, []);

  const columns = [
    { name: '번호', width: '3vw', columnHeight: '22px', rowHeight: '7px' },
    { name: '고유번호', width: '6vw', columnHeight: '22px', rowHeight: '7px' },
    { name: '상품명', width: '8vw', columnHeight: '22px', rowHeight: '7px' },
    { name: '작업날짜', width: '9vw', columnHeight: '22px', rowHeight: '7px' },
  ];

  const data = [
    { 번호: 1, 고유번호: 'abc123', 상품명: '서울우유', 작업날짜: '2024-08-25 13:25' },
    { 번호: 2, 고유번호: 'cursorId', 상품명: '서울우유', 작업날짜: '2024-08-25 13:25' },
    { 번호: 3, 고유번호: 'cursorId', 상품명: '서울우유', 작업날짜: '2024-08-25 13:25' },
    { 번호: 4, 고유번호: 'cursorId', 상품명: '서울우유', 작업날짜: '2024-08-25 13:25' },
    { 번호: 5, 고유번호: 'cursorId', 상품명: '서울우유', 작업날짜: '2024-08-25 13:25' },
  ];

  return (
    <section className="recent-wrapper">
      <div className="recent-wrapper__header">
        <div className="recent-wrapper__header__title">최근작업</div>
        <div className="recent-wrapper__header__detail">
          <div className="recent-wrapper__header__arrow" onClick={handleMyTask}>
            자세히 보기
            <img src={rightArrow} alt="내 작업 바로가기" />
          </div>
        </div>
      </div>
      <div className="recent-wrapper__table">
        <Table
          columns={columns}
          data={data}
          headerClassName="recent-wrapper__table"
          rowClassName="recent-wrapper__table__info"
        />
      </div>
    </section>
  );
};

export default RecentTask;
