import { type WriterInterface } from "../../src/types/writer.interface";

export class StubWriter implements WriterInterface {
  result?: string;

  write(message: string): void {
    this.result = message;
  }

  clear(): void {
    this.result = undefined;
  }
}
