const http = require('http');
const server = http.createServer( 
  (request, response) => {
    console.log(request.url);
    console.log("ji ji ji")
    response.end("Hola Mundo");
  } 
);
server.listen(3000);
console.log("Escuchando en: http://localhost:3000");
