import { Product } from '../cart-entities/product';
import { Person } from './person';
import { ProductsForCheckOut } from './productsforcheckout';

export class PersonAndProductsCombinedForCheckOut{
    //use same object name as use in server,,,productsForCheckOuts,,,person,,other wise error
    productsForCheckOuts:ProductsForCheckOut[];
person:Person
}