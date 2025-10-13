import type { Request, Response } from "express";
import { prisma } from "../../data/postgres";

const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_BAD_REQUEST = 400;

export class TodosController {
  // Dependency injections would go here
  // constructor() {}

  getTodos = async (_req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id)
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Id is required" });

    const todo = await prisma.todo.findFirst({ where: { id: Number(id) } });
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
