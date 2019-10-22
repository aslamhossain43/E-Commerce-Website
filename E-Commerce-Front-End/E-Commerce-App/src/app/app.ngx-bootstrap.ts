import { NgModule } from '@angular/core';
import { ModalModule, BsDropdownModule, TooltipModule } from 'ngx-bootstrap';
@NgModule({
    imports: [ModalModule, BsDropdownModule, TooltipModule],
    exports: [ModalModule, BsDropdownModule, TooltipModule]
})
export class NgxBootstrapModule { }