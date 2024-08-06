import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserAccessComponent } from "./articles/user-access/user-access.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { HomeComponent } from "./articles/home/home.component";
import {ChangePasswordComponent} from "./shared/components/header/user-configurations/change-password/change-password.component";
import {ListComponent} from "./articles/board/list/list.component";
import {BoardComponent} from "./articles/board/board.component";
import {FormPostLabelComponent} from "./shared/components/forms/form-post-label/form-post-label.component";
import {FormPostCardUserComponent} from "./shared/components/forms/form-post-card-user/form-post-card-user.component";
import {FormPostCardComponent} from "./shared/components/forms/form-post-card/form-post-card.component";
import {FormPostCommentComponent} from "./shared/components/forms/form-post-comment/form-post-comment.component";
import {FormRemoveFriendComponent} from "./shared/components/forms/form-remove-friend/form-remove-friend.component";
import {FormAddFriendComponent} from "./shared/components/forms/form-add-friend/form-add-friend.component";
import {FormUpdateBoardComponent} from "./shared/components/forms/form-update-board/form-update-board.component";
import {FormUpdateTeamComponent} from "./shared/components/forms/form-update-team/form-update-team.component";
import {FormDeleteBoardComponent} from "./shared/components/forms/form-delete-board/form-delete-board.component";
import {FormDeleteTeamComponent} from "./shared/components/forms/form-delete-team/form-delete-team.component";
import {PostListComponent} from "./shared/components/forms/post-list/post-list.component";
import {FormPostTeamComponent} from "./shared/components/forms/form-post-team/form-post-team.component";
import {FormPostBoardComponent} from "./shared/components/forms/form-post-board/form-post-board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, UserAccessComponent, HeaderComponent, HomeComponent, ChangePasswordComponent, ListComponent, BoardComponent, FormPostLabelComponent, FormPostCardUserComponent, FormPostCardComponent, FormPostCommentComponent, FormRemoveFriendComponent, FormAddFriendComponent, FormUpdateBoardComponent, FormUpdateTeamComponent, FormDeleteBoardComponent, FormDeleteTeamComponent, PostListComponent, FormPostTeamComponent, FormPostBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TrelloApp';
}
