import { ColorService } from '../../../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css'],
  providers: [ColorService, MessageService]
})
export class ColorListComponent implements OnInit {

  colors: Color[];

  constructor(
    private colorService: ColorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((data) => {
      this.colors = data;
    });
  }

  deleteColor(id: number) {
    if (confirm('Are you sure want to delete?')) {
      this.colorService.deleteColor(id).subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: data.name,
          detail: 'Color successfully deleted.',
        });
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }

}
