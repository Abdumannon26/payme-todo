import {Component} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTab, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'payme-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatTabGroup,
    MatTab,
    NgOptimizedImage,
    MatTabNav,
    MatTabLink,
    MatTabNavPanel,
  ],
})
export class MainComponent {
  links = LINKS;
  activeLink = this.router.url.substring(1);

  constructor(
    private router: Router
  ) {

  }
}

const LINKS: { name: string, url: string }[] = [
  {
    name: 'ADD',
    url: 'add'
  },
  {
    name: 'LIST',
    url: 'list'
  }
]
