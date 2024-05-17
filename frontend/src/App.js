import  {Routes, Route} from 'react-router-dom';
import LogReg from './LogReg';
import Profile from './profile';
import { MySpheres } from './MySpheres';
import Logo from './Logo';
import AllSpheres from './All_Spheres';
import JoinRequests from './Join_Requests';
import Users from './Users';

function App(){
  return (
      <div>
        <Routes>
          <Route exact path='/' element={<Logo />} />
          <Route exact path='/auth' element={<LogReg />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/MySpheres' element={<MySpheres />} />
          <Route exact path='/AllSpheres' element={<AllSpheres />} />
          {/* <Route exact path="/MySpheres/:sub_id" element={<Sub_mod_tools />} /> */}
          <Route exact path="/MySpheres/:sub_id/join" element={<JoinRequests />} />
          <Route exact path="/MySpheres/:sub_id/users" element={<Users />} />
        </Routes>
      </div>
  )
}

export {App};