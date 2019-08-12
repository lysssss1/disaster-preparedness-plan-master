import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { GlobalService } from './global.service';
import { AuthService } from './services/auth.service';
import { FamilyComponent } from './components/family/family.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ClothingComponent } from './components/clothing/clothing.component';
import { WaterComponent } from './components/water/water.component';
import { HomeComponent } from './components/home/home.component';
import { AddmemoComponent } from './components/addmemo/addmemo.component';
import { FoodComponent } from './components/food/food.component';
import { TravelComponent } from './components/travel/travel.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { StorageComponent } from './components/storage/storage.component';
import { TipsComponent } from './components/tips/tips.component';
import { MemoComponent } from './components/memo/memo.component';
import { AuthorityComponent } from './components/authority/authority.component';
import { ProtectdlgComponent } from './components/protectdlg/protectdlg.component';
import { UpdatememoComponent } from './components/updatememo/updatememo.component';
import { OverallComponent } from './components/overall/overall.component';
import { BasicinfoComponent } from './components/basicinfo/basicinfo.component';

import { PrintComponent } from './components/print/print.component';

import { EnsureAuthenticatedService } from './services/ensure-authenticated.service';
import { LoginRedirectService } from './services/login-redirect.service';
import { FrameComponent } from './components/frame/frame.component';
import { BasicService } from './services/basic.service';
import { HumanService } from './services/human.service';
import { PetService } from './services/pet.service';
import { ClothingService } from './services/clothing.service';
import { TravelService } from './services/travel.service';
import { CommunicationService } from './services/communication.service';
import { MemoService } from './services/memo.service';

const childRoutes: Routes = [
  //{ path: '', redirectTo: 'family', pathMatch: 'full' },
  //{ path: 'basic', component: BasicinfoComponent, canActivate: [EnsureAuthenticatedService] },
  { path: 'basic', component: BasicinfoComponent },
  { path: 'family', component: FamilyComponent },
  { path: 'clothing', component: ClothingComponent },
  { path: 'water', component: WaterComponent },
  { path: 'food', component: FoodComponent },
  { path: 'travel', component: TravelComponent },
  { path: 'communication', component: CommunicationComponent },
  { path: 'storage', component: StorageComponent },
  { path: 'tips', component: TipsComponent },
  { path: 'memo', component: MemoComponent },
  { path: 'authority', component: AuthorityComponent },
  { path: 'print', component: PrintComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FamilyComponent,
    SidebarComponent,
    ClothingComponent,
    WaterComponent,
    HomeComponent,
    AddmemoComponent,
    FoodComponent,
    TravelComponent,
    CommunicationComponent,
    StorageComponent,
    TipsComponent,
    MemoComponent,
    AuthorityComponent,
    ProtectdlgComponent,
    UpdatememoComponent,
    OverallComponent,
    BasicinfoComponent,
    FrameComponent,
    PrintComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    FlexLayoutModule,

    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSnackBarModule,

    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'overall', component: OverallComponent },
      { path: 'info', component: FrameComponent, children: childRoutes},
      { path: 'home', component: HomeComponent, canActivate: [LoginRedirectService] },
      //{ path: 'home', component: HomeComponent, canActivate: [LoginRedirectService] },
    ])
  ],
  entryComponents: [
    AddmemoComponent,
    UpdatememoComponent,
    ProtectdlgComponent,
  ],
  providers: [
    AuthService,
    GlobalService,
    EnsureAuthenticatedService,
    LoginRedirectService,
    BasicService,
    HumanService,
    PetService,
    ClothingService,
    TravelService,
    CommunicationService,
    MemoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
