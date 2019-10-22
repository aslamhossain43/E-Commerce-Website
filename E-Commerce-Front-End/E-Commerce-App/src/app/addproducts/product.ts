export class Product {
    id: string;
    pCode: string;
    name: string;
    category: string;
    quantity: string;
    price: string;
    createdDate: string;
    lastModifiedDate: string;
    // FOR AUTH UID
    uid: string;
    // FOR FILE RESET ONLY
    selectedPFile: File;
   }