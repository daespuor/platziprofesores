import {Component,OnInit} from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {SocialMediaService} from './socialMedia.service';
import {SocialMedia} from './socialMedia.model';
import {ImageErrorComponent} from '../teachers/image-error.component';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
    selector:'app-socialMedia-add',
    templateUrl:'./socialMedia-add.component.html',
    providers:[SocialMediaService],
    styles:[
        '.thumbnail {'+
        '       width:200px; heigth:200px;'
    ]
})

export class SocialMediaAddComponent implements OnInit{
    socialMediaForm:FormGroup;
    socialMediaImage:string;
    socialMediaFile:File;
    socialMediasApi:string;


    ngOnInit(){
        this.socialMediasApi=this.socialMediaService.api;
        this.socialMediaForm=new FormGroup({//Create the formControls
            name:new FormControl(null,Validators.required),
            file:new FormControl(null,Validators.required)
        });
     
    }

    constructor(private socialMediaService:SocialMediaService, 
    public snackBar:MatSnackBar,
    private router:Router,
    private routes:ActivatedRoute){}


    onFileChange(event){
        let reader= new FileReader();
        if(event.target.files && event.target.files.length>0){//Take the files
            try{
                let file=event.target.files[0];
                if(file.type.includes("image")){//Only it's a image
                    reader.readAsDataURL(file);
                    reader.onload=()=>{//Finish load of image
                        this.socialMediaImage=reader.result;// Image on thumbnail
                        this.socialMediaFile=file;//new File assign
                    }
                }else{
                    this.socialMediaForm.get('file').setValue('');
                    this.snackBar.openFromComponent(ImageErrorComponent,{//Show error
                        duration:3000
                    });
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    onSubmit(){
        let form = this.socialMediaForm.value;
        let socialMedia= new SocialMedia(form.name,"");

        this.socialMediaService.addSocialMedia(socialMedia)//Save socialMedia info
        .subscribe((response)=>{
            var idSocialMedia=response.headers.get('location').split('/')[5];
            this.socialMediaService.addPicture(idSocialMedia,this.socialMediaFile)//Save new file
                .subscribe(bytes=>{
                    console.log(`Bytes:${bytes}`);
                    this.router.navigate([``]);
                });
        });
    }

}