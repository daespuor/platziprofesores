import {Component,OnInit} from '@angular/core';
import {Teacher} from './teacher.model';
import {TeacherService} from './teacher.service';


@Component({
    selector:'app-teacher-list',
    templateUrl:'./teacher-list.component.html',
    styles:[
        'img{width:50px; height:50px;}'+
        '.add_button{position:fixed; right:30px; bottom:30px; width:50px; height:50px;'
    ],
    providers:[TeacherService]
})

export class TeacherListComponent implements OnInit{
    teachers:Teacher[];
    teachersApi:string;
    constructor(private teacherService:TeacherService){}

    ngOnInit(){
        this.getTeachers();
        this.teachersApi=this.teacherService.api;
    }
    private getTeachers(){
        this.teacherService.getTeachers()
        .subscribe((data:Teacher[])=>{
            //console.log(data);
            this.teachers=data;
        })
    }

}