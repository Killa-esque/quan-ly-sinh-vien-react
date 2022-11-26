import React, { Component } from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export default class Template extends Component {
  render() {
    return (
      <div>
        <header className='bg-dark fw-bold text-white p-2 nav'>
          <NavLink className={({ isActive }) => isActive ? 'nav-link bg-white text-dark' : 'nav-link'} to='/quanlisinhvien'>Form Quản Sinh Viên</NavLink>
        </header>
        <div className='content' style={{ minHeight: '80%' }}>
          <Outlet />
        </div>
        <footer className='bg-dark text-white p-3 text-center fw-bold text-uppercase'>Copyright © 2022 VÕ PHÚ VINH AKA KILLA</footer>
      </div>
    )
  }
}
