import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {HomeDocentePage} from './docente/home-docente/home-docente.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home-docente/:id', loadChildren: './docente/home-docente/home-docente.module#HomePageModule' },
  { path: 'calendario-lez-doc/:id', loadChildren: './docente/calendario-lez-doc/calendario-lez-doc.module#CalendarioLezPageModule' },
  { path: 'lezione/:id', loadChildren: './lezione/lezione.module#LezionePageModule' },
  { path: 'list-aule', loadChildren: './list-aule/list-aule.module#ListAulePageModule' },
  { path: 'aula-detail-map/:id', loadChildren: './aula-detail-map/aula-detail-map.module#AulaDetailMapPageModule' },
  { path: 'all-aule-map', loadChildren: './all-aule-map/all-aule-map.module#AllAuleMapPageModule' },
  { path: 'home-studente/:idUser', loadChildren: './studente/home-studente/home-studente.module#HomeStudentePageModule' },
  { path: 'calendario-lez-stud/:id', loadChildren: './studente/calendario-lez-stud/calendario-lez-stud.module#CalendarioLezStudPageModule' },
  { path: 'list-insegnamento-mat/:id/:idUser/:idStudente', loadChildren: './studente/list-insegnamento-mat/list-insegnamento-mat.module#ListInsegnamentoPageModule' },
  { path: 'list-lezioni/:id/:idUser/:idStudente', loadChildren: './studente/list-lezioni/list-lezioni.module#ListLezioniPageModule' },
  { path: 'list-materiale/:id/:idUser/:idStudente', loadChildren: './studente/list-materiale/list-materiale.module#ListMaterialePageModule' },
  { path: 'materiale/:id/:idUser/:idStudente', loadChildren: './studente/materiale/materiale.module#MaterialePageModule' },
  { path: 'list-insegnamento-lez/:id/:idUser/:idStudente', loadChildren: './studente/list-insegnamento-lez/list-insegnamento-lez.module#ListInsegnamentoLezPageModule' },
  { path: 'recensione-lez/:id/:idUser/:idStudente', loadChildren: './studente/recensione-lez/recensione-lez.module#RecensioneLezPageModule' },
  { path: 'list-insegnamento-lez-doc/:id', loadChildren: './docente/list-insegnamento-lez-doc/list-insegnamento-lez-doc.module#LisInsegnamentoLezDocPageModule' },
  { path: 'list-insegnamento-mat-doc/:id', loadChildren: './docente/list-insegnamento-mat-doc/list-insegnamento-mat-doc.module#LisInsegnamentoMatDocPageModule' },
  { path: 'list-lez-doc/:id', loadChildren: './docente/list-lez-doc/list-lez-doc.module#LisLezDocPageModule' },
  { path: 'list-mat-doc/:id', loadChildren: './docente/list-mat-doc/list-mat-doc.module#LisMatDocPageModule' },
  { path: 'recensione-lez-doc/:id', loadChildren: './docente/recensione-lez-doc/recensione-lez-doc.module#RecensioneLezDocPageModule' },
  { path: 'recensione-mat-doc/:id', loadChildren: './docente/recensione-mat-doc/recensione-mat-doc.module#RecensioneMatDocPageModule' },
  { path: 'chat-list/:id', loadChildren: './chat-list/chat-list.module#ChatListPageModule' },
  { path: 'list-people/:id', loadChildren: './list-people/list-people.module#ListPeoplePageModule' },
  { path: 'chat/:idSender/:idReceiver/:tipoSender/:tipoReceiver/:idChat', loadChildren: './chat/chat.module#ChatPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
