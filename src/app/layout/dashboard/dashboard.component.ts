import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AuthService, PeriodicElement} from '../../shared/services/auth.service';
import {DialogOverviewComponent} from '../material-components/dialog-overview/dialog-overview.component';
import {WebsocketService} from '../../websocket.service';



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   displayedColumns = ['_id', 'activated',
      'authorities', 'authentication_key', 'bsxAddress', 'authentication_type', 'email'];
    dataSource;
    places: Array<any> = [];
    name: string;
    base64Date;
    ELEMENT_DATA: PeriodicElement[] = [];
    locator = (p: PeriodicElement, id: number) => p.id === id;
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor(private authservice: AuthService,
                public dialog: MatDialog,
                private websocket: WebsocketService) {
      websocket.connect('ws://localhost:3001').subscribe((res) => {
        console.log(JSON.parse(res.data));
      }, (error) => console.log(error));
    }

    ngOnInit() {
      this.authservice.userdata().toPromise().then((response) => {
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

  openDialog(id: string, namedata: string, data: string, width?: string): void {
      if (namedata === 'statusemail') {
        data.toString();
      }
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: width || '450px',
      data: { _id: id, namedata: namedata, data: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true ?  this.ngOnInit() : console.log('cansel');
    });
  }

  getProduct(id: number): PeriodicElement {
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
