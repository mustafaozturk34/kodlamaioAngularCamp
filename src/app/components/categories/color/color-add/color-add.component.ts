import { ColorService } from './../../../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
  providers: [MessageService, ColorService]
})
export class ColorAddComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private messageService:MessageService
  ) {}

  colorAddForm: FormGroup;
  color: Color = new Color();

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  add() {
    if (this.colorAddForm.valid) {
      this.color = Object.assign({}, this.colorAddForm.value);
    }

    this.colorService.addColor(this.color).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: data.name,
        detail: 'Color successfully added.'
      })
      setTimeout(() => {
        location.reload()
      },1000)
    });
  }
}
