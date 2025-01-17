// Estilos
import "./ContenedorGrafica.css";

function ContenedorGrafica({ titulo, children }) {
    return (
        <div className="cg-contenedor">
            <h1 className="cg-titulo-grafica">{titulo}</h1>
            <div className="cg-contenedor-grafica">{children}</div>
        </div>
    );
}

export default ContenedorGrafica;
