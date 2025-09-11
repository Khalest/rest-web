import type { Request, Response } from "express";

const todos = [
  {
    id: 1,
    title: "Sample Todo",
    createdAt: "2024-06-01T12:00:00Z",
  },
];

export class TodosController {
  // Dependency injections would go here
  constructor() {}

  getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === Number(id));
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json(todo);
  };
}
