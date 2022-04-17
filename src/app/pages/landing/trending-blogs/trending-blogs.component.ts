import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vn-trending-blogs',
  templateUrl: './trending-blogs.component.html',
  styleUrls: ['./trending-blogs.component.scss']
})
export class TrendingBlogsComponent implements OnInit {
  blogs = [
    {title: "A cool blog", published_at: new Date(), content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium
    iusto hic quia inventore, quasi, quam numquam, quaerat eveniet voluptas`, img: "assets/images/blog-card-image-2.jpeg"},
    {title: "A blog that walks!", published_at: new Date(), content: `Ipsum dolor elit. Accusantium
    iusto hic quia inventore, quasi, quam numquam, quaerat eveniet voluptas`, img: "assets/images/blog-card-image-1.jpeg"},
    {title: "Trebding for days...", published_at: new Date(), content: `Accusantium
    iusto hic quia inventore, quasi, quam numquam, quaerat eveniet voluptas papmha.`, img: "assets/images/blog-card-image.jpeg"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
