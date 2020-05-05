import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {StoreModule} from '@ngrx/store'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

import {AppComponent} from './app.component'
import {reducers} from './store'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, 
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
