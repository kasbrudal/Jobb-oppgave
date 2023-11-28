import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  // Path to the JSON data
  private departmentsData = 'assets/departments.service.json';

  constructor(private http: HttpClient) {}

  // Fetch department data from the JSON file and build the department tree
  getData(): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentsData).pipe(
      map(departments => this.buildDepartmentTree(departments))
    );
  }

  // Build a tree structure from the department data
  private buildDepartmentTree(departments: Department[]): Department[] {
    const tree: Department[] = [];
    const map: { [key: number]: Department } = {};

    

    // Create a map with department OID as the key
    departments.forEach(department => {
      map[department.OID] = { ...department, children: [] };
    });

    // Connect departments to their parent departments
    departments.forEach(department => {
      if (department.DepartmentParent_OID !== null) {
        const parent = map[department.DepartmentParent_OID];

        // Perform a null check before accessing the children property
        if (parent && parent.children) {
          parent.children.push(map[department.OID]);
        }
      } else {
        // If a department has no parent
        tree.push(map[department.OID]);
      }
    });

    // Function to calculate the count of children for each department
    const calculateChildCount = (department: Department): number => {
      if (!department.children || department.children.length === 0) {
        return 0;
      }

      return department.children.length;
    };
    
    // Assign the count of immediate children to each department
    Object.values(map).forEach(dep => {
      dep.totalChildren = calculateChildCount(dep);
    });

    return tree;
  }
}

// Interface defining the structure of a department
export interface Department {
  OID: number;
  Title: string;
  Color: string;
  DepartmentParent_OID: number | null;
  children?: Department[];
  totalChildren?: number;
  selected?: boolean;
}
