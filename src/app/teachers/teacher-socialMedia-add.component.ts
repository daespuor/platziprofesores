import {Component,OnInit} from '@angular/core';
import {TeacherService} from './teacher.service';
import {SocialMediaService} from '../socialMedias/socialMedia.service';
import { SocialMedia } from '../socialMedias/socialMedia.model';
import { TeacherSocialMedia } from './teacherSocialMedia.model';
import { FormControl, Validators } from '@angular/forms';
import { Teacher } from './teacher.model';
import {Router,ActivatedRoute} from '@angular/router';


@Component({
    selector:'app-teacherSocialMedia-add',
    templateUrl:'./teacher-socialMedia-add.component.html',
    providers:[TeacherService,SocialMediaService],
    styles:[
        'input{width:200px;}'+
        '.error-message{color:red;}'
    ]
})

export class TeacherSocialMediaAddComponent implements OnInit{
    socialMediaApi:string;
    idTeacher:number;
    socialMedias:SocialMedia[];
    teacherSocialMedias:TeacherSocialMedia[]=[];
    nicknameMap:{[key:number]:FormControl}={};
    constructor(private teacherService:TeacherService,
    private socialMediaService:SocialMediaService,
    private router:Router,
    private routes:ActivatedRoute){}

    ngOnInit(){
        this.getSocialMedias();
        this.socialMediaApi=this.socialMediaService.api;
    }

    private getSocialMedias(){
        this.routes.params.subscribe((params)=>{
            this.idTeacher=params.id; //Get teacherId
            this.socialMediaService.getSocialMedias() //Get all socialMedias
            .subscribe((data:SocialMedia[])=>{
                this.socialMedias=data;
                for(let socialMedia of this.socialMedias){
                    let index=socialMedia.idSocialMedia;
                    this.nicknameMap[index]=new FormControl('',[ //Create a FormControl to SocialMedia nickname[1]=''
                        Validators.pattern(/^[A-Za-z]\w*$/)]);//Only begin with chars
                }
                this.teacherService.getTeacher(this.idTeacher)
                .subscribe((teacher:Teacher)=>{
                    for(let teacherSocialMedia of teacher.teacherSocialMedias){
                        let index=teacherSocialMedia.
                                    socialMedia.idSocialMedia;
                        
                        this.nicknameMap[index].setValue(teacherSocialMedia.nickname.replace("@",""));//If the teacher have socialMedias populate
                    }
                });
            });

        });
    }

    updateTeacherSocialMedia(){
        this.teacherSocialMedias=[];
        for(let socialMedia of this.socialMedias){
            let index=socialMedia.idSocialMedia;
            let nicknameFormControl=this.nicknameMap[index];
            if(nicknameFormControl.valid && nicknameFormControl.value){//Validate formControl for socialMedias
                let teacherSocialMedia = new TeacherSocialMedia(`@${nicknameFormControl.value}`);//Create object for the service
                teacherSocialMedia.socialMedia=new SocialMedia(
                                                                socialMedia.name,
                                                                socialMedia.icon);
                teacherSocialMedia.socialMedia.idSocialMedia=socialMedia.idSocialMedia;
                this.teacherSocialMedias.push(teacherSocialMedia); 
            }
        }
        let teacher= new Teacher('','');
        teacher.idTeacher=this.idTeacher;
        teacher.teacherSocialMedias=this.teacherSocialMedias;
        this.teacherService.addTeacherSocialMedia(teacher)
        .subscribe((data:Teacher)=>{
            console.log(data);
            this.router.navigate([`teacher/${this.idTeacher}`]);
        });
    }

}