import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { LogicaService } from 'src/app/services/logica.service';

import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  public myForm!:FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public contrasenasNoCoinciden: boolean = false; // Nueva propiedad para manejar el estado de las contraseñas
  public mensajeError: string = '';

  constructor(private fb:FormBuilder,private auth:AutenticacionService
) { }
  ngOnInit(): void {
    this.myForm=this.createMyForms();
  }
  private createMyForms():FormGroup {
    return this.fb.group({
      nombre:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      password:['',[Validators.required]],
      password2:['',[Validators.required]]


    });

  }

  
  async onSubmit() {
    const email = this.myForm.value.email;
    const password = this.myForm.value.password;
    const password2 = this.myForm.value.password2;
    const nombre = this.myForm.value.nombre;

    if (this.myForm.invalid) {
      this.contrasenasNoCoinciden = true;
      this.mensajeError = 'Llena los datos correctamente.';

    } else {
      
      const registroValido = this.auth.ingresarRegistro({ password, password2 });

      if (registroValido) {
        
        this.contrasenasNoCoinciden = false;
      } else {
        this.contrasenasNoCoinciden = true;
        this.mensajeError = 'Las contraseñas no coinciden. No se puede realizar el registro.';
      }
    }
  }
}