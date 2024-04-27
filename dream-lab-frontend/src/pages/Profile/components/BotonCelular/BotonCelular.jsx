import "./BotonCelular.css";
import ImagenEstrella from "/Profile/estrella.jpg";
import ImagenFlecha from "/Profile/flecha.png";
import ImagenCalendario from "/Profile/calendario2.png";
import { useNavigate } from "react-router-dom";

function BotonCelular(props) {
    let navigate = useNavigate();
    const tipo = props.tipo;

    return (
        <div
            className="boton-celular"
            onClick={() =>
                tipo === "logros"
                    ? navigate("/profile/logros/")
                    : navigate("/profile/reservaciones/")
            }
        >
            <img
                className="imagen-boton"
                src={tipo === "logros" ? ImagenEstrella : ImagenCalendario}
                alt="Imagen de botón"
            />
            <h1 className="texto-boton">{props.texto}</h1>
            <img
                className="imagen-flecha"
                src={ImagenFlecha}
                alt="Imagen de flecha"
            />
        </div>
    );
}

export default BotonCelular;
