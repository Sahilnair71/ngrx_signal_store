import { type } from "os";
import { Todo } from "../model/todo.model"
import { signalStore, withState, withMethods, patchState ,withComputed} from '@ngrx/signals';
import{inject,computed} from '@angular/core'
import { TodoService } from "../services/todo.service";

export type TodosFilter = "all" | "pending" | "completed"
export type AppTheme = "light" | "dark";


type TodoState ={
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
    theme: AppTheme
    
}

const initialState : TodoState={
    todos: [],
    loading: false,
    filter: "pending",
    theme:"light"
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
                todoService.deleteData(id)
                patchState(store, (state)=>({
                    todos: state.todos.filter((todo)=> todo.id !=id)
                }))
            },
            async updateData(id:string, completed:boolean){
                todoService.updateTodo(id,completed)
                patchState(store, (state)=>({
                    todos:state.todos.map((todo) => todo.id ==id ? {...todo,completed }:todo)
                }))
            },
            updateFilete(filter: TodosFilter){
                patchState(store,{filter})

            },
            toggleTheme() {
                patchState(store, (state) => ({
                  theme: (state.theme === "light" ? "dark" : "light") as AppTheme,
                }));
              },
        }
    )
),
    
withComputed((state)=>({
    filteredTodos: computed(() => {
    const todo= state.todos()
    switch(state.filter()){
        case "completed":
            return todo.filter(todos => todos.completed)
        case "all":
            return todo
        case "pending":
            return todo.filter(todos => !todos.completed)

    }
    })
}))

)
    