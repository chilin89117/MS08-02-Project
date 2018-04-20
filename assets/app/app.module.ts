import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {AuthComponent} from './auth/auth.component';
import {HeaderComponent} from './header.component';
import {routes} from './app.routes';
import {HttpModule} from '@angular/http';
import {AuthService} from './auth/auth.service';
import {ErrComponent} from './err/err.component';
import {ErrService} from './err/err.service';
import {MsgModule} from './messages/msg.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    ErrComponent
  ],
  imports: [
    BrowserModule,
    routes,
    HttpModule,
    MsgModule
  ],
  providers: [AuthService, ErrService],
  bootstrap: [AppComponent]
})

export class AppModule {

}