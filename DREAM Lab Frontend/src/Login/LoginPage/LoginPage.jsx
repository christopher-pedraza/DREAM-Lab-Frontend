import { useNavigation, Form, useNavigate } from "react-router-dom";

import LoginTextField from "../LoginTextField/LoginTextField";
import LoginButton from "../LoginButton/LoginButton";
import LoginRow from "../LoginRow/LoginRow";

import "./LoginPage.css";

import { useState } from "react";

// Accion que maneja la logica de validar si el usuario y contraseña son válidos
// y regresar la ruta a la que se debe redirigir y un token que se guardará en
// el local storage
import { loginAction } from "../../Global/Auth";

import "../../components/general/GlassCard.css";
import GlassCard from "../../components/general/GlassCard";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Llamar a la acción de login y obtener el path al que se debe redirigir
      console.log("User:", user, "Password:", password);
      const path = await loginAction({ user, password });
      setLoading(false);
      navigate(path);
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="blobs-container">
        <img
          src="/top-blob.png"
          alt="Logo"
          className="blob-image top-left-image"
        />
        <img
          src="/bottom-blob.png"
          alt="Logo"
          className="blob-image bottom-right-image"
        />
      </div>

      <div className="glassCardContainer">
        <GlassCard classes={"glassCard"}>
          <div className="grid-container">
            <LoginRow flexDirection="col" justify="between">
              <LoginRow margin="12vh 0 0 0">
                <img
                  src="/LogoDreamLabedited.png"
                  alt="Logo"
                  className="login-logo"
                />
                <h1 className="login-dreamlab-title">DREAM LAB</h1>
              </LoginRow>
              <LoginRow margin="4vh 0 0 0">
                <h1 className="login-titulo">Inicia sesión</h1>
              </LoginRow>
            </LoginRow>
            <LoginRow flexDirection="col">
              <LoginTextField
                label={"Matrícula"}
                marginBot={"5vh"}
                value={user}
                onValueChange={setUser}
              />
              <LoginTextField
                label={"Contraseña"}
                isLogin={true}
                value={password}
                onValueChange={setPassword}
              />
            </LoginRow>
            <LoginRow margin="0 0 12vh 0">
              <LoginButton
                text="ACEPTAR"
                onClick={handleLogin}
                isLoading={isLoading}
              />
            </LoginRow>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/*
<Form
          method="post"
          className="login-form"
          replace
          onSubmit={handleLogin}
        >
          <input name="user" placeholder="Usuario" />
          <input name="password" type="password" placeholder="Contraseña" />
          <button disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? "Logging in..." : "Log in"}
          </button>
        </Form>
*/
