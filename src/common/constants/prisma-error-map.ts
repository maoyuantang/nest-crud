import { ErrorCode } from './error-code';

export const PrismaErrorMap: Record<
  string,
  {
    code: ErrorCode;
    message: string;
  }
> = {
  P2002: {
    code: ErrorCode.UNIQUE_CONSTRAINT_ERROR,
    message: '数据已存在',
  },

  P2003: {
    code: ErrorCode.FOREIGN_KEY_ERROR,
    message: '关联数据不存在',
  },

  P2025: {
    code: ErrorCode.RECORD_NOT_FOUND,
    message: '数据不存在',
  },
};
