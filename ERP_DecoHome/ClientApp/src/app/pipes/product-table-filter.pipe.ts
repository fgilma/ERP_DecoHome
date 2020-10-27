import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productTableFilter'
})
export class ProductTableFilterPipe implements PipeTransform {
  // filter products by category
  transform(list: any[], value: string): any {
    return value ? list.filter(item => item.category === value) : list;
  }

}
