
import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty({ message: 'You should input [topic] field!' })
    topic: string;

    @IsNotEmpty({ message: 'You should input [message] field!' })
    message: string;
}
