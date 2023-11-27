// src/app/services/selected-count.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedCountService {
  private selectedCountsSubject = new BehaviorSubject<{ [key: number]: number }>({});
  selectedCounts$ = this.selectedCountsSubject.asObservable();

  updateSelectedCount(departmentId: number, count: number): void {
    const currentCounts = this.selectedCountsSubject.value;
    const updatedCounts = { ...currentCounts, [departmentId]: count };
    this.selectedCountsSubject.next(updatedCounts);
  }
}
