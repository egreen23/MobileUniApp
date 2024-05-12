import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';
import {ChatList} from '../../models/ChatList';
import {Events, ToastController} from '@ionic/angular';
import {UserDTO} from '../../models/userDTO';
import {Studente} from '../../models/studente';
import {AuthService} from '../../services/authService/auth.service';
import {StudenteService} from '../../services/studenteService/studente.service';
import {InsegnamentoService} from '../../services/insegnamentoService/insegnamento.service';
import {Insegnamento} from '../../models/insegnamento';
import {AngularFirestore} from '@angular/fire/firestore';
import {Docente} from '../../models/docente';
import {DocenteService} from '../../services/docenteService/docente.service';
import {PublicChat} from '../../models/publicChat';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.page.html',
    styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit, OnDestroy {

    current: UserDTO = {} as UserDTO;
    studente: Studente = {} as Studente;
    // docente: Docente = {} as Docente;
    insegnamento: Insegnamento[];
    idCurrent: number;
    length: number;
    contatore = 1;


    messages: Message[] = null;
    // professorModules: Array<Insegnamento>;
    // courseModuleList: Array<Insegnamento> = null;
    // studentModuleList: Array<Studente> = null;

    chatList: ChatList[] = [];
    publicList: PublicChat[] = [];
    senderType: string;
    selectedChat: ChatList;

    chats: Array<ChatList> = [];

    snapshotChat: ChatList;
    pChat: PublicChat;


    constructor(public authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private toastCtrl: ToastController,
                private event: Events,
                private studService: StudenteService,
                private insegnService: InsegnamentoService,
                private fireStore: AngularFirestore,
                private docService: DocenteService
    ) {

        // event.subscribe('parsing:data', (user) => {
        //         //     this.user = user
        //         //
        //         //     this.authService.getUserByMatricola(this.user.idMatricola)
        //         //         .subscribe( data => {
        //         //             this.user = data;
        //         //
        //         //     console.log(this.user.tipo);
        //         //
        //         // });
        //         //
        //         // });

    }

    ngOnInit() {

        this.chatList = [];
        this.idCurrent = +this.route.snapshot.paramMap.get('id');

        this.getUserByMatricola();
        // this.showAllChat();

    }

    ngOnDestroy() {

        this.chatList = [];

    }

    //STAMPA I RISULATATI DELLE GET NEL HTML
    // get diagnostic() {
    //    // return JSON.stringify(this.insegnamento);
    // }


    getUserByMatricola() {


        this.authService.getUserByMatricola(this.idCurrent)
            .subscribe(data => {

                this.current = data;

                if (this.authService.isLoggedIn) {

                    if (data.tipo === 'docente') {

                        console.log(data.tipo)

                        this.insegnService.getInsegnByIdDocente(data.idDocente).subscribe(ins => {

                            this.insegnamento = ins;

                            this.length = this.insegnamento.length;

                            console.log(this.insegnamento);

                            this.showChats();

                        });

                    } else {

                        console.log("STUDENTE")

                        this.studService.getStudenteByMatricola(data.idMatricola).subscribe(stud => {

                            this.studente = stud;

                            console.log(this.studente);

                            this.showChats();
                        })
                    }
                }

            });
    }


    // showAllChat() {
    //
    //     if(this.userType.type == 'student'){
    //         this.getService.findModulesByCourseId(this.student.course.courseId).subscribe(ret =>{
    //             ret.forEach(module=>{
    //                 console.log(module.moduleId);
    //                 this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
    //                     .collection<ChatList>('privateChat', ref =>
    //                         ref.where('chatId', '==', module.moduleId)
    //                     ).valueChanges().subscribe(chats =>{
    //                     chats.forEach(chat=>{
    //                         this.chatList.push(chat);
    //                     });
    //                     this.authService.sendToken(this.chatList, 'chatList');
    //                 });
    //             });
    //             this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
    //                 .collection<ChatList>('privateChat', ref =>
    //                     ref.where('studentId', '==', this.student.person.personId)
    //                 ).valueChanges().subscribe(ret=>{
    //                 ret.forEach(chat=>{
    //                     this.chatList.push(chat);
    //                 });
    //                 this.authService.sendToken(this.chatList, 'chatList');
    //             });
    //         });
    //     }else{
    //         this.getService.findModuleByProf(this.professor.professorId).subscribe(ret =>{
    //             ret.forEach(module=>{
    //                 this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
    //                     .collection<ChatList>('privateChat', ref =>
    //                         ref.where('chatId', '==', module.moduleId)
    //                     ).valueChanges().subscribe(chats =>{
    //                     chats.forEach(chat=>{
    //                         this.chatList.push(chat);
    //                     });
    //                     this.authService.sendToken(this.chatList, 'chatList');
    //                 });
    //             });
    //             this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
    //                 .collection<ChatList>('privateChat', ref =>
    //                     ref.where('professorId', '==', this.professor.person.personId)
    //                 ).valueChanges().subscribe(ret=>{
    //                 ret.forEach(chat=>{
    //                     this.chatList.push(chat);
    //                 });
    //                 this.authService.sendToken(this.chatList, 'chatList');
    //             });
    //         });
    //     }
    // }


    //
    // showAllChat() {
    //
    //     console.log(this.current);
    //     console.log(this.current.nome);
    //     this.authService.getUserByMatricola(id)
    //         .subscribe(data => {
    //
    //             this.user = data;
    //
    //             if (this.authService.isLoggedIn) {
    //
    //                 if (data.tipo === 'studente') {
    //
    //                     this.studService.getStudenteByMatricola(this.user.idMatricola)
    //                         .subscribe(data =>{
    //                             this.studente = data;
    //
    //                             this.insegnService.getByIdCorso(this.studente.idCorsoDiStudio).subscribe(data =>{
    //                                 this.insegnamento = data;
    //
    //                                 data.forEach(insegnamento =>{
    //                                     console.log(insegnamento.idInsegnamento);
    //                                     this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
    //                                         .collection<ChatList>('privateChat', ref =>
    //                                             ref.where('chatId', '==', insegnamento.idInsegnamento)
    //                                         ).valueChanges().subscribe(chats =>{
    //                                         chats.forEach(chat=>{
    //                                             this.chatList.push(chat);
    //                                         });
    //                                     });
    //                                 });
    //                                 this.fireStore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR')
    //                                     .collection<ChatList>('privateChat', ref =>
    //                                         ref.where('studenteId', '==', this.studente.idStudente)
    //                                     ).valueChanges().subscribe(ret=>{
    //                                     ret.forEach(chat=>{
    //                                         this.chatList.push(chat);
    //                                     });
    //                                 });
    //
    //                             });
    //                         });
    //
    //                 } else {
    //                     console.log("DOCENTE")
    //
    //                     this.docService.getDocenteByMatricola(this.user.idMatricola)
    //                             .subscribe(data =>{
    //                                 this.docente = data
    //
    //                                 this.insegnService.getInsegnByIdDocente(this.docente.idDocente)
    //                                     .subscribe(data =>{
    //                                         this.insegnamento = data;
    //
    //                                         data.forEach(insegnamento =>{
    //                                             console.log(insegnamento.idInsegnamento);
    //                                             this.fireStore.collection('chat').doc('Pf4UNKyTRwAYjddyNMAv')
    //                                                 .collection<ChatList>('privateChat', ref =>
    //                                                     ref.where('chatId', '==', insegnamento.idInsegnamento)
    //                                                 ).valueChanges().subscribe(chats =>{
    //                                                 chats.forEach(chat=>{
    //                                                     this.chatList.push(chat);
    //                                                 });
    //                                             });
    //                                         });
    //                                         this.fireStore.collection('chat').doc('Pf4UNKyTRwAYjddyNMAv')
    //                                             .collection<ChatList>('privateChat', ref =>
    //                                                 ref.where('professorId', '==', this.docente.idDocente)
    //                                             ).valueChanges().subscribe(ret=>{
    //                                             ret.forEach(chat=>{
    //                                                 this.chatList.push(chat);
    //                                             });
    //                                         });
    //                                     });
    //                             });
    //                 }
    //             }
    //         });
    // }


    selectChat(chat: ChatList) {


        if (this.current.tipo === 'studente') {
            this.router.navigateByUrl(`chat/${this.current.idMatricola}/${chat.recId}/${this.current.tipo}/${chat.recType}/0`);

        } else {

            this.router.navigateByUrl(`chat/${this.current.idDocente}/${chat.recId}/${this.current.tipo}/${chat.recType}/0`);

        }


    }

    selectPublicChat(chat: PublicChat) {


        if (this.current.tipo === 'studente') {
            this.router.navigateByUrl(`chat/${this.current.idMatricola}/0/${this.current.tipo}/0/${chat.chatId}`);

        } else {

            this.router.navigateByUrl(`chat/${this.current.idDocente}/0/${this.current.tipo}/0/${chat.chatId}`);

        }


    }

    showToast(text: string) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'middle'
        });

    }

    findPeople() {


        this.router.navigateByUrl(`list-people/${this.idCurrent}`);


    }

    showChats() {

        console.log(this.current.idMatricola.toString());


        if (this.current.tipo === 'studente') {

            this.fireStore.collection('chat').doc('r8y7owVgrSuuJtLPoZs7')
                .collection<ChatList>('private', ref =>
                    ref.where('sendId', '==', this.current.idMatricola.toString())
                ).valueChanges().subscribe(ret => {
                this.chatList = [];
                this.chats = ret;
                this.chats.forEach(chat => {
                    const c = new ChatList(chat.chatId, chat.chatName, chat.recId, chat.recName, chat.recSurname, chat.sendId,
                        chat.sendName, chat.sendSurname, chat.sendType, chat.recType);


                    this.chatList.push(c);
                });


                this.fireStore.collection<PublicChat>('publicChat', ref =>
                    ref.where('idCorsodistudio', '==', this.studente.idCorsoDiStudio.toString())
                ).valueChanges().subscribe(pchats => {
                    pchats.forEach(pchat => {
                        const pc = new PublicChat(pchat.chatId, pchat.chatName, pchat.idCorsodistudio, pchat.idInsegnamento);
                        this.publicList.push(pc);
                    });

                    this.fireStore.collection('chat').doc('r8y7owVgrSuuJtLPoZs7').collection<ChatList>('private', ref =>
                        ref.where('sendId', '==', this.current.idMatricola.toString()))
                        .snapshotChanges().pipe(map(actions => {
                        return actions.map(action => {
                            this.snapshotChat = action.payload.doc.data();
                            // const c = new ChatList(chat.chatId, chat.chatName, chat.recId, chat.recName, chat.recSurname, chat.sendId,
                            //      chat.sendName, chat.sendSurname, chat.sendType, chat.recType);
                            this.chatList.push(this.snapshotChat);


                        })
                    }));


                });


            });

        }
        else {

            this.fireStore.collection('chat').doc('r8y7owVgrSuuJtLPoZs7')
                .collection<ChatList>('private', ref =>
                    ref.where('sendId', '==', this.current.idDocente.toString())
                ).valueChanges().subscribe(ret => {
                this.chatList = [];
                this.chats = ret;
                this.chats.forEach(chat => {
                    const c = new ChatList(chat.chatId, chat.chatName, chat.recId, chat.recName, chat.recSurname, chat.sendId,
                        chat.sendName, chat.sendSurname, chat.sendType, chat.recType);


                    this.chatList.push(c);


                });

                let done = false;

                while (!done) {

                    let chatdocs = this.fireStore.firestore.collection('publicChat');
                    chatdocs.where('idInsegnamento', '==', this.insegnamento[this.contatore-1].idInsegnamento.toString()).get()
                        .then((query) => {
                            query.forEach((doc) => {
                                // this.pChat = doc.data();
                                // this.publicList.push(this.pChat);
                                console.log(doc.data());
                                const pc = new PublicChat(doc.data().chatId,doc.data().chatName, doc.data().idCorsodistudio, doc.data().idInsegnamento);
                                this.publicList.push(pc);

                            });
                        });



                    if (this.contatore === this.length) {
                        done = true;
                    } else {
                        this.contatore = this.contatore+1;
                    }

                }

                this.fireStore.collection('chat').doc('r8y7owVgrSuuJtLPoZs7').collection<ChatList>('private', ref =>
                    ref.where('sendId', '==', this.current.idDocente.toString()))
                    .snapshotChanges().pipe(map(actions => {
                    return actions.map(action => {
                        this.snapshotChat = action.payload.doc.data();
                        // const c = new ChatList(chat.chatId, chat.chatName, chat.recId, chat.recName, chat.recSurname, chat.sendId,
                        //      chat.sendName, chat.sendSurname, chat.sendType, chat.recType);
                        this.chatList.push(this.snapshotChat);


                    })
                }));



                // this.fireStore.collection<PublicChat>('publicChat', ref =>
                //     ref.where('idInsegnamento', '==', this.insegnamento[0].idInsegnamento.toString())
                // ).valueChanges().subscribe(pchats => {
                //     pchats.forEach(pchat => {
                //         const pc = new PublicChat(pchat.chatId, pchat.chatName, pchat.idCorsodistudio, pchat.idInsegnamento);
                //         this.publicList.push(pc);
                //     });
                //
                //     this.fireStore.collection('chat').doc('r8y7owVgrSuuJtLPoZs7').collection<ChatList>('private', ref =>
                //         ref.where('sendId', '==', this.current.idDocente.toString()))
                //         .snapshotChanges().pipe(map(actions => {
                //         return actions.map(action => {
                //             this.snapshotChat = action.payload.doc.data();
                //             // const c = new ChatList(chat.chatId, chat.chatName, chat.recId, chat.recName, chat.recSurname, chat.sendId,
                //             //      chat.sendName, chat.sendSurname, chat.sendType, chat.recType);
                //             this.chatList.push(this.snapshotChat);
                //
                //
                //         })
                //     }));


                    // data.forEach(mex => {
                    //     let history = new Message(mex.chatId, mex.chatName, mex.recId, mex.recName, mex.recSurname,
                    //         mex.sendId, mex.sendName, mex.sendSurname, mex.text, mex.date);
                    //     this.messages.push(history);
                    //
                    // })
                    // this.fireStore.collection('chat').doc('r8y7owVgrSuuJtLPoZs7').collection<ChatList>('private', ref =>
                    //     ref.where('sendId', '==', this.current.idDocente.toString()))
                    //     .snapshotChanges(function(data) {
                    //         // this.messages = [];
                    //         data.forEach(chat => {
                    //             const c = new ChatList(chat.chatId, chat.chatName, chat.recId, chat.recName, chat.recSurname, chat.sendId,
                    //                 chat.sendName, chat.sendSurname, chat.sendType, chat.recType);
                    //
                    //
                    //             this.chatList.push(c);
                    //
                    //         })
                    //     });


                    //  this.k = 1;

                    // this.fireStore.collection('chat').doc('r8y7owVgrSuuJtLPoZs7')
                    //     .collection<ChatList>('private', ref =>
                    //         ref.where('recId', '==', this.current.idDocente)
                    //     ).valueChanges().subscribe(ret=>{
                    //     this.chats = ret;
                    //     this.chats.forEach( chat => {
                    //         const c = new ChatList(chat.chatId, chat.chatName, chat.recId, chat.recName, chat.recSurname, chat.sendId,
                    //             chat.sendName, chat.sendSurname);
                    //
                    //         this.chatList.push(c);
                    //
                    //     });
                    // });



            });
        }

    }

}

// this.fireStore.collection('chat').doc('r8y7owVgrSuuJtLPoZs7').collection<ChatList>('private', ref =>
//     ref.where('sendId', '==', this.current.idMatricola.toString()))
//     .snapshotChanges(function(data) {
//         // this.messages = [];
//         data.forEach(chat => {
//             const c = new ChatList(chat.chatId, chat.chatName, chat.recId, chat.recName, chat.recSurname, chat.sendId,
//                 chat.sendName, chat.sendSurname, chat.sendType, chat.recType);
//
//
//             this.chatList.push(c);
//         })
//     });