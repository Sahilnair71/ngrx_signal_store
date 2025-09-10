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
                patchState(store,{todos: todos,loading:false})
                
            },

            async addData(title:string){
                const added_todo = await todoService.addData({title,completed:false})
                patchState(store,{loading:true})
                patchState(store,(state)=>({
                    todos:[...state.todos,added_todo]
                }))
                patchState(store,{loading:false})
                
            },

            async deleteData(id:string){
                await todoService.deleteData(id)

                patchState(store, (state)=>({
                    todos: state.todos.filter((todo)=> todo.id !=id)
                }))
            },
            async updateData(id:string, completed:boolean){
                await todoService.updateTodo(id,completed)
                patchState(store, (state)=>({
                    todos:state.todos.map((todo) => todo.id ==id ? {...todo,completed }:todo)
                }))
            }
        }
    ))

)
    