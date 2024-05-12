import { TodoInput } from "../entities/Todo";

export default interface IRepository<T> {
  save(input: TodoInput): T;
  list(): void;
}
