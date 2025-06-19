import React, { useEffect, useState } from 'react'
import './SignIn.scss'
import healthImg from "../../images/healthycare.jpg"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Notification from '../../components/notification/notification'
import { useNavigate } from 'react-router-dom'
import { SetToken } from '../../services/jwt-services/JWTService'
import { Link } from 'react-router-dom'

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [access, setAccess] = useState(1);

  const SignInSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5010/auth/sign-in', data);
      SetToken(response.data.jwtToken);
      navigate('/');
    } catch (error) {
      const err = error.response.data.message || 'An error occurred';
      setErrorMessage(err);
      setAccess((prev) => prev+1);
      setIsSuccess(false);
    }
  }

  return (
    <div className='sign-in-container'>
      {errorMessage && <Notification message={errorMessage} success={isSuccess} access={access} />}
      <div className='left-sign-in-form'>
        <h2 className='title'>Sign In</h2>
        <form className='sign-in-form' onSubmit={handleSubmit(SignInSubmit)} >
          <div className='form-control'>
            <input type="Email" placeholder="Email"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            <span className='error'>{errors.Email && errors.Email.message}</span>
          </div>
          <div className='form-control'>
            <input type="Password" placeholder="Password"
              {...register("Password", {
                required: "Password is required",
                maxLength: { value: 64, message: "64 chars is maximum" },
                minLength: { value: 8, message: "8 chars is minimum" }
              })}
            />
            <span className='error'>{errors.Password && errors.Password.message}</span>
          </div>
          <p>Chưa có tài khoản? <Link to="/auth/dang-ky"> Đăng ký ngay</Link></p>
          
          <button className='sign-in-btn' type="submit">Sign In</button>
        </form>
      </div>
      <div className='right-sign-in-introduce'>
        <h2 className='title'>Chào Mừng Bạn Đến Với HealthCare</h2>
        <img className='introduce-img' src={healthImg} alt="HealthCare" />
        <p className='end'>Vui Lòng Đăng Nhập Để Tiếp Tục</p>
      </div>
    </div>
  )
}

export default SignIn