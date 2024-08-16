import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8081/api/products';

  private categoryUrl = 'http://localhost:8081/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
     // need to build URL based on product id
     const productUrl = `${this.baseUrl}/${theProductId}`;

     return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number, 
                         theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id , page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;
    console.log('searchUrl: ' + searchUrl);

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getAllProductListPaginate(thePage: number,
                            thePageSize: number):Observable<GetResponseProducts>{
    const searchUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
                            
  

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
     // need to build URL based on keyword
     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

     return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number,
                        thePageSize: number, 
                        theKeyword:string): Observable<GetResponseProducts> {

      // need to build URL based on keyword, page and size
      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      + `&page=${thePage}&size=${thePageSize}`;

      return this.httpClient.get<GetResponseProducts>(searchUrl);
}


  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }


  createProduct(data:any): Observable<any>{
    return this.httpClient.post(this.baseUrl,data);
  }

  updateProduct(id:any,data:any): Observable<any>{
    return this.httpClient.put(`${this.baseUrl}/${id}`,data);
  }

  deleteProduct(id: any):Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  

}

interface GetResponseProducts{
  _embedded:{
    products: Product[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[]
  }
}
