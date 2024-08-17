import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/login.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();

  // State variables
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Validation state variables
  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  // Focus state variables
  const [userFocus, setUserFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // Focus on username input on component mount
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Validate username, password, email
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    const isPwdValid = PWD_REGEX.test(pwd);
    setValidPwd(isPwdValid);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, email, matchPwd]);

  // Register user
  const registerUser = async (e) => {
    e.preventDefault();
    if (!validName || !validPwd || !validMatch || !validEmail) {
      setErrMsg("Invalid inputs given");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", {
        username: user,
        email: email,
        password: pwd,
      });

      if (response.status === 201) {
        toast.success("Sign Up Successful. Please login!", {
          position: "top-right",
        });

        setTimeout(() => navigate("/login"), 2500);

        // Reset form fields
        setUser("");
        setPwd("");
        setMatchPwd("");
        setEmail("");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      setErrMsg(errorMessage);
    }
  };

  return (
    <div className="mt-28 max-w-screen-2xl container mx-auto xl:px-28 px-4">
      <section className="h-screen flex justify-center items-center form-section m-0">
        <form className="flex flex-col gap-5 bg-[#F8F7F2] registration-form">
          <div>
            <h2 className="font-bold text-[32px]">Sign up</h2>
            <p className="text-[#7f7f7f] text-sm font-semibold">
              Start your journey with us.
            </p>
          </div>
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <input
            placeholder="username"
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value.toLowerCase())}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="rounded"
          />
          <p className={userFocus && user && !validName ? "instructions m-0 text-white rounded" : "offscreen m-0 text-white rounded"}>
            4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
          </p>
          <input
            type="email"
            id="email"
            placeholder="e-mail"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="rounded"
          />
          <p className={emailFocus && email && !validEmail ? "instructions m-0 text-white rounded" : "offscreen m-0 text-white rounded"}>
            Email address is invalid.
          </p>
          <input
            type="password"
            placeholder="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="rounded"
          />
          <p className={pwdFocus && pwd && !validPwd ? "instructions m-0 text-white rounded" : "offscreen m-0 text-white rounded"}>
            8-24 characters. Must include one uppercase and lowercase letter, and a number.
          </p>
          <input
            type="password"
            id="confirm-password"
            placeholder="confirm password"
            autoComplete="off"
            onChange={(e) => setMatchPwd(e.target.value)}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="rounded"
          />
          <p className={matchFocus && matchPwd && !validMatch ? "instructions m-0 text-white rounded" : "offscreen m-0 text-white rounded"}>
            Password does not match.
          </p>
          <button
            className="form-btn rounded bg-black text-white py-1"
            onClick={registerUser}
          >
            Sign up
          </button>
          <p className="my-0">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-black underline">
              Sign in.
            </Link>
          </p>
        </form>
        <ToastContainer />
      </section>
    </div>
  );
};

export default Register;
