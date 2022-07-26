import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/Category';
import { Product } from 'src/app/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  name!: string;
  image!: string;
  category!: string;
  price!: number;
  unit!: string;
  description!: string;
  discountedPrice: number = 0;
  hasDiscount: boolean = true;

  editName!: string;
  editImage?: string;
  editCategory!: string;
  editPrice!: number;
  editUnit!: string;
  editDescription!: string;
  editDiscountedPrice!: number;
  editHasDiscount!: boolean;

  existingImage!: string;
  selectedProduct!: string;
  productId!: number;

  searchTerm!:any;
  myControl = new FormControl<string | Product>('');
  options: Product[] = [];
  filteredOptions!: Observable<Product[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    (<HTMLInputElement>document.getElementById('image')).value = '';
    (<HTMLInputElement>document.getElementById('editImage')).value = '';
    (<HTMLInputElement>document.getElementById('price')).value = '';

    this.name = '';
    this.image = '';
    this.unit = '';
    this.description = '';

    this.getCategories();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(product: Product): string {
    return product && product.name ? product.name : '';
  }

  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
      this.options =products;
    });
  }

  createProduct() {
    const newProduct = {
      name: this.name,
      price: this.price,
      quantity: 1,
      image: this.image,
      category: this.category,
      unit: this.unit,
      description: this.description,
      discountedPrice: this.hasDiscount ? this.discountedPrice : 0,
      visibility: true,
    };

    if (!this.name) {
      this._snackBar.open('Please enter a name!', 'Close', {
        duration: 2000,
      });
    } else if (!this.price) {
      this._snackBar.open('Please enter a price!', 'Close', {
        duration: 2000,
      });
    } else if (!this.image) {
      this.fileChanged();
      this._snackBar.open('Please upload an image!', 'Close', {
        duration: 2000,
      });
    } else if (!this.unit) {
      this._snackBar.open('Please enter a unit!', 'Close', {
        duration: 2000,
      });
    } else if (!this.description) {
      this._snackBar.open('Please enter a description!', 'Close', {
        duration: 2000,
      });
    } else if (this.hasDiscount && this.discountedPrice == 0) {
      this._snackBar.open('Please enter a discounted price!', 'Close', {
        duration: 2000,
      });
    } else {
      this.fileChanged();
      ($('#addModal') as any).modal('hide');
      this.productService
        .addProduct(newProduct)
        .subscribe((product: Product) => this.products.push(product));

      setTimeout(() => {
        this._snackBar.open(newProduct.name + ' created!', 'Close', {
          duration: 2000,
        });
        this.ngOnInit();
      }, 1000);
    }

    console.log('discount: ' + this.hasDiscount);
  }

  fileChanged() {
    try {
      var inputElement: HTMLInputElement = document.getElementById(
        'image'
      )! as HTMLInputElement;
      this.image = 'assets/' + inputElement.files![0].name;
    } catch {
      this.image = 'assets/logo.png';
    }
  }

  fileChangedEdit() {
    const inputElement: HTMLInputElement = document.getElementById(
      'editImage'
    ) as HTMLInputElement;
    this.editImage = 'assets/' + inputElement.files![0].name;
  }

  deleteConfirmation(event: any) {
    this.productId = event.target.dataset.sectionvalue;
    this.productService.getProduct(this.productId).subscribe((product) => {
      this.selectedProduct = product.name;
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe();
    setTimeout(() => {
      this._snackBar.open(this.selectedProduct + ' deleted!', 'Close', {
        duration: 2000,
      });
      this.ngOnInit();
    }, 100);
  }

  editProduct(event: any) {
    this.productId = event.target.dataset.sectionvalue;
    this.productService.getProduct(this.productId).subscribe((product) => {
      this.editName = product.name;
      this.editCategory = product.category;
      this.existingImage = product.image;
      this.editPrice = product.price;
      this.editUnit = product.unit;
      this.editDescription = product.description;
      this.editDiscountedPrice = product.discountedPrice;
    });
  }

  updateProductChanges() {
    const updateProduct = {
      name: this.editName,
      category: this.editCategory,
      image: this.editImage == null ? this.existingImage : this.editImage,
      price: this.editPrice,
      quantity: 1,
      unit: this.editUnit,
      description: this.editDescription,
      discountedPrice: this.editDiscountedPrice,
      visibility: true,
      id: this.productId,
    };
    if (this.editImage != null) {
      this.fileChangedEdit();
    }
    this.productService.updateProduct(updateProduct).subscribe(() => {
      setTimeout(() => {
        this._snackBar.open(updateProduct.name + ' updated!', 'Close', {
          duration: 2000,
        });
        this.ngOnInit();
      }, 100);
    });
  }

  toggleVisibility(product: Product) {
    product.visibility = !product.visibility;
    this.productService.updateVisiblity(product).subscribe();
  }

  toggleCheckBox(event: any) {
    if (event.target.checked) {
      this.hasDiscount = true;
    } else {
      this.hasDiscount = false;
      (<HTMLInputElement>document.getElementById('discountedPrice')).value = '';
    }
  }

  toggleCheckBoxEdit(event: any) {
    if (event.target.checked) {
      this.editHasDiscount = true;
      (<HTMLInputElement>(
        document.getElementById('editDiscountedPrice')
      )).disabled = false;
    } else {
      this.editHasDiscount = false;
      (<HTMLInputElement>document.getElementById('editDiscountedPrice')).value =
        '';
      (<HTMLInputElement>(
        document.getElementById('editDiscountedPrice')
      )).disabled = true;
      this.editDiscountedPrice = 0;
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  search(){
    if(this.searchTerm){
      this.productService.getProducts().subscribe((products) => {
        this.products = products.filter( products =>
          (products.name.toLocaleLowerCase().includes(this.searchTerm.toLowerCase())
          ||products.id==this.searchTerm
          ||products.category?.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()))
        )
      });
    }else{
      this.productService.getProducts().subscribe((products) => {
        this.products = products;
      });
    }
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.dataSource.paginator = this.paginator;
  }  
}
