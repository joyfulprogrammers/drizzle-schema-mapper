export interface WriterInterface {
  write: (message: string) => void;
}

export interface WriterFactory {
  create: (path: string) => WriterInterface;
}
