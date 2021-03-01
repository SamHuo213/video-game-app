import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoGameListComponent } from './modules/video-game-list/video-game-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { VideoGameDetailComponent } from './modules/video-game-details/video-game-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VideoGameListComponent,
    VideoGameDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputsModule,
    BrowserAnimationsModule,
    GridModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
