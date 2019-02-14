import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tabIndex = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {}

    ngOnInit() {
      const fragment = this.route.snapshot.fragment || 'none';
      if (fragment === 'tabela-pierwsza')   { this.tabIndex = 0; }
      if (fragment === 'tabela-druga')      { this.tabIndex = 1; }
      if (fragment === 'tabela-trzecia')    { this.tabIndex = 2; }
    }

    onIndexChange(tabIndex: number) {
        switch (tabIndex) {
          case 0:
            this.router.navigate(['/'], {fragment: 'tabela-pierwsza'});
            break;
          case 1:
            this.router.navigate(['/'], {fragment: 'tabela-druga'});
            break;
          case 2:
            this.router.navigate(['/'], {fragment: 'tabela-trzecia'});
            break;
        }
      }
  }
