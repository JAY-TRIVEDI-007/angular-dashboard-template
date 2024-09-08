import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {ApiService} from '../../auth/api.service';
import {
  CreateUserInterface,
  CurrentUserInterface,
  SignUpFormInterface,
  UserInterface
} from '../../shared/interfaces/auth.interface';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {
  DialogFormField, EnterPasswordDialogResponse,
  GridActionDialogData,
  GridActionDialogResponse,
} from '../../shared/interfaces/page.interface';
import {BrowserService} from '../../shared/services/browser.service';
import {CommonService} from '../../shared/services/common.service';
import {FormFieldType, GridActionType, ToasterType} from '../../shared/shared-enums';
import {GridActionDialogComponent} from '../../shared/grid-action-dialog/grid-action-dialog.component';
import {confirmPasswordValidator} from '../../shared/confirmPasswordValidator';
import {EnterPasswordDialogComponent} from "../../shared/enter-password-dialog/enter-password-dialog.component";

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
  private userPassword: string = '';
  private isAskPassword: boolean = true;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  displayedColumns: string[] = [
    'rowNumber',
    'email',
    'username',
    'first_name',
    'last_name',
    'last_login',
    'is_active',
    'is_bot',
    'action'
  ];
  dataSource = new MatTableDataSource<UserInterface>([]);
  private usersData: UserInterface[] = [];
  protected readonly gridPageSize = this.commonService.gridPageSize;

  ngOnInit() {
    this.getGridData();
  }

  ngAfterViewInit() {
    if (this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  private getGridData() {
    this.apiService.getUsersList().subscribe(records => {
      this.usersData = records;
      this.dataSource = new MatTableDataSource<UserInterface>(records);
    });
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
        name: 'is_active',
        type: FormFieldType.CHECKBOX,
        label: 'Is Active',
        defaultValue: true
      },
      {
        name: 'is_bot',
        type: FormFieldType.CHECKBOX,
        label: 'Is BOT',
        defaultValue: false
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

    dialogRef1.afterClosed().subscribe(async (response: GridActionDialogResponse) => {
      if (response.isGoodToProceed && response.data) {
        let data = response.data as CreateUserInterface;
        let userDetails: CreateUserInterface = {
          'first_name': data.first_name,
          'last_name': data.last_name,
          'username': data.username,
          'email': data.email,
          'password': data.password,
          'is_active': data.is_active,
          'is_bot': data.is_bot
        }
        this.apiService.createUser(userDetails).subscribe(user => {
          this.commonService.showSnackbar('User created successfully', ToasterType.SUCCESS);
          this.getGridData();
        });
      }
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
          name: 'is_active',
          type: FormFieldType.CHECKBOX,
          label: 'Is Active',
          disabled: this.isCurrentUser(id)
        },
        {
          name: 'is_bot',
          type: FormFieldType.CHECKBOX,
          label: 'Is BOT',
          disabled: this.isCurrentUser(id)
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

      dialogRef1.afterClosed().subscribe(async (response: GridActionDialogResponse) => {
        if (response.isGoodToProceed && response.data) {
          let data = response.data as UserInterface;
          this.apiService.editUser(id, data).subscribe(user => {
            this.commonService.showSnackbar('User edited successfully.', ToasterType.SUCCESS);
            this.getGridData();
          });
        }
        else {
          this.commonService.showSnackbar('Configuration already up to date!', ToasterType.WARNING);
        }
      });
    } else {
      this.commonService.showSnackbar("User does not exists!", ToasterType.ERROR);
    }
  }

  deleteUser(id: number) {
    if (!this.isCurrentUser(id)) {
      let user = this.usersData.find(user => user.id === id);

      if (user) {
        const dialogRef1 = this.dialog.open(EnterPasswordDialogComponent, {
          height: 'max-content',
          width: '550px',
          panelClass: 'p-0',
          data: {title: `Are you sure to delete this user?`, var1: user.email, bool1: this.isAskPassword}
        });

        dialogRef1.afterClosed().subscribe(async (response: EnterPasswordDialogResponse) => {
          if (response.isGoodToProceed) {
            if (this.isAskPassword && response.data != undefined)
              this.userPassword = response.data;
            this.apiService.deleteUser(this.userPassword, id).subscribe((item) => {
              this.commonService.showSnackbar('User deleted successfully.', ToasterType.SUCCESS);
              this.getGridData();
              this.isAskPassword = false;
              // start ask password timeout
              setTimeout(() => {
                this.isAskPassword = true;
                this.userPassword = '';
              }, this.commonService.askPasswordTimeout);
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

  isCurrentUser(id: number): boolean {
    let currentUser = this.browser.getUserDetails();
    if (currentUser) {
      return currentUser.id == id;
    }
    return false;
  }

  formatDatetime(datetime: string): string {
    return this.commonService.formatDateTime(datetime);
  }
}
