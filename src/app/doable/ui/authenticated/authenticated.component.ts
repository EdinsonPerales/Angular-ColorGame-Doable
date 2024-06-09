import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../data-access/state/auth-state.service';
import { TasksStateService } from '../../data-access/state/tasks-state.service';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { CommonModule } from '@angular/common';
// type list = {value:string,label:string};
@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [ButtonComponent,CommonModule],
  template: `
  <div class="add-task-container">
    <div class="form-field">
      <input type="text" placeholder="Write your task">
    </div>
    <div class="form-field">
      <input type="date" placeholder="dd/mm/aaaa">
    </div>
    <app-button>Add task</app-button>
  </div>
  <div class="tasks-panel">
    <div class="tasks-actions">
      <div class="form-field">
        <label for="sort-by">Sort by</label>
        <select name="sort-by" id="sort-by">
          <!-- <option value="123">123</option> -->
          @for(option of sortByList; track $index){
            <option [value]="option.value">{{option.label}}</option>
          }
        </select>
      </div>
      <div class="form-field">
          <label>Filter</label>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" id="pending" name="pending">Only pending
            </label>
            <label>
              <input type="checkbox" id="important" name="important">Only important
            </label>
          </div>
          <app-button>Logout</app-button>
      </div>
    </div>
    <div class="tasks-list">
      <div class="task-container">
        <div class="task-info">
          <div class="task-title">
            <input type="checkbox">
            <p>Do the dishes</p>
          </div>
          <div class="task-due-dat">
            <p>Thursday, November 30</p>
          </div>
        </div>
        <div class="task-actions">
          <app-button>
            im
          </app-button>
          <app-button>
            del
          </app-button>
        </div>
      </div>
    </div>
  </div>


  `,
  styleUrl: './authenticated.component.css',
})

export class AuthenticatedComponent {
  authStateService  = inject(AuthStateService);
  tasksStateService = inject(TasksStateService);

  list = [1,2,3,4]
  sortByList = [
    {value:'old_first',label:'Due Date (old first)'},
    {value:'new_first',label:'Due Date (new first)'},
    {value:'a-z',label:'Alphabetical (a-z)'},
    {value:'z-a',label:'Alphabetical (z-a)'}
  ]
  onLogout(){
    this.authStateService.logout$.next();
  }
}
