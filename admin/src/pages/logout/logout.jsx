import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls";
import { PowerSettingsNew, ExitToApp, LockOutlined } from '@material-ui/icons';

export default function Logout(params) {
  const dispatch = useDispatch();
  const handleLogout = () => logoutUser(dispatch);
  return (
    <button onClick={handleLogout}>
     
          <ExitToApp />  
    </button>
  );
}
