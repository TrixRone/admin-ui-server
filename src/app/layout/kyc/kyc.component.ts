import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AuthService, KycData} from '../../shared/services/auth.service';
import {DialogKycComponent} from './dialog-kyc/dialog-kyc.component';



@Component({
    selector: 'app-kyc',
    templateUrl: './kyc.component.html',
    styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   displayedColumns = ['user_id', 'email',
      'document_type', 'ip_address', 'scanData'];
    dataSource;
    name: string;
    ELEMENT_DATA: KycData[] = [];
    locator = (p: KycData, id: number) => p.id === id;
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor(private authservice: AuthService,
                public dialog: MatDialog) {}

    ngOnInit() {
      this.authservice.kycuserdata().toPromise().then((response) => {
        const account = response.body;
        account.map(p => {
          if (p.id === undefined ) {
            p.id = this.generateID();
          }
        } );
        if (account) {
          this.ELEMENT_DATA = account;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        console.log(account);
      });
    }

  openDialog(data: KycData, width?: string): void {
      const dialogRef = this.dialog.open(DialogKycComponent, {
      width: width || '450px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true ?  this.ngOnInit() : console.log('cansel');
    });
  }

  getProduct(id: number): KycData {
    return this.ELEMENT_DATA.find(p => this.locator(p, id));
  }
  generateID(): number {
    let candidate = 25000;
    while (this.getProduct(candidate) != null) {
      candidate--;
    }
    return candidate;
  }
}
