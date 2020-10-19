import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {
 // filter orders by state
  transform(list: any[], value: string): any {
    return value ? list.filter(item => item.state.name.toLowerCase() === value.toLowerCase()) : list;
  }

}
