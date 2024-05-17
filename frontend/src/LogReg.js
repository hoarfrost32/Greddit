import { useState } from 'react';
import Login from './Login';
import SignUp from './Register';

function LogReg(){
    const [flag, handler] = useState(true)
    if(flag){
      return (
        <>
          <Login />
          <div className="App">
          <p className="text-center text-white">Don't have an account? Click <button onClick={() => handler(!flag)}
            className="App-link"
            >Here
            </button> to signup.
          </p>
          </div>
        </>
      )
    }
    else{
      return (
        <>
          <SignUp />
          <div>
          <p className='text-center text-white' >Have an account? Click <button onClick={() => handler(!flag)}
            className="App-link"
            >Here
            </button> to login.
          </p>
          </div>
        </>
      )
    }
}

export default LogReg;
  