//otp verification process
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import Cookies from 'cookies';
const OTPVerify = () => {
    const [email, setEmail]=useState('');
    const [otp,setOTP]=useState('')
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate();
    const handelSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null)
        
        try {
            //take api key value form env
            const apikey = import.meta.env.VITE_API_KEY;
            const response = await fetch('http://localhost:3000/userauth/verifyloginotp',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'apiauthkey':apikey, // Replace 'your-api-key' with your actual API key
                },
                body:JSON.stringify({email,otp})

            })
            let data = await response.json();
            if(response.ok){
                if(data.usertype==="superadmin"){
                toast(data.message)
                localStorage.setItem("token",data.authtoken)
                localStorage.setItem("usertype",data.usertype)
                navigate("/")
                }else{
                    toast("Youre not authorized to access this page")
                    console.log("Youre not authorized to view this page")
                }

            }else{
                toast(data.message)
                setError(data.message||'Login falied')
            }
        } catch (error) {
            console.log(error)
            toast('An error occurred during login')
            setError('An error occurred during login')
        }finally{
            setLoading(false)
        }
    }

  return (

  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">OTP verification for two step auth</h1>
  
      <p className="mt-4 text-gray-500">
        An OTP hasbeen sent to your email please check email 
      </p>
    </div>
  
    <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handelSubmit}>
      <div>
        <label for="email" className="sr-only">Email</label>
  
        <div className="relative">
          <input
               id="email"
               name="email"
               type="email"
               autoComplete="email"
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
          />
  
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>
  
      <div>
        <label for="password" className="sr-only">Otp</label>
  
        <div className="relative">
          <input
           id="otp"
           name="otp"
           type="text"
           required
           value={otp}
           onChange={(e) => setOTP(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter otp"
          />
  
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>
  
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
            need to regen OTP
          <a className="underline" href="/signin">Go to signin</a>
        </p>
  
        <button
          type="submit"
          disabled={loading}
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >

          {loading? 'Loading ...':'Submit'}
        </button>
      </div>
    </form>
  </div>
  
  )
}

export default OTPVerify
