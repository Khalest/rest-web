import { prisma } from "../../data/postgres";
import type { TodoDataSource } from "../../domain/datasources/todo.datasource";
import type { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const data = createTodoDto.toPrimitives();
    const todo = await prisma.todo.create({
      data,
    });

    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.findById(updateTodoDto.id);
    const values = updateTodoDto.getValues();

    // Normalize and remove undefined values; convert completedAt (ISO string) to Date
    const data: { text?: string; completedAt?: Date | null } = {};
    if (values.text !== undefined) {
      data.text = values.text;
    }
    if (values.completedAt !== undefined && values.completedAt !== "") {
      data.completedAt = new Date(values.completedAt);
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todo.id,
      },
      data,
    });
    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const deleted = await prisma.todo.delete({
      where: { id },
    });
    return TodoEntity.fromObject(deleted);
  }
}
