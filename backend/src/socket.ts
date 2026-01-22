import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';

export const initSocket = (server: HTTPServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Allow client to join room (e.g., city:<city>)
    socket.on('join', (room: string) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
    });

    // Listen for subscription to leaderboard updates
    socket.on('subscribe:leaderboard', (data: { type: 'global' | 'local'; city?: string }) => {
      const room = data.type === 'global' ? 'leaderboard:global' : `leaderboard:city:${data.city}`;
      socket.join(room);
      console.log(`Socket subscribed to ${room}`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};
