import Navbar from './Navbar';
import axios from 'axios';
import {useState} from "react";
import {useNavigate, Navigate} from "react-router-dom";

function SignUp(){
  const [formData, setFormData] = useState(new FormData());
  const navigate = useNavigate();

  const submit_handler = async (event) => {
    event.preventDefault();
    await axios.post("http://127.0.0.1:5000/api/auth/reg", 
      document.querySelector("#reg_form"),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(function (response) {
      
      if(response.data.jwt_token === undefined) alert(response.data.message)
      else{
        alert(response.data.message)
        localStorage.setItem("Auth", "True")
        localStorage.setItem("JWT_TOKEN", response.data.jwt_token)
        navigate("/profile")
      }
      
    })
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 sm:mt-48 mx-48 bg-dark-slate-gray">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-5 py-5">
              <h3 className="text-lg font-medium leading-6 text-timberwolf">Register</h3>
              <p className="mt-1 text-sm text-timberwolf">Remember, the email address that you register with has to be unique.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form id="reg_form" onSubmit={submit_handler}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-timberwolf px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date Of Birth
                      </label>
                      <input
                        type="date"
                        name="birthday"
                        id="dob"
                        autoComplete="date of birth"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                        Contact Number
                      </label>
                      <input
                        type="number"
                        name="number"
                        id="number"
                        autoComplete="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                      />
                    </div>
                    <div className="bg-gray-50 px-4 py-6 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border  bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-rich-black focus:ring-offset-2"
                      >
                      Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp