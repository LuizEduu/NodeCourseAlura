const http = require("http");

//cria um servidor http
const server = http.createServer((request, response) => {
  response.end(
    `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Olá http server</title>
      </head>
      <body>
        <h1>Casa do código</h1>
      </body>
      </html>
    `
  );
});
server.listen(3000); //seta a porta 3000 como padrão para o server
