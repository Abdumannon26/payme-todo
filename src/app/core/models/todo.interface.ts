export interface ITodo {
  count: number;
  next: null;
  previous: null;
  results: ITodoList[];

}
export interface ITodoList {
  completed: boolean;
  created_at: string;
  id: string;
  title: string;
  updated_at: string;
  user: number;
}
 export interface ITodoForm {
  title: string;
  completed: boolean;
  user: number;
 }
