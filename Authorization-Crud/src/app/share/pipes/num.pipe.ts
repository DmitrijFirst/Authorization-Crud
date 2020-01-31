import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousand'
})

export class ThousandPipe implements PipeTransform {
  transform(value: any, digits?: string): string {
    if (value) {
      let thousands = value.split(',');
      const preDecimalValue = thousands.pop();
      thousands = thousands.join(' ');
      return thousands + ' ' + preDecimalValue;
    }
    return '';
  }
}