import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  lista : Cliente[] = [];

  constructor(private clienteServ : ClienteService) { }

  ngOnInit() {
    this.clienteServ.listaDeClientes().subscribe(response=>{
      console.log(response)
      //respondeu
      this.lista= response;
      console.log(response)
      //lista respondeu
    },err=>{

    })
  }

}
