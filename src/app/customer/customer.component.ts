import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private service: SharedService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  CustomersList: any = [];
  intialQuery: any = "?page=1&pageSize=10";

  pageEvent: PageEvent;
  dataSource: any;
  length: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  filterForm: FormGroup;
  selectedForm = "filterForm";
  stateList: Object[] = [
    {
      state: "Valid",
      value: true
    },
    {
      state: "Invalid",
      value: false
    }
  ];

  displayedColumns: string[] = [
    'customerName',
    'phoneNumber',
    'isValidPhoneNumber',
    'countryName',
    'countryCode'
  ];
  loading: boolean = false;
  lengthData = 0;

  ngOnInit() {
    this.filterForm = new FormGroup({
      'customerName': new FormControl(null),
      'phoneNumber': new FormControl(null),
      'isValidPhoneNumber': new FormControl(null),
      'countryName': new FormControl(null),
      'countryCode': new FormControl(null)
    });
    this.paginator.pageIndex = 0;
    this.refreshDepList(this.filterForm);
  }

  refreshDepList(formObject) {
    this.loading = true;
    this.service.getCustomerList(this.prepareQueryString(formObject.value))
      .pipe(first())
      .subscribe(
        response => {
          this.dataSource = response['data'] ? response['data'] : [];
          this.loading = false;
          if (response['hasNext']) {
            this.lengthData = (this.currentPage * this.pageSize) + 1;
          } else {
            this.lengthData = (this.currentPage * this.pageSize);
          }
          this.dataSource.forEach(function(customer){ 
            if(customer['validPhoneNumber']) {
              customer['phoneNumberState'] = "Valid";
            } else {
              customer['phoneNumberState'] = "Invalid";
            } 
          });
        },
        error => {
          this.loading = false;
          console.log(error);
        });
  }

  public async getServerData(event?: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    if (event.pageSize != this.pageSize) {
      this.currentPage = 1;
      event.pageIndex = 0;
      this.paginator.pageIndex = 0;
    }
    this.pageSize = event.pageSize;
    await this.applyFilter();
  }

  async applyFilter(restPagesFlag?: boolean) {
    if (restPagesFlag) {
      this.currentPage = 1;
      this.paginator.pageIndex = 0;
    }

    this.dataSource = null;

    this.selectedForm = "filterForm";
    this.filterForm.updateValueAndValidity();
    this.refreshDepList(this.filterForm);
  }

  prepareQueryString(formObject) {
    let prepared = {}
    formObject.pageSize = this.pageSize;
    formObject.page = this.currentPage;
    for (let key in formObject) {
      if (formObject[key] && formObject[key] != "null") {
          prepared[key] = formObject[key].toString().trim();
      }
    }
    let qs = '?';
    for (let key in prepared) {
      qs += key + '=' + prepared[key] + '&';
    }
    console.log(qs)
    return qs
  }

}