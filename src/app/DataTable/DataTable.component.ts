import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { UserData } from '../interfaces/UserDataInterface';
import data from '../assets/data';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from '../pipes/Highlight.pipe';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightPipe],
  templateUrl: './DataTable.component.html',
  styleUrl: './DataTable.component.scss',
})
export class DataTableComponent implements OnInit {
  users: UserData[] = data;
  filteredUsers: UserData[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  sortColumn: string = '';
  sortDirection: string = 'asc';
  filterValue: string = '';
  columns: { name: string; visible: boolean }[] = [
    { name: 'picture', visible: true },
    { name: 'isActive', visible: true },
    { name: 'name.first', visible: true },
    { name: 'name.last', visible: true },
    { name: 'age', visible: true },
    { name: 'company', visible: true },
    { name: 'email', visible: true },
    { name: 'balance', visible: true },
    { name: 'address', visible: true },
    { name: 'tags', visible: true },
    { name: 'favoriteFruit', visible: true },
  ];
  visibleColumns: { name: string; visible: boolean }[] = this.columns;

  ngOnInit() {
    this.applyFilters();
  }
  itemsPerPageOptions: number[] = [10, 25, 50, 100]; // Add more options if needed
  onItemsPerPageChange() {
    this.currentPage = 1; // Reset to the first page when changing the number of records per page
  }
  applyFilters() {
    this.filteredUsers = this.users.filter((user) => {
      // Применение фильтрации по полю "name" и "email"
      return (
        (user.name?.first &&
          user.name.first
            .toLowerCase()
            .includes(this.filterValue.toLowerCase())) ||
        (user.name?.last &&
          user.name.last
            .toLowerCase()
            .includes(this.filterValue.toLowerCase())) ||
        (user.email &&
          user.email.toLowerCase().includes(this.filterValue.toLowerCase()))
      );
    });

    this.totalItems = this.filteredUsers.length;
    this.currentPage = 1;
  }

  get getVisibleColumns() {
    return this.visibleColumns.filter((el) => el.visible);
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredUsers.sort((a, b) => {
      const valueA = this.getValue(a, column);
      const valueB = this.getValue(b, column);

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getValue(obj: any, column: string) {
    const result = column
      .split('.')
      .reduce((o, i) => (o[i] ? o[i] : false), obj);
    if (Array.isArray(result)) {
      return result.join(', ');
    }

    return result;
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  toggleColumn(column: { name: string; visible: boolean }) {
    const index = this.visibleColumns.findIndex((c) => c.name === column.name);

    if (index !== -1) {
      this.visibleColumns[index].visible = !this.visibleColumns[index].visible;
    }

    console.log(this.visibleColumns);
  }
}
