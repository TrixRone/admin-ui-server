import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormControl} from '@angular/forms';
import {AuthService, KycData, WalletsUser} from '../../../shared/services/auth.service';

@Component({
    selector: 'app-dialog-overview',
    templateUrl: './dialog-kyc.component.html',
    styleUrls: ['./dialog-kyc.component.scss']
})
export class DialogKycComponent implements OnInit {
  base64Date;
  message = 'HAHHAHHAHHAHHAHHAHHA';
  ngOnInit() {
    this.authservice.getAmazoneImage({_id: this.kycdata.s3_detail_id}).subscribe((response) => {
      let base64data;
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = () => {
        base64data = reader.result;
        this.base64Date = base64data;
      };
    });
    }
    constructor(
        private authservice: AuthService,
        public dialogRef: MatDialogRef<DialogKycComponent>,
        @Inject(MAT_DIALOG_DATA) public kycdata: KycData
    ) {}

    onClick(data?: boolean): void {
    /*console.log(data);
      if (!data) {
      this.authservice.changeUserData(this.data._id, this.data.namedata, this.position.value).subscribe(() => {
        this.dialogRef.close(true);
      });
      } else {
        this.authservice.changeUserData(this.data._id, this.data.namedata, this.details).subscribe(() => {
          this.dialogRef.close(true);
        });
      }*/
    }
   /*onCansel(): void {
    console.log(this.mode);
       this.dialogRef.close(false);
    }
  onUpdate() {
    if (this.mode === 'NONE') {
      this.mode = null;
    }
    this.authservice.changeUserData(this.data._id, this.data.namedata, this.mode).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
  openDialogWallets() {
    this.dialog = true;
  }
  changeWallets() {
    console.log(this.ehereumWallet, this.nemWallet);
    this.authservice.postwalletadresses(this.data._id, this.ehereumWallet, this.nemWallet).subscribe(
      (res) => {
        console.log(res.status);
        this.dialog = false;
        this.ngOnInit();
      }
    );
  }*/

  onCansel(): void {
    this.dialogRef.close(false);
  }
  acceptKyc() {
    this.authservice.changeKycData(this.kycdata.user_id, 'A').subscribe(() => {
      this.dialogRef.close(true);
    });
  }
  declineKyc() {
    this.authservice.declineKycData(this.kycdata.user_id, 'D').subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
