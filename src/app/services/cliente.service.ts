import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable()

export class ClienteService{

    cliente : Cliente = new Cliente();

    constructor(private firestore: AngularFirestore){
    }

    listaDeClientes(): Observable<any>{

        return from(new Observable(observe=>{
            this.firestore.collection('cliente').snapshotChanges().subscribe(response=>{
                
                let lista: Cliente[]=[];

                response.map(obj =>{
                    let cliente: Cliente = new Cliente();
                    cliente.setData(obj.payload.doc.data());
                    cliente.id=obj.payload.doc.id;
                    lista.push(cliente);
                });
                observe.next(lista);
            })
        }))   
    }
    
    cadastrar(cliente : any): Observable<any>{

        return from(new Observable(observe=>{
            this.firestore.collection('cliente').add(cliente).then(response=>{
                observe.next("Você foi cadastrado!");

            },(err)=>{
                observe.error("Erro ao cadastrar");

            })
        }));
    }
    
    buscaPorId(id : any) : Observable<any>{
        //.doc(id).snapshotChanges() busca pelo id do documento
        return from(new Observable(observe=>{
            this.firestore.collection('cliente').doc(id).snapshotChanges().subscribe(response=>{
            
            let cliente : Cliente = new Cliente();
            cliente.id = response.payload.id;
            cliente.setData(response.payload.data());
            observe.next(cliente);

            },(err)=>{
                observe.error("Erro ao buscar o cliente")
            })
        }));
    }

    atualizar(cliente : any) : Observable<any>{
        return from(new Observable(observe=>{
            
            this.firestore.collection('cliente').doc(cliente.id).set(cliente).then(response=>{
                observe.next("Dados atualizados");
            },(err)=>{
                observe.error("Erro ao atualizar");
            })
        }));
    }

    excluir(cliente : any) : Observable<any>{
        return from(new Observable(observe=>{
            
            this.firestore.collection('cliente').doc(cliente.id).delete().then(response=>{
                observe.next("Dados atualizados");
            },(err)=>{
                observe.error("Erro ao atualizar");
            })
        }));
    }
}