import  {useNavigate, Navigate} from 'react-router-dom';
import * as React from 'react';
import Navbar from './Navbar';
import * as links from './Navbar_Links';
import MySpheresForm from './MySpheresForm';
import { useState } from 'react';
import axios from 'axios';

function DisplayCreatedSpheres(SphereData) {

    const navigate = useNavigate()

    const Delete = (name) => {
        axios.post('http://127.0.0.1:5000/api/my_spheres/delete', 
        {sub_id: name}, 
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
        // console.log(name)
    }

    const open = (id) => {
        navigate('/MySpheres/' + id + '/join')
    } 

    const array_of_subs = SphereData.data.map((sub) => {
        return(
            <>
                <div className=" bg-rich-black flex font-medium items-center justify-center mt-20 mb-20 px-96">
                    <div className="w-64 flex-auto mx-auto bg-dark-slate-gray rounded-2xl mx-5 px-8 py-0 shadow-lg">
                        <div className="mt-8 w-fit mx-auto">
                            <h2 className="text-timberwolf  font-bold text-2xl tracking-wide">{sub.name} </h2>
                        </div>
                        <div className='bg-timberwolf px-5 py-0 my-5 sm:p-6 rounded-2xl'>
                            <div className="mt-5 justify-center">
                                <h3 className='text-dark-slate-gray font-bold'>Description</h3>
                                <p className="text-rich-black font-bold tracking-wide">{sub.description} </p>
                            </div>
                            <div className="mt-5">
                                <h3 className='text-dark-slate-gray font-bold'>Banned Keywords</h3>
                                <p className="text-rich-black font-bold tracking-wide">{sub.ban_keys}</p>
                            </div>
                            <div className='flex tracking-wide justify-between'>
                                <div className="mt-5">
                                    <h3 className='text-dark-slate-gray font-bold'>Followers</h3>
                                    <p className="text-rich-black font-bold tracking-wide">{sub.follower_count}</p>
                                </div>
                                <div className="mt-5">
                                    <h3 className='text-dark-slate-gray font-bold'>Posts</h3>
                                    <p className="text-rich-black font-bold tracking-wide">{sub.post_count}</p>
                                </div>
                                <div className='mt-5 space-x-5'>
                                    <button 
                                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-rich-black border-rich-black hover:border-timberwolf hover:text-timberwolf hover:bg-rich-black mt-4 lg:mt-0"
                                        onClick={() => open(sub._id)}
                                    > 
                                        Open
                                    </button>
                                    
                                    <button 
                                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-rich-black border-rich-black hover:border-timberwolf hover:text-timberwolf hover:bg-rich-black mt-4 lg:mt-0"
                                        onClick={() => Delete(sub._id)}
                                    > 
                                        Delete
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
}

function MySpheres() {
    const [SphereData, setSphereData] = useState([{}])
    const navigate = useNavigate()
    
    if(localStorage.getItem("Auth")==="False"){
        return(<Navigate replace to="/" />)
    }

    const post = () => {
        axios.post('http://127.0.0.1:5000/api/my_spheres/view', 
        "garbage", 
        {
            headers: {
                jwt: localStorage.getItem("JWT_TOKEN")
            }
        }
        ).then(function (response) {
                setSphereData(response.data)
            }
        )
    }

    return(
        <div onLoad={post}>
            <Navbar>
                <links.Profile_Link />
                <links.MySpheres_Link />
                <links.AllSpheres_Link />
                <links.Saved_Posts_Link />
                <links.Logout_Link/>
            </Navbar>

            <MySpheresForm />

            <DisplayCreatedSpheres data={SphereData}/>

        </div>

    )
}

export {MySpheres}