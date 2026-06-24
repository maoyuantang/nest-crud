import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ErrorCode } from '../constants/error-code';
import { BusinessException } from '../exceptions/business.exception';
import { PrismaErrorMap } from '../constants/prisma-error-map';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let code = ErrorCode.SERVER_ERROR;

    let message = '服务器内部错误';

    /**
     * 业务异常
     */
    if (exception instanceof BusinessException) {
      status = exception.getStatus();

      const res = exception.getResponse() as any;

      code = res.code;

      message = res.message;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;

      const prismaError = PrismaErrorMap[exception.code];

      if (prismaError) {
        code = prismaError.code;
        message = prismaError.message;
      } else {
        code = ErrorCode.DATABASE_ERROR;
        message = '数据库操作失败';
      }
    } else if (exception instanceof HttpException) {
      /**
       * Nest异常
       */
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse() as any;

      code = ErrorCode.BAD_REQUEST;

      message = exceptionResponse?.message || exception.message;
    }

    response.status(status).json({
      code,
      message,
      data: null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
