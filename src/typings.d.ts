interface ITodo {
  title: string;
  completed: boolean;
}

interface IProps {
  todos: ITodo[];
}

interface IRootProps {
  dataUrl: string;
}

interface IRootState {
  todos: ITodo[];
  fetching: boolean;
  succeed:boolean;  
}