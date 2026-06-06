import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../services/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  searchText = '';

  isEditMode = false;

  newEmployee: Employee = {
    id: 0,
    name: '',
    email: '',
    department: '',
    salary: 0
  };

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  searchEmployee() {
    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addEmployee() {

    if (
      !this.newEmployee.name.trim() ||
      !this.newEmployee.email.trim() ||
      !this.newEmployee.department.trim() ||
      this.newEmployee.salary <= 0
    ) {
      alert('Please fill all fields correctly');
      return;
    }

    this.employeeService.addEmployee(this.newEmployee)
      .subscribe(() => {

        alert('Employee Added Successfully');

        this.loadEmployees();

        this.resetForm();
      });
  }

  editEmployee(employee: Employee) {
    this.isEditMode = true;

    this.newEmployee = {
      ...employee
    };
  }

  updateEmployee() {

    if (
      !this.newEmployee.name.trim() ||
      !this.newEmployee.email.trim() ||
      !this.newEmployee.department.trim() ||
      this.newEmployee.salary <= 0
    ) {
      alert('Please fill all fields correctly');
      return;
    }

    this.employeeService.updateEmployee(this.newEmployee)
      .subscribe(() => {

        alert('Employee Updated Successfully');

        this.loadEmployees();

        this.resetForm();

        this.isEditMode = false;
      });
  }

  deleteEmployee(id: number) {

    const result = confirm(
      'Are you sure you want to delete this employee?'
    );

    if (result) {

      this.employeeService.deleteEmployee(id)
        .subscribe(() => {

          alert('Employee Deleted Successfully');

          this.loadEmployees();
        });
    }
  }

  resetForm() {
    this.newEmployee = {
      id: 0,
      name: '',
      email: '',
      department: '',
      salary: 0
    };
  }
}