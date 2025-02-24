// import * as React from 'react';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { SignInPage } from '@toolpad/core/SignInPage';
// import { useTheme } from '@mui/material/styles';

// const providers = [{ id: 'credentials', name: 'Credentials' }];
// const BRANDING = {
//   logo: (
//     <img
//       src="https://mui.com/static/logo.svg"
//       alt="MUI logo"
//       style={{ height: 24 }}
//     />
//   ),
//   title: 'MUI',
// };

// const signIn = async (provider) => {
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Sign in with ${provider.id}`);
//       resolve();
//     }, 500);
//   });
//   return promise;
// };

// export default function BrandingSignInPage() {
//   const theme = useTheme();
//   return (
//     // preview-start
//     <AppProvider theme={theme}>
//       <SignInPage
//         signIn={signIn}
//         providers={providers}
//         slotProps={{ emailField: { autoFocus: false } }}
//       />
//     </AppProvider>
//     // preview-end
//   );
// }

// import React, { useEffect, useState } from 'react'

// const SignIn = () => {
//   const [ toggle, setToggle ] = useState(false);
//   const [ pos, setPos ] = useState({x: 0, y: 0})

//   useEffect(()=>{
//     const handleMouseMove = (e) =>{
//       setPos({x: e.clientX, y: e.clientY})
//     }

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => window.removeEventListener('mousemove', handleMouseMove)

//   }, [])

//   return (
//     <div>
//       {
//         toggle && <p style={{paddingBottom: '20px'}}>Rosan</p>
//       }
//       <button onClick={()=>setToggle((prev=>!prev))}>Click</button>

//       <div>
//         <h1>Mouse Position</h1>
//         <p>X : {pos.x}</p>
//         <p>Y : {pos.y}</p>
//       </div>
//     </div>
//   )
// }

// export default SignIn

// import React, { useState } from 'react'

// const SignIn = () => {
//   const [ form, setForm ] = useState({
//     name: '',
//     number: '',
//   });

//   const handleChange = (e) =>{
//     const { name, value} = e.target;
//     setForm((prevData)=>({
//       ...prevData,
//       [name]:value,
//     }))
//   }

//   const handleSubmit = (e) =>{
//     e.preventDefault()
//     alert(`${form.name}, your data submitted succesfully`)
//     setForm({
//       name: '',
//       number: ''
//     })
//   }
  
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div>
//         <label>Name: </label>
//         <input
//           type='text'
//           name='name'
//           placeholder='enter name'
//           onChange={handleChange}
//           value={form.name}
//         />
//         </div>
//         <div>
//           <label>Moblie: </label>
//           <input
//             type='text'
//             name='number'
//             placeholder='mobile'
//             onChange={handleChange}
//             value={form.number}
//             pattern="[0-9]{10}"
//             maxLength="10"
//             min="0"
//           />
//         </div>
//         <button type='submit'>Submit</button>
//       </form>
//     </>
//   )
// }

// export default SignIn

import React, { useEffect, useState } from 'react'

const SignIn = () => {
  const storedTime = JSON.parse(sessionStorage.getItem('timerState')) || { sec: 0, min: 0, hour: 0 };
  const [ count, setcount ] = useState(storedTime);

  const targetTime = JSON.parse(sessionStorage.getItem('timerEnd')) || { sec: 0, min: 0, hour: 0 };
  const [counter, setCounter] = useState(targetTime);

  useEffect(() => {
    const upd1 = () => {
      setCounter((prev) => {
        let { sec, min, hour } = prev;

        sec -= 1;
        if (sec === 60) {
          sec = 0
          min -= 1
        }
        if (min === 60) {
          min = 0;
          hour -= 1
        }
        if (hour === 24) {
          hour = 0
        }

        sessionStorage.setItem('timerEnd', JSON.stringify({ sec, min, hour }));
        return { sec, min, hour };
      });
    };

    const int = setInterval(upd1, 1000);
    return () => clearInterval(int);
  }, []);

  const formatTimes = (timeUnit) => {
    return timeUnit !== undefined ? timeUnit.toString().padStart(2, "0") : "00";
  };

  useEffect(()=>{
    const upd = () =>{
      setcount((pre)=>{
        let { sec, min, hour } = pre;
        sec += 1;
        if (sec === 60) {
          sec = 0
          min += 1
        }
        if (min === 60) {
          min = 0;
          hour += 1
        }
        if (hour === 24) {
          hour = 0
        }

        sessionStorage.setItem('timerState', JSON.stringify({ sec, min, hour }));
        return {sec, min, hour}
      })
    }
    const int = setInterval(upd, 1000);
    return ()=>clearInterval(int)    
  }, [])

  const formatTime = (timeUnit) => {
    return timeUnit !== undefined ? timeUnit.toString().padStart(2, "0") : "00";
  };

  return (
    <>
      <h2>Your Count started: {formatTime(count.hour)} : {formatTime(count.min)} : {formatTime(count.sec)}</h2>
      <h2>You have left: - {formatTimes(counter.hour)} : {formatTimes(counter.min)} : {formatTimes(counter.sec)}</h2>
    </>
  )
}

export default SignIn