import  {useParams} from 'react-router-dom';
import * as React from 'react';
import Navbar from './Navbar';
import * as links from './Navbar_Links';
import { useState } from 'react';
import axios from 'axios';

function Joining_List(SphereData) {

    const { sub_id } = useParams();

    const accept = (sub_id, user_id) => {
        axios.post('http://127.0.0.1:5000/api/sub_tools/join/accept', 
        {sub_id: sub_id, user_id: user_id}, 
        {
            'Content-Type': 'application/json',
            headers: {
                jwt: localStorage.getItem("JWT_TOKEN")
            }
        }
        ).then(function (response) {
                alert(response.data.message)
            }
        )
    }

    const array_of_subs = SphereData.data.map((sub) => {
        return(
            <>
                <div className=" bg-rich-black flex font-medium items-center justify-center mt-36 px-96">
                    <div className="w-64 flex-auto mx-auto bg-dark-slate-gray rounded-2xl mx-80 px-8 py-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-timberwolf text-sm">{sub.birthday}</span>
                            <span className="text-emerald-400">
                            </span>
                        </div>

                        <div className="mt-8 w-fit mx-auto">
                            <h2 className="text-timberwolf  font-bold text-2xl tracking-wide">{sub.username} </h2>
                        </div>
                        <div className='bg-timberwolf px-5 py-0 my-5 sm:p-6 rounded-2xl'>
                            <div className='flex tracking-wide justify-between '>
                                <div className="mt-5">
                                    <h3 className='text-rich-black font-bold'>Name</h3>
                                    <p className="text-rich-black font-bold tracking-wide">{sub.first_name} {sub.last_name}</p>
                                </div>
                                <div className="mt-5 ">
                                    <h3 className='text-rich-black font-bold'>E-Mail</h3>
                                    <p className="text-rich-black font-bold tracking-wide">{sub.email} </p>
                                </div>
                                <div className="mt-5">
                                    <h3 className='text-rich-black font-bold'>Contact</h3>
                                    <p className="text-rich-black font-bold tracking-wide">{sub.number}</p>
                                </div>
                            </div>
                            <div className='flex tracking-wide justify-between mt-10'>
                                <div>
                                    <button 
                                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-rich-black border-rich-black hover:border-timberwolf hover:text-timberwolf hover:bg-rich-black mt-4 lg:mt-0"
                                        onClick={() => accept(sub_id, sub._id)}
                                    > 
                                        Accept    
                                    </button>
                                    
                                </div>
                                <div>
                                    <button 
                                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-rich-black border-rich-black hover:border-timberwolf hover:text-timberwolf hover:bg-rich-black mt-4 lg:mt-0"

                                    > 
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    })

    return(
        <>{array_of_subs}</>
    )
    // console.log(SphereData.data)
}

function JoinRequests() {
    const { sub_id } = useParams();
    const [SphereData, setSphereData] = useState([{}])

    const post = (id) => {
        axios.post('http://127.0.0.1:5000/api/sub_tools/join', 
        {sub_id: id.sub_id}, 
        {
            'Content-Type': 'application/json',
            headers: {
                jwt: localStorage.getItem("JWT_TOKEN")
            }
        }
        ).then(function (response) {
                // alert(response.data.message)
                setSphereData(response.data)
            }
        )
    }

    return(
        <div onLoad={() => post({sub_id})}>
            <Navbar>
                <links.Profile_Link />
                <links.MySpheres_Link />
                <div className='inline-block text-sm px-4 py-2 leading-none border rounded text-timberwolf border-timberwolf hover:border-timberwolf hover:bg-rich-black mt-4 lg:mt-0 mr-4'>
                    <links.Join_Requests_Link />
                    <links.Users_Link />
                </div>
                <links.AllSpheres_Link />
                <links.Saved_Posts_Link />
                <links.Logout_Link/>
            </Navbar>

            <Joining_List data={SphereData}/>

        </div>
    )
}

export default JoinRequests
