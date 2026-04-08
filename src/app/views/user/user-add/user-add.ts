import { Component, OnInit } from '@angular/core';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-add',
  imports: [PrimengComponentsModule, TranslateModule,FormsModule ,ReactiveFormsModule,CommonModule],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss',
})
export class UserAdd implements OnInit {

  public userForm: FormGroup;
  isFormSubmitted: boolean = false;
  
  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.setFormBuilder();
  }

  setFormBuilder(){
    this.userForm = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: [null, [Validators.required]],
      device_id: [null, [Validators.required]],
      company_name: [null, [Validators.required]],
      status: [true, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if(this.userForm.invalid) {
      return
    }else{
      console.log(this.userForm.value);

    }
  }
}
