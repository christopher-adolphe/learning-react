import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './TableBody';

const Table = ({ columns, sortColumn, data, onSortMovie }) => {
  return (
    <table className="table table-striped">
      <TableHeader columns={ columns } sortColumn={ sortColumn } onSortMovie={ onSortMovie } />  
      <TableBody data={ data } columns={ columns } />
    </table>
  );
}
 
export default Table;
