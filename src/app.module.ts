import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageModule } from './message/message.module';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
            clientId: 'nestjs-client',
          },
        },
      },
    ]),
    MessageModule,
  ],
  controllers: [AppController, MessageController],
  providers: [AppService, MessageService],
  exports: [ClientsModule],
})
export class AppModule { }
