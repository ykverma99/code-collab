import io from "socket.io-client";

const socketClient = io("https://code-share-five.vercel.app/");

export default socketClient;
