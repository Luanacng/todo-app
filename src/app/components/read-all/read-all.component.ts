import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  public closed: number = 0

  list: Todo[] = []
  listFinished: Todo[] = []

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(todo => {
        if(todo.finalizado) {
          this.listFinished.push(todo)
        } else {
          this.list.push(todo)
        }
      })
      this.closed = this.listFinished.length
    })
  }

  finalizar(item: Todo): void {
    item.finalizado = true
    this.service.update(item).subscribe((resposta) => {
      this.service.message('Task finalizada com sucesso!')
      this.list = this.list.filter(todo => todo.id != item.id)
      this.closed++
    })
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
       if(resposta === null){
        this.service.message('Task deletada com sucesso!')
        this.list = this.list.filter(todo => todo.id != id)
       }
    })
  }

  navegarParaFinalizado(): void {
    this.router.navigate(['finalizados'])
  }

  


}
