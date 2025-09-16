import type { Request, Response } from "express";

const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_BAD_REQUEST = 400;

const todos = [
  {
    id: 1,
    title: "Sample Todo",
    createdAt: "2024-06-01T12:00:00Z",
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

  createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Text is required" });
    }

    todos.push({
      id: todos.length + 1,
      title: text,
      createdAt: new Date().toISOString(),
    });

    res
      .status(HTTP_STATUS_CREATED)
      .json({ message: "Todo created successfully" });
  };
}
