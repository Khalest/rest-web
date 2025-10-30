import type { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import type { TodoRepository } from "../../domain/repositories/todo.repository";

const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

export class TodosController {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  getTodos = async (_req: Request, res: Response): Promise<Response> => {
    const todos = await this.todoRepository.getAll();
    return res.status(HTTP_STATUS_OK).json(todos);
  };

  getTodoById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const todo = await this.todoRepository.findById(Number(id));
      if (!todo) {
        return res
          .status(HTTP_STATUS_NOT_FOUND)
          .json({ message: "Todo not found" });
      }
      return res.status(HTTP_STATUS_OK).json(todo);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      return res
        .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: "An unexpected error occurred" });
    }
  };

  createTodo = async (req: Request, res: Response): Promise<Response> => {
    const [error, todoDto] = CreateTodoDto.create(req.body);
    if (error) {
      return res.status(HTTP_STATUS_BAD_REQUEST).json({ message: error });
    }
    if (!todoDto) {
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Invalid todo data" });
    }
    const todo = await this.todoRepository.create(todoDto);
    return res.status(HTTP_STATUS_CREATED).json(todo);
  };

  updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    // const todoIndex = todos.findIndex((t) => t.id === Number(id));
    const todo = await prisma.todo.findFirst({
      where: { id: Number(id) },
    });
    if (!text) {
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Text is required" });
    }

    if (todo) {
      todo.text = text;
      return res.status(HTTP_STATUS_OK).json(todo);
    }
    return res
      .status(HTTP_STATUS_NOT_FOUND)
      .json({ message: "Todo not found" });
  };

  deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await prisma.todo.findFirst({
      where: { id: Number(id) },
    });
    if (!todo) {
      return res
        .status(HTTP_STATUS_NOT_FOUND)
        .json({ message: "Todo not found" });
    }
    await prisma.todo.delete({ where: { id: Number(id) } });
    return res.status(HTTP_STATUS_OK).json({ todo, message: "Todo deleted" });
  };
}
