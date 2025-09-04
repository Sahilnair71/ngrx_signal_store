import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoStore } from './store/toddo.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
