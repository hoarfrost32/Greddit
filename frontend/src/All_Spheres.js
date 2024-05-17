import  {useNavigate, Navigate} from 'react-router-dom';
import * as React from 'react';
import Navbar from './Navbar';
import * as links from './Navbar_Links';
import { useState } from 'react';
import axios from 'axios';
import * as Icons from '@heroicons/react/24/outline';
import Fuse from 'fuse.js'

function DisplayAllSpheres(AllSphereData){

    const Join = (sub_id) => {
        axios.post('http://127.0.0.1:5000/api/all_spheres/join', 
        {sub_id: sub_id}, 
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

    const array_of_joined_subs = AllSphereData.data.map((sub) => {
        if(sub.joined === true){ 
            return(
                <li key= {sub.name}>
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
                                <div className='flex tracking-wide justify-between'>
                                    <div className="mt-5">
                                        <h3 className='text-dark-slate-gray font-bold'>Followers</h3>
                                        <p className="text-rich-black font-bold tracking-wide">{sub.follower_count}</p>
                                    </div>
                                    <div className="mt-5">
                                        <h3 className='text-dark-slate-gray font-bold'>Posts</h3>
                                        <p className="text-rich-black font-bold tracking-wide">{sub.post_count}</p>
                                    </div>
                                    <div className='mt-5'>
                                        <button 
                                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-rich-black border-rich-black hover:border-timberwolf hover:text-timberwolf hover:bg-rich-black mt-4 lg:mt-0"
                                            // onClick={() => Delete(sub._id)}
                                        > 
                                            Leave
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </li>
            )
        }
    })

    const array_of_other_subs = AllSphereData.data.map((sub) => {
        if(sub.joined === false){ 
            return(
                <li key={sub.name}>
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
                                <div className='flex tracking-wide justify-between'>
                                    <div className="mt-5">
                                        <h3 className='text-dark-slate-gray font-bold'>Followers</h3>
                                        <p className="text-rich-black font-bold tracking-wide">{sub.follower_count}</p>
                                    </div>
                                    <div className="mt-5">
                                        <h3 className='text-dark-slate-gray font-bold'>Posts</h3>
                                        <p className="text-rich-black font-bold tracking-wide">{sub.post_count}</p>
                                    </div>
                                    <div className='mt-5'>
                                        <button 
                                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-rich-black border-rich-black hover:border-timberwolf hover:text-timberwolf hover:bg-rich-black mt-4 lg:mt-0"
                                            onClick={() => Join(sub._id)}
                                        > 
                                            Join
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </li>
            )
        }
    })

    return(
        <div>
            <div className='flex justify-center text-5xl mt-16 text-timberwolf font-bold '>Joined Spheres</div>
            <ul>
                {array_of_joined_subs}
            </ul>
            <div className='flex justify-center text-5xl mt-16 text-timberwolf font-bold '>Other Spheres</div>
            <ul>
                {array_of_other_subs}
            </ul>
            
        </div>
    )
}

function DisplaySearch(data, search) {

    const options ={keys: ['name']}
    const fuse = new Fuse(data.data, options);

    var ArrayOfSearchedResults = []

    const searchQuery = search
    ArrayOfSearchedResults = fuse.search(searchQuery);

    console.log(ArrayOfSearchedResults)

    const FormattedListOfSearchedResults = ArrayOfSearchedResults.map((sub) => {
            return(
                <li key={sub.name}>
                    <div className=" bg-rich-black flex font-medium items-center justify-center mt-20 mb-20 px-96">
                        <div className="w-64 flex-auto mx-auto bg-dark-slate-gray rounded-2xl mx-5 px-8 py-0 shadow-lg">
                            <div className="mt-8 w-fit mx-auto">
                                <h2 className="text-timberwolf  font-bold text-2xl tracking-wide">{sub.item.name} </h2>
                            </div>
                            <div className='bg-timberwolf px-5 py-0 my-5 sm:p-6 rounded-2xl'>
                                <div className="mt-5 justify-center">
                                    <h3 className='text-dark-slate-gray font-bold'>Description</h3>
                                    <p className="text-rich-black font-bold tracking-wide">{sub.item.description} </p>
                                </div>
                                <div className='flex tracking-wide justify-between'>
                                    <div className="mt-5">
                                        <h3 className='text-dark-slate-gray font-bold'>Followers</h3>
                                        <p className="text-rich-black font-bold tracking-wide">{sub.item.follower_count}</p>
                                    </div>
                                    <div className="mt-5">
                                        <h3 className='text-dark-slate-gray font-bold'>Posts</h3>
                                        <p className="text-rich-black font-bold tracking-wide">{sub.item.post_count}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </li>
            )
        })
    
    return(
        <>
            <div>
                {FormattedListOfSearchedResults}
            </div>
        </>
    )
    // console.log(search)
}
function AllSpheres() {
    const [SphereData, setSphereData] = useState([{}])

    const navigate = useNavigate()
    
    const SearchBar = () => {
        return(
            <>
                <div className='w-64 mx-auto bg-dark-slate-gray rounded-2xl mt-16 focus: ring-2 focus: ring-rich-black'>
                    <input type="text" id='search' className='bg-timberwolf rounded-2xl focus: ring-rich-black ' onChange = {(e) => DisplaySearch(SphereData, e.nativeEvent.srcElement.value)}/>
                    <Icons.MagnifyingGlassIcon className='h-5 w-5 lg:inline-block ml-3 mb-1 text-timberwolf'/>
                </div>
            </>
        )
    }

    if(localStorage.getItem("Auth")==="False"){
        return(<Navigate replace to="/" />)
    }

    const post = () => {
        axios.post('http://127.0.0.1:5000/api/all_spheres/view', 
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

             <SearchBar />

            <div className='grid-cols-2' >
                <DisplayAllSpheres data={SphereData} />
            </div>

        </div>

    )
}

export default AllSpheres