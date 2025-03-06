import { Directive, ElementRef, forwardRef, HostListener, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true,
}

@Directive({
  selector: 'input([type=date])[formControlName],input([type=date])[formContro], input([type=date])[ngModel]',
  providers: [DATE_VALUE_PROVIDER]
})
export class DateValueAccessorDirective implements ControlValueAccessor {

  constructor(private element: ElementRef) { }

  @HostListener('input', ['$event.target.valueAsDate'])
  private onChange!: Function;

  @HostListener('blur', ['$event.target.valueAsDate'])
  private onTouched!: Function;
  
  // Update in the other direction (Event based). We need to listen to the host elements
  // input event, so that we can update the FormControl's value, whenever user types anything
  // into the input element.
  registerOnChange(fn: Function) {
    this.onChange = (valueAsDate: Date) => { fn(valueAsDate); };
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  // This function is part of the ControlValueAccessor interface and it is called whenever
  // the value of a FormControl changes, updating the html element of the corresponding
  // form control value changes.
  writeValue(newValue: any) {
    if (newValue instanceof Date) {
      // yyyy-mm-dd
      this.element.nativeElement.value = newValue.toISOString().split('T')[0];
      // yyyy-mm-ddThh:mm:ss.000Z
      // yyyy-mm-dd - after splitting
    }
  }

}
