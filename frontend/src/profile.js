import  {Navigate} from 'react-router-dom';
import * as React from 'react';
import Navbar from './Navbar';
import * as links from './Navbar_Links';
import axios from 'axios';
import { useState } from 'react';
import ProfileCard from './profile_card';

function Profile () {
    
    const [formData, setformData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        birthday: '',
        email: '',
        number: '',
        followers: [],
        following: []
    })
    
    if(localStorage.getItem("Auth")==="False"){
        return(<Navigate replace to="/" />)
    }

    const post = () =>{ 
        axios.post('http://127.0.0.1:5000/api/user/view', 
                    "garbage", 
                    {
                        headers: {
                            jwt: localStorage.getItem("JWT_TOKEN")
                        }
                    }
                ).then(function (response) {
                    setformData(response.data)
                    }
                )
        }

    return(   
            <div className="divide-y divide-slate-100" onLoad={post}>
                <Navbar>
                    <links.Profile_Link />
                    <links.MySpheres_Link />
                    <links.AllSpheres_Link />
                    <links.Saved_Posts_Link />
                    <links.Logout_Link/>
                </Navbar>

                <ProfileCard data={formData} />
            </div>


    )
}

export default Profile