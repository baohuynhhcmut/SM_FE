

import { Password } from '@mui/icons-material';
import React, { useState } from 'react';
import { useAuth } from '../../AuthWrapper';
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
    const {login,setCart} = useAuth()
    const navigate = useNavigate()

    const [formData,setFormData] = useState({
      Username:'',
      Password:''
    })
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value, // Dynamically update the field
      }));
    };

    const handleSubmit = async  (e) => {
      e.preventDefault(); // Prevent default form submission
      try {
        const response = await fetch('http://localhost:5000/customer/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        
      
        if(response.status == 200){
          const data = await response.json()

          const getCart = await fetch("http://localhost:5000/cart/get-cart", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId: data.user.id })
          });
          const cartUser = await getCart.json()
          setCart(cartUser)
          // console.log("cartUser",cartUser)

          console.log(data)
          login(data.token,data.user.id)
          navigate("/product")
        } 
        else{
          setResponseMessage("Sai tài khoản hoặc mật khẩu")
        }     
        
        // Handle additional logic, such as storing a token or redirecting the user
      } catch (error) {
        console.error('Error during API call:', error);
        setResponseMessage('Login failed. Please try again.');
      }
    };
  


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Tài khoản
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="Username"
                  type="text"
                  autoComplete="text"
                  value={formData.Username}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Mật khẩu
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Quên mật khẩu
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="Password"
                  type="password"
                  required
                  value={formData.Password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          {responseMessage && (
            <p className="mt-4 text-center text-sm/6 text-red-500">{responseMessage}</p>
          )}
         


          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    );
}

export default LoginUser;
