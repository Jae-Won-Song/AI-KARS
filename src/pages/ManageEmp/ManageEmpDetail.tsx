import React from 'react';
import { useLocation } from 'react-router-dom';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/Filter';

const ManageEmpDetail = () => {
  const location = useLocation();
  const employeeData = location.state;

  return (
    <div className="empDetail-wrapper">
      <SearchBar>
        <Filter />
      </SearchBar>
      <Table
        columns={[
          { name: '번호', width: '60px' },
          { name: '고유번호', width: '180px' },
          { name: '매체명', width: '240px' },
          { name: '업종구분', width: '240px' },
          { name: '상품명', width: '600px' },
          { name: '광고주', width: '240px' },
        ]}
        data={[employeeData]}
      />
    </div>
  );
};

export default ManageEmpDetail;