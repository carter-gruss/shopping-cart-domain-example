import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateProduceDto {
  @IsString()
  readonly name!: string;

  @IsNumber()
  readonly weightInPounds!: number;

  @IsNotEmpty()
  @IsString()
  readonly produceType!: string;
}
