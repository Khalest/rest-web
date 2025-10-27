export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null,
  ) {}

  get isCompleted(): boolean {
    return !!this.completedAt;
  }

  static fromObject(object: Record<string, any>): TodoEntity {
    const { id, text, completedAt } = object;
    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw new Error("Invalid date");
      }
    }
    return new TodoEntity(id, text, newCompletedAt);
  }
}
