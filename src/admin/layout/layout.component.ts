import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
    selector: 'education-layout',
    templateUrl: './layout.component.html',
    styleUrls:['./layout.scss']
})
export class LayoutComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }

    navigateTo(page) {
    	this.router.navigate(['/admin/'+page]);
    }
}