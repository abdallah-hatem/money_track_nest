import {
  IsString,
  IsNumber,
  IsEnum,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsEnum(['income', 'expense'])
  type: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  description: string;

  @IsString()
  email: string; // Simplification: use email to identify user
}

export class TransactionShortcutDto {
  @IsNumber()
  amount: number;

  @IsEnum(['income', 'expense'])
  type: string;

  @IsString()
  description: string;

  @IsString()
  email: string;
}

export class ParseTextDto {
  @IsString()
  text: string;

  @IsString()
  email: string;
}
