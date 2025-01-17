import { useNavigate } from "react-router-dom";
import LogoutIcon from "src/assets/NavBar/logout.svg";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "src/redux/Slices/userSlice";
import { clearStorages } from "src/utils/Storage";

// Storage
import { getFromSessionStorage } from "src/utils/Storage";

function Logout() {
    let navigate = useNavigate();
    const dispatch = useDispatch(); // Get the dispatch function

    const handleClick = () => {
        if (!getFromSessionStorage("vistaEstudiante")) {
            clearStorages();
            // Llamámos a la función de logoutUser de la userSlice para borrar
            // los datos del usuario
            dispatch(logoutUser());
            navigate("/login", { replace: true }); // Navega al login
        }
    };

    return (
        <div className="flex items-center" onClick={handleClick}>
            <h1 className="cerrar-sesion">CERRAR SESIÓN</h1>
            <img className="logoutIcon" src={LogoutIcon} alt="Cerrar sesión" />
        </div>
    );
}

export default Logout;
