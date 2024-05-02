import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "vyayrg",
    e2e: {
        baseUrl: "http://localhost:5173",
    },
    env: {
        // API_URL: 'https://dreamlab-api.azurewebsites.net/',
        API_URL: "http://localhost:3000/",
    },
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },
});
