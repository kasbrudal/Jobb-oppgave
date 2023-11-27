// src/app/pages/department-page/department-page.component.ts
import { Component, OnInit } from '@angular/core';
import { DepartmentsService, Department } from '../../services/departments.service';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.css']
})
export class DepartmentPageComponent implements OnInit {
  departments?: Department[];
  selectedCounts: { [key: number]: number } = {};

  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit(): void {
    this.departmentsService.getData().subscribe((result) => { 
      this.departments = result;
    });
  }

  updateSelectedCount(count: number, departmentId: number): void {
    this.selectedCounts[departmentId] = count;
  }
}
