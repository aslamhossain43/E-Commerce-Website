import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../manage/product';
@Pipe({
    name:'productFilter'
})
export class ProductFilterPipe implements PipeTransform{
    transform(products:Product[],category:string,brand:string,color:string,name:string) {
    
        if (products && products.length){
            return products.filter(item =>{
                if (category && item.category.toLowerCase().indexOf(category.toLowerCase()) === -1){
                    return false;
                }
                if (brand && item.brand.toLowerCase().indexOf(brand.toLowerCase()) === -1){
                    return false;
                }
                if (color && item.color.toLowerCase().indexOf(color.toLowerCase()) === -1){
                    return false;
                }
                if (name && item.name.toLowerCase().indexOf(name.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return products;
        }
    }

}