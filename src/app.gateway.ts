import { OnGatewayConnection, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { OnGatewayDisconnect } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()

export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized !')
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected : ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected : ${client.id}`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.wss.emit('msgToClient', text);
    // return { event: 'msgToClient', data: text };
  }

}



