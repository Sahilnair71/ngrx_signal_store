import { Injectable } from '@angular/core';
import { Todos } from '../model/mock-data';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  async getData(){
    await sleep(1000)
    return Todos
  }
  async addData(todo: Partial<Todo> ){
    await sleep(1000)
   return {
    id: Math.random().toString(36).substring(2) + Date.now().toString(36),
    ...todo
   } as Todo
  }

}

async function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve,ms))
  
}
