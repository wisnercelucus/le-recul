import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'vn-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  @Input() blog: any;
  constructor(private _router: Router) { }
 
  ngOnInit(): void {
  }

  onLoadArticle(article_id: string): void{
    this._router.navigate(['/blog', article_id])
  }
 
}
