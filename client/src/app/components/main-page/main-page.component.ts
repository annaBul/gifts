import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { GiftsService } from '../../services/gifts.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  gifts;

  constructor(private route: ActivatedRoute,
    private giftsService: GiftsService) { }

  ngOnInit() {
    this.loadGifts();

  }
    
  loadGifts(){
    this.giftsService.getGifts()
    .subscribe(res => {
      if(!res.error){
        this.gifts = res.gifts;
      }
    });
  }

}
