import { post } from "./Database";

import { saveToLocalStorage } from "./Storage";

// Función para validar las credenciales del usuario y redirigir a la página
export async function loginAction({ formData }) {
  const user = formData.get("user");
  const password = formData.get("password");
  // Llamar a la API para validar las credenciales
  return post("authUsuario", {
    usuario: user,
    contrasena: password,
  })
    .then((response) => {
      // De la API se recibe un jwt (JSON Web Token)
      const jwt = response.jwt;
      // Guardar el token y el usuario en el local storage
      saveToLocalStorage("token", jwt);
      saveToLocalStorage("user", user);
      // Regresar la dirección a la que se debe redirigir
      return "/home";
    })
    .catch(() => {
      // Si las credenciales no son válidas, regresar a la página de login
      return "/login";
    });
}