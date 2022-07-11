import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vn-trending-blogs',
  templateUrl: './trending-blogs.component.html',
  styleUrls: ['./trending-blogs.component.scss']
})
export class TrendingBlogsComponent implements OnInit {
  blogs = [
    {title: "A cool blog", 
    published_at: new Date(), 
    content: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium
    iusto hic quia inventore, quasi, quam numquam, quaerat eveniet voluptas`, 
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"},

    {title: "A blog that walks!", 
    published_at: new Date(), 
    content: `Ipsum dolor elit. Accusantium
    iusto hic quia inventore, quasi, quam numquam, quaerat eveniet voluptas`, 
    img: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"},
    {title: "Trebding for days...", 
    published_at: new Date(), 
    content: `Accusantium
    iusto hic quia inventore, quasi, quam numquam, quaerat eveniet voluptas papmha.`, 
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHRlY2hub2xvZ3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
