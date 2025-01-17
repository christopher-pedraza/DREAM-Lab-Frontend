// Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Estilos
import "./SelectorSala.css";

// Navbars
import NavBar from "src/GlobalComponents/NavBar/NavBar";
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";

// Componentes
import TextoFecha from "./components/TextoFecha/TextoFecha";
import FechaFormulario from "./components/FechaFormulario/FechaFormulario";
import TextoNombreSala from "./components/TextoNombreSala/TextoNombreSala.jsx";
import PrimerRecordatorio from "./components/PrimerRecordatorio/PrimerRecordatorio";
import Slider from "./components/Slider/Slider";
import RoundedButton from "./components/RoundedButton/RoundedButton";
import { InfoReservCard } from "./components/InfoReservCard/InfoReservCard";
import GLBModelViewer from "./components/GLBModelViewer/GLBModelViewer";

// Storage
import {
    existsInSessionStorage,
    getFromSessionStorage,
    saveToSessionStorage,
} from "src/utils/Storage";

// ApiRequests
import { get, post } from "src/utils/ApiRequests.js";

function SelectorSala() {
    let navigate = useNavigate();

    const [isFirstReminderOpen, setIsFirstReminderOpen] = useState(false);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
    const [update, setUpdate] = useState(false);
    const [espacioMax, setEspacioMax] = useState(9);
    const [idSala, setIdSala] = useState(0);
    const [idExperiencia, setIdExperiencia] = useState(0);
    const [fetchFreeHoursAgain, setFetchFreeHoursAgain] = useState(false);

    const [freeHours, setFreeHours] = useState([]);
    const [cuposArray, setCuposArray] = useState(new Array(25).fill(0));
    const [competidoresArray, setCompetidoresArray] = useState(
        new Array(25).fill(0)
    );

    useEffect(() => {
        if (getFromSessionStorage("reservType") == "sala") {
            setIdSala(getFromSessionStorage("idSala"));
        } else {
            setIdExperiencia(getFromSessionStorage("idExperiencia"));
        }
    }, []);

    useEffect(() => {
        const fetchFreeHours = () => {
            console.log("Haciendo fetch de horas");
            const date = new Date(getFromSessionStorage("fecha"));
            post("salas/horasLibres", {
                idSala: getFromSessionStorage("idSala"),
                fecha: date.toISOString(),
                personas: getFromSessionStorage("personas"),
            }).then((response) => {
                setFreeHours(response.map((hora) => hora.hora));

                const newCuposArray = new Array(25).fill(0);
                const newCompetidoresArray = new Array(25).fill(0);

                response.forEach((hora) => {
                    newCuposArray[hora.hora] = hora.cupos;
                    newCompetidoresArray[hora.hora] = hora.competidores;
                });

                setCuposArray(newCuposArray);
                setCompetidoresArray(newCompetidoresArray);
            });
        };

        fetchFreeHours();
    }, [fetchFreeHoursAgain]);

    useEffect(() => {
        if (idExperiencia != 0) {
            get(`experiencias/${idExperiencia}`)
                .then((result) => {
                    saveToSessionStorage("idSala", result[0].idSala);
                    setIdSala(result[0].idSala);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        }

        if (idSala) {
            get(`mesas/${idSala}`)
                .then((result) => {
                    const maxCupos = result.maxCupos;
                    setEspacioMax(maxCupos);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        }
    }, [idSala, idExperiencia]);

    useEffect(() => {
        if (
            !getFromSessionStorage("fecha") ||
            !getFromSessionStorage("horaInicio") ||
            !getFromSessionStorage("duration")
        ) {
            setIsNextButtonDisabled(true);
        } else {
            setIsNextButtonDisabled(false);
        }
    }, [update]);

    return (
        <div>
            {existsInSessionStorage("nombreReservacionAdmin") ? (
                <NavBarAdmin />
            ) : (
                <NavBar view="soloPerfil" autoHide={false} />
            )}
            <div className="outer-container">
                {/* <GlassCard className="menu-lateral">
                    <p>menu</p>
                </GlassCard> */}
                <div className="container">
                    {/* Contenedor principal */}

                    <div className="card-container">
                        {/* Sección de la izquierda */}

                        {/* Nombre de la sala */}
                        <TextoNombreSala />
                        <Slider
                            minimo={1}
                            maximo={espacioMax}
                            fetchFreeHoursAgain={fetchFreeHoursAgain}
                            setFetchFreeHoursAgain={setFetchFreeHoursAgain}
                        />
                        <div className="model">
                            <GLBModelViewer modelPath="/office-opt-compressed.glb" />
                            {/*<img src={imagePlaceholder}></img>*/}
                            {/* Placeholder del modelo 3D */}
                        </div>
                    </div>
                    <div className="form-container">
                        {/* Sección de la derecha */}
                        <PrimerRecordatorio
                            data-cy="primer-recordatorio-sala"
                            isOpen={isFirstReminderOpen}
                            size="2xl"
                            onClose={() => {
                                setIsFirstReminderOpen(false);
                            }}
                            onOk={() => {
                                setIsFirstReminderOpen(false);
                                navigate("/reservacion/material");
                            }}
                        />
                        <FechaFormulario
                            update={update}
                            setUpdate={setUpdate}
                            fetchFreeHoursAgain={fetchFreeHoursAgain}
                            setFetchFreeHoursAgain={setFetchFreeHoursAgain}
                            freeHours={freeHours}
                        />
                        <TextoFecha update={update} />
                        <div className="button-container">
                            <RoundedButton
                                onClick={() => {
                                    setIsFirstReminderOpen(true);
                                }}
                                text="ACEPTAR"
                                disabled={isNextButtonDisabled}
                                className="mb-3"
                            />
                        </div>
                        <InfoReservCard
                            cuposArray={cuposArray}
                            competidoresArray={competidoresArray}
                            update={update}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectorSala;
