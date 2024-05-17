import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import * as Icons from '@heroicons/react/24/outline';
import  {useNavigate} from 'react-router-dom';

function MySpheresForm() {
    const [flag, setFlag] = useState(true)

    const navigate=useNavigate()

    const submit_handler = async (event) => {
        event.preventDefault();
        await axios.post("http://127.0.0.1:5000/api/my_spheres/create", 
            document.querySelector("#sphere_form"),
            {
                headers: {
                    'Content-Type': 'application/json',
                    jwt: localStorage.getItem("JWT_TOKEN")
                }
            }
        )
        .then(function (response) {
            alert(response.data.message)
        })
    };

    if(flag){
        return(
            <div className="bg-rich-black flex font-medium items-center justify-center mt-20 px-20">
                <div className="w-64 flex-auto mx-auto bg-dark-slate-gray rounded-2xl px-6 py-6 shadow-lg">
                    <div className="flex items-center justify-center">
                        <button className="block mt-4 lg:inline-block lg:mt-0 text-timberwolf hover:text-rich-black mr-4" onClick={() => setFlag(!flag)}>
                            <Icons.GlobeEuropeAfricaIcon className="h-5 w-5 lg:inline-block" /> Create a new Sphere
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="bg-rich-black flex font-medium items-center justify-center mt-20 px-20">
                <div className="w-64 flex-auto mx-auto bg-dark-slate-gray rounded-2xl px-6 py-6 shadow-lg mt-5">
                    <div className="flex items-center justify-center">
                        <button className="block mt-4 lg:inline-block lg:mt-0 text-timberwolf hover:text-rich-black mr-4" onClick={() => setFlag(!flag)}>
                            <Icons.GlobeEuropeAfricaIcon className="h-5 w-5 lg:inline-block" /> Go Back
                        </button>
                    </div>
                    <div className="mt-5 md:col-span-2">
                        <form id="sphere_form" onSubmit={submit_handler}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-timberwolf px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="given-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                           Description
                                        </label>
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            autoComplete="description"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                                        />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                            Tags (comma separated single word values only)
                                        </label>
                                        <input
                                            type="text"
                                            name="tags"
                                            id="tags"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                                        />
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                        <label htmlFor="banned" className="block text-sm font-medium text-gray-700">
                                            Banned Keywords (comma separated single word values only)
                                        </label>
                                        <input
                                            type="text"
                                            name="banned"
                                            id="banned"
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
        )
    }
}

export default MySpheresForm