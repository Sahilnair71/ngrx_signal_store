import { Injectable } from '@angular/core';
import { Todos } from '../model/mock-data';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  async getData(){
    sleep(1000)
    return Todos
  }
}

async function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve,ms))
  
}
