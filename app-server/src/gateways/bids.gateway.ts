import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Bid } from 'src/bids/entities/bid.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'bids',
})
export class BidsGateway implements OnGatewayInit {
  private readonly logger = new Logger(BidsGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.on('connection', (socket) => {
      this.logger.log('New websocket connection');
      socket.on('error', (error) => {
        this.logger.error('Socket error:', error);
      });
    });
  }

  @SubscribeMessage('newBid')
  onNewBid(@MessageBody() data: Bid) {
    this.server.emit('newBid', data);
  }

  emitNewBidEvent(data: Bid) {
    this.server.emit('newBid', data);
  }
}
