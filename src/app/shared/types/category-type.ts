/**
 * ICategory represents a Category (Brand) from the backend
 * In the UI, this is displayed as the "parent" or "brand"
 */
export interface ICategory {
  categoryId: string;           // From backend: CategoryId
  categoryName: string;         // From backend: CategoryName (displayed as parent/brand)
  subCategoryCount?: number;    // From backend: SubCategoryCount
  productCount?: number;        // From backend: ProductCount
  productNames?: string[];      // From backend: ProductNames (optional)
  
  // Legacy/UI-specific fields (optional)
  id?: string;
  img?: string;
  parent?: string;
  children?: string[];
  productType?: string;
  products?: string[];
  status?: string;
}

/**
 * ISubCategory represents a SubCategory (Category in UI terms) from the backend
 * In the UI, this is displayed as the "child" or individual "category"
 */
export interface ISubCategory {
  subCategoryId: string;        // From backend: SubCategoryId
  subCategoryName: string;      // From backend: SubCategoryName
  categoryId: string;           // From backend: CategoryId (parent category)
  subCatAttrs: ISubCategoryAttribute[];  // From backend: SubCatAttrs
}

/**
 * ISubCategoryAttribute represents attributes/properties of a subcategory
 */
export interface ISubCategoryAttribute {
  subCatAttrId?: string;
  subCatAttrName?: string;
  subCategoryId?: string;
}