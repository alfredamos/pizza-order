import {
  Component,
  input,
  output,
  viewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  imports: [],
  templateUrl: './modal-alert.component.html',
  styleUrl: './modal-alert.component.css',
})
export class ModalAlertComponent implements AfterViewInit {
  open = input.required<boolean>();
  onClose = output<void>();
  modalInput = viewChild<HTMLDialogElement>('dialogRef');

  ngAfterViewInit() {
    if (this.open()) {
      this.modalInput()?.showModal();
    }else{
      this.modalInput()?.close()
    }
  }

  close() {
    this.onClose.emit()
  }
}
