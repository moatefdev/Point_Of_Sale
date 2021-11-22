import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/shared/settings';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent implements OnInit {
  constructor(private settings: SettingsService) {}

  ngOnInit(): void {
    this.settings.isUserLoggedIn();
  }
}
