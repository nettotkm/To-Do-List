import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { EmailService } from '../../services/email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  todo: Todo = new Todo();

  submitted = false;
  invalid = false;
  typing = false;

  constructor(private todoService: TodoService, private emailService: EmailService, private router: Router) { }

  ngOnInit(): void {
  }

  typingInEmail() {
    this.typing = true;
    setTimeout(() => {
      this.typing = false;
    }, 1000);
  }
  saveTodo(): void {
    const data = {
      description: this.todo.description,
      owner: this.todo.owner,
      email: this.todo.email
    };

    this.todoService.createTodo(data)
      .subscribe(
        response => {
          this.submitted = true;
          this.router.navigateByUrl('/todos')
        },
        error => {
          console.log(error);
        }
      );
  }

  newTodo(): void {
    this.submitted = false;
    this.todo = new Todo();

  }

}
