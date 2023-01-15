import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent  implements OnInit {
  formStore: FormGroup;
  rowData: any = []

  idTienda: Number = 0
  sucursal: string = ''
  direccion: string = ''

  columnDefs = [
    { field: 'idTienda', filter: 'agNumberColumnFilter', width: 100 },
    { field: 'sucursal', filter: 'agTextColumnFilter'},
    { field: 'direccion', filter: 'agTextColumnFilter'}
  ]


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formStore = this.fb.group({
      idTienda: [{ value: '', disabled: true }, Validators.required],
      sucursal: ['', Validators.required],
      direccion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.GetData()
  }

  rowDoubleClicked(event: RowDoubleClickedEvent) {
    console.log(event.data)

    this.idTienda = event.data.idTienda
    this.sucursal = event.data.sucursal
    this.direccion = event.data.direccion
  }

  async GetData() {
    var config = {
      method: 'get',
      url: 'http://localhost:5014/api/Tiendas',
      headers: {}
    };
    var { data } = await axios(config)
    this.rowData = data
  }

  save(method: string) {
    if (
      this.sucursal &&
      this.direccion
    ) {
      var config = {
        method: method,
        url: 'http://localhost:5014/api/Tiendas' + (this.idTienda == 0 ? '' : `/${this.idTienda}`),
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          "idTienda": this.idTienda,
          "sucursal": this.sucursal,
          "direccion": this.direccion,
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
          this.idTienda = 0
          this.sucursal = ''
          this.direccion = ''
          this.GetData()
        })
    }
    else {
      this.toastr.error("Faltan datos en el formulario", "Error")
    }
  }

}
