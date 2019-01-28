import {Component, OnInit} from '@angular/core';
import {TeacherService} from './teacher.service';
import {Teacher} from './teacher.model';
import {ActivatedRoute} from '@angular/router';
import {SocialMediaService} from '../socialMedias/socialMedia.service';

@Component({
    selector:'app-teacher-detail',
    templateUrl:'./teacher-detail.component.html',
    styles:[
        '.icon{width:150px; height:150px;}'+ 
        '.social-media-icon{width:30px; height:30px;}'+
        '.update_button{margin-left:10px;}'
    ],
    providers:[TeacherService, SocialMediaService]
})

export class TeacherDetailComponent implements OnInit{
    teacher:Teacher;
    teachersApi:string;
    socialMediaApi:string;
    teacherLoading:boolean=true;

    constructor(private teacherService:TeacherService,
    private socialMediaService:SocialMediaService,
    private router:ActivatedRoute){}

    ngOnInit(){
        this.getTeacherDetail();
        this.teachersApi=this.teacherService.api;
        this.socialMediaApi=this.socialMediaService.api;
    }
    private getTeacherDetail(){
        this.router.params.subscribe((params)=>{
            this.teacherService.getTeacher(params.id)
            .subscribe((data:Teacher)=>{
                this.teacher=data;
                this.teacherLoading=false;
            })
        })
    }
}

