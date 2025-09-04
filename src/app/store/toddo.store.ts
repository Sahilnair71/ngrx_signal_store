import { type } from "os";
import { Todo } from "../model/todo.model"
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import{inject} from '@angular/core'
import { TodoService } from "../services/todo.service";

export type TodosFilter = "all" | "pending" | "completed"

type TodoState ={
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
    
}

const initialState : TodoState={
    todos: [],
    loading: false,
    filter: "all"
}

export const TodoStore= signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store, todoService =inject(TodoService))=>(
        {
            async loadall(){
                patchState(store,{loading:true})
                const todos = await todoService.getData()
                patchState(store,{loading:false})
                
            }
        }
    ))

)
    