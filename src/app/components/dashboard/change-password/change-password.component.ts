import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  error: boolean = false;
  msg: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl(""),
      confirmPassword: new FormControl("")
    });
  }

  onSubmit() {
    this.error = false;
    const formValues = this.changePasswordForm.value;
    if (formValues.newPassword === formValues.confirmPassword) {
      const userData = sessionStorage.getItem("userData");
      const parsedData = userData !== null ? JSON.parse(userData) : null;
      parsedData.password = formValues.newPassword;
      this.userService.updateUser(parsedData).subscribe(
        (data) => {
          sessionStorage.setItem("userData", JSON.stringify(data));
          alert("Password Reset was Successfull");
        }
      );
    }
    else {
      this.error = true;
      this.msg = "New Password and Confirm Password does not match";
    }
    this.changePasswordForm.setValue(
      {
        newPassword: "",
        confirmPassword: ""
      }
    );
  }

}
