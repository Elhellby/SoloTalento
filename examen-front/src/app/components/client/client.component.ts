import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  formClient: FormGroup;
  disabled: boolean = true
  rowData: any = []

  idCliente: Number = 0
  nombre: string = ''
  apellidos: string = ''
  direccion: string = ''

  columnDefs = [
    { field: 'idCliente', filter: 'agNumberColumnFilter', width: 100 },
    { field: 'nombre', filter: 'agTextColumnFilter', width: 150 },
    { field: 'apellidos', filter: 'agTextColumnFilter', width: 150 },
    { field: 'direccion', filter: 'agTextColumnFilter' },
  ]


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formClient = this.fb.group({
      idCliente: [{ value: '', disabled: true }, Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.GetData()
  }

  rowDoubleClicked(event: RowDoubleClickedEvent) {
    console.log(event.data)

    this.idCliente = event.data.idCliente
    this.nombre = event.data.nombre
    this.apellidos = event.data.apellidos
    this.direccion = event.data.direccion
  }

  async GetData() {
    var config = {
      method: 'get',
      url: 'http://localhost:5014/api/clientes',
      headers: {}
    };
    var { data } = await axios(config)
    this.rowData = data
  }

  save(method: string) {
    if (
      this.nombre &&
      this.direccion &&
      this.apellidos
    ) {
      var config = {
        method: method,
        url: 'http://localhost:5014/api/clientes' + (this.idCliente == 0 ? '' : `/${this.idCliente}`),
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          "idCliente": this.idCliente,
          "nombre": this.nombre,
          "apellidos": this.apellidos,
          "direccion": this.direccion
        })
      };

      axios(config)
        .then((response) => {
          var action = ''
          switch (method) {
            case 'post':
              action = 'guardado'
              break
            case 'put':
              action = 'actualizado'
              break
            case 'delete':
              action = 'eliminado'
              break
            default:
              action = ''
              break
          }
          this.toastr.success(`Cliente ${action} con exito`, "Success")
        })
        .catch(function (error) {
          console.log(error);
        }).finally(() => {
          this.idCliente = 0
          this.nombre = ''
          this.apellidos = ''
          this.direccion = ''
          this.GetData()
        })
    }
    else {
      this.toastr.error("Faltan datos en el formulario", "Error")
    }
  }

}
