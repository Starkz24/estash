// import React,{ useState } from "react";
// import './index.css';
// import Display from './Components/Dashboard/Display';
// import Mainpage from './Components/Mainlanding/Mainpage';
// import { Route,Routes } from "react-router-dom";
// import Events from './Components/events/Events'
// import Leaderboard from "./Components/LeaderBoard/Leaderboard";
// import Donation from "./Components/Dono Page/Donation";


// const App = () => {
  
//   const [token, setToken] = useState(false);

//   if(!token){
//     return <Mainpage setToken={setToken}/>
//   }


//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Display/>}/>
//         {/* <Route path="/logout" element={<Logout/>}/> */}
//         <Route path="/event" element={<Events/>}/>
//         <Route path="/leaderboard" element={<Leaderboard/>}/>
//         <Route path="/donate" element={<Donation/>}/>
//       </Routes>
//     </div>
//   );
// };

// export default App;



import React, { useState } from "react";
import './index.css';
import Display from './Components/Dashboard/Display';
import Mainpage from './Components/Mainlanding/Mainpage';
import { Route, Routes, Navigate } from "react-router-dom";
import Events from './Components/events/Events';
import Leaderboard from "./Components/LeaderBoard/Leaderboard";
import Donation from "./Components/Dono Page/Donation";
import Signup from "./Components/Mainlanding/Register";

const App = () => {

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") ? true : false;
  });

  return (
    <Routes>

      <Route path="/" element={<Mainpage setToken={setToken} />} />
      <Route path="/register" element={<Signup />}/>

      <Route path="/dashboard" element={token ? <Display /> : <Navigate to="/" />} />

      <Route path="/event" element={token ? <Events /> : <Navigate to="/" />} />

      <Route path="/leaderboard" element={token ? <Leaderboard /> : <Navigate to="/" />} />

      <Route path="/donate" element={token ? <Donation /> : <Navigate to="/" />} />

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
};

export default App;
