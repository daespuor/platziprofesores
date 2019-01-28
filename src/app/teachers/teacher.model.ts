import {TeacherSocialMedia} from './teacherSocialMedia.model';

export class Teacher{
    idTeacher:number;
    name:string;
    avatar:string;
    courses:Object[];
    teacherSocialMedias:TeacherSocialMedia[];

    constructor(name:string,avatar:string){
        this.name=name;
        this.avatar=avatar;
    }



}