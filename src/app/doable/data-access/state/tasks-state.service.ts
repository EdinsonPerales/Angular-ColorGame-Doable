import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TasksService } from '../services/tasks.service';
import { AuthStateService } from './auth-state.service';
import { NEVER, Subject, catchError, map, switchMap, tap } from 'rxjs';
import { CreateTask, EditTaskWithId, Task, TaskState, filterTaskType, sortTaskType } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksStateService {

  #tasksService     = inject(TasksService);
  #authStateService = inject(AuthStateService);
  #token            = this.#authStateService.token;

  //sources
  createTask$   = new Subject<CreateTask>();
  editTask$     = new Subject<EditTaskWithId>();
  deleteTask$   = new Subject<number>();
  sortTasksBy$  = new Subject<sortTaskType>();
  filterTaskBy$ = new Subject<filterTaskType>();

  //State
  #state = signal<TaskState>({
    tasks   : null,
    loading : true,
    error   : null,
  })

  //Selectors
  tasks       = computed(() => this.#state().tasks);
  loading     = computed(() => this.#state().loading);
  error       = computed(() => this.#state().error);

  //Reducers
  constructor(){
    this.#tasksService.getListTasks(this.#token()||'').pipe(
      tap(()=>console.log(this.#token())),
      takeUntilDestroyed(),
      this.#setCatchError()
    ).subscribe((tasks:any) =>{
      const orderTasks = this.#sortTasksOldFirst(tasks);
      this.#setLoading(false);
      this.#setTasks(orderTasks);
    });

    this.createTask$.pipe(
      takeUntilDestroyed(),
      tap(() => this.#setLoading(true)),
      switchMap((data)=>
        this.#tasksService.createTask(this.#token()||'',data).pipe(this.#setCatchError()))
    ).subscribe((task)=>{
      this.#addTask(task);
    })

    this.editTask$.pipe(
      takeUntilDestroyed(),
      tap(() => this.#setLoading(true)),
      switchMap(({id,...data})=>
        this.#tasksService.editTask(this.#token()||'',data,id).pipe(this.#setCatchError()))
    ).subscribe((task:any)=>{
      const updatedTasks = this.#updateTasksAfterUpdation(this.tasks()!,task);
      this.#setLoading(false);
      this.#setTasks(updatedTasks);
    });

    this.deleteTask$.pipe(
      takeUntilDestroyed(),
      tap(() => this.#setLoading(true)),
      switchMap((id:number)=>
        this.#tasksService.deleteTask(this.#token()||'',id).pipe(
          this.#setCatchError(),
          map( () => id )
        ))
    ).subscribe((id:number) =>{
      const updatedTasks = this.#updateTasksAfterDeletion(this.tasks()!,id);
      this.#setLoading(false);
      this.#setTasks(updatedTasks);
    });

    this.sortTasksBy$.pipe(
      takeUntilDestroyed(),
      tap(() => this.#setLoading(true)),
    ).subscribe(

    );
  };

  //Utilities
  #setTasks(tasks : TaskState['tasks']){
    this.#state.update( (prev) => ({
      ...prev,
      tasks
    }));
  };

  #addTask(task : any){
    this.#state.update( (prev) => ({
      ...prev,
      tasks : [...(prev.tasks ?? []), task]
    }));
  };

  #setLoading(loading : TaskState['loading']){
    this.#state.update( (prev) => ({
      ...prev,
      loading
    }))
  };

  #setError(value : any){
    const errResume = value ? {
      status      : value.status,
      name        : value.name,
      description : value.error.errors[0],
    } : value;

    this.#state.update( (prev) => ({
      ...prev,
      error : errResume
    }));
  };

  #resetTasksState(){
    this.#state.set({
      tasks   : null,
      loading : false,
      error   : null,
    })
  };

  #setCatchError() {
    return catchError((error: any) => {
      this.#resetTasksState();
      this.#setError(error);
      return NEVER;
    });
  };

  #sortTasksByTitleAsc(tasks : Task[]): Task[] {
    return tasks.sort((a, b) => a.title.localeCompare(b.title));
  };

  #sortTasksByTitleDesc(tasks : Task[]): Task[] {
    return tasks.sort((a, b) => b.title.localeCompare(a.title));
  };

  #sortTasksOldFirst(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      if (a.due_date === null) return 1;
      if (b.due_date === null) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
  }

  #sortTasksNewFirst(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      if (a.due_date === null) return 1;
      if (b.due_date === null) return -1;
      return new Date(b.due_date).getTime() - new Date(a.due_date).getTime();
    });
  }

  #updateTasksAfterUpdation(tasks: Task[], updatedTask: Task): Task[] {
    return tasks.map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
  }

  #updateTasksAfterDeletion(tasks: Task[], id:number) : Task[]{
    return tasks.filter(task => task.id !== id);
  }
}
