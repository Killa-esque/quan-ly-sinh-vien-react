import React, { Component } from 'react'
import Modal from './Modal';
import TableSinhVien from './TableSinhVien'
import _ from 'lodash'

export default class FormSinhVien extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentInformation: {
        masv: '',
        hoten: '',
        phone: '',
        email: '',
      },
      studentArr: [
        { masv: '52100947', hoten: 'Vo Phu Vinh', phone: '0332065775', email: 'phuvinh113@gmail.com' },
        { masv: '52100925', hoten: 'Ao Thuy Ngoc Tran', phone: '03320123175', email: 'thuytran113@gmail.com' },
      ],
      studentArr2: [
        { masv: '52100947', hoten: 'Vo Phu Vinh', phone: '0332065775', email: 'phuvinh113@gmail.com' },
        { masv: '52100925', hoten: 'Ao Thuy Ngoc Tran', phone: '03320123175', email: 'thuytran113@gmail.com' },
      ],
      valid: false,
      validClear: false,
      formError: {
        masv: '',
        hoten: '',
        phone: '',
        email: '',
      },
      nameSearch: ''
    }
  }

  checkFormValid = () => {
    let { formError, studentInformation } = this.state;
    for (let key in formError) {
      console.log(key)
      if (formError[key] !== '' || studentInformation[key] === '') {
        return false;
      }
    }
    return true;
  }

  handleStudentInput = (e) => {
    let { value, name } = e.target;

    // Clone object
    let newSinhVien = this.state.studentInformation;
    newSinhVien[name] = value;

    // Get Attribute
    let dataType = e.target.getAttribute('data-type');
    // let dataMaxLength = e.target.getAttribute('data-max-length');

    //Validation
    let newFormError = this.state.formError;
    let message = '';
    if (value.trim() === '') {
      message = name + ' cannot be blank !';
    }
    else {
      if (dataType === 'number') {
        let regexNumber = /^\d+(,\d{1,2})?$/;
        if (!regexNumber.test(value)) {
          message = name + ' is invalid!';
        }
      }
      if (dataType === 'phone') {
        let regexPhoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regexPhoneNumber.test(value)) {
          message = name + ' is invalid !';
        }
      }
      if (dataType === 'email') {
        let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexEmail.test(value)) {
          message = name + ' is invalid !';
        }
      }
      if (dataType === 'name') {
        const regexName = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
        if (!regexName.test(value)) {
          message = name + ' is invalid !';
        }
      }
    }
    newFormError[name] = message;

    // Set State
    this.setState({
      studentInformation: newSinhVien,
      formError: newFormError
    }, () => {
      this.setState({
        valid: this.checkFormValid()
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // Check be4 submit
    if (!this.checkFormValid()) {
      alert('Form is valid to submit !');
      return;
    }

    // Add student to arrSinhVien and setState()
    let sinhVien = { ...this.state.studentInformation };
    let arrSinhVien = this.state.studentArr;

    // Check exist
    let isExist = arrSinhVien.find(sv => sv.masv === sinhVien.masv);
    console.log(arrSinhVien)

    // Push
    if (!isExist) {
      arrSinhVien.push({ ...this.state.studentInformation });
      this.setState({
        studentArr: arrSinhVien,
        studentArr2: arrSinhVien
      })
    }
    else {
      alert('This student is already exist !')
      return;
    }
  }

  handleDelete = (sinhVienClick) => {
    let studentArr = this.state.studentArr.filter(sinhVien => sinhVien.masv !== sinhVienClick.masv);

    this.setState({
      studentArr: studentArr
    })
  }

  handleEditStudentInformation = (sinhVienClick) => {
    this.setState({
      studentInformation: sinhVienClick
    }, () => {
      this.setState({
        valid: this.checkFormValid()
      })
    })
  }
  handleUpdateStudentInformation = () => {
    let { studentInformation, studentArr } = this.state;

    let sinhVienUpdate = studentArr.find(sinhVien => sinhVien.masv === studentInformation.masv);

    if (sinhVienUpdate) {
      for (let key in sinhVienUpdate) {
        if (key !== 'masv') {
          sinhVienUpdate[key] = studentInformation[key];
        }
      }
    }

    this.setState({
      studentArr: studentArr
    }, () => {
      alert('Edit successfully');
    })
  }


  handClearFormValue = () => {
    let emptyValue = { masv: '', hoten: '', phone: '', email: '' }

    this.setState({
      studentInformation: emptyValue,
      valid: false
    })
  }


  handleClearSearch = () => {
    let arrStudent = this.state.studentArr2
    this.setState({
      studentArr: arrStudent,
      nameSearch: '',
    })
    console.log('after clear: ', this.state.studentArr)
  }

  handSearchValue = (e) => {
    let { value, name } = e.target;
    if (value === '') {
      this.setState({
        nameSearch: ''
      })
    }
    this.setState({
      nameSearch: value
    })
  }

  handleSearchResult = () => {
    let arrStudent = [...this.state.studentArr];
    let stringSearch = _.lowerCase(this.state.nameSearch);
    let searchedArray = _.filter(arrStudent, (student) => {
      return _.includes(_.lowerCase(student.hoten), stringSearch)
    });
    this.setState({
      studentArr: searchedArray
    })
  }




  render() {
    const { studentInformation, valid } = this.state;
    console.log(this.state)
    return (
      <div className='container' style={{ marginBottom: '300px' }}>
        <h3 className='m-auto text-center p-3 fs-1 fw-bold'>BÀI TẬP QUẢN LÝ SINH VIÊN</h3>
        <form className='form' onSubmit={this.handleSubmit}>
          <div className='card'>
            <div className='card-header bg-dark text-white fw-bold fs-3'>
              Thông Tin Sinh Viên
            </div>
            <div className='card-body'>
              <div className='row'>
                <div className='col-6 fs-5'>
                  <div className='form-group my-2'>
                    <label htmlFor="masv">Mã Sinh Viên</label>
                    <input data-type='number' value={studentInformation.masv} className='form-control' id='masv' name='masv' onInput={this.handleStudentInput} />
                    {this.state.formError.masv && <div className='alert alert-danger mt-2 fs-6 text-danger' style={{ padding: '5px', fontWeight: '500' }}>{this.state.formError.masv}</div>}

                  </div>
                  <div className='form-group my-2'>
                    <label htmlFor="hoten">Họ Tên</label>
                    <input data-type="name" value={studentInformation.hoten} className='form-control' id='hoten' name='hoten' onInput={this.handleStudentInput} />
                    {this.state.formError.hoten && <div className='alert alert-danger mt-2 fs-6 text-danger' style={{ padding: '5px', fontWeight: '500' }}>{this.state.formError.hoten}</div>}
                  </div>
                </div>
                <div className='col-6 fs-5'>
                  <div className='form-group my-2'>
                    <label htmlFor="sdt">Số Điện Thoại</label>
                    <input data-type='phone' value={studentInformation.phone} className='form-control' id='phone' name='phone' onInput={this.handleStudentInput} />
                    {this.state.formError.phone && <div className='alert alert-danger mt-2 fs-6 text-danger' style={{ padding: '5px', fontWeight: '500' }}>{this.state.formError.phone}</div>}
                  </div>
                  <div className='form-group my-2'>
                    <label htmlFor="email">Email</label>
                    <input data-type="email" value={studentInformation.email} className='form-control' id='email' name='email' onInput={this.handleStudentInput} />
                    {this.state.formError.email && <div className='alert alert-danger mt-2 fs-6 text-danger' style={{ padding: '5px', fontWeight: '500' }}>{this.state.formError.email}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer'>
              <button className='btn btn-dark mx-2 text-uppercase fw-bold' type='submit' disabled={!this.state.valid}>Thêm Sinh Viên</button>
              <button className='btn btn-dark mx-2 text-uppercase fw-bold' type='button' disabled={!this.state.valid} onClick={() => {
                this.handleUpdateStudentInformation()
              }}>Cập Nhật</button>
              <button className='btn btn-dark mx-2 text-uppercase fw-bold' type='button' disabled={!this.state.valid} onClick={() => {
                this.handClearFormValue();
              }} >Clear</button>
            </div>
          </div>
        </form>
        <div class="mt-3">
          <div class="input-group my-3">
            <input value={this.state.nameSearch} id="txtTuKhoa" name='search' type="text" class="form-control" placeholder="Tên sinh viên"
              aria-label="Student's username" aria-describedby="button-addon2" onInput={this.handSearchValue} />
            <button class="btn btn-outline-secondary" type="button" id="btnTimKiem" onClick={() => { this.handleSearchResult() }}>
              Tìm kiếm
            </button>
            <button class="btn btn-outline-secondary" type="button" id="btnTimKiem" onClick={() => { this.handleClearSearch() }}>
              Xóa
            </button>
          </div>
        </div>
        <TableSinhVien studentArr={this.state.studentArr} handleDelete={this.handleDelete} handleEditStudentInformation={this.handleEditStudentInformation} />
      </div>
    )
  }
}


