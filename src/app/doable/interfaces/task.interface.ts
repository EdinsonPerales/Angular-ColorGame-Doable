export interface Task{
  id         : number;
  title      : string;
  due_date   : null | string;
  important  : boolean;
  completed  : boolean;
  user_id    : number;
  created_at : Date;
  updated_at : Date;
}

export interface CreateTask{
  title    : string,
  due_date : string | null,
}

export interface EditTask{
  important  ?: boolean;
  completed  ?: boolean;
}
