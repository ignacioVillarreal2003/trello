import { Routes } from '@angular/router';
import { UserAccessComponent } from './articles/user-access/user-access.component';
import { HomeComponent } from './articles/home/home.component';
import { BoardComponent} from "./articles/board/board.component";

export const routes: Routes = [
    { path: '', component: UserAccessComponent },
    { path: 'home', component: HomeComponent },
    { path: 'board/:id', component: BoardComponent }
]
