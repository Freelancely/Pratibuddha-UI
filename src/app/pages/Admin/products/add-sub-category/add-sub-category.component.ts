import { Component, OnInit, signal, computed, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SubCategoryService, SubCategory, SubAttribute } from '../../services/sub-category.service';
import { CategoryService, Category } from '../../services/categories.service';

interface LocalSubAttribute extends SubAttribute {
  possibleValuesString?: string;
}

@Component({
  selector: 'app-add-sub-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  Math = Math;
  subCategoryForm: FormGroup;
  isEditMode = false;
  categories = signal<Category[]>([]);
  attributes = signal<LocalSubAttribute[]>([]);
  subCategories = signal<SubCategory[]>([]);
  selectedCategoryId = signal<string>('');
  subCategoriesLoading = signal(false);
  subCategoriesError = signal<string | null>(null);

  // Search & pagination
  subCategorySearchTerm = '';
  subItemsPerPage = 10;
  subCurrentPage = 1;

  errorMessage = signal<string | null>(null);

  isSubmitDisabled = computed(() => {
    const formInvalid = this.subCategoryForm.invalid;
    const attributesInvalid = this.attributes().some(attr => {
      const isNameValid = !attr.attributeName || attr.attributeName.trim() === '';
      const possibleValues = attr.possibleValuesJson || [];
      const isValuesRequired = attr.type !== 'string' && possibleValues.length === 0;
      return isNameValid || isValuesRequired;
    });
    console.log('Form Invalid:', formInvalid, this.subCategoryForm.errors);
    console.log('Form Controls:', {
      name: this.subCategoryForm.get('name')?.errors,
      categoryId: this.subCategoryForm.get('categoryId')?.errors
    });
    console.log('Attributes:', this.attributes());
    console.log('Attributes Invalid:', attributesInvalid);
    return formInvalid || attributesInvalid;
  });

  // Returns filtered + searched + paginated subcategories for the current view
  filteredSubCategories(): SubCategory[] {
    let list = this.subCategories();
    const selectedId = this.selectedCategoryId();
    if (selectedId) {
      list = list.filter(sub => sub.categoryId === selectedId);
    }
    const term = (this.subCategorySearchTerm || '').trim().toLowerCase();
    if (term) {
      list = list.filter(s => s.name.toLowerCase().includes(term));
    }
    const start = (this.subCurrentPage - 1) * this.subItemsPerPage;
    return list.slice(start, start + this.subItemsPerPage);
  }

  onSubCategorySearch(): void {
    this.subCurrentPage = 1;
  }

  subTotalPages(): number {
    const selectedId = this.selectedCategoryId();
    let list = this.subCategories();
    if (selectedId) {
      list = list.filter(sub => sub.categoryId === selectedId);
    }
    const term = (this.subCategorySearchTerm || '').trim().toLowerCase();
    if (term) {
      list = list.filter(s => s.name.toLowerCase().includes(term));
    }
    return Math.max(1, Math.ceil(list.length / this.subItemsPerPage));
  }

  getSubPageNumbers(): number[] {
    const total = this.subTotalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  subPreviousPage(): void {
    if (this.subCurrentPage > 1) this.subCurrentPage--;
  }

  subNextPage(): void {
    if (this.subCurrentPage < this.subTotalPages()) this.subCurrentPage++;
  }

  goToSubPage(page: number): void {
    const total = this.subTotalPages();
    if (page >= 1 && page <= total) this.subCurrentPage = page;
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {
    this.subCategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit() {
    const state = ((history.state ?? {}) as { subCategory?: SubCategory; categoryId?: string });

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        console.log('Categories loaded:', categories);
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.errorMessage.set('Failed to load categories: ' + error.message);
        console.error('Error fetching categories:', error.message);
      }
    });

    if (state.subCategory) {
      this.isEditMode = true;
      this.subCategoryForm.patchValue({
        name: state.subCategory.name,
        categoryId: state.subCategory.categoryId
      });
      this.selectedCategoryId.set(state.subCategory.categoryId);
      const attributes = (state.subCategory.attributes || []).map((attr: SubAttribute) => ({
        ...attr,
        possibleValuesString: (attr.possibleValuesJson || []).join(', ')
      }));
      this.attributes.set(attributes);
      this.cdr.markForCheck();
    } else if (state.categoryId) {
      this.subCategoryForm.patchValue({ categoryId: state.categoryId });
      this.selectedCategoryId.set(state.categoryId);
      this.cdr.markForCheck();
    } else {
      const subCategoryId = this.router.parseUrl(this.router.url).queryParams['id'];
      if (subCategoryId) {
        this.subCategoryService.getAllSubCategories().subscribe({
          next: (subCategories) => {
            const subCategory = subCategories.find(sc => sc.id === subCategoryId);
            if (subCategory) {
              this.isEditMode = true;
              this.subCategoryForm.patchValue({
                name: subCategory.name,
                categoryId: subCategory.categoryId
              });
              this.selectedCategoryId.set(subCategory.categoryId);
              const attributes = (subCategory.attributes || []).map((attr: SubAttribute) => ({
                ...attr,
                possibleValuesString: (attr.possibleValuesJson || []).join(', ')
              }));
              this.attributes.set(attributes);
              this.cdr.markForCheck();
            } else {
              this.errorMessage.set('Sub-category not found');
            }
          },
          error: (error) => {
            this.errorMessage.set('Failed to load sub-category: ' + error.message);
            console.error('Error fetching sub-category:', error.message);
          }
        });
      }
    }

    this.subCategoryForm.get('categoryId')?.valueChanges.subscribe(value => {
      this.selectedCategoryId.set(value ?? '');
    });

    this.loadSubCategories();
  }

  private loadSubCategories(): void {
    this.subCategoriesLoading.set(true);
    this.subCategoriesError.set(null);

    this.subCategoryService.getAllSubCategories().subscribe({
      next: (subCategories) => {
        this.subCategories.set(subCategories);
        this.subCategoriesLoading.set(false);
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.subCategoriesError.set('Failed to load sub-categories: ' + error.message);
        this.subCategoriesLoading.set(false);
        console.error('Error fetching sub-categories:', error.message);
      }
    });
  }

  getCategoryName(categoryId: string): string {
    return this.categories().find(category => category.id === categoryId)?.name || 'Unknown';
  }

  addAttribute() {
    this.attributes.update(attrs => [
      ...attrs,
      { attributeName: '', possibleValuesJson: [], possibleValuesString: '', type: 'dropdown', isRequired: false }
    ]);
    this.cdr.markForCheck();
  }

  removeAttribute(index: number) {
    this.attributes.update(attrs => attrs.filter((_, i) => i !== index));
    this.cdr.markForCheck();
  }

  updateValues(index: number, value: string) {
    const values = value
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0);
    this.attributes.update(attrs => {
      const newAttrs = [...attrs];
      newAttrs[index] = { ...newAttrs[index], possibleValuesJson: values, possibleValuesString: value };
      return newAttrs;
    });
    this.cdr.markForCheck();
  }

  onTypeChange(index: number) {
    this.attributes.update(attrs => {
      const newAttrs = [...attrs];
      if (newAttrs[index].type === 'string') {
        newAttrs[index] = {
          ...newAttrs[index],
          possibleValuesJson: null, // Set to null for string type
          possibleValuesString: '',
          attributeName: newAttrs[index].attributeName?.trim() || ''
        };
      } else {
        newAttrs[index] = {
          ...newAttrs[index],
          possibleValuesJson: newAttrs[index].possibleValuesJson || [],
          possibleValuesString: (newAttrs[index].possibleValuesJson || []).join(', ')
        };
      }
      return newAttrs;
    });
    this.cdr.markForCheck();
  }

  onAttributeBlur(index: number, field: string) {
    this.attributes.update(attrs => {
      const attr = attrs[index];
      if (field === 'attributeName') {
        attr.attributeName = attr.attributeName?.trim() || '';
      } else if (field === 'possibleValuesString') {
        attr.possibleValuesString = attr.possibleValuesString?.trim() || '';
        attr.possibleValuesJson = attr.possibleValuesString
          .split(',')
          .map(v => v.trim())
          .filter(v => v.length > 0) || null;
      }
      return [...attrs];
    });
    this.cdr.markForCheck();
  }

  onSubmit() {
    if (!this.isSubmitDisabled()) {
      const formValue = this.subCategoryForm.value;
      const payload = {
        subCategoryName: formValue.name,
        categoryId: formValue.categoryId,
        addSubAttrDTO: this.attributes().map(attr => ({
          attributeName: attr.attributeName,
          possibleValuesJson: attr.type === 'string' ? null : (attr.possibleValuesJson || []),
          type: attr.type,
          isRequired: attr.isRequired,
          attributeId: attr.attributeId
        }))
      };
      this.subCategoryService.addSubCategory(payload).subscribe({
        next: (response) => {
          console.log('Sub-category saved:', response);
          alert('Sub-category saved successfully!');
          this.location.back();
        },
        error: (error) => {
          console.error('Error saving sub-category:', error.message);
          alert('Failed to save sub-category: ' + error.message);
        }
      });
    } else {
      alert('Please fill all required fields and ensure attributes are valid.');
    }
  }

  trackByIndex(index: number, attr: LocalSubAttribute): number {
    return index;
  }

  editSubCategory(sub: SubCategory): void {
    this.isEditMode = true;
    this.subCategoryForm.patchValue({
      name: sub.name,
      categoryId: sub.categoryId
    });
    this.selectedCategoryId.set(sub.categoryId);
    const attributes = (sub.attributes || []).map((attr: SubAttribute) => ({
      ...attr,
      possibleValuesString: (attr.possibleValuesJson || []).join(', ')
    }));
    this.attributes.set(attributes as LocalSubAttribute[]);
    this.cdr.markForCheck();
  }

  deleteSubCategory(sub: SubCategory): void {
    if (!confirm(`Delete subcategory "${sub.name}"?`)) return;
    // call service - if delete endpoint exists it will remove on backend
    // remove locally after success
    (this.subCategoryService as any).deleteSubCategory?.(sub.id)?.subscribe?.({
      next: () => {
        this.subCategories.update(list => list.filter(s => s.id !== sub.id));
        alert('Sub-category deleted');
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error('Failed to delete sub-category', err);
        alert('Failed to delete sub-category: ' + (err?.message || err));
      }
    });
  }

  cancel() {
    this.location.back();
  }
}
