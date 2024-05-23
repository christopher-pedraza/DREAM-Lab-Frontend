import React, { useState } from "react";
import "./CrearAnuncioVideowall.css";
import BotonVisualizarVideowall from "./components/BotonVisualizarVideowall/BotonVisualizarVideowall/BotonVisualizarVideowall";
import imagenExpandir from "../../assets/CrearAnuncioVideowall/expandir.webp";
import flechaSiguiente from "../../assets/CrearAnuncioVideowall/flechaSiguiente.webp";
import { useNavigate } from "react-router-dom";
import FormularioCreacionAnuncio from "./components/FormularioCreacionAnuncio/FormularioCreacionAnuncio";
import Navbar from "../../GlobalComponents/NavBar/NavBar";
import AdministradorAnuncios from "../CrearAnuncioVideowall/components/AdministradorAnuncios/AdministradorAnuncios";
import NavBarAdmin from "../../GlobalComponents/NavBarAdmin/NavBarAdmin";
import FormularioPersonalizado from "../CrearAnuncioVideowall/components/FormularioPersonalizado/FormularioPersonalizado";


function CrearAnuncioVideowall() {
    let navigate = useNavigate();

    const handleClickVideowall = () => {
        const nuevaPestana = window.open('/videowall', '_blank');
        if (nuevaPestana) {
            nuevaPestana.focus();
        } else {
            // Manejar el caso donde el navegador bloquea la apertura de la nueva pestaña
            // Puedes redirigir al usuario a la página en la misma pestaña si es necesario
            navigate('/videowall');
        }
    };

    const [opcionPersonalizadoSeleccionado, setOpcionPersonalizadoSeleccionado] = useState(false);
    const [opcionExperienciaSeleccionado, setOpcionExperienciaSeleccionado] = useState(true);
    const [numElementos, setNumElementos] = useState(0);
    const [actualizarAdminAnuncios, setActualizarAdminAnuncios] = useState(0);

    const handleActualizarAdminAnuncios = () => {
        setActualizarAdminAnuncios(prevState => prevState + 1); // Incrementar el estado en 1 para indicar un cambio
    };

    // Define una función de callback para recibir el número de elementos desde el AdministradorAnuncios
    const handleNumElementos = (num) => {
        setNumElementos(num);
        console.log("Número de elementos:", num);
    };

    const handleTipoAnuncioSeleccionado = (opcionPersonalizado, opcionExperiencia) => {
        setOpcionPersonalizadoSeleccionado(opcionPersonalizado);
        setOpcionExperienciaSeleccionado(opcionExperiencia);
    };

    return (
        <div>
            
            <NavBarAdmin/>

            <div className="elementos-creacion-anuncio">
                <div className="creacion-anuncio-columna-izq">
                    {opcionExperienciaSeleccionado ? (
                        <FormularioCreacionAnuncio
                            opcionPersonalizadoSeleccionado={
                                opcionPersonalizadoSeleccionado
                            }
                            opcionExperienciaSeleccionado={
                                opcionExperienciaSeleccionado
                            }
                            handleTipoAnuncioSeleccionado={
                                handleTipoAnuncioSeleccionado
                            }
                            numeroAnuncios={numElementos}
                            actualizarAdminAnuncios={handleActualizarAdminAnuncios}
                        />
                    ) : (
                        <FormularioPersonalizado 
                            opcionPersonalizadoSeleccionado={
                                opcionPersonalizadoSeleccionado
                            }
                            opcionExperienciaSeleccionado={
                                opcionExperienciaSeleccionado
                            }
                            handleTipoAnuncioSeleccionado={
                                handleTipoAnuncioSeleccionado
                            }
                            numeroAnuncios={numElementos}
                            actualizarAdminAnuncios={handleActualizarAdminAnuncios}
                        />
                    )}
                </div>

                <div className="creacion-anuncio-columna-der">
                    <div className="componente-visualizar-videowall-button">
                        <BotonVisualizarVideowall
                            ruta={handleClickVideowall}
                            imagenIzq={imagenExpandir}
                            frase="Visualizar videowall"
                            imagenDer={flechaSiguiente}
                        />
                    </div>

                    <div className="componente-admin-anuncios-div">
                        <AdministradorAnuncios 
                            onNumElementosChange={handleNumElementos}
                            actualizar={actualizarAdminAnuncios} // Pasar el estado para actualizar el componente
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearAnuncioVideowall;
