import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'], // แก้ไขเป็น Broker URL ที่คุณใช้
            clientId: 'nestjs-client', // ระบุ Client ID
          },
        },
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule { }
