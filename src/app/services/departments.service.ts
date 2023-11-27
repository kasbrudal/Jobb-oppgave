// src/app/services/departments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private departmentsData = 'assets/departments.service.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentsData).pipe(
      map(departments => this.buildDepartmentTree(departments))
    );
  }

  private buildDepartmentTree(departments: Department[]): Department[] {
    const tree: Department[] = [];
    const map: { [key: number]: Department } = {};

     // Function to calculate the count of children for each department
     const calculateChildCount = (department: Department): number => {
      if (!department.children || department.children.length === 0) {
        return 0;
      }

      return department.children.length;
    };
  
    departments.forEach(department => {
      map[department.OID] = { ...department, children: [] };
    });
  
    departments.forEach(department => {
      if (department.DepartmentParent_OID !== null) {
        const parent = map[department.DepartmentParent_OID];
  
        // Perform a null check before accessing the children property
        if (parent && parent.children) {
          parent.children.push(map[department.OID]);
        }
      } else {
        tree.push(map[department.OID]);
      }
    });

    // Assign the count of immediate children to each department
    Object.values(map).forEach(dep => {
      dep.totalChildren = calculateChildCount(dep);
    });
    
    return tree;
  }
 
}

export interface Department {
  OID: number;
  Title: string;
  Color: string;
  DepartmentParent_OID: number | null;
  children?: Department[];
  totalChildren?: number;
  selected?: boolean;
}
