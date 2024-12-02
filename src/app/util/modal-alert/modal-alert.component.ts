import {
  Component,
  input,
  output,
  viewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  imports: [],
  templateUrl: './modal-alert.component.html',
  styleUrl: './modal-alert.component.css',
})
export class ModalAlertComponent implements AfterViewInit {
  isAddToCart = input.required<boolean>();
  //open = input.required<boolean>();
  onClose = output<void>();
  modalRef = viewChild<ElementRef>('dialogRef');

  ngAfterViewInit() {
    /* if (this.open()) {
      this?.modalInput()?.nativeElement?.showModal();
    } else {
      this?.modalInput()?.nativeElement?.close();
    } */
    if (!this.modalRef()?.nativeElement) {
      return;
    }
    this.isAddToCart()
      ? this.modalRef()?.nativeElement.showModal()
      : this.modalRef()?.nativeElement.close();
  }

  close() {
    this.onClose.emit();
  }
}
