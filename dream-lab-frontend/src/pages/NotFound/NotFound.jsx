
import lostImage from "src/assets/NotFound/lost.png"
import "./NotFound.css"

function LandingPage() {
    return (

        <div className="div-exterior-not-found-error">

            <div className="background-image-container-not-found">
            </div>

            <div className="textos-not-found-error-div">
                <h1 className="título-not-found-error" data-cy="titulo-pagina-no-encontrada">404 - Página no encontrada</h1>
                <h2 className="subtitulo-not-found-error" data-cy="subtitulo-pagina-no-encontrada">
                    Lo sentimos, la página que estás buscando no existe o no se encuentra disponible en este momento.{" "}
                </h2>
                <div className="linea-not-found-error"></div>

                <div className="seccion-final-not-found-error-div">
                    <h3 className="subtitulo-2-not-found-error" data-cy="subtitulo-2-pagina-no-encontrada">
                        Por favor, verifica la URL e intenta nuevamente. <br></br>Si el
                        problema persiste, acude al D.R.E.A.M. Lab por ayuda.
                    </h3>
                </div>
                
            </div>
            <div className="not-found-error-image">
                <img src={lostImage} alt="Página no encontrada" />
            </div>
            
        </div>
    );
}

export default LandingPage;
