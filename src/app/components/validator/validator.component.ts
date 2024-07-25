import {Component, Input, OnDestroy} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'em-validator',
  templateUrl: './validator.component.html',
  imports: [CommonModule],
  styleUrls: ['./validator.component.scss']
})
export class ValidatorComponent implements OnDestroy {
  @Input() field: any;
  @Input() validationMessage: string;

  private _control: AbstractControl;

  constructor() {
  }

  get fieldControl(): AbstractControl {
    return this._control;
  }

  @Input() set fieldControl(value: AbstractControl) {
    this._control = value;
  }

  ngOnDestroy(): void {
    this._control = null;
    this.field = null;
  }
}
