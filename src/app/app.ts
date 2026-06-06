import { Component } from '@angular/core';
import { EmployeeListComponent } from './components/employee-list/employee-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
