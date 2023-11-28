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
  selectedCounts: { [key: number]: number } = {};


  toggleSelection(department: Department): void {
    const index = this.selectedDepartments.indexOf(department.OID);
    if (index === -1) {
      this.selectedDepartments.push(department.OID);
    } else {
      this.selectedDepartments.splice(index, 1);
    }

    // Checking if the correct OID is selected
    console.log('Selected departmentss:', this.selectedDepartments);
    this.selectedCountChanged.emit(this.selectedDepartments.length);
  }

  updateSelectedCount(count: number, departmentId: number): void {
    this.selectedCounts[departmentId] = count;
  }
  
}
