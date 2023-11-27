// src/app/components/departments-list/departments-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Department } from '../../services/departments.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent {
  @Input() department?: Department;
  @Output() selectedCountChanged = new EventEmitter<number>();

  selectedDepartments: number[] = [];

  // ... other methods ...

  // Toggle selection of a department
  toggleSelection(department: Department): void {
    const index = this.selectedDepartments.indexOf(department.OID);
    if (index === -1) {
      this.selectedDepartments.push(department.OID);
    } else {
      this.selectedDepartments.splice(index, 1);
    }

    this.selectedCountChanged.emit(this.selectedDepartments.length);
  }
}
