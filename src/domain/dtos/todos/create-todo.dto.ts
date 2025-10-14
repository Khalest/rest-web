export class CreateTodoDto {
  constructor(private readonly text: string) {}

  static create(props: Record<string, unknown>): [string?, CreateTodoDto?] {
    const { text } = props;
    if (typeof text !== "string" || text.trim().length === 0) {
      return ["Text is required and must be a non-empty string"];
    }
    return [, new CreateTodoDto(text.trim())];
  }

  toPrimitives(): { text: string } {
    return { text: this.text };
  }
}
