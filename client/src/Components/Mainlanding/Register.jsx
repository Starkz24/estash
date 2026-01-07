// // import React, { useState,useEffect } from "react";
// // import TextField from "@mui/material/TextField";
// // import Button from "@mui/material/Button";
// // import { useNavigate } from 'react-router-dom';
// // import {Link} from "react-router-dom";

// // const Signup = () => {
// //   const navigate = useNavigate();
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [locality, setLocality] = useState('');
// //   const [username, setUsername] = useState('');

// //   const getLocation = async (lat, lng) => {
// //     try {
// //       const response = await fetch(
// //         `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=cbcbc0ba997841f7a3fcab439f8b6a66`
// //       );
// //       const result = await response.json();

// //       if (result.features.length) {
// //         const address = result.features[0].properties.city;
// //         setLocality(address)
// //       } else {
// //         console.log("no address found");
// //       }
// //     } catch (error) {
// //       console.log("Error:", error);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (navigator.geolocation) {
// //       try {
// //         const position = await new Promise((resolve, reject) => {
// //           navigator.geolocation.getCurrentPosition(resolve, reject);
// //         });
// //         const lat = position.coords.latitude;
// //         const lng = position.coords.longitude;
// //         await getLocation(lat, lng);
// //       } catch (error) {
// //         console.log("Geolocation error:", error);
// //       }
// //     } else {
// //       console.log("Geolocation is not supported by this browser.");
// //     }
// //   };


// //   async function registerUser(event) {
// //     event.preventDefault();

// //     const response = await fetch('/api/register', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({
// //         name,
// //         email,
// //         password,
// //         username,
// //         locality
// //       }),
// //     });

// //     const data = await response.json();

// //     if (data.status === 'ok') {
// //       // localStorage.setItem("token", data.token)
// //       alert('Registered successful');
// //       // setToken(true)
// //       navigate('/');
// //     }
// //   }

// //   return (
// //     <>
// //       <form onSubmit={registerUser}>
// //         <div class="relative mb-5 flex justify-center align-middle">
// //           <TextField
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             type="text"
// //             id="outlined-basic"
// //             label="Full Name"
// //             variant="outlined"
// //             required
// //             sx={{
// //               input: { color: "white" },
// //               width: "43ch",
// //               "& .MuiInputLabel-root": { color: "#757575" },
// //               "& .MuiOutlinedInput-root": {
// //                 "& > fieldset": { borderColor: "#64b5f6" },
// //               },
// //               "& .MuiOutlinedInput-root:hover": {
// //                 "& > fieldset": {
// //                   borderColor: "rgb(66, 153, 225)",
// //                 },
// //               },
// //             }}
// //           />
// //         </div>
// //         <div class="relative mb-6 flex justify-center align-middle">
// //           <TextField
// //           required
// //             value={locality}
// //             onChange={(e) => setLocality(e.target.value)}
// //             onClick={handleSubmit}
// //             type="text"
// //             id="outlined-basic"
// //             label="Locality"
// //             variant="outlined"
// //             sx={{
// //               input: { color: "white" },
// //               width: "43ch",
// //               "& .MuiInputLabel-root": { color: "#757575" },
// //               "& .MuiOutlinedInput-root": {
// //                 "& > fieldset": { borderColor: "#64b5f6" },
// //               },
// //               "& .MuiOutlinedInput-root:hover": {
// //                 "& > fieldset": {
// //                   borderColor: "rgb(66, 153, 225)",
// //                 },
// //               },
// //             }}
// //           />
// //         </div>
// //         <div class="relative mb-6 flex justify-center align-middle">
// //           <TextField
// // required
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             type="text"

// //             id="outlined-basic"
// //             label="Username"
// //             variant="outlined"
// //             sx={{
// //               input: { color: "white" },
// //               width: "43ch",
// //               "& .MuiInputLabel-root": { color: "#757575" },
// //               "& .MuiOutlinedInput-root": {
// //                 "& > fieldset": { borderColor: "#64b5f6" },
// //               },
// //               "& .MuiOutlinedInput-root:hover": {
// //                 "& > fieldset": {
// //                   borderColor: "rgb(66, 153, 225)",
// //                 },
// //               },
// //             }}
// //           />
// //         </div>
// //         <div class="relative mb-6 flex justify-center align-middle">
// //           <TextField
// //           required
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             type="email"

// //             id="outlined-basic"
// //             label="Email"
// //             variant="outlined"
// //             sx={{
// //               input: { color: "white" },
// //               width: "43ch",
// //               "& .MuiInputLabel-root": { color: "#757575" },
// //               "& .MuiOutlinedInput-root": {
// //                 "& > fieldset": { borderColor: "#64b5f6" },
// //               },
// //               "& .MuiOutlinedInput-root:hover": {
// //                 "& > fieldset": {
// //                   borderColor: "rgb(66, 153, 225)",
// //                 },
// //               },
// //             }}
// //           />
// //         </div>

// //         <div class="relative mb-6 flex justify-center align-middle">
// //           <TextField
// //           required
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             type="password"
// //             id="outlined-password-input"
// //             label="Password"
// //             autoComplete="current-password"
// //             sx={{
// //               input: { color: "white" },
// //               width: "43ch",
// //               "& .MuiInputLabel-root": { color: "#757575" },
// //               "& .MuiOutlinedInput-root": {
// //                 "& > fieldset": { borderColor: "#64b5f6" },
// //               },
// //               "& .MuiOutlinedInput-root:hover": {
// //                 "& > fieldset": {
// //                   borderColor: "rgb(66, 153, 225)",
// //                 },
// //               },
// //             }}
// //           />
// //         </div>
// //         <div class="relative mb-6 flex justify-center align-middle">
// //           <Button type="submit" value="Register" variant="contained" sx={{ width: "43ch" }}>
// //             Sign Up
// //           </Button>
// //         </div>
// //         <div class="relative mb-6 flex justify-center align-middle">
// //           <h4 className="text-sm text-white">Already a member?</h4>
// //           <Link to="/" className="text-sm text-blue-400 underline px-2 cursor-pointer">
// //             Login
// //           </Link>
// //         </div>
// //       </form>
// //     </>
// //   );
// // };

// // export default Signup;


// import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
// import Landing2 from "./Landing";

// const Signup = ({ setShowRegister }) => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [locality, setLocality] = useState('');
//   const [username, setUsername] = useState('');
//   const [loadingLocation, setLoadingLocation] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");   // <-- ERROR MESSAGE STATE

//   // AUTO FETCH LOCATION
//   useEffect(() => {
//     const getLocation = async () => {
//       if (!navigator.geolocation) return;

//       try {
//         const position = await new Promise((resolve, reject) =>
//           navigator.geolocation.getCurrentPosition(resolve, reject)
//         );

//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         const response = await fetch(
//           `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=cbcbc0ba997841f7a3fcab439f8b6a66`
//         );

//         const data = await response.json();
//         if (data.features.length) {
//           setLocality(data.features[0].properties.city);
//         } else {
//           setLocality("Unknown");
//         }
//       } catch (err) {
//         setLocality("Unknown");
//       }

//       setLoadingLocation(false);
//     };

//     getLocation();
//   }, []);

//   // REGISTER USER
//   async function registerUser(e) {
//     e.preventDefault();
//     setErrorMsg(""); // Clear previous errors

//     if (loadingLocation) {
//       alert("Fetching location... please wait");
//       return;
//     }

//     const res = await fetch("/api/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password, username, locality }),
//     });

//     const data = await res.json();

//     if (data.status === "ok") {
//       alert("Registration successful!");
//       setShowRegister(false);
//     } else {
//       setErrorMsg(data.error || "Registration failed. Try again.");
//     }
//   }

//   // COMMON WHITE TEXTFIELD STYLE
//   const whiteField = {
//     width: "43ch",
//     input: { color: "white" },
//     "& .MuiInputLabel-root": { color: "white" },
//     "& .MuiInputLabel-root.Mui-focused": { color: "white" },
//     "& .MuiOutlinedInput-root": {
//       "& > fieldset": { borderColor: "white" },
//     },
//     "& .MuiOutlinedInput-root:hover > fieldset": {
//       borderColor: "#64b5f6",
//     },
//     "& .MuiOutlinedInput-root.Mui-focused > fieldset": {
//       borderColor: "#64b5f6",
//     },
//   };

//   return (
//     <div className="md:flex md:justify-between">

//       {/* LEFT SIDE - LANDING SECTION (DESKTOP) */}
//       <div className="hidden md:block w-1/2 pl-12">
//         <Landing2 />
//       </div>

//       {/* RIGHT SIDE - FORM CARD */}
//       <div className="flex flex-col mx-auto w-11/12 md:w-96 bg-opacity-10 bg-white backdrop-blur-md p-8 rounded-xl shadow-xl mt-8 md:mr-14">

//         {/* MOBILE LANDING */}
//         <div className="md:hidden mb-6">
//           <Landing2 />
//         </div>

//         <h2 className="text-white text-2xl font-semibold mb-6 text-center">
//           Create Your Account
//         </h2>

//         {/* ERROR MESSAGE */}
//         {errorMsg && (
//           <p className="text-red-400 text-center mb-4">{errorMsg}</p>
//         )}

//         <form onSubmit={registerUser}>

//           {/* FULL NAME */}
//           <div className="mb-6 flex justify-center">
//             <TextField
//               required
//               label="Full Name"
//               variant="outlined"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               sx={whiteField}
//             />
//           </div>

//           {/* LOCALITY */}
//           <div className="mb-6 flex justify-center">
//             <TextField
//               required
//               disabled
//               label={loadingLocation ? "Fetching location..." : "Locality"}
//               value={locality}
//               variant="outlined"
//               sx={whiteField}
//             />
//           </div>

//           {/* USERNAME */}
//           <div className="mb-6 flex justify-center">
//             <TextField
//               required
//               label="Username"
//               variant="outlined"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               sx={whiteField}
//             />
//           </div>

//           {/* EMAIL */}
//           <div className="mb-6 flex justify-center">
//             <TextField
//               required
//               label="Email"
//               type="email"
//               variant="outlined"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               sx={whiteField}
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="mb-6 flex justify-center">
//             <TextField
//               required
//               label="Password"
//               type="password"
//               variant="outlined"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               sx={whiteField}
//             />
//           </div>

//           {/* SUBMIT BUTTON */}
//           <div className="mb-6 flex justify-center">
//             <Button type="submit" variant="contained" sx={{ width: "43ch" }}>
//               Sign Up
//             </Button>
//           </div>

//           {/* SWITCH TO LOGIN */}
//           <div className="flex justify-center text-white">
//             Already a member?
//             <span
//               onClick={() => setShowRegister(false)}
//               className="text-blue-400 underline px-2 cursor-pointer"
//             >
//               Login
//             </span>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Signup = ({ setShowRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [locality, setLocality] = useState('');
  const [username, setUsername] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) return;

      try {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=cbcbc0ba997841f7a3fcab439f8b6a66`
        );

        const data = await res.json();
        setLocality(data.features?.[0]?.properties?.city || "Unknown");
      } catch {
        setLocality("Unknown");
      }

      setLoadingLocation(false);
    };

    getLocation();
  }, []);

  async function registerUser(e) {
    e.preventDefault();
    setErrorMsg("");

    if (loadingLocation) {
      alert("Fetching location... please wait");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, username, locality }),
    });

    const data = await res.json();

    if (data.status === "ok") {
      alert("Registration successful!");
      setShowRegister(false);
    } else {
      setErrorMsg(data.error || "Registration failed. Try again.");
    }
  }

  const whiteField = {
    width: "43ch",
    input: { color: "white" },
    "& .MuiInputLabel-root": { color: "white" },
    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
    "& .MuiOutlinedInput-root fieldset": { borderColor: "white" },
    "& .MuiOutlinedInput-root:hover fieldset": { borderColor: "#64b5f6" },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#64b5f6" },
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      {/* GLASS CARD */}
      <div className="flex flex-col w-11/12 md:w-96 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl">

        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Create Your Account
        </h2>

        {errorMsg && (
          <p className="text-red-400 text-center mb-4">{errorMsg}</p>
        )}

        <form onSubmit={registerUser}>

          <div className="mb-6 flex justify-center">
            <TextField
              required
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={whiteField}
            />
          </div>

          <div className="mb-6 flex justify-center">
            <TextField
              disabled
              label={loadingLocation ? "Fetching location..." : "Locality"}
              value={locality}
              sx={whiteField}
            />
          </div>

          <div className="mb-6 flex justify-center">
            <TextField
              required
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={whiteField}
            />
          </div>

          <div className="mb-6 flex justify-center">
            <TextField
              required
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={whiteField}
            />
          </div>

          <div className="mb-6 flex justify-center">
            <TextField
              required
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={whiteField}
            />
          </div>

          <div className="mb-6 flex justify-center">
            <Button type="submit" variant="contained" sx={{ width: "43ch" }}>
              Sign Up
            </Button>
          </div>

          <div className="flex justify-center text-white">
            Already a member?
            <span
              onClick={() => setShowRegister(false)}
              className="text-blue-400 underline px-2 cursor-pointer"
            >
              Login
            </span>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Signup;
