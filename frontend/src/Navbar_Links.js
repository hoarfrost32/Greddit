import  {useNavigate, useParams} from 'react-router-dom';
import * as Icons from '@heroicons/react/24/outline';

function Profile_Link() {
    const navigate=useNavigate();
    return(
        <button className="block mt-4 lg:inline-block lg:mt-0 text-timberwolf hover:text-rich-black mr-4" onClick = {
            () => {navigate("/profile")}
        }><Icons.UserCircleIcon className="h-5 w-5 lg:inline-block" /> Profile</button>
    )
}

function MySpheres_Link() {
    const navigate=useNavigate();
    return(
        <button className="block mt-4 lg:inline-block lg:mt-0 text-timberwolf hover:text-rich-black mr-4" onClick = {
            () => {navigate("/MySpheres")}
        }><Icons.DocumentTextIcon className="h-5 w-5 lg:inline-block" /> My Spheres</button>
    )
}

function AllSpheres_Link() {
    const navigate=useNavigate();
    return(
        <button className="block mt-4 lg:inline-block lg:mt-0 text-timberwolf hover:text-rich-black mr-4" onClick = {
            () => {navigate("/AllSpheres")}
        }><Icons.GlobeEuropeAfricaIcon className="h-5 w-5 lg:inline-block" /> All Spheres</button>
    )
}

function Join_Requests_Link() {
    const navigate=useNavigate();
    const {sub_id} = useParams();
    return(
        <button className="block mt-4 lg:inline-block lg:mt-0 text-timberwolf mr-4" onClick = {
            () => {navigate("/MySpheres/" + sub_id + "/join")}
        }><Icons.UserPlusIcon className="h-5 w-5 lg:inline-block" /> Join Requests</button>
    )
}

function Users_Link() {
    const navigate=useNavigate();
    const {sub_id} = useParams();
    return(
        <button className="block mt-4 lg:inline-block lg:mt-0 text-timberwolf mr-0" onClick = {
            () => {navigate("/MySpheres/" + sub_id + "/users")}
        }><Icons.UserIcon className="h-5 w-5 lg:inline-block" /> Users</button>
    )
}

function Saved_Posts_Link() {
    const navigate=useNavigate();
    return(
        <button className="block mt-4 lg:inline-block lg:mt-0 text-timberwolf hover:text-rich-black mr-4" onClick = {
            () => {navigate("/profile")}
        }><Icons.BookmarkIcon className="h-5 w-5 lg:inline-block" /> Saved Posts</button>
    )
}

function Logout_Link() {
    const navigate=useNavigate();
    return(
        <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-timberwolf border-timberwolf hover:border-timberwolf hover:text-black-500 hover:bg-rich-black mt-4 lg:mt-0" onClick = {
            () => {
                localStorage.setItem("Auth", "False")
                localStorage.removeItem("JWT_TOKEN")
                navigate("/auth")
                alert("Logged Out")
            }
        }><Icons.ArrowLeftOnRectangleIcon className="h-5 w-5 lg:inline-block" /> Logout</button>    
    )
}

export {Profile_Link, MySpheres_Link, AllSpheres_Link, Join_Requests_Link, Saved_Posts_Link, Users_Link, Logout_Link}