export const initSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join_conversation", (conversationId) => {
            socket.join(conversationId);
        });

        socket.on("send_message", (data) => {
            io.to(data.conversationId).emit("receive_message", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnect");
        });
    });
};