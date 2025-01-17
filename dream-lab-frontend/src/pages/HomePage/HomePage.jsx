import { useState, useEffect, useRef } from "react";
import ImageSlider from "./components/ImageSlider/ImageSlider.jsx";
import SpeechBotCard from "./components/SpeechBotCard/SpeechBotCard.jsx";
import RecommendationsCarousel from "./components/RecommendationsCarousel/RecommendationsCarousel.jsx";
import RecomendacionesInvalidas from "./components/RecomendacionesInvalidas/RecomendacionesInvalidas.jsx";
import ResultadosBusqueda from "./components/ResultadosBusqueda/ResultadosBusqueda.jsx";
import Navbar from "src/GlobalComponents/NavBar/NavBar.jsx";
import "./HomePage.css";
import { multiClearSessionStorage } from "src/utils/Storage.js";

import { get, API_URL } from "src/utils/ApiRequests.js";
import Detalles from "./components/Detalles/Detalles.jsx";

import LoadingScreen from "src/GlobalComponents/LoadingScreen/LoadingScreen.jsx";

const OPTIONS = { dragFree: true, loop: true, startIndex: 0 };

// Imagenes
import blobLeft from "src/assets/HomePage/blob-left.webp";
import smallBlob from "src/assets/HomePage/small-blob.webp";
import blobRight from "src/assets/HomePage/blob-right.webp";
import { useSelector } from "react-redux";
import { selectRol } from "../../redux/Slices/userSlice.js";

const initialData = [
	{
		bgColor: "#F54748",
		id: 1,
		img: "https://img.freepik.com/fotos-premium/holograma-circuito-chip-brillante-creativo-sobre-fondo-oscuro-cpu-lugar-simulado-concepto-metaverso-representacion-3d_670147-4751.jpg",
		title: "Lorem Ipsum",
		desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
	},
	{
		bgColor: "#7952B3",
		id: 1,
		img: "https://t3.ftcdn.net/jpg/01/38/61/48/360_F_138614801_Xx5aDLUQKTXkEqVl8IBoJInJEGvqmxh9.jpg",
		title: "Lorem Ipsum",
		desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
	},
	{
		bgColor: "#1597BB",
		id: 1,
		img: "https://img.freepik.com/fotos-premium/conexion-gafas-vr-tecnologia-linea-metaverse_10221-14040.jpg",
		title: "Lorem Ipsum",
		desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
	},
];

function HomePage() {
	const [processedTranscript, setProcessedTranscript] = useState("");
	const [data, setData] = useState(initialData);
	const [showRecommendations, setShowRecommendations] = useState(false);
	const [showInvalidNotice, setShowInvalidNotice] = useState(false);

    const [detallesVisible, setDetallesVisible] = useState(false);
    const [imageID, setImageID] = useState(null); // Nuevo estado para imageID
    const detallesRef = useRef(null);
    const [detallesBD, setDetallesBD] = useState(null);
    const [salasBD, setSalasBD] = useState(null);
    const [idSalasBloqueadas, setIdSalasBloqueadas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSalaClicked, setIsSalaClicked] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isContentVisible, setIsContentVisible] = useState(true); // Visibilidad de página al hacer una búsqueda
    const isMobile = window.innerWidth <= 480;
    const rol = useSelector(selectRol);


	// Función para mostrar Detalles
	const mostrarDetalles = () => {
		setDetallesVisible(true);
	};

	const handleCloseDetalles = () => {
		setDetallesVisible(false);
	};

	// Manejador de eventos para detectar clics fuera de Detalles
	const handleClickOutsideDetalles = (event) => {
		// Si el apartado de detalles existe && el lugar donde se presionó no está conteindo en detalles = oculta detalles
		if (detallesRef.current && !detallesRef.current.contains(event.target)) {
			setDetallesVisible(false);
		}
	};

	const handleImageClick = (imageId) => {
		setImageID(imageId); // Actualiza el imageID cuando se hace clic en una imagen
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideDetalles);
		return () => {
			document.removeEventListener("mousedown", handleClickOutsideDetalles);
		};
	}, [detallesRef]);

	useEffect(() => {
		if (processedTranscript) {
			setShowInvalidNotice(false);
			setShowRecommendations(false);
			const fetchData = async () => {
				const newData = await Promise.all(
					processedTranscript.map(async (item) => {
						const type = item.type;
						const id = item.id;

						if (type === "error" || type === "Error" || id === 0) {
							setShowInvalidNotice(true);
							return;
						}

						try {
							let result;
							if (
								type === "experiencias" ||
								type === "Experiencias" ||
								type === "experiencia" ||
								type === "Experiencia"
							) {
								result = await fetch(`${API_URL}experiencias/` + id);
							} else if (
								type === "salas" ||
								type === "Salas" ||
								type === "sala" ||
								type === "Sala"
							) {
								result = await fetch(`${API_URL}salas/` + id);
							}

							if (result.ok) {
								const data = await result.json();
								if (
									type === "experiencias" ||
									type === "Experiencias" ||
									type === "experiencia" ||
									type === "Experiencia"
								) {
									return {
										...item,
										id: id,
										isExperiencia: true,
										idSala: data[0].idSala,
										img: data[0].portadaURL,
										title: data[0].nombre,
										desc: data[0].descripcion,
									};
								} else {
									return {
										...item,
										id: id,
										isExperiencia: false,
										idSala: data[0].idSala,
										img: data[0].fotoURL,
										title: data[0].nombre,
										desc: data[0].descripcion,
									};
								}
							} else {
								console.error("Error fetching ${type} with id ${id}");
								return item;
							}
						} catch (error) {
							console.error("Error fetching ${type} with id ${id}:", error);
							return item;
						}
					})
				);

				if (!showInvalidNotice) {
					setData(newData);
					setShowRecommendations(true);
				}
			};

			fetchData();
		}
	}, [processedTranscript, showInvalidNotice]);

	const handleProcessedText = (processedText) => {
		setProcessedTranscript(processedText);
	};

	useEffect(() => {
		multiClearSessionStorage([
			"horaInicio",
			"horaInicioIsoString",
			"duration",
			"fecha",
			"fechaIsoString",
			"personas",
			"experiencia",
			"sala",
			"idExperiencia",
			"idSala",
			"reservType",
			"materials",
			"competidores",
			"cupos",
			"formattedDate",
			"formattedTime",
			"horaCorte",
			"nameSalaExperiencia",
		]);
	}, []);

	useEffect(() => {
		get(
			"experiencias",
			() => setIsLoading(false),
			() => setIsLoading(false)
		)
			.then((result) => {
				setDetallesBD(result);
			})
			.catch((error) => {
				console.error("An error occurred:", error);
			});

        get(
            "salas",
            () => setIsLoading(false),
            () => setIsLoading(false)
        )
            .then((result) => {
                setSalasBD(result);

                // Filtrar las salas bloqueadas y obtener sus idSala
                const bloqueadas = result.filter(sala => sala.bloqueada === true).map(sala => sala.idSala);
                setIdSalasBloqueadas(bloqueadas);
                console.log("salas bloqueadas: ", bloqueadas);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }, []);

	const handleSearch = (term) => {
		setSearchTerm(term);
		if (term === "") {
			setSearchResults([]);
			setIsContentVisible(true);
		} else {
			setIsContentVisible(false);
			const lowercasedTerm = term.toLowerCase();
			const filteredSalas = salasBD.filter((sala) =>
				sala.nombre.toLowerCase().includes(lowercasedTerm)
			);
			const filteredExperiencias = detallesBD.filter((exp) =>
				exp.nombre.toLowerCase().includes(lowercasedTerm)
			);
			setSearchResults([...filteredSalas, ...filteredExperiencias]);
		}
	};

	if (isLoading) {
		return <LoadingScreen isLoading={isLoading} />;
	}

	return (
		<div className="homepage">
			{rol === "Regular" ? (
				<Navbar
					view="homeAlumno"
					autoHide={!detallesVisible}
					onSearchInputChange={handleSearch}
				/>
			) : (
				<Navbar
					view="homeProfesor"
					autoHide={!detallesVisible}
					onSearchInputChange={handleSearch}
				/>
			)}
			{/* Use the Navbar component */}
			<div className="background-container">
				<div className="home-background-image-container">
					<div className="left-blobs-container">
						<img src={blobLeft} alt="Left Image" className="left-image" />
						<img src={smallBlob} alt="Mini blob" className="mini-blob" />
					</div>
					<img src={blobRight} alt="Right Image" className="right-image" />
				</div>
			</div>
			<div
				className={`page-content ${
					isMobile && searchTerm ? "mobile-search-active" : ""
				}`}
			>
				<div ref={detallesRef}>
					{detallesVisible && (
						<Detalles
							nombre={
								isSalaClicked
									? salasBD[imageID]?.nombre || "Experiencia D.R.E.A.M. Lab"
									: detallesBD[imageID]?.nombre || "Experiencia D.R.E.A.M. Lab"
							}
							descripcion={
								isSalaClicked
									? salasBD[imageID]?.descripcion ||
                                        "Lamentamos la falta de detalles..."
									: detallesBD[imageID]?.descripcion ||
                                        "Lamentamos la falta de detalles..."
							}
							autodirigido={
								isSalaClicked
									? salasBD[imageID]?.esAutoDirigida || false
									: detallesBD[imageID]?.esAutoDirigida || false
							}
							exclusivoUF={
								isSalaClicked
									? salasBD[imageID]?.esExclusivaUF || false
									: detallesBD[imageID]?.esExclusivaUF || false
							}
							imagenExp={
								isSalaClicked
									? salasBD[imageID]?.detallesURL || 
                                        "https://dreamlabstorage.blob.core.windows.net/archivos/error.webp"
									: salasBD[detallesBD[imageID].idSala - 1]?.detallesURL ||
                                        "https://dreamlabstorage.blob.core.windows.net/archivos/error.webp"
							}
							handleClose={handleCloseDetalles}
							imageID={imageID}
							idSalaProp={imageID + 1}
						/>
					)}
				</div>
				{!searchTerm && (
					<>
						<SpeechBotCard
							height="25rem"
							onProcessedText={handleProcessedText}
						/>
						{showInvalidNotice ? (
							<RecomendacionesInvalidas />
						) : (
							showRecommendations && (
								<RecommendationsCarousel
									data={data}
									activeSlide={parseInt(Math.floor(data.length / 2))}
								/>
							)
						)}
						<div className="carousel-container">
							<h1>RECOMENDACIONES</h1>
							<ImageSlider
								api_url={"reservaciones/recomendaciones"}
								request_type="POST"
								options={OPTIONS}
								mostrarDetalles={mostrarDetalles}
								onImageClick={handleImageClick}
								setIsSalaClicked={setIsSalaClicked}
								setImageType="ambas"
                                salasBloqueadas={idSalasBloqueadas}
							/>
						</div>
						<div className="carousel-container">
							<>
								<h1>SALAS</h1>
								<ImageSlider
									api_url="salas"
									request_type="GET"
									images={null}
									titles={null}
									options={OPTIONS}
									mostrarDetalles={mostrarDetalles}
									onImageClick={handleImageClick}
									setIsSalaClicked={setIsSalaClicked}
									setImageType="salas"
                                    salasBloqueadas={idSalasBloqueadas}
								/>
							</>
						</div>
						<div className="carousel-container">
							<>
								<h1>PRÁCTICAS AUTODIRIGIDAS</h1>
								<ImageSlider
									api_url="experiencias/autodirigidas"
									request_type="GET"
									images={null}
									titles={null}
									options={OPTIONS}
									mostrarDetalles={mostrarDetalles}
									onImageClick={handleImageClick}
									setIsSalaClicked={setIsSalaClicked}
									setImageType="experiencias"
                                    salasBloqueadas={idSalasBloqueadas}
								/>
							</>
						</div>
						<div className="carousel-container">
							<>
								<h1>UNIDADES DE FORMACIÓN</h1>
								<ImageSlider
									api_url="experiencias/UFs"
									request_type="POST"
									options={OPTIONS}
									mostrarDetalles={mostrarDetalles}
									onImageClick={handleImageClick}
									setIsSalaClicked={setIsSalaClicked}
									setImageType="experiencias"
                                    salasBloqueadas={idSalasBloqueadas}
								/>
							</>
						</div>
					</>
				)}
				{searchTerm && (
					<ResultadosBusqueda
						results={searchResults}
						mostrarDetalles={mostrarDetalles}
						onImageClick={handleImageClick}
						setIsSalaClicked={setIsSalaClicked}
                        salasBloqueadas={idSalasBloqueadas}
					/>
				)}
			</div>
		</div>
	);
}

export default HomePage;
