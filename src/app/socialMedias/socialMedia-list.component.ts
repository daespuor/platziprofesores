import {Component,OnInit} from '@angular/core';
import { SocialMedia } from './socialMedia.model';
import {SocialMediaService} from './socialMedia.service';

@Component({
  selector:'app-socialMedia-list',
  templateUrl:'./socialMedia-list.component.html',
  styles:[
    'img{width:50px; height:50px;}'+
    '.add_button{position:fixed; right:30px; bottom:30px; width:50px; height:50px;'
  ],
  providers:[SocialMediaService] 
})

export class SocialMediaListComponent implements OnInit{
    socialMedias:SocialMedia[];
    socialMediasApi:string;
    constructor(private socialMediaService:SocialMediaService){
        this.socialMediasApi=this.socialMediaService.api;
    }

    ngOnInit(){
        this.socialMediaService.getSocialMedias()
        .subscribe((socialMedias:SocialMedia[])=>{
            this.socialMedias=socialMedias;
        });
    }

}