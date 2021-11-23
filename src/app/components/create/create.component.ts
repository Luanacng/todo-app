import { TodoService } from 'src/app/services/todo.service';
import { Todo } from './../../models/todo';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: TodoService) { }

  ngOnInit(): void {
  }

  create(): void {
    this.formataData()
    this.service.create(this.todo).subscribe((resposta) => {
      this.service.message('to-do criado com sucesso!')
      this.router.navigate([''])
    }, err => {
      this.service.message('Falha ao criar to-do')
      this.router.navigate([''])
    })
  }

  cancel(): void {
    this.router.navigate([''])
  }

  formataData(): void{
    let data = new Date(this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

}