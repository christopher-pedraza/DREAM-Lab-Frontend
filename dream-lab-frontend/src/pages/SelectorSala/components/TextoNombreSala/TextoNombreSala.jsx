import { useEffect, useState } from "react";
import { getFromSessionStorage } from "src/utils/Storage";
import { get } from "src/utils/ApiRequests";

const TextoNombreSala = () => {
    let id;
    let type = getFromSessionStorage("reservType");
    const [nombreSala, setNombreSala] = useState("");
    const [nombreExperiencia, setNombreExperiencia] = useState("");

    const bigTextFormat =
        "text-white text-3xl font-medium uppercase font-['Karla']";
    const smallTextFormat = "text-xl text-[#D1D1D1]";

    if (type == "sala") {
        id = getFromSessionStorage("idSala");
    } else {
        id = getFromSessionStorage("idExperiencia");
    }

    useEffect(() => {
        if (type === "sala") {
            get(`salas/${id}`)
                .then((result) => {
                    setNombreSala(result[0].nombre);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        } else {
            get(`experiencias/${id}`)
                .then((result) => {
                    setNombreExperiencia(result[0].nombre);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });

            get(`salas/nameFromExperienceId/${id}`)
                .then((result) => {
                    setNombreSala(result.nombre);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
        }
    }, []);

    return (
        <>
            {type === "sala" ? (
                <>
                    <div className={bigTextFormat}>
                        <h1>{nombreSala}</h1>
                    </div>
                </>
            ) : (
                <>
                    <div className={bigTextFormat}>
                        <h1>{nombreExperiencia}</h1>
                    </div>

                    <div className={smallTextFormat}>
                        <h1>{nombreSala}</h1>
                    </div>
                </>
            )}
        </>
    );
};

export default TextoNombreSala;