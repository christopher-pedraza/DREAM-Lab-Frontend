describe("Pruebas de despliegue de datos en el dashboard", () => {
    beforeEach(() => {
        // Asignar una fecha especifica para que las pruebas sean consistentes
        cy.setDate(2024, 3, 22);

        // Interceptar las llamadas a la API
        cy.intercept("GET", "dashboard/reservacionesByMes", {
            body: [
                {
                    year: 2024,
                    month: 5,
                    reservacionesTotales: 13,
                    reservacionesConfirmadas: 8,
                    reservacionesCanceladas: 6,
                    reservacionesEnEspera: 2,
                    reservacionesDenegadas: 15,
                },
                {
                    year: 2024,
                    month: 4,
                    reservacionesTotales: 7,
                    reservacionesConfirmadas: 2,
                    reservacionesCanceladas: 13,
                    reservacionesEnEspera: 4,
                    reservacionesDenegadas: 12,
                },
                {
                    year: 2024,
                    month: 3,
                    reservacionesTotales: 13,
                    reservacionesConfirmadas: 8,
                    reservacionesCanceladas: 6,
                    reservacionesEnEspera: 2,
                    reservacionesDenegadas: 15,
                },
            ],
        }).as("reservacionesByMes");

        cy.intercept("GET", "dashboard/penalizacionesByMes", {
            body: [
                {
                    year: 2024,
                    month: 4,
                    penalizaciones: 13,
                },
                {
                    year: 2024,
                    month: 3,
                    penalizaciones: 13,
                },
            ],
        }).as("penalizacionesByMes");

        cy.intercept("GET", "dashboard/usoMaterialByMes", {
            body: [
                {
                    year: 2024,
                    month: 4,
                    materiales: [
                        {
                            material: "Laptop",
                            uso: 3,
                        },
                        {
                            material: "Cable VGA",
                            uso: 7,
                        },
                        {
                            material: "Cable HDMI",
                            uso: 5,
                        },
                        {
                            material: "Cable Ethernet",
                            uso: 2,
                        },
                        {
                            material: "Proyector",
                            uso: 5,
                        },
                        {
                            material: "Monitor",
                            uso: 4,
                        },
                    ],
                },
            ],
        }).as("usoMaterialByMes");

        cy.intercept("GET", "dashboard/reservacionesBySalaByMes", {
            body: [
                {
                    year: 2024,
                    month: 4,
                    salas: [
                        {
                            name: "Electric Garage",
                            value: 5,
                        },
                    ],
                },
            ],
        }).as("reservacionBySalaByMes");

        cy.intercept("GET", "dashboard/salasDisponibles", {
            body: [
                {
                    sala: "Electric Garage",
                    bloqueada: false,
                },
                {
                    sala: "Dimension Forge",
                    bloqueada: true,
                },
            ],
        }).as("salasDisponibles");

        // Iniciar sesion con test
        cy.loginWith("test", "Admin");
        // Visitar el perfil
        cy.visit("/dashboard");
    });

    it("Despliegue de reservaciones totales", () => {
        cy.wait("@reservacionesByMes");

        // Checar el valor
        cy.getDataCyNth("graficasDashboard-statcards-container", 0)
            .findDataCy("statCard-valor")
            .contains("7");
        // Checar el porcentaje de cambio
        cy.getDataCyNth("graficasDashboard-statcards-container", 0)
            .findDataCy("statCard-cambio")
            .contains("-46.2%");
        // Checar el icono
        cy.getDataCyNth("graficasDashboard-statcards-container", 0)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_arrow_down.svg"
            );
    });

    it("Despliegue de reservaciones activas", () => {
        cy.wait("@reservacionesByMes");

        // Checar el valor
        cy.getDataCyNth("graficasDashboard-statcards-container", 1)
            .findDataCy("statCard-valor")
            .contains("2");
        // Checar el porcentaje de cambio
        cy.getDataCyNth("graficasDashboard-statcards-container", 1)
            .findDataCy("statCard-cambio")
            .contains("-75.0%");
        // Checar el icono
        cy.getDataCyNth("graficasDashboard-statcards-container", 1)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_arrow_down.svg"
            );
    });

    it("Despliegue de penalizaciones", () => {
        cy.wait("@penalizacionesByMes");

        // Checar el valor
        cy.getDataCyNth("graficasDashboard-statcards-container", 2)
            .findDataCy("statCard-valor")
            .contains("13");
        // Checar el porcentaje de cambio
        cy.getDataCyNth("graficasDashboard-statcards-container", 2)
            .findDataCy("statCard-cambio")
            .contains("0%");
        // Checar el icono
        cy.getDataCyNth("graficasDashboard-statcards-container", 2)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_no_change.svg"
            );
    });

    it("Despliegue de cancelaciones", () => {
        cy.wait("@reservacionesByMes");

        // Checar el valor
        cy.getDataCyNth("graficasDashboard-statcards-container", 3)
            .findDataCy("statCard-valor")
            .contains("13");
        // Checar el porcentaje de cambio
        cy.getDataCyNth("graficasDashboard-statcards-container", 3)
            .findDataCy("statCard-cambio")
            .contains("+116.7%");
        // Checar el icono
        cy.getDataCyNth("graficasDashboard-statcards-container", 3)
            .findDataCy("statCard-imagen")
            .hasAttribute(
                "src",
                "/src/assets/Admin/Dashboard/stat_arrow_up.svg"
            );
    });

    it("Despliegue de gráfica de pie de materiales más utilizados", () => {
        cy.wait("@usoMaterialByMes");

        // Comprobar las leyendas de la gráfica
        cy.getDataCy("gp-legend").should("exist");
        cy.containsDataCy("gp-legend", "Laptop");
        cy.containsDataCy("gp-legend", "Cable VGA");
        cy.containsDataCy("gp-legend", "Cable HDMI");
        cy.containsDataCy("gp-legend", "Proyector");
        cy.containsDataCy("gp-legend", "Monitor");
        cy.containsDataCy("gp-legend", "Otros");

        // Comprobar la gráfica de pie y el valor del contador de materiales
        cy.getDataCy("gp-chart").should("exist");
        cy.containsDataCy("gp-chart", "26");
        cy.get(".recharts-pie-sector", { force: true }).eq(4).click();
        cy.containsDataCy("gp-chart", "3");
    });

    it("Despliegue de la gráfica de línea de reservaciones por mes", () => {
        cy.wait("@reservacionesByMes");

        cy.getDataCy("gl-chart").should("exist");

        // Checar que el y-axis llegue hasta 16
        cy.getDataCy("gl-chart")
            .find(".recharts-cartesian-axis-ticks")
            .contains("16");

        // Checar que el x-axis contenga los 3 meses
        cy.getDataCy("gl-chart")
            .find(".recharts-cartesian-axis-ticks")
            .contains("Mar");
        cy.getDataCy("gl-chart")
            .find(".recharts-cartesian-axis-ticks")
            .contains("Abr");
        cy.getDataCy("gl-chart")
            .find(".recharts-cartesian-axis-ticks")
            .contains("May");
    });

    it("Despliegue de la gráfica de barras de reservaciones por sala", () => {
        cy.wait("@reservacionBySalaByMes");

        cy.getDataCy("rps-bar-list").should("exist");

        // Validar que contenga los datos correctos
        cy.containsDataCy("rps-bar-list", "Electric Garage");
        cy.containsDataCy("rps-bar-list", "5");
    });

    it("Despliegue de la disponibilidad de salas", () => {
        cy.wait("@salasDisponibles");

        cy.getDataCy("estatus-disponibilidad-sala-contenedor").should("exist");

        // Comprobar estatus valido
        cy.getDataCyNth("estatus-disponibilidad-sala-contenedor", 0)
            .findDataCy("estatus-disponibilidad-sala-icono")
            .hasAttribute("src", "/src/assets/Admin/Dashboard/green_dot.svg");
        cy.getDataCyNth("estatus-disponibilidad-sala-contenedor", 0)
            .findDataCy("estatus-disponibilidad-sala-nombre")
            .contains("Electric Garage");

        // Comprobar estatus bloqueado
        cy.getDataCyNth("estatus-disponibilidad-sala-contenedor", 1)
            .findDataCy("estatus-disponibilidad-sala-icono")
            .hasAttribute("src", "/src/assets/Admin/Dashboard/gray_dot.svg");
        cy.getDataCyNth("estatus-disponibilidad-sala-contenedor", 1)
            .findDataCy("estatus-disponibilidad-sala-nombre")
            .contains("Dimension Forge");
    });

    it("Selector de fecha", () => {
        // Comprobar que este seleccionada la fecha actual
        cy.containsDataCy("sfd-boton-calendario-label", "abril 24");
        // Abrir el selector de fecha
        cy.clickDataCy("sfd-boton-calendario");
        // Abrir selector de año
        cy.get(".MuiButtonBase-root").eq(0).click();
        // Seleccionar 2021
        cy.get(".MuiPickersYear-yearButton").eq(121).click();
        // Seleccionar mayo
        cy.get(".MuiMonthCalendar-root")
            .children()
            .eq(4)
            .children()
            .eq(0)
            .click();
        // Comprobar que la fecha seleccionada sea mayo 21
        cy.containsDataCy("sfd-boton-calendario-label", "mayo 21");
    });
});
