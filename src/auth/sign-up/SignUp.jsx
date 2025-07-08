import React from 'react'
import './SignUp.scss'
import healthImg from "../../images/healthycare.jpg"
import { useForm } from 'react-hook-form'
import axios  from 'axios'
import Notification from '../../components/notification/notification'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { SetToken } from '../../services/jwt-services/JWTService'
import { Link } from 'react-router-dom'


const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
      const [errorMessage, setErrorMessage] = useState('');
      const [isSuccess, setIsSuccess] = useState(true);
      const [access, setAccess] = useState(1);
      const navigate = useNavigate();


    const SignUpSubmit = async (data) => {
        try{
            const response = await axios.post('http://localhost:5010/auth/sign-up', data);
            SetToken(response.data.jwtToken);
            navigate('/auth/dang-nhap');
        } catch (error) {
            const err = error.response?.data.message || 'An error occurred';
            setErrorMessage(err);
            setAccess((prev) => prev+1);
            setIsSuccess(false);
        }
    }

  return (
    <div className='sign-up-container'>
        {errorMessage && <Notification message={errorMessage} success={isSuccess} access={access} />}
        <div className='left-sign-up-form'>
            <h2 className='title'>Sign Up</h2>
            <form className='sign-up-form' onSubmit={handleSubmit(SignUpSubmit)} >
                <div className='name'>
                    <div className='form-control'>
                        <input type="text" placeholder="First" 
                            {...register("First", {
                                required: "First is required",
                                maxLength: {value: 64, message: "64 chars is maximum"},
                                minLength: {value: 2, message: "2 chars is minimum"},
                            })}
                        />
                        <span className='error'>{ errors.First && errors.First.message }</span>
                    </div>
                    <div className='form-control'>
                        <input type="text" placeholder="Last"
                            {...register("Last", { 
                                required: "Last is required",
                                maxLength: {value: 64, message: "64 chars is maximum"},
                                minLength: {value: 2, message: "2 chars is minimum"}
                            })}
                        />
                        <span className='error'>{ errors.Last && errors.Last.message }</span>

                    </div>
                </div>
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
                    <span className='error'>{ errors.Email && errors.Email.message }</span>
                </div>
                <div className='form-control'>
                    <input type="Password" placeholder="Password"
                        {...register("Password", {
                            required: "Password is required",
                            maxLength: {value: 64, message: "64 chars is maximum"},
                            minLength: {value: 8, message: "8 chars is minimum"}
                        })}
                    />
                    <span className='error'>{ errors.Password && errors.Password.message }</span>
                </div>
                <div className='form-control'>
                    <input type="password" placeholder="Confirmation"
                        {...register("Confirmation", {
                            required: "Confirmation is required",
                            maxLength: {value: 64, message: "64 chars is maximum"},
                            minLength: {value: 8, message: "8 chars is minimum"}
                        })}
                    />
                    <span className='error'>{ errors.Confirmation && errors.Confirmation.message }</span>
                </div>
                <p>Đã có tài khoản? <Link to="/auth/dang-nhap"> Đăng nhập ngay</Link></p>
                <button className='sign-up-btn' type="submit">Sign Up</button>
            </form>
        </div>
        <div className='right-sign-up-introduce'>
            <h2 className='title'>Chào Mừng Bạn Đến Với HealthCare</h2>
            <img className='introduce-img' src={healthImg} alt="HealthCare" />
            <p className='end'>Vui Lòng Đăng Ký Để Tiếp Tục</p>
        </div>
    </div>
  )
}

export default SignUp