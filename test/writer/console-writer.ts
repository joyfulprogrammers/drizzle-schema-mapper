import { type Writer } from "../../src/writer/writer";

export class ConsoleWriter implements Writer {
  result?: string;

  write(message: string): void {
    this.result = message;
  }
}
