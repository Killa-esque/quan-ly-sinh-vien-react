import React, { Component } from 'react'

export default class TableSinhVien extends Component {
  render() {
    const { studentArr, handleEditStudentInformation, handleDelete } = this.props;
    return (
      <table className='table mt-3'>
        <thead className='bg-dark text-white fw-bold fs-3'>
          <tr>
            <th>Mã Sinh Viên</th>
            <th>Họ Tên</th>
            <th>Số Điện Thoại</th>
            <th>Email</th>
            <th>Delete/Edit</th>
          </tr>
        </thead>
        <tbody className='fs-5'>
          {studentArr.map(({masv,hoten,phone,email}, index) => {
            return (
              <tr key={index}>
                <td>{masv}</td>
                <td>{hoten}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => {
                    let svClick = { masv, hoten, phone, email };
                    handleDelete(svClick);
                  }}>
                    <i className='fa fa-trash'></i>
                  </button>
                  <button className='btn btn-primary mx-2' onClick={() => {
                    let svClick = { masv, hoten, phone, email };
                    handleEditStudentInformation(svClick);
                  }}>
                    <i className='fa fa-edit'></i>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
