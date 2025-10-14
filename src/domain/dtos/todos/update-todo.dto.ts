export class UpdateTodoDto {
  constructor(public readonly text?: string, public readonly completedAt?: string) {}

  static create(props: Record<string, unknown>): [string?, UpdateTodoDto?] {
    const { text, completedAt } = props;
    if (text) {
      return [, new UpdateTodoDto(text as string)];
    }
    if (completedAt) {
      if (!(completedAt instanceof Date)) {
        return ["completedAt must be a valid Date"];
      }
      const completedAtDate = completedAt as Date;
      return [, new UpdateTodoDto({ completedAt: completedAtDate.toISOString() } as unknown as string)];
    }
    return ["At least one of text or completedAt must be provided"];
  }

  getValues() {
    const returnObj: { [key: string]: string | undefined } = {};
    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;
    return returnObj;
  }
}
