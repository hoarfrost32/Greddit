import logo from './logo.png'
import './logo.css'
import  {useNavigate, Navigate} from 'react-router-dom';
// import './index.css'

function Logo(){

  const navigate = useNavigate();

  if(localStorage.getItem("Auth")==="True"){
    return(<Navigate replace to="/profile" />)
  }

  return(
    <div className="bg-rich-black">
    <header className='App-header'>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <header className="logo">
      <h1>DOOMsphere.</h1>
    </header>  
    <p className='text-white text-center'>Click <button onClick={
      () => {
        navigate("/auth")
      } 
    }>here</button> to get started.
    </p>
  </div>
  )
}

export default Logo;