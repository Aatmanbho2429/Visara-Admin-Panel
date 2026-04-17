import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { PythonApi } from '../../../service/python-api';
import { UserGetByIdResponse } from '../../../models/response/userGetByIdResponse';
import { UserEditRequest } from '../../../models/request/userEditRequest';
import { UserService } from '../../../service/user/user.service';

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
  public isLoading: boolean = false;
  public userGetByIdResponse:UserGetByIdResponse=new UserGetByIdResponse();
  public userEditRequest:UserEditRequest=new UserEditRequest();
  constructor(private fb: FormBuilder, private activatedroute: ActivatedRoute,public pythonApi:PythonApi,public systemService: SystemService,private router: Router,public userService: UserService,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setFormBuilder();
    this.user_id = this.activatedroute.snapshot.paramMap.get("id");
    this.getUserById(this.user_id);
    // this.bindFormBuilder();
  }

  getUserById(user_id: string) {
    this.isLoading = true;
    this.userService.GetUserById(user_id).subscribe(d=>{
      this.userGetByIdResponse = d.data;
      this.bindFormBuilder();
    })
  } 

  bindFormBuilder(){
    this.userForm.get('first_name').setValue(this.userGetByIdResponse.first_name);
    this.userForm.get('last_name').setValue(this.userGetByIdResponse.last_name);
    this.userForm.get('email').setValue(this.userGetByIdResponse.email);
    this.userForm.get('phone').setValue(this.userGetByIdResponse.phone);
    this.userForm.get('device_id').setValue(this.userGetByIdResponse.device_id);
    this.userForm.get('company_name').setValue(this.userGetByIdResponse.company_name);
    this.userForm.get('status').setValue(this.userGetByIdResponse.status);

    // this.userForm.patchValue(this.userGetByIdResponse)
  }

  setFormBuilder() {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      device_id: ['', Validators.required],
      company_name: ['', Validators.required],
      status: [false]
    });
  }

  modelBeforeSubmit(){
    this.userEditRequest.id = this.user_id;
    this.userEditRequest.first_name = this.userForm.get('first_name')?.value;
    this.userEditRequest.last_name = this.userForm.get('last_name')?.value;
    this.userEditRequest.email = this.userForm.get('email')?.value;
    this.userEditRequest.phone = this.userForm.get('phone')?.value;
    this.userEditRequest.device_id = this.userForm.get('device_id')?.value;
    this.userEditRequest.company_name = this.userForm.get('company_name')?.value;
    this.userEditRequest.status = this.userForm.get('status')?.value;
    this.userEditRequest.subscription_status = this.userGetByIdResponse.subscription_status;
    this.userEditRequest.subscription_end = this.userGetByIdResponse.subscription_end;
  }

  onSubmit(): void {
     this.isFormSubmitted = true;
    if (this.userForm.invalid) {
      return;
    } else {
      this.modelBeforeSubmit();
      this.pythonApi.EditUser(this.userEditRequest).subscribe(d=>{
        console.log(d);
        if(d['success']==false){
          this.systemService.showError(d['message']);
        } else {
          this.systemService.showSuccess(d['message']);
        }
        this.router.navigate(['/']);
      });
    }
  }

}
