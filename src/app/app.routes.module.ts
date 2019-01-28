import {RouterModule,Routes} from '@angular/router';
import {ScreenComponent} from './screen.component';
import { TeacherDetailComponent } from './teachers/teacher-detail.component';
import { TeacherFormComponent } from './teachers/teacher-form.component';
import { TeacherSocialMediaAddComponent } from './teachers/teacher-socialMedia-add.component';
import {SocialMediaAddComponent} from './socialMedias/socialMedia-add.component';

const appRoutes:Routes=[
    {path:'',component:ScreenComponent,pathMatch:'full'},
    {path:'teacher/new',component:TeacherFormComponent},
    {path:'teacher/:id',component:TeacherDetailComponent},
    {path:'teacher/:id/socialMedias',component:TeacherSocialMediaAddComponent},
    {path:'teacher/:id/update',component:TeacherFormComponent},
    {path:'socialMedia/new',component:SocialMediaAddComponent}
]



export default RouterModule.forRoot(appRoutes)



