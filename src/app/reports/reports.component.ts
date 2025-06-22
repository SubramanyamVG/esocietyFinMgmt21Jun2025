import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  selectedMonth = '';
  selectedYear = '';

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

  years = ['2024', '2025'];

  summary = {
    totalCollections: 75000,
    pendingDues: 9500,
    totalExpenses: 32750,
    familiesContributed: 45
  };

  allActivityLogs = [
    { date: '2025-06-20', action: 'Generated Maintenance for July 2025' },
    { date: '2025-06-18', action: 'Recorded payment from A-102' },
    { date: '2025-05-25', action: 'Created AGM Meeting Activity' },
    { date: '2024-12-31', action: 'Finalized year-end reports' }
  ];

  get filteredLogs() {
    return this.allActivityLogs.filter(log => {
      const [year, month] = log.date.split('-');
      const monthName = this.months[parseInt(month, 10) - 1];

      return (!this.selectedYear || this.selectedYear === year) &&
             (!this.selectedMonth || this.selectedMonth === monthName);
    });
  }
}
