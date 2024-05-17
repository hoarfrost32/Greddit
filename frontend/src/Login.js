import  {useNavigate, Navigate} from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';


var please_fucking_work = () => {
    var flag=0;

    if (document.getElementById("login_form")[0].value !== '' && document.getElementById("login_form")[1].value !== ''){
        flag=1;
    }

    if(flag){
        document.getElementById("submit").style.backgroundColor="#ffffff" 
        document.getElementById("submit").style.color="inherit" 
        document.getElementById("submit").disabled = false 
    }
    else{
        document.getElementById("submit").style.backgroundColor="inherit" 
        document.getElementById("submit").style.color="#ffffff" 
    }
}

function Login() {
    
    const navigate = useNavigate();
    
    if(localStorage.getItem("Auth")==="True"){
        return(<Navigate replace to="/profile" />)
    }

    const submit_handler = async (event) => {
        event.preventDefault();
        await axios.post("http://127.0.0.1:5000/api/auth/login", 
          document.querySelector("#login_form"),
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

    return(
        <>
            <Navbar />
            <div className="mt-10 sm:mt-48 mx-48">
                <div className="md:grid md:grid-cols-3 md:gap-6 bg-dark-slate-gray">
                    <div className="md:col-span-1 bg-dark-slate-gray rounded">
                        <div className="px-4 sm:px-5 py-5">
                            <h3 className="text-lg font-medium leading-6 text-timberwolf">Login</h3>
                            <p className="mt-1 text-sm text-timberwolf">Please enter your email address and password to proceed.</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form id="login_form" onSubmit={submit_handler}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-timberwolf px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6 bg-timberwolf">
                                        <div className="col-span-6 sm:col-span-5">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-rich-black">
                                                Email address
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email-address"
                                                autoComplete="email"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                                                onChange={please_fucking_work}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label htmlFor="password" className="block text-sm font-medium text-rich-black">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rich-black focus:ring-rich-black sm:text-sm"
                                                onChange={please_fucking_work}
                                            />
                                        </div>
                                        <div className="bg-gray px-4 py-6 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                id="submit"
                                                className="inline-flex justify-center rounded-md border  bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-rich-black focus:ring-offset-2"
                                                disabled={true}
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

export default Login