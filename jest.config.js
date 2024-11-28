module.exports = {
  // Configuración para cargar el archivo .env antes de las pruebas
  globalSetup: "./jest.globalSetup.js",
  setupFiles: ["dotenv/config"], // Esto carga el archivo .env automáticamente
};
