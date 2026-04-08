import { Component, OnInit } from '@angular/core';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  imports: [PrimengComponentsModule, TranslateModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit implements OnInit {
  public userForm: FormGroup;
  isFormSubmitted: boolean = false;
  user_id: string;

  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.setFormBuilder();
    this.user_id = this.activatedroute.snapshot.paramMap.get("id");
    this.getUserById(this.user_id);
    this.bindFormBuilder();
  }

  getUserById(user_id: string) {

  }

  bindFormBuilder(){

  }

  setFormBuilder() {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      device_id: ['', Validators.required],
      company_name: ['', Validators.required],
      status: [false],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    } else {
      console.log(this.userForm.value);

    }
  }

}
