import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  const kafkaMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
        clientId: 'nestjs-client',
      },
      consumer: {
        groupId: 'nestjs-producer-group',
        sessionTimeout: 30000,
        heartbeatInterval: 10000,
      },
    },
  });

  try {
    app.enableCors({
      origin: '*', // อนุญาตทุก Origin (ควรระวังใน Production)
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    });

    await app.startAllMicroservices();
    await app.listen(process.env.PORT);
    console.log('APP IS RUNNING ON PORT :', process.env.PORT);
    console.log('KAFKA_EXTERNAL_PORT', process.env.KAFKA_EXTERNAL_PORT);


    const kafkaClient = app.get('KAFKA_SERVICE');
    kafkaClient.emit('my-topic', { message: 'Hello from Producer!' });
  } catch (error) {
    console.error('Error starting microservices', error);
  }
}
bootstrap();
