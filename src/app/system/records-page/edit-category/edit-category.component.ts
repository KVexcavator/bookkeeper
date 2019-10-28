import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bkp-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})

export class EditCategoryComponent implements OnInit, OnDestroy {

  sub_1: Subscription;
  
  @Input() categories: Category[]=[];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '')
    this.onCategoryChange();
  }

  onSubmit(form: NgForm){
    let { capacity, name } = form.value;
    if(capacity < 0) capacity *= -1;

    const category = new Category(name,capacity, +this.currentCategoryId)
    this.sub_1 = this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = "Категория успешно отредактирована";
        window.setTimeout(() => {
          this.message.text = '';
        }, 3000)
      })
  }

  onCategoryChange(){
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  ngOnDestroy(): void {
    if(this.sub_1) this.sub_1.unsubscribe();
  }

}
