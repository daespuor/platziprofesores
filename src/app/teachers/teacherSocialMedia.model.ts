import {SocialMedia} from '../socialMedias/socialMedia.model';

export class TeacherSocialMedia{

    idTeacherSocialMedia:number;
    nickname:string;
    socialMedia:SocialMedia;


    constructor(nickname:string){
        this.nickname=nickname;
    }
}