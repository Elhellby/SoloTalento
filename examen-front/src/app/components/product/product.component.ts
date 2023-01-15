import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formProduct: FormGroup;
  rowData: any = []

  idArticulo: Number = 0
  codigo: string = ''
  descripcion: string = ''
  precio: Number = 0
  imagen: string = ''
  stock: number = 0

  columnDefs = [
    { field: 'idArticulo', filter: 'agNumberColumnFilter', width: 100 },
    { field: 'codigo', filter: 'agNumberColumnFilter', width: 100 },
    { field: 'descripcion', filter: 'agTextColumnFilter', width: 150 },
    { field: 'precio', filter: 'agTextColumnFilter', width: 150 },
    { field: 'imagen', filter: 'agTextColumnFilter', width: 150 },
    { field: 'stock', filter: 'agTextColumnFilter', width: 150 }
  ]


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formProduct = this.fb.group({
      idArticulo: [{ value: '', disabled: true }, Validators.required],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
      stock: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.GetData()
  }

  rowDoubleClicked(event: RowDoubleClickedEvent) {
    this.idArticulo = event.data.idArticulo
    this.codigo = event.data.codigo
    this.descripcion = event.data.descripcion
    this.precio = event.data.precio
    this.imagen = event.data.imagen
    this.stock = event.data.stock

  }

  async GetData() {
    var config = {
      method: 'get',
      url: 'http://localhost:5014/api/Articulos',
      headers: {}
    };
    var { data } = await axios(config)
    this.rowData = data
  }


  save(method: string) {
    if (
      this.descripcion &&
      this.precio>=0 &&
      this.imagen &&
      this.stock>=0
    ) {
      var config = {
        method: method,
        url: 'http://localhost:5014/api/Articulos' + (this.idArticulo == 0 ? '' : `/${this.idArticulo}`),
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          "idArticulo": this.idArticulo,
          "codigo": this.codigo,
          "descripcion": this.descripcion,
          "precio": this.precio,
          "imagen": this.imagen,
          "stock": this.stock
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
          this.idArticulo = 0
          this.codigo = ''
          this.descripcion = ''
          this.precio = 0
          this.imagen = ''
          this.stock = 0

          this.GetData()
        })
    }
    else {
      this.toastr.error("Faltan datos en el formulario", "Error")
    }
  }
}
