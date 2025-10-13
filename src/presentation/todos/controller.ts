import type { Request, Response } from "express";
import { prisma } from "../../data/postgres";

const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_BAD_REQUEST = 400;

const todos = [
  {
    id: 1,
    text: "Sample Todo",
    completedAt: "2024-06-01T12:00:00Z",
  },
];

export class TodosController {
  // Dependency injections would go here
  // constructor() {}

  getTodos = (_req: Request, res: Response) => {
    return res.json(todos);
  };

  getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === Number(id));
    if (!todo) {
      return res
        .status(HTTP_STATUS_NOT_FOUND)
        .json({ message: "Todo not found" });
    }
    return res.status(HTTP_STATUS_OK).json(todo);
  };

  createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Text is required" });

    const todo = await prisma.todo.create({
      data: { text },
    });

    res.status(HTTP_STATUS_CREATED).json(todo);
  };

  updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    const todoIndex = todos.findIndex((t) => t.id === Number(id));
    if (todoIndex === -1) {
      return res
        .status(HTTP_STATUS_NOT_FOUND)
        .json({ message: "Todo not found" });
    }
    if (!text) {
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Text is required" });
    }
    const todo = todos[todoIndex];
    if (todo) {
      todo.text = text;
      return res.status(HTTP_STATUS_OK).json(todo);
    }
    return res
      .status(HTTP_STATUS_NOT_FOUND)
      .json({ message: "Todo not found" });
  };

  deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === Number(id));
    if (todoIndex === -1) {
      return res
        .status(HTTP_STATUS_NOT_FOUND)
        .json({ message: "Todo not found" });
    }
    const todo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    return res.status(HTTP_STATUS_OK).json({ todo, message: "Todo deleted" });
  };
}
