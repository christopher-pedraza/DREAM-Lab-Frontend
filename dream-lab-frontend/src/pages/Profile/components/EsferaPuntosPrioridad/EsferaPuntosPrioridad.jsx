import "./EsferaPuntosPrioridad.css";

function EsferaPuntosPrioridad(props) {
    return (
        <div className="div-esfera-out agua-animada">
            <div className="div-esfera-in"></div>
            <div className="div-informacion">
                <h1 data-cy="numero-puntos-prioridad" className="puntos-prioridad">{props.puntos}</h1>
                <h2 className="subtitulo">{props.subtitulo}</h2>
            </div>
        </div>
    );
}

export default EsferaPuntosPrioridad;
