// 在属性后加 !（非空断言，最常用，推荐）
// 这个操作符的意思是：“我（开发者）向 TypeScript 保证，这个属性在使用时一定会有值，即使现在没有初始化。”

//  为什么 DTO 和 Entity 会有这个报错？
// Entity 也是同样的道理，它描述的是数据模型，实际的值由 Service 层创建对象时赋予。
// 关键理解：这些类不会用 new CreateUserDto() 去创建实例，而是由框架在运行时动态赋值。所以我们可以告诉 TypeScript：“别担心，这些属性在运行时会有的。”


export class User {
  id!: number;   // 加上 !
  name!: string; // 加上 !
  email!: string;// 加上 !
}