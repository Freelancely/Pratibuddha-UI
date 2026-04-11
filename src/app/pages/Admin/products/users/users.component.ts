import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import * as XLSX from 'xlsx';

interface User {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phoneNumber: string;
  role?: string;
  isBanned: boolean;
}

interface Message {
  items: User[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;
  errorMessage = '';
  showSoftDeleteModal = false;
  showPermanentDeleteModal = false;
  modalType: 'soft' | 'permanent' | null = null;
  selectedUserId: string | null = null;

  constructor(
    private usersService: UsersService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('Component initialized');
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersService.getUsers(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if (response.success) {
          if (typeof response.message !== 'string' && response.message?.items) {
            this.users = response.message.items;
            this.totalCount = response.message.totalCount ?? 0;
            this.totalPages = Math.ceil(this.totalCount / this.pageSize);
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Unexpected response format';
            this.toastrService.error(this.errorMessage);
          }
        } else {
          this.errorMessage = 'Failed to fetch users';
          this.toastrService.error(this.errorMessage);
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch users';
        this.toastrService.error('Error fetching users');
        console.error('fetchUsers Error:', err);
      }
    });
  }

  openConfirmModal(userId: string, type: 'soft' | 'permanent') {
    console.log('Opening modal for', userId, type);
    this.selectedUserId = userId;
    this.modalType = type;
    if (type === 'soft') {
      this.showSoftDeleteModal = true;
    } else {
      this.showPermanentDeleteModal = true;
    }
    this.cdr.detectChanges();
  }

  closeModal(type: 'soft' | 'permanent') {
    if (type === 'soft') {
      this.showSoftDeleteModal = false;
    } else {
      this.showPermanentDeleteModal = false;
    }
    this.selectedUserId = null;
    this.modalType = null;
  }

  confirmAction(type: 'soft' | 'permanent') {
    if (!this.selectedUserId || !this.modalType) return;

    const action = type === 'soft' ? this.usersService.banUser(this.selectedUserId) : this.usersService.deleteUser(this.selectedUserId);

    action.subscribe({
      next: (response) => {
        if (response.success && typeof response.message === 'string') {
          this.toastrService.success(response.message);
          this.fetchUsers();
        } else {
          this.toastrService.error(`Failed to ${type === 'soft' ? 'ban' : 'delete'} user`);
        }
        this.closeModal(type);
      },
      error: (err) => {
        this.toastrService.error(`Error ${type === 'soft' ? 'banning' : 'deleting'} user`);
        console.error(`${type === 'soft' ? 'softDelete' : 'permanentDelete'} Error:`, err);
        this.closeModal(type);
      }
    });
  }

  exportToExcel() {
    const worksheetData = this.users.map(user => ({
      'User ID': user.userId,
      'First Name': user.firstname,
      'Last Name': user.lastname,
      Email: user.email,
      Address: user.address,
      'Phone Number': user.phoneNumber,
      Role: user.role || '',
      Status: user.isBanned ? 'Banned' : 'Active'
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, `Users_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  changePage(page: number) {
    this.pageNumber = page;
    this.fetchUsers();
  }
}
