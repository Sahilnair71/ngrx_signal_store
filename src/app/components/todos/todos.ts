import { Component , inject,viewChild, effect} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule ,MatButtonToggleGroup} from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TodoStore } from '../../store/toddo.store';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonToggleGroup
  ]
})
export class Todos {
  store = inject(TodoStore);
  filter = viewChild.required(MatButtonToggleGroup)
  constructor(){
    effect(()=> {
      const filter = this.filter();
      filter.value = this.store.filter()
    })
  }

  onAddClicked(title:string){
    this.store.addData(title)
  }
  onDeleteClicked(id:string){
    this.store.deleteData(id)
  }
  onUpdate(id:string,completed:boolean){
    this.store.updateData(id,completed)
  }
}
