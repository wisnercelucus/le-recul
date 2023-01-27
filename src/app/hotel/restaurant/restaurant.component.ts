import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from 'src/app/reusable-components/img-galery/img-galery.component';
import { HomeBannerService } from '../hotel-landing/hotel-banner/home-banner.service';
import { SubSink } from 'subsink';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'vn-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit, OnDestroy {
  subs = new SubSink()
  kitchen: any;
  sub = ' Nous servons le petit-déjeuner dans votre chambre si vous voulez vous accorder plus d’intimité ou de romantisme. Vous avez la possibilité de composer le menu de votre petit-déjeuner selon vos goûts.'

  data: Item[] = [
    {
      imageSrc: 'https://media.istockphoto.com/photos/potato-salad-with-beets-picture-id469082272?k=20&m=469082272&s=612x612&w=0&h=eGtsrcRBl0tm37JUzlg7KYarhv1hxn_k0z-f75D3i6g=',
      imageAlt: '1'
    },
    {
      imageSrc: 'https://media.istockphoto.com/photos/joumou-haitian-squash-soup-is-served-every-year-on-the-1st-of-january-picture-id1288972645?k=20&m=1288972645&s=612x612&w=0&h=lSce6pbMWigYCJcy9LmcdisZ1tYmSLEIJbVEBfXSiR0=',
      imageAlt: '2'
    },
    {
      imageSrc: 'https://media.istockphoto.com/photos/haitian-street-food-in-portland-oregon-picture-id534122600?k=20&m=534122600&s=612x612&w=0&h=nzXNU4cAbWET06dL9yEKmAFpx4qp6Ly33tSd9VQw6Pw=',
      imageAlt: '3'
    },
    {
      imageSrc: 'https://media.istockphoto.com/photos/ingredients-for-haitian-potato-salad-picture-id660479552?k=20&m=660479552&s=612x612&w=0&h=nRGxMYor-X836xDP59maJnmnayO4z3wGy9xeVNyW0mM=',
      imageAlt: '4'
    },
    {
      imageSrc: 'https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI=',
      imageAlt: '5'
    },
    /*{
      imageSrc: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      imageAlt: '6'
    },*/
    {
      imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      imageAlt: '7'
    },
    /*{
      imageSrc: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      imageAlt: '8'
    },*/



  
  ]
  constructor(private _homeBannerService: HomeBannerService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.getKitchenHomeDetails('kitchen')
  }


  getKitchenHomeDetails(model: string){
    this.subs.add(this._homeBannerService.getHomeBannerDetails(model).subscribe({
      next: (res: any)=>{
        this.kitchen = res
        this.data = [...res.kitchen_images]
        
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    }))
  }
}
