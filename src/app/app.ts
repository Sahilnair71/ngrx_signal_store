import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todos } from './components/todos/todos';
import { TodoStore } from './store/toddo.store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Todos,MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-signal-store');
  store=  inject(TodoStore)
  ngOnInit(){
    this.loadall().then((data)=> console.log("data",data))
  }
  async loadall(){
    await this.store.loadall()
  }
}
