import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';
import { ToastContainer, toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import '../../styles/SignUp.css';
import { registerAPI } from '../../services/allAPI';



function SignUp() {
const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async(data) => {
    setFormError('');
    try {
      const response = await registerAPI(data);//backend 
      
      // console.log('User registered successfully!', data);
      if(response.status===201){
        console.log("Signup successful:", response.data);
        toast.success(response.data.msg, { autoClose: 2000 });
      
      setTimeout(() => {
        navigate('/signin');
      }, 3000);

      reset(); 

    } else{
      toast.error(response.data.msg || 'Signup failed')
    }
  }
    catch (error) {
      console.log(error);
      const errMsg = error?.response?.data?.msg || 'An error occurred.';
      setFormError(errMsg);
      toast.error(errMsg);
    }
  };

    const handleGoogleSignIn = () => {
    toast.success('Google signup clicked (dummy function)');
  };
  return (
    <div className="sign-up-container">
    <div className="sign-up-card">
      <h2 className="title">Create an Account</h2>

      {formError && <p className="error-message">{formError}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          name="username"
          type="text"
          placeholder="Enter full name"
          register={register('username', { required: 'Name is required' })}
          errors={errors.name?.message}
        />

        <Input
          label="Email"
          name="username"
          type="email"
          placeholder="Enter email"
          register={register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
          })}
          errors={errors.email?.message}/>

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          register={register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          })}
          errors={errors.password?.message}/>

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>

      <div className="divider">
        <span>or</span>
      </div>


      <Button onClick={handleGoogleSignIn} className="google-button">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="google-icon"
          />
          <span className="google-text">Continue with Google</span>
        </Button>

      <p className="sign-in-link">
        Already have an account?{' '}
        <Link to="/signin" className="sign-in-link-text">
          Sign in here
        </Link>
      </p>
    </div>

      <ToastContainer position="top-center" />
    </div>
  )
}

export default SignUp