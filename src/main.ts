import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);// 获取配置服务  
  const port = configService.get<number>('PORT', 3000);// 读取 PORT 变量，默认 3000

  // 全局参数校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动剔除 DTO 中未定义的字段
      forbidNonWhitelisted: true, // 如果传入了未定义字段，直接报错
      transform: true, // 自动转换类型（如将字符串转为数字）
    }),
  );
  // 全局注册统一异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port);
  console.log(`🚀 应用正在运行: http://localhost:${port}`);
}
bootstrap();