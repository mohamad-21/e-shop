import { memo, useContext, useEffect, useState } from "react"
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import Modal from "../components/Modal/Modal"
import ModalTitle from "../components/Modal/ModalTitle"
import ModalButtons from "../components/Modal/ModalButtons"
import { FilledButton } from "../components/Modal/ModalButton"
import User from "../contexts/User";
import { Link, useNavigate } from "react-router-dom";
import Submit from "../components/Form/Submit";
import axios from "axios";

const login_API = 'https://electroshop.liara.run/api/auth/login';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(false);
  const user = useContext(User)
  const redirect = useNavigate();

  useEffect(() => {
    if(email.trim() && password.trim()) {
      setSubmitDisabled(false);
    } else setSubmitDisabled(true);
  }, [email, password])


  async function handleSubmit(e) {

    e.preventDefault();

    setEmailError(null);
    setLoginError(null);

    let validation = true;
    
    const emailPattern = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;

    if(!emailPattern.test(email)) {
      setEmailError('provide an valid email')
      validation = false;
    }
    if(!validation) return;

    const loginData = {
      email,
      password
    };

    try {
      const resp = await fetch(login_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await resp.json();

      if(!resp.ok) {
        throw new Error(data.message ?? `an error occurred in login process with status code: ${resp.code}`);
      }
      user.login(data);
      setSuccess(true);
    } catch(err) {
      setLoginError(err.message);
      console.log(err)
    }


  }

  return (
    <>
      <Link className="absolute left-2 top-2 p-3 text-sky-400" to='/'>Home</Link>
      <div className="bg-white min-h-screen flex items-center justify-center px-6">
        <form className="p-10 rounded-md w-full max-w-md flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-1.5 mb-10">
            <h1 className="text-3xl font-medium text-center">Login to your account</h1>
          </div>
          {loginError && <p className="text-red-500 mt-2 text-center">{loginError}</p>}
          <div className="flex flex-col relative">
            <Label 
              value="Email"
              error={emailError || loginError}
              htmlFor="email"
            />
            <Input
              type="email"
              name="email"
              value={email}
              setValue={setEmail}
              error={emailError || loginError}
            />
            {emailError && <p className="text-sm text-red-400 mt-2">{emailError}</p>}
          </div>
          <div className="flex flex-col relative">
            <Label 
              value="Password"
              htmlFor="password"
              error={loginError}
            />
            <Input
              type="password"
              name="password"
              value={password}
              setValue={setPassword}
              error={loginError}
            />
          </div>
          <div className="flex flex-col">
            <Submit value="login" disabled={submitDisabled} />
          </div>
        </form>
      </div>
      {success && (
        <Modal>
          <ModalTitle>Welcome back 😁</ModalTitle>
          <ModalButtons>
            <FilledButton onClick={() => redirect('/')}>OK</FilledButton>
          </ModalButtons>
        </Modal>
      )}
    </>
  )
}

export default Login