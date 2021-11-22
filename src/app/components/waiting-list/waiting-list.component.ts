import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/shared/settings';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css'],
})
export class WaitingListComponent implements OnInit {
  constructor(private settings: SettingsService) {}

  ngOnInit(): void {
    this.settings.isUserLoggedIn();
  }
}
