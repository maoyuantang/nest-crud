export class Product {
  id!: number;

  name!: string;

  description?: string;

  price!: number;

  stock!: number;

  status!: number;

  createdAt!: Date;

  updatedAt!: Date;

  deletedAt?: Date | null;
}