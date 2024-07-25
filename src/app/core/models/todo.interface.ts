export interface IPaymeTodo {
  count: 8;
  next: null;
  previous: null;
  results: IPaymeTodoList[];

}
export interface IPaymeTodoList {
  completed: boolean;
  created_at: string;
  id: string;
  title: string;
  updated_at: string;
  user: number;
}
 export interface IPaymeTodoForm {
  title: string;
  completed: boolean;
  user: number;
 }
