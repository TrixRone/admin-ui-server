import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {FormControl} from '@angular/forms';
import {AuthService, WalletsUser} from '../../../shared/services/auth.service';

@Component({
    selector: 'app-dialog-overview',
    templateUrl: './dialog-overview.component.html',
    styleUrls: ['./dialog-overview.component.scss']
})
export class DialogOverviewComponent implements OnInit {
  positionOptions: boolean[] = [true, false];
  position: FormControl;
  details;
  mode;
  ehereumWallet;
  nemWallet;
  dialog = false;
  walletsUser: WalletsUser;
  ngOnInit() {
    if (this.data.namedata === 'wallet_adresses' ) {
      this.authservice.getwalletadresses({email: this.data._id}).subscribe((res) => {
        this.walletsUser = res.body;
      });
    }
      if (this.data.data === false) {
        this.positionOptions.reverse();
      }
      this.position = new FormControl(this.positionOptions[0]);
    }
    constructor(
        private authservice: AuthService,
        public dialogRef: MatDialogRef<DialogOverviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    onClick(data?: boolean): void {
    console.log(data);
      if (!data) {
      this.authservice.changeUserData(this.data._id, this.data.namedata, this.position.value).subscribe(() => {
        this.dialogRef.close(true);
      });
      } else {
        this.authservice.changeUserData(this.data._id, this.data.namedata, this.details).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
   onCansel(): void {
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
  }
}
