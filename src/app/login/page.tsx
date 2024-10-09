"use client";
import { useRouter } from "next/navigation";
import {  useState,useContext,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../context/UserContext";


type User = {
  userid: string;
  email: string;
  name: string;
};

export default function Page() {
  const [otpsent, setotpsent] = useState<boolean>(false);
  const [otp, setotp] = useState<string>("");
  const [user, setuser] = useState<User>({ userid: "", email: "", name: "" });
  const context=useContext(UserContext);
  const data=context?.userData;
  const router = useRouter();
  useEffect(() => {
    if (data?.userid) {
      router.push('/');
    }
  }, [data, router]);


  function validateEmail(email: string) {
    let error = "";

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      error = "Email is required";
    } else if (!emailRegex.test(email)) {
      error = "Invalid email address";
    }

    return error;
  }
  function errorvisible(
    inputName: string,
    errorid: string,
    c: any,
    errors: string
  ) {
    let input = document.getElementsByName(inputName)[0];
    input.classList.add("border-red-500");
    input.classList.remove("border-gray-800");
    let error = document.getElementById(errorid);
    if(error){
        error.classList.remove("hidden");
        error.innerHTML = errors;
    }
    c[inputName] = true;
  }
  function errorhide(inputName: string, errorid: string, c: any) {
    let input = document.getElementsByName(inputName)[0];
    input.classList.remove("border-red-500");
    input.classList.add("border-gray-800");
    let error = document.getElementById(errorid);
    error?.classList.add("hidden");
    c[inputName] = false;
  }
  function validateOTP(otp: string) {
    let error = "";

    // Validate OTP
    const otpRegex = /^\d{6}$/; // Exactly 6 digits
    if (!otp) {
      error = "OTP is required";
    } else if (!otpRegex.test(otp)) {
      error = "OTP must be exactly 6 digits";
    }

    return error;
  }

  async function submitEvent() {
    let c = { email: false, otp: false };

    if (validateEmail(user.email) != "") {
      errorvisible("email", "email-error", c, validateEmail(user.email));
    } else {
      errorhide("email", "email-error", c);
    }

    if (validateOTP(otp) != "") {
      errorvisible("otp", "otp-error", c, validateOTP(otp));
    } else {
      errorhide("otp", "otp-error", c);
    }
    if (c.email || c.otp) {
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      credentials: "include",
      body: JSON.stringify({ email: user.email, otp: otp }),
      
    });
    if(response.ok){
      toast.success('Login successfull');
      setuser({userid:"",email:"",name:""});
      setotpsent(false);
      setotp("");
      window.location.href="/"
    }else{
      const {message}=await response.json();
      toast.error(message);
    }
    
  }
  async function sendOtp() {
    let c = { email: false };

    if (validateEmail(user.email) != "") {
      errorvisible("email", "email-error", c, validateEmail(user.email));
    } else {
      errorhide("email", "email-error", c);
    }
    if (c.email) {
      return;
    }
    setotpsent(true);

    const response = await fetch("/api/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:user.email}),
      });
      toast.dismiss();
      if(response.ok){
          toast.success('OTP sent successfully');
      }else{
          const {message}=await response.json();
          toast.error(message);
      }
  }
  return (
    <div className="max-w-2xl bg-white w-11/12 m-7 p-4 py-11 text-center rounded-2xl">
      <h1 className="md:text-6xl text-4xl">Login</h1>
      <form className="flex m-8 flex-col gap-7 text-left">
        <div className="w-full">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            className="md:text-3xl text-lg p-3 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
            autoComplete="off"
          />
          <div id="email-error" className="text-red-500 hidden"></div>
        </div>
        <button
          className="text-lg font-bold bg-transparent border-4 px-4 py-2 w-48 my-5 rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900"
          onClick={(e) => {
            e.preventDefault();
            sendOtp();
          }}
        >
          Send OTP
        </button>
        {otpsent && (
          <div className="flex flex-col">
            <div className="w-full">
              <input
                type="text"
                placeholder="OTP"
                name="otp"
                onChange={(e) => setotp(e.target.value)}
                className="md:text-3xl text-lg p-3 outline-none border-gray-800 border-2 rounded-lg placeholder:text-gray-600 w-full"
                minLength={6}
                maxLength={6}
                autoComplete="off"
              />
            </div>
            <div id="otp-error" className="text-red-500 hidden"></div>
            <button
              className="text-lg font-bold bg-transparent border-4 px-4 py-2 w-48 my-5 rounded-3xl border-cyan-400 text-cyan-400 shadow-cyan-300 shadow-md hover:bg-cyan-400 hover:text-gray-900"
              onClick={(e) => {
                e.preventDefault();
                submitEvent();
              }}
            >
              Submit
            </button>
          </div>
        )}
      </form>
      <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
    </div>
  );
}
