import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface OrderItem {
  productId: string;
  productName: string;
  productImageUrl: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface Order {
  orderId: string;
  fullName: string;
  email: string;
  phone: string;
  orderDateTime: string;
  amountBeforeDiscount: number;
  appliedCouponCode: string | null;
  couponDiscountPercent: number | null;
  amountAfterDiscount: number;
  status: string;
  paymentMethod: string;
  billingInfoId: string;
  orderItems: OrderItem[];
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;
  errorMessage = '';
  showStatusModal = false;
  showDeleteModal = false;
  showItemsModal = false;
  showUserModal = false;
  selectedOrder: Order | null = null;
  selectedOrderId: string | null = null;
  orderStatuses = ['Placed', 'Confirmed', 'Dispatched', 'Cancelled', 'Returned', 'Completed'];

  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getOrders(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if (response.success) {
          if (typeof response.message !== 'string') {
            this.orders = response.message.items;
            this.totalCount = response.message.totalCount;
            this.totalPages = Math.ceil(this.totalCount / this.pageSize);
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Unexpected response format';
            this.toastrService.error(this.errorMessage);
          }
        } else {
          this.errorMessage = typeof response.message === 'string' ? response.message : 'Failed to fetch orders';
          this.toastrService.error(this.errorMessage);
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch orders';
        this.toastrService.error('Error fetching orders');
        console.error('fetchOrders Error:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    return status;
  }

  changePage(page: number) {
    this.pageNumber = page;
    this.fetchOrders();
  }

  openItemsModal(order: Order) {
    this.selectedOrder = { ...order };
    this.showItemsModal = true;
  }

  closeItemsModal() {
    this.showItemsModal = false;
    this.selectedOrder = null;
  }

  openUserModal(order: Order) {
    this.selectedOrder = { ...order };
    this.showUserModal = true;
  }

  closeUserModal() {
    this.showUserModal = false;
    this.selectedOrder = null;
  }

  openStatusModal(order: Order) {
  if (order) {
    this.selectedOrder = { ...order };
    this.showStatusModal = true;
  } else {
    this.toastrService.error('No valid order selected');
  }
}

  closeStatusModal() {
    this.showStatusModal = false;
    this.selectedOrder = null;
    this.fetchOrders();
  }

  confirmStatusChange() {
    if (this.selectedOrder) {
      const statusIndex = this.orderStatuses.indexOf(this.selectedOrder.status);
      this.orderService.changeOrderStatus(this.selectedOrder.orderId, statusIndex).subscribe({
        next: (response) => {
          if (response.success) {
            this.toastrService.success(response.message);
            this.fetchOrders();
          } else {
            this.toastrService.error(response.message);
          }
        },
        error: (err) => {
          this.toastrService.error('Error changing order status');
          console.error('changeOrderStatus Error:', err);
        }
      });
    }
    this.showStatusModal = false;
    this.selectedOrder = null;
  }

  openDeleteModal(orderId: string) {
    this.selectedOrderId = orderId;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedOrderId = null;
  }

  confirmDelete() {
    if (this.selectedOrderId) {
      this.orderService.changeOrderStatus(this.selectedOrderId, 3).subscribe({
        next: (response) => {
          if (response.success) {
            this.toastrService.success(response.message);
            this.fetchOrders();
          } else {
            this.toastrService.error(response.message);
          }
        },
        error: (err) => {
          this.toastrService.error('Error cancelling order');
          console.error('cancelOrder Error:', err);
        }
      });
    }
    this.closeDeleteModal();
  }
}
