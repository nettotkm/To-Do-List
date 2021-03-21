import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CatFactsService } from 'src/app/services/cat-facts.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @ViewChild('restart') modal: any;
  todos: Todo[] = [];
  authorization: {
    currentTodo: Todo,
    password: string
  } = { currentTodo: new Todo(), password: '' };
  currentStatus: string = "pending";

  constructor(private todoService: TodoService, private catFactsService: CatFactsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos(): void {
    this.todoService.getAll()
      .subscribe(
        data => {
          this.todos = data;

        },
        error => {
          console.log(error);
        }
      );
  }

  currentStatusTodos() {
    return this.todos.filter(t => {
      if (this.currentStatus === "pending") {
        return !t.done;
      } else {
        return t.done;
      }
    })
  }

  authorizeRestart() {
    this.toggleTodo(this.authorization.currentTodo.id, true, () => { });
    this.modalService.dismissAll();
    this.authorization.password = '';
    this.authorization.currentTodo = new Todo();
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log("closed")
    }, (reason) => {
      console.log("dismissed")
    });
  }

  outOfTodos() {
    this.catFactsService.fetch().subscribe(
      data => {
        data.map((fact: any) => {
          const todo = new Todo();
          todo.description = fact.text;
          todo.owner = "Eu";
          todo.email = "eu@me.com";

          this.todoService.createTodo(todo)
            .subscribe(
              response => {
                todo.id = response.id;
                this.todos = [...this.todos, todo];
              },
              error => {
                console.log(error);
              }
            );
        })
      },
      error => {
        console.log(error)
      }
    )
  }

  toggleTodo(id: number, override: boolean, restartCallback: Function) {
    var todoIndex = this.todos.findIndex(t => t.id === id);
    var todo = this.todos[todoIndex];

    if (!todo) {
      return;
    }
    if ((todo.restart_count > 1 || todo.done) && !override) {
      this.authorization.password = '';
      this.authorization.currentTodo = todo;
      restartCallback();
      return;
    }
    var payload: {
      done?: boolean,
      restart_count?: number
    } = { done: !todo.done }
    if (!todo.done) {
      payload = { ...payload, restart_count: (todo.restart_count || 0) + 1 }
    }
    this.todoService
      .updateTodo(id, payload)
      .subscribe(
        data => {
          if (todo) {
            const newTodo = new Todo;
            newTodo.id = id;
            newTodo.description = todo.description;
            newTodo.done = !todo.done;
            newTodo.owner = todo.owner;
            newTodo.restart_count = todo.restart_count;

            if (!todo.done) {
              newTodo.restart_count = payload.restart_count || 0;
            }
            this.todos[todoIndex] = newTodo;
          }
          return true;
        },
        error => {
          console.log(error);
          return false;
        }
      );
  }

  toggleStatus(event: any) {
    const todoId: number = parseInt(event.target.id);
    this.toggleTodo(todoId, false, () => {
      event.preventDefault();
      this.openModal(this.modal);
    })
  }

  removeTodos() {
    this.todoService.deleteTodos().subscribe(
      response => {
        this.todos = [];
      },
      error => console.log(error)
    )
  }
}
