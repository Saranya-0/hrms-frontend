import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../auth/Signin.module.scss';
import { useForm } from 'react-hook-form';
import { loginAPI } from '../../services/authService';


function SignIn() {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setLoginError('');
    try {

      const response = await loginAPI(data);
      
      console.log('Login Response:', response);

      if (response.status === 200) {
        toast.success(response.data.msg || 'Login successful!', { autoClose: 2000 });
        console.log('Token:', response.data.token);
        console.log('User:', response.data.user);

        // Optionally, save token to localStorage
        // localStorage.setItem('token', response.data.token);
        // localStorage.setItem('user', JSON.stringify(response.data.user));
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } else {
      toast.error(response.data.msg || 'Login failed.');
    }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
      toast.error('Login failed.');
    }
  };

  return (
    <div className={styles['signin-container']}>
      <div className={styles['signin-card']}>
        <h2 className={styles['signin-title']}>Sign In</h2>

        {loginError && <p className={styles['error-message']}>{loginError}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email"
            register={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            })}
            errors={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            register={register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            errors={errors.password?.message}
          />

          <div className={styles['signin-options']}>
            <label className={styles['keep-signed-in']}>
              <input type="checkbox" {...register('keepSignedIn')} /> Keep me signed in
            </label>
            <Link to="/forgot-password" className={styles['forgot-password-link']}>
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" disabled={isSubmitting} className={styles.primaryButton}>
  {isSubmitting ? 'Logging In...' : 'Login'}
</Button>
        </form>

        <div className={styles['signin-divider']}>
          <span>or</span>
        </div>

        <p className={styles['signup-text']}>
          Don't have an account?{' '}
          <Link to="/signup" className={styles['signup-link']}>
            Create an account
          </Link>
        </p>
      </div>

      <ToastContainer position="top-center" />
    </div>
  )
}

export default SignIn