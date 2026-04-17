import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimengComponentsModule } from '../../../shared/primeng-components-module';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserAddRequest } from '../../../models/request/userAddRequest';
import { PythonApi } from '../../../service/python-api';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user/user.service';
@Component({
  selector: 'app-user-add',
  imports: [PrimengComponentsModule, TranslateModule,FormsModule ,ReactiveFormsModule,CommonModule],
  templateUrl: './user-add.html',
  styleUrl: './user-add.scss',
})
export class UserAdd implements OnInit {

  public userForm: FormGroup;
  isFormSubmitted: boolean = false;
  userAddRequest:UserAddRequest=new UserAddRequest();
  
  constructor(private formBuilder: FormBuilder,public pythonApi:PythonApi,public systemService: SystemService,private router: Router,public userService: UserService,private cd: ChangeDetectorRef) {
    
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
      // status: [true, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  modelBeforeSubmit(){
    this.userAddRequest.first_name=this.userForm.get('first_name').value;
    this.userAddRequest.last_name=this.userForm.get('last_name').value;
    this.userAddRequest.email=this.userForm.get('email').value;
    this.userAddRequest.phone=this.userForm.get('phone').value;
    this.userAddRequest.device_id=this.userForm.get('device_id').value;
    this.userAddRequest.company_name=this.userForm.get('company_name').value;
    // this.userAddRequest.status=this.userForm.get('status').value;
    this.userAddRequest.password=this.userForm.get('password').value;
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if(this.userForm.invalid) {
      return
    }else{
      this.modelBeforeSubmit()
      this.userService.AddUser(this.userAddRequest).subscribe(d=>{
        if(d['success']==false){
          this.systemService.showError(d['message']);
        } else {
          this.systemService.showSuccess(d['message']);
        }
        this.router.navigate(['/']);
        //this.systemService.showSuccess('Record deleted successfully');
      })
      // console.log(this.userAddRequest);

    }
  }
}
