import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute, Router} from '@angular/router';
import {IonContent} from '@ionic/angular';
import {Insegnamento} from '../../models/insegnamento';
import {UserDTO} from '../../models/userDTO';
import {Docente} from '../../models/docente';
import {Studente} from '../../models/studente';
import {Message} from '../../models/Message';
import {ChatList} from '../../models/ChatList';
import {AuthService} from '../../services/authService/auth.service';
import {DocenteService} from '../../services/docenteService/docente.service';
import {StudenteService} from '../../services/studenteService/studente.service';
import {InsegnamentoService} from '../../services/insegnamentoService/insegnamento.service';
import {DatePipe} from '@angular/common';
import {PublicChat} from '../../models/publicChat';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    @ViewChild(IonContent) content: IonContent;


    idSender: string;
    idReceiver: string;
    tipoSender: string;
    tipoReceiver: string;
    idChat: string;


    Sender: UserDTO = {} as UserDTO;
    Receiver: UserDTO = {} as UserDTO;
    docente: Docente = {} as Docente;
    currentDoc: Docente = {} as Docente;
    currentStud: UserDTO = {} as UserDTO;

    chat: Array<ChatList>;
    chatPublic: Array<PublicChat>;
    chatData = new ChatList( '', '', '','', '', '', '', '','','');
    chatPublicData = new PublicChat('','','','');
    messages: Message[] = [];
    messaggio: string = '';
    snapMex: Message;




    constructor(public authService: AuthService,
                private docService: DocenteService,
                private studService: StudenteService,
                private insegnService: InsegnamentoService,
                private chatHistory: AngularFirestore,
                private router: Router,
                private route: ActivatedRoute,
                public datepipe: DatePipe


    ) { }

    ngOnInit() {

        this.idSender = this.route.snapshot.paramMap.get('idSender');
        this.idReceiver = this.route.snapshot.paramMap.get('idReceiver');
        this.tipoSender = this.route.snapshot.paramMap.get('tipoSender');
        this.tipoReceiver = this.route.snapshot.paramMap.get('tipoReceiver');
        this.idChat = this.route.snapshot.paramMap.get('idChat');

        if (this.tipoSender === 'docente') {

            this.docService.getDocenteById(+this.idSender).subscribe(doc => {

                this.currentDoc = doc;
                this.loadChat();
            });
        } else {

            this.authService.getUserByMatricola(+this.idSender).subscribe(stud => {

                this.currentStud = stud;
                this.loadChat();
            })
        }
    }


    //STAMPA I RISULATATI DELLE GET NEL HTML
    get diagnostic() {
        return JSON.stringify(this.messages);
    }



    loadChat(){


        console.log('Send: ' + this.idSender);
        console.log(' Rec: ' + this.idReceiver);
        console.log(this.tipoSender);
        console.log(this.tipoReceiver);
        // if(this.chatData.chatType == 'Public'){


        if (this.idChat === '0') {

            this.chatHistory.collection('chat').doc('r8y7owVgrSuuJtLPoZs7')
                .collection<ChatList>('private', ref =>
                    ref.where('sendId', '==', this.idSender)
                        .where('recId', '==', this.idReceiver)
                ).valueChanges().subscribe(ret=>{
                if (ret.length != 0 ){

                    this.chat = ret;
                    let conversation = this.chat.pop();
                    console.log(conversation.chatId);

                    this.chatData.chatId = conversation.chatId;
                    this.chatData.chatName =  conversation.sendName+' - '+ conversation.recName;
                    this.chatData.recId = conversation.recId;
                    this.chatData.recName = conversation.recName;
                    this.chatData.recSurname = conversation.recSurname;
                    this.chatData.sendId = conversation.sendId;
                    this.chatData.sendName = conversation.sendName;
                    this.chatData.sendSurname = conversation.sendSurname;
                    this.chatData.sendType = conversation.sendType;
                    this.chatData.recType = conversation.recType;

                    this.chatHistory.collection<Message>('messages', ref =>
                        ref.where('chatId', '==', conversation.chatId).orderBy('date'))
                        .valueChanges().subscribe(ret =>{
                        this.messages = [];
                        ret.forEach(mex => {

                            let history = new Message(mex.chatId, mex.chatName, mex.recId, mex.recName, mex.recSurname,
                                mex.sendId, mex.sendName, mex.sendSurname, mex.text, mex.date);
                            this.messages.push(history);


                        });

                        this.chatHistory.collection<Message>('messages', ref =>
                            ref.where('chatId', '==', conversation.chatId))
                            .snapshotChanges().pipe(map (actions => {
                                return actions.map(action => {
                                    this.snapMex = action.payload.doc.data();

                                    this.messages.push(this.snapMex);

                                })
                        }));

                    });



                }

                else {

                    this.createChat();
                }
            });

        } else {

            this.chatHistory.collection<PublicChat>('publicChat', ref =>
                ref.where('chatId', '==', this.idChat))
                .valueChanges().subscribe(ret => {

                    if (ret.length != 0) {

                        this.chatPublic = ret;
                        let conversation = this.chatPublic.pop();
                        console.log(conversation.chatId);
                        this.chatPublicData.chatId = conversation.chatId;
                        this.chatPublicData.chatName = conversation.chatName;
                        this.chatPublicData.idInsegnamento = conversation.idInsegnamento;
                        this.chatPublicData.idCorsodistudio = conversation.idCorsodistudio;

                        this.chatHistory.collection<Message>('messages', ref =>
                            ref.where('chatId', '==', conversation.chatId).orderBy('date'))
                            .valueChanges().subscribe(ret =>{
                            this.messages = [];
                            ret.forEach(mex => {

                                let history = new Message(mex.chatId, mex.chatName, mex.recId, mex.recName, mex.recSurname,
                                    mex.sendId, mex.sendName, mex.sendSurname, mex.text, mex.date);
                                this.messages.push(history);


                            });

                            this.chatHistory.collection<Message>('messages', ref =>
                                ref.where('chatId', '==', conversation.chatId))
                                .snapshotChanges().pipe(map( actions => {
                                    return actions.map(action => {
                                        this.snapMex = action.payload.doc.data();
                                        this.messages.push(this.snapMex);
                                    })
                            }));

                        });

                    }
            });

        }



    }



    createChat(){

        if(this.tipoSender == 'studente' && this.tipoReceiver == 'studente'){

            this.authService.getUserByMatricola(+this.idReceiver)
                .subscribe(data => {

                    this.Receiver = data;

                    console.log(this.Receiver);

                    this.chatData.chatId = this.chatHistory.createId();
                    this.chatData.recId = this.Receiver.idMatricola.toString();
                    this.chatData.recName = this.Receiver.nome;
                    this.chatData.recSurname = this.Receiver.cognome;
                    this.chatData.recType = this.Receiver.tipo;

                    this.authService.getUserByMatricola(+this.idSender)
                        .subscribe(data => {

                            this.Sender = data;

                            console.log(this.Sender);


                            this.chatData.sendId = this.Sender.idMatricola.toString();
                            this.chatData.sendName = this.Sender.nome;
                            this.chatData.sendSurname = this.Sender.cognome;
                            this.chatData.sendType = this.Sender.tipo;
                            this.chatData.chatName = this.chatData.sendName + ' - '+ this.chatData.recName;


                            this.chatHistory.collection('chat').doc('r8y7owVgrSuuJtLPoZs7')
                                .collection('private')
                                .add({

                                    chatId: this.chatData.chatId,
                                    chatName: this.chatData.chatName,
                                    recId: this.chatData.recId,
                                    recName: this.chatData.recName,
                                    recSurname: this.chatData.recSurname,
                                    sendId: this.chatData.sendId,
                                    sendName: this.chatData.sendName,
                                    sendSurname: this.chatData.sendSurname,
                                    sendType: this.chatData.sendType,
                                    recType: this.chatData.recType

                                });

                            this.chatHistory.collection('chat').doc('r8y7owVgrSuuJtLPoZs7')
                                .collection('private')
                                .add({

                                    chatId: this.chatData.chatId,
                                    chatName: this.chatData.chatName,
                                    recId: this.chatData.sendId,
                                    recName: this.chatData.sendName,
                                    recSurname: this.chatData.sendSurname,
                                    sendId: this.chatData.recId,
                                    sendName: this.chatData.recName,
                                    sendSurname: this.chatData.recSurname,
                                    sendType: this.chatData.recType,
                                    recType: this.chatData.sendType

                                }).then(then=>{
                                console.log(then);
                            });



                        });


                });

        }else if(this.tipoSender == 'studente' && this.tipoReceiver == 'docente')
        {

            this.authService.getUserByMatricola(+this.idSender)
                .subscribe(data => {

                    this.Sender = data;

                    console.log(this.Sender);

                    this.chatData.chatId = this.chatHistory.createId();

                    this.chatData.sendId = this.Sender.idMatricola.toString();
                    this.chatData.sendName = this.Sender.nome;
                    this.chatData.sendSurname = this.Sender.cognome;
                    this.chatData.sendType = this.Sender.tipo;



                    this.docService.getDocenteById(+this.idReceiver)
                        .subscribe(data =>{
                            this.docente = data;

                            console.log(this.docente);


                            this.chatData.chatId = this.chatHistory.createId();
                            this.chatData.recId = this.docente.idDocente.toString();
                            this.chatData.recName = this.docente.nome;
                            this.chatData.recSurname = this.docente.cognome;
                            this.chatData.recType = 'docente';
                            this.chatData.chatName = this.chatData.sendName + ' - '+ this.chatData.recName;



                            this.chatHistory.collection('chat').doc('r8y7owVgrSuuJtLPoZs7')
                                .collection('private')
                                .add({

                                    chatId: this.chatData.chatId,
                                    chatName: this.chatData.chatName,
                                    recId: this.chatData.recId,
                                    recName: this.chatData.recName,
                                    recSurname: this.chatData.recSurname,
                                    sendId: this.chatData.sendId,
                                    sendName: this.chatData.sendName,
                                    sendSurname: this.chatData.sendSurname,
                                    sendType: this.chatData.sendType,
                                    recType: this.chatData.recType
                                });

                            this.chatHistory.collection('chat').doc('r8y7owVgrSuuJtLPoZs7')
                                .collection('private')
                                .add({

                                    chatId: this.chatData.chatId,
                                    chatName: this.chatData.chatName,
                                    recId: this.chatData.sendId,
                                    recName: this.chatData.sendName,
                                    recSurname: this.chatData.sendSurname,
                                    sendId: this.chatData.recId,
                                    sendName: this.chatData.recName,
                                    sendSurname: this.chatData.recSurname,
                                    sendType: this.chatData.recType,
                                    recType: this.chatData.sendType

                                }).then(then=>{
                                console.log(then);
                            });
                        });

                });

        } else if(this.tipoSender == 'docente' && this.tipoReceiver == 'studente'){

            this.authService.getUserByMatricola(+this.idReceiver)
                .subscribe(data => {

                    this.Receiver = data;

                    console.log(this.Receiver);


                    this.chatData.chatId = this.chatHistory.createId();
                    this.chatData.recId = this.Receiver.idMatricola.toString();
                    this.chatData.recName = this.Receiver.nome;
                    this.chatData.recSurname = this.Receiver.cognome;

                    this.chatData.recType = this.Receiver.tipo;


                    console.log(this.idSender);
                    console.log(this.idReceiver);


// FAR  VEDERE A NIKO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                    // this.docService.getDocenteById(+this.idSender)

                    this.docService.getDocenteById(+this.idSender)
                        .subscribe(data =>{
                            this.docente = data

                            console.log(this.docente);


                            this.chatData.sendId = this.docente.idDocente.toString();
                            this.chatData.sendName = this.docente.nome;
                            this.chatData.sendSurname = this.docente.cognome;
                            this.chatData.sendType = 'docente';
                            this.chatData.chatName = this.chatData.sendName + ' - '+ this.chatData.recName;


                            this.chatHistory.collection('chat').doc('r8y7owVgrSuuJtLPoZs7')
                                .collection('private')
                                .add({

                                    chatId: this.chatData.chatId,
                                    chatName: this.chatData.chatName,
                                    recId: this.chatData.recId,
                                    recName: this.chatData.recName,
                                    recSurname: this.chatData.recSurname,
                                    sendId: this.chatData.sendId,
                                    sendName: this.chatData.sendName,
                                    sendSurname: this.chatData.sendSurname,
                                    sendType: this.chatData.sendType,
                                    recType: this.chatData.recType

                                });
                            this.chatHistory.collection('chat').doc('r8y7owVgrSuuJtLPoZs7')
                                .collection('private')
                                .add({

                                    chatId: this.chatData.chatId,
                                    chatName: this.chatData.chatName,
                                    recId: this.chatData.sendId,
                                    recName: this.chatData.sendName,
                                    recSurname: this.chatData.sendSurname,
                                    sendId: this.chatData.recId,
                                    sendName: this.chatData.recName,
                                    sendSurname: this.chatData.recSurname,
                                    sendType: this.chatData.recType,
                                    recType: this.chatData.sendType

                                }).then(then=>{
                                console.log(then);
                            });

                        });


                });

        }

        console.log(this.chatData.sendSurname);

    }




    sendMessage() {

        if (this.messaggio != '') {

            const today = new Date();

            const now = this.datepipe.transform(today, 'yyyy-MM-dd HH:mm');

            const dataMex = new Message(this.chatData.chatId, this.chatData.chatName, this.chatData.recId, this.chatData.recName, this.chatData.recSurname,
                this.chatData.sendId, this.chatData.sendName, this.chatData.sendSurname, this.messaggio, today);

            console.log(this.messaggio)

            this.messages.push(dataMex);
            this.messaggio = '';

            console.log(this.messages);

            if (this.idChat === '0') {

                this.chatHistory.collection('messages')
                    .add({

                        chatId: this.chatData.chatId,
                        chatName: this.chatData.chatName,
                        recId: this.chatData.recId,
                        recName: this.chatData.recName,
                        recSurname: this.chatData.recSurname,
                        sendId: this.chatData.sendId,
                        sendName: this.chatData.sendName,
                        sendSurname: this.chatData.sendSurname,
                        text: dataMex.text,
                        date: today

                    }).then(then => {
                    console.log(then);
                });

            } else {

                if (this.tipoSender === 'docente') {

                    this.chatHistory.collection('messages')
                        .add({

                            chatId: this.chatPublicData.chatId,
                            chatName: this.chatPublicData.chatName,
                            recId: '0',
                            recName: 'tutti',
                            recSurname: 'tutti',
                            sendId: this.currentDoc.idDocente.toString(),
                            sendName: this.currentDoc.nome,
                            sendSurname: this.currentDoc.cognome,
                            text: dataMex.text,
                            date: today

                        }).then(then => {
                        console.log(then);
                    });

                } else {

                    this.chatHistory.collection('messages')
                        .add({

                            chatId: this.chatPublicData.chatId,
                            chatName: this.chatPublicData.chatName,
                            recId: '0',
                            recName: 'tutti',
                            recSurname: 'tutti',
                            sendId: this.currentStud.idMatricola.toString(),
                            sendName: this.currentStud.nome,
                            sendSurname: this.currentStud.cognome,
                            text: dataMex.text,
                            date: today

                        }).then(then => {
                        console.log(then);
                    });

                }


            }



        }
    }

}

