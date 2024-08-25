import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {ApiService} from '../../auth/api.service';
import {UserInterface} from '../../shared/interfaces/auth.interface';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {DialogFormField, GridActionDialogData} from '../../shared/interfaces/page.interface';
import {BrowserService} from '../../shared/services/browser.service';
import {CommonService} from '../../shared/services/common.service';
import {FormFieldType, GridActionType, ToasterType} from '../../shared/shared-enums';
import {GridActionDialogComponent} from "../../shared/grid-action-dialog/grid-action-dialog.component";
import {confirmPasswordValidator} from "../../shared/confirmPasswordValidator";

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    NgIf
  ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.scss'
})
export class UserManagerComponent implements OnInit, AfterViewInit {
  private apiService: ApiService = inject(ApiService);
  private browser: BrowserService = inject(BrowserService);
  private commonService: CommonService = inject(CommonService);
  private dialog: MatDialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'email',
    'username',
    'first_name',
    'last_name',
    'is_staff',
    'is_bot',
    'action'
  ];
  dataSource = new MatTableDataSource<UserInterface>([]);
  private usersData: UserInterface[] = [];

  ngOnInit() {
    this.apiService.getUsersList().subscribe(records => {
      this.usersData = records;
      this.dataSource = new MatTableDataSource<UserInterface>(records);
    });
  }

  ngAfterViewInit() {
    if (this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  addUser(): void {
    const formFields: DialogFormField[] = [
      {
        name: 'email',
        type: FormFieldType.EMAIL,
        label: 'Email',
        required: true
      },
      {
        name: 'username',
        type: FormFieldType.TEXT,
        label: 'Username',
        required: true
      },
      {
        name: 'first_name',
        type: FormFieldType.TEXT,
        label: 'First Name',
        required: true
      },
      {
        name: 'last_name',
        type: FormFieldType.TEXT,
        label: 'Last Name',
        required: true
      },
      {
        name: 'is_staff',
        type: FormFieldType.CHECKBOX,
        label: 'Is Active',
        defaultValue: true
      },
      {
        name: 'is_bot',
        type: FormFieldType.CHECKBOX,
        label: 'Is BOT'
      },
      {
        name: 'password',
        type: FormFieldType.PASSWORD,
        label: 'Password',
        required: true
      },
      {
        name: 'confirmPassword',
        type: FormFieldType.PASSWORD,
        label: 'Confirm Password',
        required: true
      }
    ];

    const dialogData: GridActionDialogData = {
      title: 'Add User',
      gridAction: GridActionType.CREATE,
      formFields: formFields,
      formValidators: [confirmPasswordValidator]
    };

    const dialogRef1 = this.dialog.open(GridActionDialogComponent, {
      height: 'max-content',
      width: '450px',
      panelClass: 'p-0',
      data: dialogData
    });

    dialogRef1.afterClosed().subscribe(async (finalData: boolean) => {
      // if (finalData) {
      //   this.apiService.deleteUser(id).subscribe((item) => {
      //     console.log(item);
      //   });
      // }
      console.log(finalData);
    });
  }

  editUser(id: number) {
    const user = this.usersData.find(user => user.id === id);
    if (user) {
      const formFields: DialogFormField[] = [
        {
          name: 'email',
          type: FormFieldType.EMAIL,
          label: 'Email'
        },
        {
          name: 'username',
          type: FormFieldType.TEXT,
          label: 'Username'
        },
        {
          name: 'first_name',
          type: FormFieldType.TEXT,
          label: 'First Name'
        },
        {
          name: 'last_name',
          type: FormFieldType.TEXT,
          label: 'Last Name'
        },
        {
          name: 'is_staff',
          type: FormFieldType.CHECKBOX,
          label: 'Is Active'
        },
        {
          name: 'is_bot',
          type: FormFieldType.CHECKBOX,
          label: 'Is BOT'
        }
      ];

      const dialogData: GridActionDialogData = {
        title: 'Edit User',
        gridAction: GridActionType.EDIT,
        formFields: formFields,
        formData: user
      };

      const dialogRef1 = this.dialog.open(GridActionDialogComponent, {
        height: 'max-content',
        width: '550px',
        data: dialogData
      });

      dialogRef1.afterClosed().subscribe(async (finalData: boolean) => {
        // if (finalData) {
        //   this.apiService.deleteUser(id).subscribe((item) => {
        //     console.log(item);
        //   });
        // }
        console.log(finalData);
      });
    } else {
      this.commonService.showSnackbar("User does not exists!", ToasterType.ERROR);
    }
  }

  deleteUser(id: number) {
    if (!this.IsCurrentUser(id)) {
      let user = this.usersData.find(user => user.id === id);

      if (user) {
        const dialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
          height: 'max-content',
          width: '550px',
          panelClass: 'p-0',
          data: {title: `Are you sure to delete ${user.email} user?`}
        });

        dialogRef1.afterClosed().subscribe(async (finalData: boolean) => {
          if (finalData) {
            this.apiService.deleteUser(id).subscribe((item) => {
              console.log(item);
            });
          }
        });
      } else {
        this.commonService.showSnackbar("User does not exists!", ToasterType.ERROR);
      }
    } else {
      this.commonService.showSnackbar("You can't delete current user!", ToasterType.ERROR);
    }
  }

  IsCurrentUser(id: number): boolean {
    let currentUser = this.browser.getUserDetails();
    if (currentUser) {
      return currentUser.id == id;
    }
    return false;
  }
}
