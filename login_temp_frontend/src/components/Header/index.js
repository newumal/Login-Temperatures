import {Link, useNavigate } from "react-router-dom";
import {FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {register, logout, reset} from "../../features/authSlice";

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    
    const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/login')
    }

  return (
      <div>
         <header className='header'>
             <div className='logo'>
                 <Link to='/'>Goal Setter</Link>
             </div>
             <ul>
                 { user ? (
                     <li>

                         <button className='button' onClick={onLogout}>
                             <FaSignOutAlt /> Logout
                         </button>
                     </li>
                 ): (
                     <li>
                         <Link to='/login'>
                             <FaSignInAlt /> Login
                         </Link>
                     </li>
                 )}

             </ul>
         </header>
      </div>
  )
}

export default Header