import { Component, OnInit} from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
@Component({
    selector: 'product1-products',
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string ='Product List';
    imageWidth: number =50;
    imageMargin: number=2;
    showImage:boolean= false;
    errorMessage:string='';
    
    //getters and setters for filtering by names
    private _listFilter: string= '';
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        console.log('In setter:', value);
        this.filteredProducts = this.performFilter(value);
    }
    filteredProducts: IProduct[] = [];

    products: IProduct[]= [];
        
        //injecting service
        constructor(private productService: ProductService){}
        performFilter(filterBy: string): IProduct[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy));
        }
        toggleImage(): void{
            this.showImage= !this.showImage;
        }
        //lifecycle hooks
        ngOnInit(): void {
            this.productService.getProducts().subscribe({ //subscribing observable
                next: products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                
                error: err => {this.errorMessage= err ;
                    console.log('Error Occurs',this.errorMessage);
                }
                    //displying error message

            });
           
            //this.listFilter= 'cart'; //initially setting default value
        }
        onRatingClicked(message: string): void{
            this.pageTitle = 'Product List: ' + message;
        }
}

