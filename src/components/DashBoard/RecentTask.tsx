import Table from '../Table';
import rightArrow from '../../assets/chevron-right.svg';
import { useNavigate } from 'react-router-dom';

const RecentTask = () => {
  const navigate = useNavigate();
  const moveMyTask = () => {
    navigate('/my-task');
  };

  return (
    <section className="recent-wrapper">
      <div className="recent-wrapper__header">
        <div className="recent-wrapper__header__title">최근작업</div>
        <div className="recent-wrapper__header__detail">
          <div className="recent-wrapper__header__arrow" onClick={moveMyTask}>
            자세히 보기
            <img src={rightArrow} alt="내 작업관리 바로가기" />
          </div>
        </div>
      </div>
      <div className="recent-wrapper__table">
        <Table
          columns={[
            { name: '번호', width: '60px', height: '60px' },
            { name: '고유번호', width: '100px', height: '60px' },
            { name: '상품명', width: '140px', height: '60px' },
            { name: '작업날짜', width: '160px', height: '60px' },
          ]}
          data={[
            {
              번호: 1,
              고유번호: 'A12345',
              상품명: '서울우유',
              작업날짜: '2024-08-25 13:25',
            },
            {
              번호: 2,
              고유번호: 'A12345',
              상품명: '서울우유',
              작업날짜: '2024-08-25 13:25',
            },
            {
              번호: 3,
              고유번호: 'A12345',
              상품명: '서울우유',
              작업날짜: '2024-08-25 13:25',
            },
            {
              번호: 4,
              고유번호: 'A12345',
              상품명: '서울우유',
              작업날짜: '2024-08-25 13:25',
            },
            {
              번호: 5,
              고유번호: 'A12345',
              상품명: '서울우유',
              작업날짜: '2024-08-25 13:25',
            },
          ]}
        />
      </div>
    </section>
  );
};

export default RecentTask;