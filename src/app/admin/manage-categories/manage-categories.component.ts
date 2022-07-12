import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css'],
})
export class ManageCategoriesComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  name!: string;
  image!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  createCategory() {
    const newCategory = {
      name: this.name,
      image: this.image,
    };

    this.fileChanged();
    this.categoryService
      .addCategory(newCategory)
      .subscribe((category: Category) => this.categories.push(category));
    
    setTimeout(() => { this.ngOnInit() }, 1000)
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.dataSource = new MatTableDataSource<Category>(this.categories);
      this.dataSource.paginator = this.paginator;
    });
  }

  fileChanged() {
    const inputElement: HTMLInputElement = document.getElementById(
      'image'
    ) as HTMLInputElement;
    this.image = 'assets/' + inputElement.files![0].name;
  }

  deleteCategory(category:Category){
    this.categoryService.deleteCategory(category).subscribe();
    setTimeout(() => { this.ngOnInit() }, 100);
  }
}
