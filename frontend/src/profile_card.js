import * as Icons from '@heroicons/react/24/outline';
import profile_stock from './profile_stock.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfileCard(formData) {

    const [flag, handler] = useState(true)
    const navigate = useNavigate()

    const submit_handler = async (event) => {
        event.preventDefault();
        await axios.post("http://127.0.0.1:5000/api/user/edit", 
          document.querySelector("#edit_form"),
          {
            headers: {
              'Content-Type': 'application/json',
              jwt: localStorage.getItem("JWT_TOKEN")
            }
          }
        )
        .then(function (response) {
            alert(response.data.message)
            if(response.data.logout===true){
                localStorage.setItem("Auth", "False")
                localStorage.removeItem("JWT_TOKEN")
                navigate("/auth")
                alert("Logged Out")
            }
            else if (response.data.logout===false){
                navigate(0);
            }
        })
    };

    var list_items = "";

    for (var i=0; i<Object.keys(formData.data.followers).length; i++) {
        list_items += Object.values(formData.data.followers)[i]
        list_items += " <br /> "
    }

    console.log(list_items)

    const follower_list = () => {
        const list = document.getElementById("follower_list")
        list.innerHTML = list_items;
        list.style.display="block"
    }

    if(flag){
        return(
            <>
                <div className=" bg-rich-black flex font-medium items-center justify-center h-screen px-96">
                    <div className="w-64 flex-auto mx-auto bg-dark-slate-gray rounded-2xl mx-80 px-8 py-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-timberwolf text-sm">{formData.data.birthday}</span>
                            <span className="text-emerald-400">
                            <button className="block mt-4 lg:inline-block lg:mt-0 text-timberwolf hover:text-rich-black mr-4" onClick={() => handler(!flag)}>
                                <Icons.PencilSquareIcon className="h-5 w-5 lg:inline-block" />
                            </button>
                            </span>
                        </div>
                        <div className="mt-6 w-fit mx-auto">
                            <img src={profile_stock} className="rounded-full w-28 " alt="profile picture" srcSet="" />
                        </div>

                        <div className="mt-8 w-fit mx-auto">
                            <h2 className="text-timberwolf  font-bold text-2xl tracking-wide">{formData.data.username} </h2>
                        </div>
                        <div className='bg-timberwolf px-5 py-0 my-5 sm:p-6 rounded-2xl'>
                            <div className='flex tracking-wide justify-between '>
                                <div className="mt-5">
                                    <h3 className='text-rich-black font-bold'>Name</h3>
                                    <p className="text-rich-black font-bold tracking-wide">{formData.data.first_name} {formData.data.last_name}</p>
                                </div>
                                <div className="mt-5 ">
                                    <h3 className='text-rich-black font-bold'>E-Mail</h3>
                                    <p className="text-rich-black font-bold tracking-wide">{formData.data.email} </p>
                                </div>
                                <div className="mt-5">
                                    <h3 className='text-rich-black font-bold'>Contact</h3>
                                    <p className="text-rich-black font-bold tracking-wide">{formData.data.number}</p>
                                </div>
                            </div>
                            <div className='flex tracking-wide justify-between mt-10'>
                                <div>
                                    <button 
                                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-rich-black border-rich-black hover:border-timberwolf hover:text-timberwolf hover:bg-rich-black mt-4 lg:mt-0"
                                        onClick={follower_list}
                                    > 
                                        Followers: {Object.keys(formData.data.followers).length}
                                    </button>
                                    <div id='follower_list' className='hidden'>
                                        Hi.
                                    </div>
                                </div>
                                <div>
                                    <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-rich-black border-rich-black hover:border-timberwolf hover:text-timberwolf hover:bg-rich-black mt-4 lg:mt-0"> 
                                        Following: {Object.keys(formData.data.following).length}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else{
        return(
            <>
                <div className=" bg-rich-black flex font-medium items-center justify-center h-screen px-20">
                    <div className="w-64 flex-auto mx-auto bg-dark-slate-gray rounded-2xl px-6 py-6 shadow-lg">
                        <div className="flex items-center justify-end">
                            <button className="block mt-4 lg:inline-block lg:mt-0 text-timberwolf hover:text-rich-black mr-4" onClick={() => handler(!flag)}>
                                <Icons.PencilSquareIcon className="h-5 w-5 lg:inline-block" />
                            </button>
                        </div>
                        <div className="mt-6 w-fit mx-auto">
                            <img src={profile_stock} className="rounded-full w-28 " alt="profile picture" srcSet="" />
                        </div>
                        <div className="mt-8 w-fit mx-auto">
                            <h2 className="text-timberwolf  font-bold text-2xl tracking-wide">Edit Profile</h2>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0 pt-5 ">
                            <form id="edit_form" onSubmit={submit_handler}>
                            <div className="overflow-hidden shadow rounded-2xl">
                                <div className="bg-timberwolf px-5 py-5 sm:p-6">
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
}

export default ProfileCard;