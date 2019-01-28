import {Component,OnInit} from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {TeacherService} from './teacher.service';
import {Teacher} from './teacher.model';
import {ImageErrorComponent} from './image-error.component';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
    selector:'app-teacher-form',
    templateUrl:'./teacher-form.component.html',
    providers:[TeacherService],
    styles:[
        '.thumbnail {'+
        '       width:200px; heigth:200px;'
    ]
})

export class TeacherFormComponent implements OnInit{
    teacherForm:FormGroup;
    teacherImage:string;
    teacherFile:File;
    teachersApi:string;
    teacherId:number;


    ngOnInit(){
        this.teachersApi=this.teacherService.api;
        this.teacherForm=new FormGroup({//Create the formControls
            name:new FormControl(null,Validators.required),
            file:new FormControl(null,Validators.required)
        });
        this.loadTeacherInfo();//Preload the info teacher for update purpuses
    }

    constructor(private teacherService:TeacherService, 
    public snackBar:MatSnackBar,
    private router:Router,
    private routes:ActivatedRoute){}

    private loadTeacherInfo(){
        this.routes.params.subscribe((params)=>{
            this.teacherId=params.id;
            if(params.id){//Only load info if is for update
                this.teacherService.getTeacher(params.id)
                .subscribe((teacher:Teacher)=>{
                    this.teacherForm.get('name').setValue(teacher.name);
                    this.teacherImage=`${this.teachersApi}/${teacher.idTeacher}/picture`;
                });
            }
        });
    }

    onFileChange(event){
        let reader= new FileReader();
        if(event.target.files && event.target.files.length>0){//Take the files
            try{
                let file=event.target.files[0];
                if(file.type.includes("image")){//Only it's a image
                    reader.readAsDataURL(file);
                    reader.onload=()=>{//Finish load of image
                        this.teacherImage=reader.result;// Image on thumbnail
                        this.teacherFile=file;//new File assign
                    }
                }else{
                    this.teacherForm.get('file').setValue('');
                    this.snackBar.openFromComponent(ImageErrorComponent,{//Show error
                        duration:3000
                    });
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    private saveTeacher(){//to add teacher
        let form = this.teacherForm.value;
        let teacher= new Teacher(form.name,"");

        this.teacherService.addTeacher(teacher)//Save teacher info
        .subscribe((response)=>{
         
            var idTeacher=response.headers.get('location').split('/')[5];
            if(this.teacherForm.get('file').valid){
                this.teacherService.addPicture(idTeacher,this.teacherFile)//Save new file
                .subscribe(bytes=>{
                    console.log(`Bytes:${bytes}`);
                    this.router.navigate([`teacher/${idTeacher}`]);
                });
            }else{
                this.router.navigate([`teacher/${idTeacher}`]);
            }
        });
    }

    private updateTeacher(){ //To update teacher
        let form = this.teacherForm.value;
        let teacher= new Teacher(form.name,'');

        this.teacherService.updateTeacher(this.teacherId,teacher)//Save teacher info
        .subscribe((teacher:Teacher)=>{
            if(this.teacherForm.get('file').valid){
                this.teacherService.addPicture(String(this.teacherId),this.teacherFile)//Save new file
                .subscribe(bytes=>{
                    console.log(`Bytes:${bytes}`);
                    this.router.navigate([`teacher/${this.teacherId}`]);
                });
            }else{
                this.router.navigate([`teacher/${this.teacherId}`]);
            }
        });
    }

    onSubmit(){
        if(this.teacherId){
            this.updateTeacher();
        }else{
            this.saveTeacher();
        }
    }

}