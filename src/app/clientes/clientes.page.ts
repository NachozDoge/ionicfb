import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  lista : Cliente[] = [];
  cliente : Cliente = new Cliente();

  constructor(private clienteServ : ClienteService,
  private navCtrl : NavController)
  { }

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

  visualizar(cliente){
    this.navCtrl.navigateForward(['/clientes-visualizar',cliente.id]);
  }

}
