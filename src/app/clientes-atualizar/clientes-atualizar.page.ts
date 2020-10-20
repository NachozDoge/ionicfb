import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../services/cliente.service';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-clientes-atualizar',
  templateUrl: './clientes-atualizar.page.html',
  styleUrls: ['./clientes-atualizar.page.scss'],
})
export class ClientesAtualizarPage implements OnInit {

  cliente : Cliente = new Cliente();
  formGroup : FormGroup;

  constructor(private clienteServ : ClienteService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private formBuilder : FormBuilder,
    private template: TemplateService) {
      this.iniciarForm();
    }

  ngOnInit() {
    this.route.paramMap.subscribe(url=>{
      let id = url.get('id');
      
      this.clienteServ.buscaPorId(id).subscribe(response=>{
        this.cliente = response;
        this.iniciarForm();
      })
    })
  } 

  atualizar(){

    this.template.loading.then(load=>{
    load.present();

    this.clienteServ.atualizar(this.formGroup.value).subscribe(response=>{
      console.log("atualizou");
      load.dismiss();
    },erro=>{
      console.log("f");
      load.dismiss();
      })
    })
  }

  iniciarForm(){

    this.formGroup = this.formBuilder.group({
      id:[this.cliente.id],
      nome:[this.cliente.nome],
      cpf:[this.cliente.cpf],
      endereco:[this.cliente.endereco],
      numero:[this.cliente.numero],
      cidade:[this.cliente.cidade],
      estado:[this.cliente.estado],
      email:[this.cliente.email],
      telefone:[this.cliente.telefone],
    })
  }

}
