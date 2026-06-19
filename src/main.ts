import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 启用全局参数校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动剔除 DTO 中未定义的字段
      forbidNonWhitelisted: true, // 如果传入了未定义字段，直接报错
      transform: true, // 自动转换类型（如将字符串转为数字）
    }),
  );

  await app.listen(3000);
}
bootstrap();
