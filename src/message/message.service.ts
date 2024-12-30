import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class MessageService {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) { }


  async create(createMessageDto: CreateMessageDto) {
    const kafka = await this.kafkaClient.connect();
    console.log('KAFKA STATUS : ', kafka);
    this.kafkaClient.emit(createMessageDto.topic, {
      message: createMessageDto.message,
    });
    return {
      status: 'MESSAGE SENT TO KAFKA',
      data: createMessageDto,
    }
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
