// 创建异常过滤器
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = '服务器内部错误';
    }

    if (
      exception instanceof Prisma.PrismaClientKnownRequestError
    ) {
      if (exception.code === 'P2002') {
        status = HttpStatus.BAD_REQUEST;
        message = '数据已存在';
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = '数据库操作失败';
      }
    }
    else if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message ||
          exception.message;
    }
    else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = '服务器内部错误';
    }

    // 统一错误响应格式
    response.status(status).json({
      code: status,
      message: message,
      data: null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
