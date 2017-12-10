import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { GiftsService } from '../../services/gifts.service';

@Component({
  selector: 'app-gift-page',
  templateUrl: './gift-page.component.html',
  styleUrls: ['./gift-page.component.css']
})
export class GiftPageComponent implements OnInit {

  private gift = {
    name: '',
    imageUrl: '',
    price:'',
    href: ""
  };
  private querySubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private giftsService: GiftsService){
       
      this.querySubscription = route.queryParams.subscribe(
          (queryParam: any) => {
              this.gift.href = queryParam['gift'];
              this.loadGift();
          }
      );
  }

  loadGift(){
    this.giftsService.getGift(this.gift)
    .subscribe(res => {
      if(!res.error){
        this.gift = res.gift;
      }
    });
  }

  addGiftToFavorites(){
    this.giftsService.addGiftToFavorites(this.gift)
    .subscribe(res => {
      if(!res.error){
        
      }
    });
}

  ngOnInit() {
  }

}
