import React from 'react';
import ProgressBar from './ProgressBar';

interface Column {
  name?: string;
  width?: string | number;
  height?: string | number;
  img?: JSX.Element;
}

interface EmpData {
  번호?: number;
  사원번호?: number | string;
  고유번호?: number | string;
  매체명?: string;
  업종구분?: string;
  상품명?: string;
  광고주?: string;
  작업자?: string;
  담당자?: string;
  전체작업?: number | string;
  미완료건?: number | string;
  완료건?: number | string;
  작업진척도?: string;
  이름?: string;
  총배분작업?: string | number;
  연락처?: string | number;
  이메일?: string;
  회원가입일?: string | number;
  최종로그인일?: string | number;
  가입요청일?: string | number;
  권한?: string;
  검수결과?: string;
  지적비지적?: string;
  진행상황?: string;
  아이디?: string | number;
  체크박스?: JSX.Element;
}

interface EmpInfo {
  columns: Column[];
  data: EmpData[];
}

const Table = (props: EmpInfo) => {
  const { columns, data } = props;

  return (
    <div>
      <table>
        <thead className="table">
          <tr className="table__head">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`table__head__${column.name || 'img'}`}
                style={{ width: column.width, height: column.height }}>
                {column.img ? column.img : column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="info">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="info__data">
              {columns.map((column, colIndex) => {
                const cellData = row[column.name as keyof EmpData];
                return (
                  <td
                    key={colIndex}
                    className={`table__data__${column.name || 'img'}`}
                    style={{ width: column.width, height: column.height }}>
                    {React.isValidElement(cellData) ? (
                      cellData
                    ) : column.name === '작업진척도' ? (
                      <ProgressBar progress={parseInt(cellData as string, 10)} />
                    ) : (
                      cellData
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
