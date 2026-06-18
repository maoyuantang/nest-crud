// 在属性后加 !（非空断言，最常用，推荐）
// 这个操作符的意思是：“我（开发者）向 TypeScript 保证，这个属性在使用时一定会有值，即使现在没有初始化。”


//  为什么 DTO 和 Entity 会有这个报错？
// DTO (Data Transfer Object) 是用来传输数据的。它本身不负责创建对象，只是描述“数据长什么样”。它的属性值是在运行时由 NestJS 的 @Body() 装饰器自动填充的。TypeScript 在编译时不知道这个填充过程，所以会报警告。
export class CreateUserDto {
  name!: string;
  email!: string;
}