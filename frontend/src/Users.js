import  {useNavigate, Navigate, useParams} from 'react-router-dom';
import * as React from 'react';
import Navbar from './Navbar';
import * as links from './Navbar_Links';
import MySpheresForm from './MySpheresForm';
import { useState } from 'react';
import axios from 'axios';

function Users() {
    const { sub_id } = useParams();
    console.log(sub_id)
    return(
        <>
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
        </>
    )
}

export default Users