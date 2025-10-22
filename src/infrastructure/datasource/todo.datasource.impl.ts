import type { TodoDataSource } from "../../domain/datasources/todo.datasource";
import type { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import type { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoDataSourceImpl implements TodoDataSource {
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<TodoEntity[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
}
