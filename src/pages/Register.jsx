import { useEffect, useState } from "react"
import Input from "../components/Form/Input";
import Label from "../components/Form/Label";
import { Link, Navigate } from "react-router-dom";
import Submit from "../components/Form/Submit";

const register_API = 'https://electroshop.liara.run/api/auth/register';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [repasswordError, setRepasswordError] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      name,
      email,
      password
    };

    try {

      const resp = await fetch(register_API, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await resp.json();

      if(!resp.ok) {
        throw new Error(data.message ?? `an error occurred in login process with status code: ${resp.code}`);
      }
      setSuccess(true);
    } catch(err) {
      setLoginError(err.message);
    }


  }

  if(success) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <Link className="absolute left-2 top-2 p-3 text-sky-400" to='/'>Home</Link>
      <div className="bg-white min-h-screen flex items-center justify-center px-6">
        <form className="p-10 rounded-md w-full max-w-md flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-1.5 mb-10">
            <h1 className="text-3xl font-medium text-center">Create your account</h1>
          </div>
          {loginError && <p className="text-red-500 mt-2 text-center">{loginError}</p>}
          <div className="flex item-center gap-6">
            <div className="flex flex-col relative">
              <Label 
                value="name"
                error={loginError}
                htmlFor="name"
              />
              <Input
                type="name"
                name="name"
                value={name}
                setValue={setName}
                error={loginError}
              />
            </div>
            <div className="flex flex-1 flex-col relative">
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
          <div className="flex flex-col relative">
            <Label 
              value="Confirm password"
              htmlFor="repassword"
              error={loginError}
            />
            <Input
              type="password"
              name="repassword"
              value={repassword}
              setValue={setRepassword}
              error={loginError}
            />
            {repasswordError && <p className="text-sm text-red-400 mt-2">{repasswordError}</p>}
          </div>
          <div className="flex flex-col">
            <Submit value="Create Account" disabled={submitDisabled} />
          </div>
        </form>
      </div>
    </>
  )
}

export default Register