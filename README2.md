# 项目分层架构 (Layered Architecture)

本项目采用标准的 **Controller-Service-Entity** 三层架构，旨在实现**关注点分离**和高**可维护性**。

## 各层级职责说明

| 层级 | 文件 | 核心职责 | 前端类比 (便于理解) |
| :--- | :--- | :--- | :--- |
| **路由层 (Controller)** | `*.controller.ts` | 仅负责接收客户端请求，调用 Service 层，并返回响应结果。 | 类比 Vue Router 的 `routes` 配置及页面组件。 |
| **业务逻辑层 (Service)** | `*.service.ts` | 专注于处理核心业务逻辑，如数据增删改查、计算、校验等。 | 类比 Vue 的 `composables` 或 Pinia 的 `actions`。 |
| **数据层 (Model)** | `*.entity.ts` | 定义数据结构的形状（Schema），映射到数据库表或内存对象。 | 类比 TypeScript 的 `interface` 或 `type`。 |
| **数据传输对象 (DTO)** | `*.dto.ts` | 定义客户端请求参数的结构，用于数据验证和类型安全。 | 类比前端 `Zod` 或 `Yup` 的校验规则 (Schema)。 |

## 分层带来的核心优势

1.  **高扩展性**：若需从“内存数组存储”切换至“Prisma + SQLite”，**只需修改 `Service` 层**，`Controller` 和 `DTO` 无需变动。
2.  **易于测试**：各层职责单一，可对 `Service` 业务逻辑和 `Controller` 接口进行独立单元测试。
3.  **维护成本低**：代码结构清晰，新成员能快速定位功能所在的层级。