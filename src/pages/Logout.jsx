import { useContext, useEffect } from "react"
import User from "../contexts/User"
import { Navigate } from "react-router-dom";

function Logout() {

  const user = useContext(User);

  useEffect(() => {
    user.logout();
  }, []);

  return (
    <Navigate to="/" />
  )
}

export default Logout