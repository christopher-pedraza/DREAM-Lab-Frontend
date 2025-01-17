describe("Pruebas de login", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("Dejar todos los campos en blanco", () => {
        cy.clickDataCy("login-button");
        cy.containsDataCy("login-error", "Introduce un usuario");
    });

    it("Dejar el campo de usuario en blanco", () => {
        cy.typeDataCy("login-password", "test");
        cy.clickDataCy("login-button");
        cy.containsDataCy("login-error", "Introduce un usuario");
    });

    it("Dejar el campo de contraseña en blanco", () => {
        cy.typeDataCy("login-user", "test");
        cy.clickDataCy("login-button");
        cy.containsDataCy("login-error", "Introduce una contraseña");
    });

    it("Modificar visibilidad de contraseña", () => {
        cy.typeDataCy("login-user", "test");
        cy.typeDataCy("login-password", "test");
        cy.clickDataCy("login-password-visibility");
        cy.isTypeDataCy("login-password", "text");
        cy.clickDataCy("login-password-visibility");
        cy.isTypeDataCy("login-password", "password");
    });

    it("Usuario y contraseña incorrectos", () => {
        cy.typeDataCy("login-user", "usuario");
        cy.typeDataCy("login-password", "contraseña");
        cy.intercept("POST", "auth/usuario", {
            body: {
                jwt: "",
            },
        }).as("authUsuario");
        cy.clickDataCy("login-button");
        cy.wait("@authUsuario");
        cy.containsDataCy("login-error", "Usuario o contraseña incorrectos");
    });

    it("Usuario y contraseña correctos", () => {
        cy.intercept("POST", "auth/usuario", {
            body: {
                jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiQTAxMTc3NzY3IiwiaWF0IjoxNzEyNjMzMjU2fQ.-ky8LBLfLFCRmENvP0QetksCFuN9D5R0OGC9NiN2WD0",
                rol: "Regular",
            },
        }).as("authUsuario");
        const datosUsuario = {
            idUsuario: "test",
            nombre: "Test",
            apellidoP: "Test",
            apellidoM: "Test",
            tipo: "Regular",
            prioridad: 362,
            logroPrincipal: 1,
            colorPreferido: "#78C2F8",
        };

        cy.intercept("POST", "auth/token", {
            body: {
                isAuth: "true",
                token_data: { datosUsuario: JSON.stringify(datosUsuario) },
            },
        }).as("authToken");

        cy.typeDataCy("login-user", "test");
        cy.typeDataCy("login-password", "test");
        cy.clickDataCy("login-button");
        cy.wait(["@authUsuario", "@authToken"]);
        cy.containsDataCy("navbar", "DREAM LAB", 10000);
    });
});
