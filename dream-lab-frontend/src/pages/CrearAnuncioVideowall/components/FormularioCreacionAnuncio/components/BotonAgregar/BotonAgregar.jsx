import React from "react";
import "./BotonAgregar.css";

function BotonAgregar(props) {
    return (
        <div className="boton-agregar-div" onClick={props.funcion} data-cy="boton-agregar-anuncio">
            <h1
                className="boton-agregar-texto"
                style={{ color: props.error ? "#B30D0D" : "#042e55" }}
            >
                {props.texto}
            </h1>
        </div>
    );
}

export default BotonAgregar;
