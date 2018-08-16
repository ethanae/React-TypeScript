import Server from "./Server";

const PORT = process.env.PORT || 3000;

Server.listen(PORT, () => {
  console.log('listening on port', PORT);
});