import io from "socket.io-client";

const socket = io(
    `http://localhost:${process.env.VUE_APP_SOCKET_PORT || 3000}`
);

export default socket;
