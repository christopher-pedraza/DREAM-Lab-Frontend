describe("Despliegue adecuado del componente 'Slider'.", () => {
    beforeEach(() => {
      
        cy.visit("/login");
        
        // Iniciar sesión
        cy.loginWith("test");

        cy.intercept("GET", "mesas/2", {
          body: {
              maxCupos: 8,
          },
      }).as("getMaxCupos");

    });

    it("Funcionamiento adecuado del slider", () => {

      cy.visit("/reservacion/sala", {
        onBeforeLoad(win) {
            win.sessionStorage.setItem("reservType", "sala");
            win.sessionStorage.setItem("idSala", 2);
          },
      });
        
      cy.wait("@getMaxCupos");
      
        // Verificar que el slider de personas está presente
        cy.checkExist("slider-container-personas");

        // Checar el valor máximo del slider
        cy.get('[data-cy="slider-container-personas"] input[type="range"]')
            .invoke("attr", "max")
            .should("equal", "8");

        // Mover el slider a la derecha
        cy.get('[data-cy="slider-container-personas"] input[type="range"]', {
            timeout: 10000,
        })
            .type("val", "5")
            .trigger("input");

        // Checar si el output del slider es igual a "4 personas"
        cy.containsDataCy("slider-output-texto", " 5 personas ");
    });
});