import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData !:any;
  showAdd !:boolean;
  showUpdate !:boolean;
  constructor(private formbuilder:FormBuilder,
    private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
    Policy_Number : [''],
    Policy_Amount : ['']

    })
    this.getAllEmployee();
  }
  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.Policy_Number=this.formValue.value.Policy_Number;
    this.employeeModelObj.Policy_Amount=this.formValue.value.Policy_Amount;

   this.api.postEmploye(this.employeeModelObj)
   .subscribe(res=>{
     console.log(res);
    alert("Employee Added Successfully")
    let ref=document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
   },
   err=>{
     alert("Something went wrong")
   })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }
  DeleteEmployee(row : any){
    this.api.DeleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmployee();
    })
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['Policy_Number'].setValue(row.Policy_Number);
    this.formValue.controls['Policy_Amount'].setValue(row.Policy_Amount);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.Policy_Number=this.formValue.value.Policy_Number;
    this.employeeModelObj.Policy_Amount=this.formValue.value.Policy_Amount;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
