import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  ViewChild,
  Renderer2,
  Inject,
  PLATFORM_ID,
  viewChild
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SocketService } from './socket.services';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EmptyError, filter, repeat, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})

export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
   constructor(
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private socket: SocketService,
    private elRef: ElementRef,
    private router: Router,
    private zone: NgZone,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object  
  ) {}
username='';
email='';
password='';
passi='';
Idd='';
inpii=''
useri='';
maxx='';
genidi='';
tasknamee='';
tasktitlee='';
taskdescriptiion='';
curridi='';
idi='';
idii='';
tasskname=''; 
tassktitle=''; 
tasskdesc='';
adds=false;
checks=false;
act=false;
naxe=false;
items: string[]=[];
valid1=false;
valid2=false;
valid3=false;
glist='';
restoree=''
gtask='';
private handlerr?: () => void;
us='';
nami='';
 deferredPrompt: any;
currid='';
day=0;
month=0;
year=0;
amount='';
loaner='';
currency='';
dati:any;
duedati='';
veric='';
coint=20;
validCurrencies = [
  'AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN',
  'BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND','BOB','BRL','BSD','BTN','BWP','BYN','BZD',
  'CAD','CDF','CHF','CLP','CNY','COP','CRC','CUC','CUP','CVE','CZK',
  'DJF','DKK','DOP','DZD',
  'EGP','ERN','ETB','EUR',
  'FJD','FKP','GBP','GEL','GGP','GHS','GIP','GMD','GNF','GTQ','GYD',
  'HKD','HNL','HRK','HTG','HUF',
  'IDR','ILS','IMP','INR','IQD','IRR','ISK',
  'JEP','JMD','JOD','JPY',
  'KES','KGS','KHR','KID','KMF','KRW','KWD','KYD','KZT',
  'LAK','LBP','LKR','LRD','LSL','LYD',
  'MAD','MDL','MGA','MKD','MMK','MNT','MOP','MRU','MUR','MVR','MWK','MXN','MYR','MZN',
  'NAD','NGN','NIO','NOK','NPR','NZD',
  'OMR',
  'PAB','PEN','PGK','PHP','PKR','PLN','PYG',
  'QAR',
  'RON','RSD','RUB','RWF',
  'SAR','SBD','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','STN','SVC','SYP','SZL',
  'THB','TJS','TMT','TND','TOP','TRY','TTD','TVD','TWD','TZS',
  'UAH','UGX','USD','UYU','UZS',
  'VES','VND','VUV',
  'WST',
  'XAF','XCD','XOF','XPF',
  'YER','ZAR','ZMW','ZWL'
];
curr='';
Date='';
dct='';
isv=false;
isvv=false;
duedate='';
inpaa='';
che=true;
fromi='';
Tos='';
@ViewChild('register') register!: ElementRef<HTMLDivElement>
@ViewChild('loging') login!: ElementRef<HTMLDivElement>
@ViewChild('idregister') idregister!: ElementRef<HTMLDivElement>
@ViewChild('Todolists') Todolists!: ElementRef<HTMLDivElement>
@ViewChild('indiv') indiv!: ElementRef<HTMLDivElement>
@ViewChild('idcrate') idcrate!: ElementRef<HTMLDivElement>
@ViewChild('todos') todos!: ElementRef<HTMLDivElement>
@ViewChild('lists') lists!: ElementRef<HTMLDivElement>
@ViewChild('cratetask') cratetask!: ElementRef<HTMLDivElement>
@ViewChild('takn') takn!: ElementRef<HTMLDivElement>
@ViewChild('ttaknn') ttaknn!:ElementRef<HTMLDivElement>
@ViewChild('todoss') todoss!: ElementRef<HTMLDivElement>
@ViewChild('validation1') validation1!: ElementRef<HTMLParagraphElement>
@ViewChild('validation2') validation2!: ElementRef<HTMLParagraphElement>
@ViewChild('validation3') validation3!: ElementRef<HTMLParagraphElement>
@ViewChild('validation4') validation4!: ElementRef<HTMLParagraphElement>
@ViewChild('validation5') validation5!: ElementRef<HTMLParagraphElement>
@ViewChild('validation6') validation6!: ElementRef<HTMLParagraphElement>
@ViewChild('validation7') validation7!: ElementRef<HTMLParagraphElement>
@ViewChild('validation8') validation8!: ElementRef<HTMLParagraphElement>
@ViewChild('validation9') validation9!: ElementRef<HTMLParagraphElement>
@ViewChild('validation10') validation10!: ElementRef<HTMLParagraphElement>
@ViewChild('validation11') validation11!: ElementRef<HTMLParagraphElement>
@ViewChild('validation12') validation12!: ElementRef<HTMLParagraphElement>
@ViewChild('validation13') validation13!: ElementRef<HTMLParagraphElement>
@ViewChild('validation14') validation14!: ElementRef<HTMLParagraphElement>
@ViewChild('validation15') validation15!: ElementRef<HTMLParagraphElement>
@ViewChild('validation16') validation16!: ElementRef<HTMLParagraphElement>
@ViewChild('validation17') validation17!: ElementRef<HTMLParagraphElement>
@ViewChild('validation19') validation19!: ElementRef<HTMLParagraphElement>
@ViewChild('validation24') validation24!: ElementRef<HTMLParagraphElement>
@ViewChild('validation25') validation25!: ElementRef<HTMLParagraphElement>
@ViewChild('validation26') validation26!: ElementRef<HTMLParagraphElement>
@ViewChild('validation37') validation37!: ElementRef<HTMLParagraphElement>
@ViewChild('validation38') validation38!: ElementRef<HTMLParagraphElement>
@ViewChild('validation44') validation44!: ElementRef<HTMLParagraphElement>
@ViewChild('datees') datees!: ElementRef<HTMLDivElement>
@ViewChild('task') task!: ElementRef<HTMLDivElement>
@ViewChild('sataske') sataske!: ElementRef<HTMLDivElement>
@ViewChild('button8') button8!: ElementRef<HTMLButtonElement>
@ViewChild('remove') remove!: ElementRef<HTMLButtonElement>
@ViewChild('usure') usure!: ElementRef<HTMLParagraphElement>
@ViewChild('yesno') yesno!: ElementRef<HTMLDivElement>
@ViewChild('button17') button17!: ElementRef<HTMLButtonElement>
@ViewChild('usis') usis!: ElementRef<HTMLDivElement>
@ViewChild('userss') userss!:ElementRef<HTMLDivElement>
@ViewChild('addmore') addmore!:ElementRef<HTMLButtonElement>
@ViewChild('button20') button20!: ElementRef<HTMLButtonElement>
@ViewChild('saaide') saaide!: ElementRef<HTMLDivElement>
@ViewChild('saaidee') saaidee!: ElementRef<HTMLDivElement>
@ViewChild('inpi') inpi!: ElementRef<HTMLInputElement>
@ViewChild('searchts') searchts!: ElementRef<HTMLDivElement>
@ViewChild('srch') srch!: ElementRef<HTMLDivElement>
@ViewChild('liske') liske!: ElementRef<HTMLDivElement>
@ViewChild('salike') salike!: ElementRef<HTMLDivElement>
@ViewChild('ko') ko!: ElementRef<HTMLDivElement>
@ViewChild('yessno') yessno!: ElementRef<HTMLDivElement>
@ViewChild('button117') button117!: ElementRef<HTMLButtonElement>
@ViewChild('button2') button2!: ElementRef<HTMLButtonElement>
@ViewChild('button5') button5!: ElementRef<HTMLButtonElement>
@ViewChild('usuree') usuree!: ElementRef<HTMLParagraphElement>
@ViewChild('button10') button10!: ElementRef<HTMLButtonElement>
@ViewChild('install') install!: ElementRef<HTMLDivElement>
@ViewChild('loaner') loanerr!: ElementRef<HTMLSpanElement>
@ViewChild('lender') lender!: ElementRef<HTMLSpanElement>
@ViewChild('amount') amounti!: ElementRef<HTMLSpanElement>
@ViewChild('currency') currencyy!: ElementRef<HTMLSpanElement>
@ViewChild('datetime') datetime!: ElementRef<HTMLSpanElement>
@ViewChild('duedate') dudate!: ElementRef<HTMLSpanElement>
@ViewChild('taskdescription') taskdescriptionn!: ElementRef<HTMLSpanElement>
@ViewChild('deski') deski!: ElementRef<HTMLDivElement>
@ViewChild('filtri') filtri!:ElementRef<HTMLDivElement>
@ViewChild('ca') ca!: ElementRef <HTMLParagraphElement>
@ViewChild('na') na!: ElementRef <HTMLParagraphElement>
@ViewChild('validation30') validation30!: ElementRef<HTMLParagraphElement>
@ViewChild ('inap') inap!: ElementRef<HTMLInputElement>
@ViewChild ('opts') opts!: ElementRef<HTMLDivElement>
@ViewChild ('asd') asd!: ElementRef<HTMLDivElement>
@ViewChild ('filter') fliter!: ElementRef <HTMLDivElement>
@ViewChild('fil') fil!: ElementRef<HTMLParagraphElement>
@ViewChild('status') statuso!: ElementRef<HTMLSpanElement>
@ViewChild('meall') meall!: ElementRef<HTMLDivElement>
@ViewChild('me') me!: ElementRef<HTMLButtonElement>
@ViewChild('alls') allss!: ElementRef<HTMLButtonElement>
@ViewChild('resulti') resulti!: ElementRef<HTMLDivElement>
@ViewChild('fulls') fulls!: ElementRef<HTMLDivElement>
@ViewChild('converts') converts!: ElementRef<HTMLDivElement>
@ViewChild('fulls') fullss!: ElementRef<HTMLDivElement>
@ViewChild('instots') instots!: ElementRef<HTMLDivElement>
@ViewChild('instoti') instoti!: ElementRef<HTMLDivElement>
@ViewChild('totsss') totsss!: ElementRef<HTMLSpanElement>
@ViewChild('totss') totss!: ElementRef<HTMLSpanElement>
@ViewChild('button31') button31!: ElementRef<HTMLButtonElement>
@ViewChild('maio') maio!: ElementRef<HTMLDivElement>
@ViewChild('button12') button12!: ElementRef<HTMLButtonElement>
@ViewChild('button30') button30!: ElementRef<HTMLButtonElement>
@ViewChild('button11') button11!: ElementRef<HTMLButtonElement>
@ViewChild('financ') financ!: ElementRef<HTMLDivElement>
@ViewChild('govis') govo!: ElementRef<HTMLButtonElement>
@ViewChild('button32') button32!: ElementRef<HTMLButtonElement>
@ViewChild('govisi') govisi!: ElementRef<HTMLButtonElement>
@ViewChild('govoso') govoso!: ElementRef<HTMLButtonElement>
@ViewChild('lendsss') lendsss!: ElementRef<HTMLDivElement>
@ViewChild('loansss') loansss!: ElementRef<HTMLDivElement>
@ViewChild('profitta') profitta!: ElementRef<HTMLParagraphElement>
@ViewChild('case') case!: ElementRef <HTMLDivElement>
@ViewChild('errx') errx!: ElementRef <HTMLParagraphElement>
@ViewChild('authetic') authetic!: ElementRef <HTMLDivElement>
@ViewChild('restpp') restpp!: ElementRef<HTMLDivElement>
@ViewChild('crateacc') crateacc!: ElementRef<HTMLButtonElement>
@ViewChild('restrr') restrr!: ElementRef<HTMLButtonElement>
@ViewChild('signin') signin!: ElementRef<HTMLButtonElement>
@ViewChild('signup') signup!: ElementRef<HTMLButtonElement>
@ViewChild('button1') button1!: ElementRef<HTMLButtonElement>
@ViewChild('validation54') validation54!: ElementRef<HTMLParagraphElement>
@ViewChild('tvali') tvali!: ElementRef<HTMLInputElement>
@ViewChild('Password') Password!: ElementRef<HTMLInputElement>
@ViewChild('saode') saode!: ElementRef<HTMLButtonElement>
  value: string = '';
  b: string = '';
  g: number = 1;
dato='';
status='';
date1='';
date2='';
ami='';
  display: string = '';
ngOnInit() { 
  this.socket.onerror((err)=>{
    if(err==='utaken'){
      this.validation4.nativeElement.textContent="❌ Username is already taken!";
      this.validation4.nativeElement.style.color='red';
    }
    if(err==='etaken'){
      this.validation4.nativeElement.textContent='❌ Email is already taken!';
      this.validation4.nativeElement.style.color='red';
    }
    if(err==='eutaken'){
      this.validation4.nativeElement.textContent='❌ Username and email is taken!';
      this.validation4.nativeElement.style.color='red';
    }
    setTimeout(() => {
      this.validation4.nativeElement.textContent='';
    }, 4000);
  });
  this.socket.onsuccess((succ)=>{
    if(succ==='added'){
        this.validation4.nativeElement.textContent='';
        this.validation4.nativeElement.style.color='red';
           const code = Math.floor(100000 + Math.random() * 900000);
       this.socket.adcodi(this.username,this.email,Number(code));
       
    this.authetic.nativeElement.style.display='flex';
    this.register.nativeElement.style.pointerEvents='none'
    this.register.nativeElement.style.opacity='0.8';
    this.signup.nativeElement.disabled=true;
    this.button1.nativeElement.disabled=true;
    }
  });


  this.socket.onsignin((vall,usero)=>{
    if(vall==='nousername'){
      this.validation6.nativeElement.textContent="* Wrong username!";
      setTimeout(() => {
        this.validation6.nativeElement.textContent='';

      }, 2500);
    }
    if(vall==='nopassword'){
      this.validation7.nativeElement.textContent='* Wrong user password!';
      setTimeout(() => {
      this.validation7.nativeElement.textContent='';
      }, 2500);
    }
    if(vall==='logged'){
      this.us=this.useri;
      setTimeout(() => {
        this.login.nativeElement.style.display='none';
  this.Todolists.nativeElement.style.display='flex';
  this.install.nativeElement.style.display='none';
      }, 500);  
      this.socket.load(usero);
    }
  });
  this.socket.oncheck((resp)=>{
    if(resp==='exists'){
      this.validation10.nativeElement.textContent='❌ this id already exists!';
      setTimeout(() => {
        this.validation10.nativeElement.textContent='';
      }, 2500);
    }
    if(resp==='addd'){
      this.validation10.nativeElement.textContent='✅ New Id added!';
      this.validation10.nativeElement.style.color='green';
      setTimeout(() => {
        this.validation10.nativeElement.style.color='red';
        this.validation10.nativeElement.textContent='';
        this.idcrate.nativeElement.style.display='none';
        this.Todolists.nativeElement.style.display='flex'; 
        this.socket.load(this.useri);
      }, 2500);
    }
  });

  this.socket.onAdded((respi)=>{
    if(respi==="addded"){
      this.validation12.nativeElement.textContent='✅ Successfully added!';
      this.validation12.nativeElement.style.color='green';
      setTimeout(() => {
        this.idregister.nativeElement.style.display='none';
        this.Todolists.nativeElement.style.display='flex';
        this.validation12.nativeElement.style.color='red';
        this.validation12.nativeElement.textContent='';
        this.socket.load(this.useri);
      }, 2500);
      this.todos.nativeElement.innerHTML='';
    }
    if(respi==='erri'){
      this.validation12.nativeElement.textContent='❌ Max amount of users reached for this Id!';
      setTimeout(() => {
        this.validation12.nativeElement.textContent='';
      }, 2500);
    }
    if(respi==='errii'){
      this.validation5.nativeElement.textContent='❌ Wrong Id!';
      setTimeout(() => {
        this.validation5.nativeElement.textContent='';
      }, 2500);
    }
    if(respi==='aro'){
      this.validation5.nativeElement.textContent='❌ Already registered!';
      setTimeout(() => {
        this.validation5.nativeElement.textContent='';
      }, 2500);
    }
  });

  this.socket.onload((tasks)=>{
    if(tasks.length===0){
      this.todos.nativeElement.style.display='flex';
      this.todos.nativeElement.style.justifyContent='center';
      this.todos.nativeElement.style.alignItems='center';
      this.todos.nativeElement.textContent='No added lists!';
    }
    else{
      this.todos.nativeElement.style.display='';
      this.todos.nativeElement.style.justifyContent='normal';
      this.todos.nativeElement.style.alignItems='auto';
      this.todos.nativeElement.textContent='';
    this.todos.nativeElement.innerHTML='';
    this.renderer.addClass(this.remove.nativeElement,'hov1');
    const taski=JSON.stringify(tasks);
    tasks.forEach((element: { name: any; id:any; }) => {
      const divi = document.createElement('div');
      this.renderer.addClass(divi,'lists');
      divi.textContent=element.name;
      divi.addEventListener('click',()=>{
        const namm=element.name;
         if(this.act){
          this.yesno.nativeElement.style.display='flex';
          this.Todolists.nativeElement.style.opacity='0.8';
          this.todos.nativeElement.style.pointerEvents='none';
          this.usure.nativeElement.textContent=`Are you sure you want to delete "${namm}"?`
         const handler = () => {
          const elid=element.id;
          const elnam=element.name;
          this.socket.removeid(elid,elnam,this.useri);
  this.button17.nativeElement.removeEventListener('click',handler);
};
this.addmore.nativeElement.disabled=true;
this.button17.nativeElement.addEventListener('click', handler);
    }
    else{
        const idd=element.id;
        this.socket.tasks(idd);
        setTimeout(() => {
          this.Todolists.nativeElement.style.display='none';
        this.liske.nativeElement.style.display='none';
        this.lists.nativeElement.style.display='flex'; 
        this.meall.nativeElement.style.display='flex'; 
        this.userss.nativeElement.style.display='flex';
        this.button31.nativeElement.style.display='flex';
        }, 1000);
        this.salike.nativeElement.innerHTML='';
        this.currid=element.id;
        const aa=element.id;
        console.log(element.id);
        this.socket.loadtasks(aa);
        this.socket.loadid(idd);
        this.socket.users(idd);
    }
      });
      this.todos.nativeElement.appendChild(divi);
    });
    if(this.remove.nativeElement.textContent==='✅ Done'){
    const haia=document.getElementsByClassName('lists');
for (let i = 0; i < haia.length; i++) {
  const el = haia[i] as HTMLElement;
  el.style.cursor= 'url("assets/images/icons8-x-18.png") 0 0, auto';
  }
}
}  this.srch.nativeElement.textContent="Search lists";
    this.searchts.nativeElement.style.display='flex';
    this.inpi.nativeElement.placeholder='Enter lists name...';
    this.inpi.nativeElement.title='Enter lists name!';
  }); 
  this.socket.onAddnew((rep,idd,iddd,user,loaner,amount,currency,date,taskdesc)=>{
    if(rep==='add'){
    this.validation16.nativeElement.textContent='✅ Successfully added!';
    this.validation16.nativeElement.style.color='green';
    this.socket.emaili(idd,iddd,user,loaner,amount,currency);
    setTimeout(() => {
      this.validation16.nativeElement.textContent='';
      this.cratetask.nativeElement.style.display='none';
      this.lists.nativeElement.style.display='flex';
      this.meall.nativeElement.style.display='flex';
      this.userss.nativeElement.style.display='flex';
      if(this.isPhone()){
        this.saaide.nativeElement.style.display='none'
        this.saode.nativeElement.style.display='flex';
        this.button31.nativeElement.style.display='flex';
      }
      else{
      this.saaide.nativeElement.style.display='flex';
      }
      this.socket.loadtasks(this.currid);
    }, 3000);
  }
  if(rep==='netu'){
    this.validation16.nativeElement.textContent=`❌ User ${loaner} does not exists!`;
    this.validation16.nativeElement.style.color='red';
    setTimeout(() => {
    this.validation16.nativeElement.textContent=``;
    this.validation16.nativeElement.style.color='white';
    }, 2500);
  }
  if(rep==='vera'){
    this.validation16.nativeElement.textContent='❌ Cant lend money to yourself';
    this.validation16.nativeElement.style.color='red';
    setTimeout(() => {
    this.validation16.nativeElement.textContent='';
    this.validation16.nativeElement.style.color='white';
    }, 2500);
  }
  if(rep==='aris'){
    this.yessno.nativeElement.style.display='flex';
    this.usuree.nativeElement.textContent=`Taskname "${user}" already exists!`;
       this.idi=idd;
       this.idii=iddd; 
       this.loaner=loaner; 
       this.amount=amount;
       this.currency=currency;
       this.tasskdesc=taskdesc;
      this.naxe=true;
  }
  });

this.socket.onusers((userebi)=>{
  this.usis.nativeElement.innerHTML='';
userebi.forEach((element:{user:any}) => {
  const p=document.createElement('p');
  p.textContent=element.user;
  p.style.color='white';
  p.style.marginLeft=`${7}px`;
  p.style.marginTop='0px';
  this.usis.nativeElement.appendChild(p);
});
});
  this.socket.onloadtasks((taskunebi, idi) => {
  this.items = [];
  this.todoss.nativeElement.innerHTML = '';
    this.searchts.nativeElement.style.display='none';
    if(this.isPhone()){
    this.saode.nativeElement.style.display='flex';
    }
  if (!taskunebi || taskunebi.length === 0) {
    this.todoss.nativeElement.style.display = 'flex';
    this.todoss.nativeElement.style.justifyContent = 'center';
    this.todoss.nativeElement.style.alignItems = 'center';
    this.todoss.nativeElement.textContent = 'No added lists!';
    this.searchts.nativeElement.style.display='none';
  } else {
    this.todoss.nativeElement.style.display = '';
    this.todoss.nativeElement.style.justifyContent = '';
    this.todoss.nativeElement.style.alignItems = '';
    this.todoss.nativeElement.textContent = '';
taskunebi.slice().reverse().forEach((element: {id:any, idd:any, user:any, loaner:any, amount:any, currency:any, datetime:any, duedate:any, taskdescription:any, status:any}) => {
        const divi: HTMLDivElement = document.createElement('div');
        const p: HTMLParagraphElement = document.createElement('p');
        const pi: HTMLParagraphElement = document.createElement('p');
         const [dd, mm, yyyy] = element.duedate.split("/").map(Number);
               const today = new Date();
         const endDate = new Date(yyyy, mm - 1, dd);
             
const ddd = today.getDate();          
const mmm = today.getMonth() + 1;     
const yyyyTime = today.getFullYear(); 

  const current = new Date(yyyy, mm - 1, ddd); 
  if (today >= endDate) {
    this.socket.sento(element.id,element.idd,this.useri);
  }

        this.renderer.addClass(divi, 'listss');
        if(element.status==='unpayed' && this.useri===element.user){
           p.style.color='red';
          divi.style.border='1px solid red';
          pi.style.color='red';
          divi.style.boxShadow='0 0 10px 0px red';
          p.textContent=`${element.user} lended ${element.amount}${element.currency.toUpperCase()} to ${element.loaner}`;
        }  
        else if(element.status==='payed' && this.useri===element.user){
          p.style.color='green';
          divi.style.border='1px solid green';
          pi.style.color='green';
          divi.style.boxShadow='0 0 10px 0px green';
          p.textContent=`${element.loaner} payed ${element.amount}${element.currency.toUpperCase()} to ${element.user}`;
        }  
        else{
          if(element.status==='unpayed'){
           p.textContent=`${element.user} lended ${element.amount}${element.currency.toUpperCase()} to ${element.loaner}`;
           if(element.loaner===this.useri){
              p.style.color='green';
          divi.style.border='1px solid green';
          pi.style.color='green';
          divi.style.boxShadow='0 0 10px 0px green';
           }
          }
          else{
           p.textContent=`${element.loaner} payed ${element.amount}${element.currency.toUpperCase()} to ${element.user}`;
           if(element.loaner===this.useri){
            p.style.color='red';
          divi.style.border='1px solid red';
          pi.style.color='red';
          divi.style.boxShadow='0 0 10px 0px red';
           }
          }
        }    
        
    pi.textContent = element.datetime;
        pi.style.alignSelf='flex-start';
        this.items.push(element.idd);
         p.style.marginLeft='10px';
         p.style.fontSize='12px';
         pi.style.marginLeft='10px';
         pi.style.marginLeft='auto';
         pi.style.marginRight='5px';
         pi.style.fontSize='12px';
         if(this.isPhone()){
          p.style.fontSize='9px';
          pi.style.fontSize='9px';
         }
         divi.appendChild(p);
         divi.appendChild(pi);
        divi.addEventListener('click', () => {
          const loan=element.loaner;
          const amount=element.amount;
          const currecny=element.currency.toUpperCase();
          const dt=element.datetime;
          const taskdesc= element.taskdescription;  
          const duedati= element.duedate;
          const stats= element.status;
          if(this.useri!==element.loaner && this.useri!=element.user){
            const dov : HTMLDivElement = document.createElement('div');
            this.renderer.addClass(dov,'forval');
            dov.textContent="You cant view others loans!";
            setTimeout(() => {
              document.body.removeChild(dov);
            }, 4900);
            document.body.appendChild(dov);
            
          }
          else{
          this.lender.nativeElement.textContent=this.useri;
          this.loanerr.nativeElement.textContent=loan; 
          this.amounti.nativeElement.textContent=amount;
          this.currencyy.nativeElement.textContent=currecny;
          this.datetime.nativeElement.textContent=dt;
          this.taskdescriptionn.nativeElement.textContent=taskdesc;  
          this.dudate.nativeElement.textContent=duedati;   
          this.statuso.nativeElement.textContent=stats;  
          this.curridi = element.idd;
          this.task.nativeElement.style.display = 'flex';
          this.lists.nativeElement.style.display = 'none';
          this.meall.nativeElement.style.display='none';
          this.searchts.nativeElement.style.display = 'none';
          this.liske.nativeElement.style.display = 'none';
          this.salike.nativeElement.innerHTML = '';
          if(this.isPhone()){
            this.saaide.nativeElement.style.display='none';
            this.saode.nativeElement.style.display='flex';
          }
          }
        });

        this.todoss.nativeElement.appendChild(divi);
      
    });
  }

  this.srch.nativeElement.textContent = "Search tasks";
  this.inpi.nativeElement.placeholder = 'Enter tasks name...';
  this.inpi.nativeElement.title = 'Enter tasks name!';

});

    
  this.socket.oncompleted((del,dul)=>{
    if(del==='ara'){
      this.validation17.nativeElement.textContent=`Behave urself woman!!!`;
      this.validation17.nativeElement.style.color='red';
    }
    if(del==='nwu'){
      this.validation17.nativeElement.textContent='Loan is already payed!';
      this.validation17.nativeElement.style.color='red';
    }
    else if(del==='cannt'){
       this.validation17.nativeElement.textContent='You cant pay yourself!';
      this.validation17.nativeElement.style.color='red';
    }
    else{
    this.validation17.nativeElement.textContent=`✅ ${JSON.stringify(dul)} payed ${JSON.stringify(del)}!`;
    this.validation17.nativeElement.style.color='green';
    } setTimeout(() => {
      this.validation17.nativeElement.textContent='';
      this.validation17.nativeElement.style.color='none';
      this.task.nativeElement.style.display='none';
      this.lists.nativeElement.style.display='flex';
      this.meall.nativeElement.style.display='flex';
      this.socket.loadtasks(this.currid);
    }, 2300);
  });

  this.socket.onloadid((idda)=>{
    setTimeout(() => {
      if(this.isPhone()){
        this.saaide.nativeElement.style.display='none';
        this.saode.nativeElement.style.display='flex';
      }
      else{
    this.saaide.nativeElement.style.display='flex';  
  }
    this.saaidee.nativeElement.textContent=idda;
    }, 450);
  });

  this.socket.onsearch((loadd)=>{
    if(loadd.length===0){
      this.salike.nativeElement.textContent='No lists found!';
      this.salike.nativeElement.style.display='flex';
      this.salike.nativeElement.style.justifyContent='center';
      this.salike.nativeElement.style.alignItems='center';
    }else{
      this.salike.nativeElement.textContent='';
      this.salike.nativeElement.style.display='';
      this.salike.nativeElement.style.justifyContent='normal';
      this.salike.nativeElement.style.alignItems='auto';
    loadd.forEach((element: {id:any,name:any}) => {
      const divi = document.createElement('div');
      this.renderer.addClass(divi,'lists');
      divi.textContent=element.name;
      if(this.isPhone()){
  divi.style.width=`${150}px`;
      divi.style.height=`${19}px`;
      divi.style.fontSize='11px';
      }
      else{
      divi.style.width=`${230}px`;
      divi.style.height=`${25}px`;
      }
      divi.addEventListener('click',()=>{
        const namm=element.name;
        const idd=element.id;
        this.socket.tasks(idd);
        this.Todolists.nativeElement.style.display='none';
        this.currid=element.id;
        const aa=element.id;console.log(element.id);
        this.lists.nativeElement.style.display='flex';
        this.button31.nativeElement.style.display='flex';
        this.meall.nativeElement.style.display='flex';
        this.liske.nativeElement.style.display='none';
        this.salike.nativeElement.innerHTML='';
        this.socket.loadtasks(aa);
        this.socket.loadid(idd);
        this.socket.users(idd);
        setTimeout(() => {
           this.userss.nativeElement.style.display='flex';
        }, 500);
      });
      this.salike.nativeElement.appendChild(divi);
    });
  } 
    this.ko.nativeElement.textContent=`Lists named: ${this.glist}`;

  });

  this.socket.onsearchh((tas)=>{
     if(tas.length===0){
      this.salike.nativeElement.textContent='No tasks found!';
      this.salike.nativeElement.style.display='flex';
      this.salike.nativeElement.style.justifyContent='center';
      this.salike.nativeElement.style.alignItems='center';
    }else{
      this.salike.nativeElement.textContent='';
      this.salike.nativeElement.style.display='';
      this.salike.nativeElement.style.justifyContent='normal';
      this.salike.nativeElement.style.alignItems='auto';
  tas.forEach((element: {id:any,idd:any,taskname:any,tasktitle:any,taskdescription:any})=>{
      const divi=document.createElement('div');
      this.renderer.addClass(divi,'lists');
      divi.textContent=element.taskname;
      divi.style.width=`${230}px`;
      divi.style.height=`${25}px`;
      console.log(element.id,element.idd,element.taskdescription,element.taskname,element.tasktitle)
      divi.addEventListener('click',()=>{
        const taskn=element.taskname;
        const taskti=element.tasktitle+':';
        const taskdesc=element.taskdescription;
        this.takn.nativeElement.textContent=taskn;
        this.ttaknn.nativeElement.textContent=taskti;
        this.sataske.nativeElement.textContent=taskdesc;
        this.task.nativeElement.style.display='flex';
        this.lists.nativeElement.style.display='none';
        this.meall.nativeElement.style.display='none';
        this.searchts.nativeElement.style.display='none';
        this.liske.nativeElement.style.display='none';
        this.button31.nativeElement.style.display='flex';
        this.salike.nativeElement.innerHTML='';
   this.srch.nativeElement.textContent="Search tasks";
    this.inpi.nativeElement.placeholder='Enter tasks name...';
    this.inpi.nativeElement.title='Enter tasks name!';
      });
      this.salike.nativeElement.appendChild(divi);
      
  });
}
this.ko.nativeElement.textContent=`Tasks named: ${this.gtask}`;    
  });
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      console.log('PWA install prompt saved.');
      
    });

    this.socket.onconverted((result)=>{
      this.resulti.nativeElement.textContent=result;
    });

    this.socket.onfinans((hala)=>{
      this.instots.nativeElement.innerHTML='';
      const arr:any=[];
      Object.entries(hala).forEach(([key, value]) => {
     const pi : HTMLParagraphElement = document.createElement('p');
     pi.textContent=`${value} ${key.toUpperCase()}`;
     pi.style.color='red';
     pi.style.marginLeft='13px';
     pi.style.marginTop='6px';
     this.instots.nativeElement.appendChild(pi);
     const tho={
      amount:value,
      curr:key
     }
     arr.push(tho);
});
this.socket.total(arr);
  });

  this.socket.onfinanse((hala)=>{
      this.instoti.nativeElement.innerHTML='';
      const arr:any=[];
      Object.entries(hala).forEach(([key, value]) => {
     const pi : HTMLParagraphElement = document.createElement('p');
     pi.textContent=`${value} ${key.toUpperCase()}`;
     pi.style.color='green';
     pi.style.marginLeft='13px';
     pi.style.marginTop='6px';
     this.instoti.nativeElement.appendChild(pi);
     const tho={
      amount:value,
      curr:key
     }
     arr.push(tho);
});
this.socket.totals(arr);
  });

  this.socket.ontotals((haia)=>{
    this.totsss.nativeElement.textContent=`${haia.toFixed(3)} USD`;
    this.lendsss.nativeElement.textContent=`${haia.toFixed(3)} USD`;
    this.lendsss.nativeElement.style.color='red';
    this.totsss.nativeElement.style.color='red';
  });

  this.socket.ontotalss((haia)=>{
    this.totss.nativeElement.textContent=`${haia.toFixed(3)} USD`;
    this.loansss.nativeElement.textContent=`${haia.toFixed(3)} USD`;
    this.loansss.nativeElement.style.color='green';
    this.totss.nativeElement.style.color='green';
  });
this.socket.ondaaemail((email,name,code)=>{
  this.http.post("https://beckend2.onrender.com/send-email", {
  to: email,
  subject: "Loan Alert",
  text: `Dear ${this.useri},

  Here is your on time code - ${code}
  `
}).subscribe(res => {
  console.log(res);
});
});
 this.socket.onsento((user,loaner,currency,amount,email)=>{
this.http.post("https://beckend2.onrender.com/send-email", {
  to: email,
  subject: "Loan Alert",
  text: `Dear ${this.useri},

  You have not payed to ${user} ${amount}${currency.toUpperCase()} you loaned!
  `
}).subscribe(res => {
  console.log(res);
});
 });
    
  
 this.socket.onemaili((id,idd,user,loaner,amount,currency,email)=>{
  this.http.post('https://beckend2.onrender.com/send-email',{
    to:email,
    subject: 'New Loan',
    text:`Dear ${this.useri},
    
    User ${user} lent ${amount} ${currency.toUpperCase()} to ${loaner}!`
  }).subscribe(res => {
    console.log(res);
  });
 });

this.socket.sendee((email,user,pass)=>{
 this.http.post('https://beckend2.onrender.com/send-email',{
    to:email,
    subject: 'Your password',
    text:`Dear ${user},
    
    Your password is - ${pass}!
    `
  }).subscribe(res => {
    console.log(res);
  });
});

 this.socket.oncheckiti((code)=>{
if(code==='wrong'){
  this.errx.nativeElement.textContent='* Wrong code!';
  setTimeout(() => {
    this.errx.nativeElement.textContent='';
  }, 2500);
}
else{
this.authetic.nativeElement.style.display='none';
this.register.nativeElement.style.opacity='1';
this.signup.nativeElement.disabled=false;
this.button1.nativeElement.disabled=false;
this.validation4.nativeElement.textContent="✅ Registered successfully!"
this.validation4.nativeElement.style.color='green';
setTimeout(() => {
  this.validation4.nativeElement.textContent='';
  this.login.nativeElement.style.display='flex';
this.register.nativeElement.style.display='none';
this.register.nativeElement.style.pointerEvents='auto'
}, 3000);
}
 });

 this.socket.oncheemail((res)=>{
if(res==='wrong'){
this.validation44.nativeElement.textContent='* Email is not registered or valid!';
setTimeout(() => {
  this.validation44.nativeElement.textContent='';
}, 2500);
}
if(res==='done'){
  this.validation44.nativeElement.textContent='* Password was sent to this email!';
  this.validation44.nativeElement.style.color='green';
  setTimeout(() => {
    this.validation44.nativeElement.textContent='';
    this.validation44.nativeElement.style.color='red';
    this.restpp.nativeElement.style.display='none';
    this.signin.nativeElement.disabled=false;
    this.restrr.nativeElement.disabled=false;
    this.crateacc.nativeElement.disabled=false;
  }, 2500);
}
 });
 }
ngAfterViewInit() {  
}
ngAfterViewChecked() { 
 }
   append(value: string): void {
    this.display += value;
  }

  clear(): void {
    this.display = '';
  }

  backspace(): void {
    this.display = this.display.slice(0, -1);
  }

  toggleSign(): void {
    if (this.display) {
      if (this.display.startsWith('-')) {
        this.display = this.display.substring(1);
      } else {
        this.display = '-' + this.display;
      }
    }
  }

  calculate(): void {
    try {
      const sanitized = this.display.replace(/X/g, '*');
      this.display = eval(sanitized).toString();
    } catch {
      this.display = 'Error';
    }
  }

gaatote(f1:number,f2:number){
  const num=f1-f2;
  if(String(num).length>5){
    this.profitta.nativeElement.style.fontSize='12px';
  }
  if(num<0){
    this.profitta.nativeElement.textContent=String(num)+' USD';
    this.profitta.nativeElement.style.color='red';
  }
  else{
    this.profitta.nativeElement.textContent=String(num)+' USD';
    this.profitta.nativeElement.style.color='green';
  }
}


submit() {
  if (this.username === '') {
    this.validation1.nativeElement.textContent = '* User field is empty!';
    setTimeout(() => {
      this.validation1.nativeElement.textContent='';
    }, 2500);
    this.valid1=false;
  } else {
    this.validation1.nativeElement.textContent = '';
    this.valid1=true;
  }

  if (this.email === '') {
    this.validation2.nativeElement.textContent = '* Email field is empty!';
    setTimeout(() => {
      this.validation2.nativeElement.textContent='';
    }, 2500);
    this.valid2=false;
  } else if (!this.validemail(this.email)) {
    this.validation2.nativeElement.textContent = '* Wrong email format!';
    setTimeout(() => {
      this.validation2.nativeElement.textContent='';
    }, 2500);
    this.valid2=false;
  } else {
    this.validation2.nativeElement.textContent = '';
    this.valid2=true;
  }

  if (this.password === '') {
    this.validation3.nativeElement.textContent = '* Password field is empty!';
    setTimeout(() => {
       this.validation3.nativeElement.textContent='';
    }, 2500);
    this.valid3=false;
  } else if (this.password.length < 8) {
    this.validation3.nativeElement.textContent = '* Password must be at least 8 characters!';
    setTimeout(() => {
          this.validation3.nativeElement.textContent='';
    }, 2500);
    this.valid3=false;
  } else if(this.password.length>16){
    this.validation3.nativeElement.textContent='* Password must be less than 16 characters!';
    setTimeout(() => {
      this.validation3.nativeElement.textContent='';
    }, 2500);
    this.valid3=false;
  } else {
    this.validation3.nativeElement.textContent = '';
    this.valid3=true;
  }
  if(this.valid1 && this.valid2 && this.valid3){
    this.socket.submit(this.username,this.email,this.password);
  }
}

Signin(){
if(this.useri===''){
  this.validation6.nativeElement.textContent='* Username field is empty!';
  setTimeout(() => {
    this.validation6.nativeElement.textContent='';
  }, 2500);
}
else{
  this.validation6.nativeElement.textContent=''
}
if(this.passi===''){
  this.validation7.nativeElement.textContent='* Password field is empty!'
  setTimeout(() => {
    this.validation7.nativeElement.textContent='';
  }, 2500);
}
else{
  this.validation7.nativeElement.textContent='';
}
if(this.useri!=='' && this.passi!==''){
  this.socket.signin(this.useri,this.passi);
  this.renderer.addClass(this.fliter.nativeElement,'filter');
}
}

Add(){
if(this.Idd===''){
  this.validation5.nativeElement.textContent='*Id field is empty!';
  setTimeout(() => {
    this.validation5.nativeElement.textContent='';
  }, 2500);
}
else{
  this.validation5.nativeElement.textContent='';
  this.socket.Add(this.Idd,this.us);
  this.button2.nativeElement.disabled=true;
  setTimeout(() => {
    this.button2.nativeElement.disabled=false;
  }, 3500);
}
}
cratee(){
this.idregister.nativeElement.style.display='none';
this.idcrate.nativeElement.style.display='flex';
}
signupp(){
  this.register.nativeElement.style.display='none';
  this.login.nativeElement.style.display='flex';
}
sign(){
  this.register.nativeElement.style.display='flex';
  this.login.nativeElement.style.display='none';
}
addnew(){
  this.Todolists.nativeElement.style.display='none';
  this.idregister.nativeElement.style.display='flex';
  this.searchts.nativeElement.style.display='none';
  this.liske.nativeElement.style.display='none';
  this.salike.nativeElement.innerHTML='';
  this.act=false;
   const haia=document.getElementsByClassName('lists');
for (let i = 0; i < haia.length; i++) {
  const el = haia[i] as HTMLElement;
  el.style.cursor= 'pointer';
  }
      this.remove.nativeElement.style.border='1px solid red';
    this.remove.nativeElement.textContent='❌ Remove list';
    this.renderer.removeClass(this.remove.nativeElement,'hov2');
    this.renderer.addClass(this.remove.nativeElement,'hov1');
    this.act=false;
    this.Todolists.nativeElement.style.cursor='default';
}
 validemail(ema: string): boolean {
 const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(ema);
}
generate(){
const id = this.generateUUIDv4(); 
console.log(id);
  this.indiv.nativeElement.textContent=id;
}
generateUUIDv4(): string {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

check(){
  const code=this.indiv.nativeElement.textContent;
   if(this.nami===''){
    this.validation11.nativeElement.textContent='* Id name field is empty!';
    setTimeout(() => {
    this.validation11.nativeElement.textContent='';
    }, 2500);
  }
  if(this.maxx===''){
    this.validation8.nativeElement.textContent='* Max users field is empty!';
    setTimeout(() => {
      this.validation8.nativeElement.textContent='';
    }, 2500);
  }
  else if(code===''){
    this.validation9.nativeElement.textContent='* Generate Id first!';
    setTimeout(() => {
      this.validation9.nativeElement.textContent='';
    }, 2500);
  }
  else{
    if(this.nami!==''){
    this.socket.check(code!,this.nami,this.maxx,this.useri);
    this.button5.nativeElement.disabled=true;
    setTimeout(() => {
      this.button5.nativeElement.disabled=false;
    }, 3500);
    }
  }
}
onlyDigits(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
}
bako(){
  this.Todolists.nativeElement.style.display='flex';
  this.idregister.nativeElement.style.display='none';
  this.searchts.nativeElement.style.display='flex';
  this.srch.nativeElement.textContent="Search lists";
  this.inpi.nativeElement.placeholder='Enter lists name...';
  this.inpi.nativeElement.title='Enter lists name!';
}
here(){
  this.idcrate.nativeElement.style.display='none';
  this.idregister.nativeElement.style.display='flex';
}
Addtask(){
this.lists.nativeElement.style.display='none';
this.meall.nativeElement.style.display='none';
this.button31.nativeElement.style.display='none';
this.cratetask.nativeElement.style.display='flex';
this.searchts.nativeElement.style.display='none';
this.maio.nativeElement.style.display='none';
this.liske.nativeElement.style.display='none';
this.salike.nativeElement.innerHTML='';
this.userss.nativeElement.style.display='none';
this.saaide.nativeElement.style.display='none';
this.saode.nativeElement.style.display='none';
this.renderer.addClass(this.fliter.nativeElement,'filter');
     this.fil.nativeElement.textContent='Filters';
this.asd.nativeElement.style.display='none';
}
baki(){
  this.renderer.addClass(this.fliter.nativeElement,'filter');
     this.fil.nativeElement.textContent='Filters';
this.asd.nativeElement.style.display='none';
      this.Todolists.nativeElement.style.display='flex'
  this.lists.nativeElement.style.display='none';
  this.meall.nativeElement.style.display='none';
  this.todoss.nativeElement.innerHTML='';
  this.items.length=0;
  this.userss.nativeElement.style.display='none';
  this.usis.nativeElement.innerHTML='';
  this.button20.nativeElement.style.display='none';
  if(this.isPhone()){
    this.saaide.nativeElement.style.display='none';
    this.saode.nativeElement.style.display='none';
  }
  else{
  this.saaide.nativeElement.style.display='none';
  }
  this.saaidee.nativeElement.textContent='';
  this.liske.nativeElement.style.display='none';
  this.salike.nativeElement.innerHTML='';
  this.searchts.nativeElement.style.display='flex';
  this.srch.nativeElement.textContent="Search lists";
  this.inpi.nativeElement.placeholder='Enter lists name...';
  this.inpi.nativeElement.title='Enter lists name!';
  this.button31.nativeElement.style.display='none';
  this.maio.nativeElement.style.display='none';
}
gob(){
  this.task.nativeElement.style.display='none';
  this.lists.nativeElement.style.display='flex';
  this.meall.nativeElement.style.display='flex';
}
Addi(){
  if(this.tasknamee===''){
    this.validation13.nativeElement.textContent='* Lend to field is empty!';
    setTimeout(() => {
      this.validation13.nativeElement.textContent='';
    }, 2500);
  }
  if(this.tasktitlee===''){
    this.validation14.nativeElement.textContent='* Amount field is empty!';
    setTimeout(() => {
      this.validation14.nativeElement.textContent='';
    }, 2500);
  }
  if(this.taskdescriptiion===''){
    this.validation15.nativeElement.textContent='* Loan description field is empty!';
    setTimeout(() => {
      this.validation15.nativeElement.textContent='';
    }, 2500);
  }
  if(this.curr===''){  
    this.validation24.nativeElement.style.display='flex';
    if(this.tasktitlee!==''){
      this.validation14.nativeElement.style.display='none';
      this.validation24.nativeElement.style.marginTop=`${5}px`;
    }
    this.validation24.nativeElement.textContent='*Currency field is empty!';
    setTimeout(() => {
    this.validation24.nativeElement.textContent='';
    this.validation14.nativeElement.style.display='';
    this.validation24.nativeElement.style.marginTop='0px';
    this.validation24.nativeElement.style.display='none';
    }, 2500);
  }
  else if(!this.isValidCurrencyCode(this.curr)){
    this.validation24.nativeElement.style.display='flex';
    if(this.tasktitlee!==''){
      this.validation14.nativeElement.style.display='none';
      this.validation24.nativeElement.style.marginTop=`${5}px`;
    }
      this.validation24.nativeElement.textContent='* Wrong currency!';
    setTimeout(() => {
    this.validation24.nativeElement.textContent='';
    this.validation14.nativeElement.style.display='';
    this.validation24.nativeElement.style.marginTop='0px';
    this.validation24.nativeElement.style.display='none';
    }, 2500);
  }
 const date = new Date(this.Date);
  if(!this.Date || isNaN(date.getTime()) || date.getFullYear()<=2020){
    this.validation25.nativeElement.textContent='*Invalid date!';
    setTimeout(() => {
    this.validation25.nativeElement.textContent='';
    }, 2500);
    this.isv=false;
  }
  else{
    this.isv=true
  }
  const datm= new Date(this.duedati);
  const formatedd=`${datm.getDate()+1}/${datm.getMonth()+1}/${datm.getFullYear()}`;
 this.dato=formatedd;
    if(!this.duedati || isNaN(datm.getTime()) || datm.getFullYear()<=2020){ 

    this.validation26.nativeElement.textContent='*Invalid date!';
    setTimeout(() => {
    this.validation26.nativeElement.textContent='';
    }, 2500);
    this.isvv=false;
  }
  else{
    this.isvv=true;
  }
  if(this.tasknamee!=='' && this.tasktitlee!=='' && this.taskdescriptiion!=='' && this.curr!==''&& this.isValidCurrencyCode(this.curr) && this.isv &&this.isvv){
    this.naxe=false;
    const ido = this.generateUUIDv44();
  this.amount=this.tasktitlee;
  const dt = new Date(date);  
  const formatted = `${String(dt.getDate()).padStart(2, '0')}/${
    String(dt.getMonth() + 1).padStart(2, '0')}/${
    dt.getFullYear()} ${String(dt.getHours()).padStart(2, '0')}:${
    String(dt.getMinutes()).padStart(2, '0')}`;
console.log(formatted.length,formatted);
this.dati=formatted;
this.status='unpayed';
    this.socket.Addnew(this.currid,ido,this.useri,this.tasknamee,this.amount,this.curr.toUpperCase(),formatted,formatedd,this.taskdescriptiion,this.status,this.naxe);
    this.button8.nativeElement.disabled=true;
    setTimeout(() => {
      this.button8.nativeElement.disabled=false;
    }, 2500);
  }
}
completed(){
  this.socket.completed(this.curridi,this.useri);
  this.button10.nativeElement.disabled=true;
  this.button30.nativeElement.disabled=true;
  this.button11.nativeElement.disabled=true;
  setTimeout(() => {
    this.button10.nativeElement.disabled=false;
    this.button30.nativeElement.disabled=false;
    this.button11.nativeElement.disabled=false;
  }, 3000);
}
generateUUIDv44(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
removee(){
  if(!this.act){
    this.remove.nativeElement.disabled=true;
    this.remove.nativeElement.textContent='✅ Done';
    this.renderer.removeClass(this.remove.nativeElement,'hov1');
    this.renderer.addClass(this.remove.nativeElement,'hov2');
    this.remove.nativeElement.style.border='1px solid green';
    this.act=true;
this.Todolists.nativeElement.style.cursor = 'url("assets/images/icons8-x-18.png") 0 0, auto';console.log(this.Todolists.nativeElement.style.cursor);
const haia=document.getElementsByClassName('lists');
for (let i = 0; i < haia.length; i++) {
  const el = haia[i] as HTMLElement;
  el.style.cursor = 'url("assets/images/icons8-x-18.png") 0 0, auto';
  }
}
  else{
    const haia=document.getElementsByClassName('lists');
for (let i = 0; i < haia.length; i++) {
  const el = haia[i] as HTMLElement;
  el.style.cursor= 'pointer';
  }
      this.remove.nativeElement.style.border='1px solid red';
    this.remove.nativeElement.textContent='❌ Remove list';
    this.renderer.removeClass(this.remove.nativeElement,'hov2');
    this.renderer.addClass(this.remove.nativeElement,'hov1');
    this.act=false;
    this.Todolists.nativeElement.style.cursor='default';
  }
}
closee(){
  this.yesno.nativeElement.style.display='none';
  this.addmore.nativeElement.disabled=false;
  this.remove.nativeElement.disabled=false;
  this.Todolists.nativeElement.style.opacity='1';
  this.todos.nativeElement.style.pointerEvents='auto';
}
gobo(){
  this.cratetask.nativeElement.style.display='none';
  this.lists.nativeElement.style.display='flex';
  this.meall.nativeElement.style.display='flex';
  if(this.isPhone()){
  this.saode.nativeElement.style.display='flex';
  }
  this.button31.nativeElement.style.display='flex';
  this.userss.nativeElement.style.display='flex';
  if(this.isPhone()){
    this.saaide.nativeElement.style.display='none';
    this.saode.nativeElement.style.display='flex';
  }
  else{
  this.saaide.nativeElement.style.display='flex';
  }
}
hide(){
  this.userss.nativeElement.style.display='none';
  this.button20.nativeElement.style.display='flex';
}
show(){
  this.userss.nativeElement.style.display='flex';
  this.button20.nativeElement.style.display='none';
}
search(){
if(this.inpii===''){
  this.validation19.nativeElement.textContent='* Name field in empty!'
  setTimeout(() => {
    this.validation19.nativeElement.textContent='';
  }, 2500);
}
else{
  if(this.inpi.nativeElement.placeholder==='Enter lists name...'){
  this.socket.search(this.inpii,this.useri);
  this.glist=this.inpii;
}
else{
  if(this.inpi.nativeElement.placeholder==='Enter tasks name...'){
    const text=this.saaidee.nativeElement.textContent;
    this.socket.searchh(this.inpii,text!);
    this.gtask=this.inpii;
  }
}
setTimeout(() => {
  this.searchts.nativeElement.style.display='none';
this.liske.nativeElement.style.display='flex';
}, 1000);
}
}
closse(){
  this.liske.nativeElement.style.display='none';
  this.searchts.nativeElement.style.display='flex';
  this.salike.nativeElement.innerHTML='';
}
allowOnlyNumbers(event: KeyboardEvent) {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  if (allowedKeys.indexOf(event.key) !== -1) {
    return; 
  }
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault(); 
  }
}
closeee(){
this.yessno.nativeElement.style.display='none';
}
clo(){
  this.status='unpayed';
  this.socket.Addnew(this.idi,this.idii,this.useri,this.loaner,this.amount,this.currency,this.dati,this.dato,this.tasskdesc,this.status,this.naxe);
}
installApp(): void {
  if (this.deferredPrompt) {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: { outcome: 'accepted' | 'dismissed'; platform: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      this.deferredPrompt = null;
    });
  }
}
 isValidCurrencyCode(input: string): boolean {
  return this.validCurrencies.includes(input.toUpperCase());
}
det(){
this.deski.nativeElement.style.display='flex';
this.task.nativeElement.style.display='none';
}
buk(){
this.deski.nativeElement.style.display='none';
this.task.nativeElement.style.display='flex';
}

byname(){
this.filtri.nativeElement.style.display='flex';
this.asd.nativeElement.style.pointerEvents='none';
this.asd.nativeElement.style.opacity='0.5';
this.na.nativeElement.textContent='Filter by name';
this.ca.nativeElement.textContent='Enter name:';
this.inap.nativeElement.placeholder='Enter name...';
this.button12.nativeElement.disabled=true;
this.button31.nativeElement.disabled=true;
this.todoss.nativeElement.style.pointerEvents='none';
this.todoss.nativeElement.style.opacity='0.5';
}
filtered(){
  if(this.inpii===''){
    this.validation30.nativeElement.textContent='*Field is empty';
    setTimeout(() => {
    this.validation30.nativeElement.textContent='';
    }, 2500);
  }
  else{
    const haia={
      usi:String(this.useri),
      uso:String(this.inpii)
    }
    if(this.inap.nativeElement.placeholder==='Enter name...'){
      if(this.che){
      this.socket.filter(this.inpii,'name',this.currid,'all');
      }
      else{
      this.socket.filter(haia,'name',this.currid,'me');
      }
      this.filtri.nativeElement.style.display='none';
      this.asd.nativeElement.style.pointerEvents='auto';
      this.asd.nativeElement.style.opacity='1';
      this.button31.nativeElement.disabled=false;
      this.todoss.nativeElement.style.pointerEvents='auto';
this.todoss.nativeElement.style.opacity='1';
    }
  }
}
byme(){
  this.opts.nativeElement.style.display='flex';
  this.button12.nativeElement.disabled=true;
  this.button31.nativeElement.disabled=true;
  this.asd.nativeElement.style.pointerEvents='none';
this.asd.nativeElement.style.opacity='0.5';
this.todoss.nativeElement.style.pointerEvents='none';
this.todoss.nativeElement.style.opacity='0.5';
}
al1(){
this.socket.filter(this.useri,'all',this.currid,'');
this.opts.nativeElement.style.display='none';
this.asd.nativeElement.style.pointerEvents='auto';
this.asd.nativeElement.style.opacity='1';
this.button31.nativeElement.disabled=false;
this.button12.nativeElement.disabled=false;
this.todoss.nativeElement.style.pointerEvents='auto';
this.todoss.nativeElement.style.opacity='1';
}
loan1(){
  this.todoss.nativeElement.style.pointerEvents='auto';
this.todoss.nativeElement.style.opacity='1';
this.socket.filter(this.useri,'loaned',this.currid,'');
this.opts.nativeElement.style.display='none';
this.asd.nativeElement.style.pointerEvents='auto';
this.asd.nativeElement.style.opacity='1';
this.button31.nativeElement.disabled=false;
this.button12.nativeElement.disabled=false;
}
lend1(){
this.socket.filter(this.useri,'lended',this.currid,'');
this.opts.nativeElement.style.display='none';
this.button31.nativeElement.disabled=false;
this.asd.nativeElement.style.pointerEvents='auto';
this.asd.nativeElement.style.opacity='1';
this.button12.nativeElement.disabled=false;
this.todoss.nativeElement.style.pointerEvents='auto';
this.todoss.nativeElement.style.opacity='1';
}

every(){
if(this.che){
      this.socket.filter(this.useri,'every',this.currid,'all');
      }
      else{
       this.socket.filter(this.useri,'every',this.currid,'me');
      }}
dueda(){
if(this.che){
      this.socket.filter(this.useri,'due',this.currid,'all');
      }
      else{
       this.socket.filter(this.useri,'due',this.currid,'me');
      }
    }
datesss(){
this.datees.nativeElement.style.display='flex';
this.button12.nativeElement.disabled=true;
this.asd.nativeElement.style.pointerEvents='none';
this.asd.nativeElement.style.opacity='0.5';
this.button31.nativeElement.disabled=true;
this.todoss.nativeElement.style.pointerEvents='none';
this.todoss.nativeElement.style.opacity='0.5';
}
fila(){
  const dato1 = new Date(this.date1);
const dato2 = new Date(this.date2);
  let lad=true;
if (!this.date1) {
  this.validation37.nativeElement.textContent = '* From date field is empty!';
  setTimeout(() => this.validation37.nativeElement.textContent = '', 2500);
} else if (isNaN(dato1.getTime()) || dato1.getFullYear() <= 2020) {
  this.validation37.nativeElement.textContent = '* Invalid date!';
  setTimeout(() => this.validation37.nativeElement.textContent = '', 2500);
  lad=false;
}

if (!this.date2) {
  this.validation38.nativeElement.textContent = '* To date field is empty!';
  setTimeout(() => this.validation38.nativeElement.textContent = '', 2500);
} else if (isNaN(dato2.getTime()) || dato2.getFullYear() <= 2020) {
  this.validation38.nativeElement.textContent = '* Invalid date!';
  setTimeout(() => this.validation38.nativeElement.textContent = '', 2500);
  lad=false;
}
if(lad && this.date1 && this.date2){
  const[a,b,g]= this.date1.split('-');
  const[d,e,v]=this.date2.split('-');
  const dt1=`${g}/${b}/${a}`;
  const dt2=`${v}/${e}/${d}`;
  this.datees.nativeElement.style.display='none';
  this.todoss.nativeElement.style.pointerEvents='auto';
this.todoss.nativeElement.style.opacity='1';
  this.button31.nativeElement.disabled=false;
  this.asd.nativeElement.style.pointerEvents='auto';
this.asd.nativeElement.style.opacity='1';
  if(this.che){
  this.socket.filot(dt1,dt2,this.currid,this.useri,'all');
  }
  else{
    this.socket.filot(dt1,dt2,this.currid,this.useri,'me');
  }
}
}

finan(){
  setTimeout(() => {
    this.fullss.nativeElement.style.display='flex';
    this.converts.nativeElement.style.display='none';
this.lists.nativeElement.style.display='none';
  this.meall.nativeElement.style.display='none';
  this.maio.nativeElement.style.display='none';
  this.button31.nativeElement.style.display='flex';
  this.case.nativeElement.style.display='none';

  }, 1000);
this.socket.finans(this.currid,this.useri);
this.socket.finanse(this.currid,this.useri);
}
gobi(){
  this.lists.nativeElement.style.display='flex';
  this.converts.nativeElement.style.display='none';
  this.meall.nativeElement.style.display='flex';
   if(this.isPhone()){
  this.saode.nativeElement.style.display='flex';
  }
}

conver(){
  if(this.ami==='' || this.fromi==='' || this.Tos===''){
    this.validation54.nativeElement.style.display='flex';
    setTimeout(() => {
      this.validation54.nativeElement.style.display='none';
    }, 2500);
  }
  else{
this.socket.convert(this.ami,this.fromi,this.Tos);
  }
}
appear(){
this.fil.nativeElement.textContent='';
this.asd.nativeElement.style.display='flex';
this.renderer.removeClass(this.fliter.nativeElement,'filter');
this.renderer.addClass(this.fliter.nativeElement,'filos');
}
meess() {
  this.me.nativeElement.style.backgroundColor = 'brown';
  this.me.nativeElement.style.color = 'black';

  this.allss.nativeElement.style.backgroundColor = 'transparent'; 
  this.allss.nativeElement.style.color = 'white';
  this.che=false;
  this.every();
}

allsi() {
  this.allss.nativeElement.style.backgroundColor = 'brown';
  this.allss.nativeElement.style.color = 'black';

  this.me.nativeElement.style.backgroundColor = 'transparent'; 
  this.me.nativeElement.style.color = 'white';
  this.che=true;
  this.every();
}
govi(){
  this.fulls.nativeElement.style.display='none';
  this.lists.nativeElement.style.display='flex';
  this.meall.nativeElement.style.display='flex';
  if(this.isPhone()){
  this.saode.nativeElement.style.display='flex';
  }
}
finani(){
  this.converts.nativeElement.style.display='flex';
  this.case.nativeElement.style.display='none';
  this.lists.nativeElement.style.display='none';
  this.meall.nativeElement.style.display='none';
  this.fulls.nativeElement.style.display='none';
 this.maio.nativeElement.style.display='none';
  this.button31.nativeElement.style.display='flex';
}
finano(){
this.case.nativeElement.style.display='flex';
this.lists.nativeElement.style.display='none';
this.maio.nativeElement.style.display='none';
this.meall.nativeElement.style.display='none';
this.button31.nativeElement.style.display='flex';
this.converts.nativeElement.style.display='none';
this.fulls.nativeElement.style.display='none';
}
optiis(){
this.button31.nativeElement.style.display='none';
this.maio.nativeElement.style.display='flex';
this.saode.nativeElement.style.display='none';
}
bagh(){
  this.maio.nativeElement.style.display='none';
  this.button31.nativeElement.style.display='flex';
  if(this.isPhone()){
    if(this.lists.nativeElement.style.display==='flex'){
     this.saode.nativeElement.style.display='flex';
    }
  }
}
clp(){
  this.datees.nativeElement.style.display='none';
  this.asd.nativeElement.style.pointerEvents='auto';
this.asd.nativeElement.style.opacity='1';
  this.button12.nativeElement.disabled=false;
  this.button31.nativeElement.disabled=false;
  this.todoss.nativeElement.style.pointerEvents='auto';
this.todoss.nativeElement.style.opacity='1';
}
ioa(){
  this.filtri.nativeElement.style.display='none';
  this.asd.nativeElement.style.pointerEvents='auto';
      this.asd.nativeElement.style.opacity='1';
  this.button12.nativeElement.disabled=false;
  this.button31.nativeElement.disabled=false;
  this.todoss.nativeElement.style.pointerEvents='auto';
this.todoss.nativeElement.style.opacity='1';
}
iva(){
  this.opts.nativeElement.style.display='none';
  this.button12.nativeElement.disabled=false;
  this.asd.nativeElement.style.pointerEvents='auto';
this.asd.nativeElement.style.opacity='1';
 this.todoss.nativeElement.style.pointerEvents='auto';
this.todoss.nativeElement.style.opacity='1';
}
finanoi(){
  this.lists.nativeElement.style.display='flex';
  this.button31.nativeElement.style.display='flex';
  this.maio.nativeElement.style.display='none';
  this.converts.nativeElement.style.display='none';
  this.fulls.nativeElement.style.display='none';
  this.case.nativeElement.style.display='none';
  this.meall.nativeElement.style.display='flex';
  this.saode.nativeElement.style.display='flex';
}
govii(){
this.financ.nativeElement.style.display='flex';
this.fulls.nativeElement.style.opacity='0.8';
this.maio.nativeElement.style.display='none';
this.button32.nativeElement.disabled=true;
this.govisi.nativeElement.disabled=true;
this.govoso.nativeElement.disabled=true;
this.button31.nativeElement.disabled=true;
setTimeout(() => {
const lend = parseFloat(this.lendsss.nativeElement.textContent?.replace(/[^\d.-]/g, '') || '0');
const loan = parseFloat(this.loansss.nativeElement.textContent?.replace(/[^\d.-]/g, '') || '0');
this.gaatote(lend, loan);
}, 500);
}
ivaa(){
this.financ.nativeElement.style.display='none';
this.button32.nativeElement.disabled=false;
this.govisi.nativeElement.disabled=false;
this.govoso.nativeElement.disabled=false;
this.button31.nativeElement.disabled=false;
this.fulls.nativeElement.style.opacity='1';
}
unpayed(){
  if(this.che){
  this.socket.filter(this.useri,'unpayed',this.currid,'all');
  }
  else{
    this.socket.filter(this.useri,'unpayed',this.currid,'me');
  }
}
dacheke(){
  if(this.veric===''){
    this.errx.nativeElement.textContent='* Empty code field!'
    setTimeout(() => {
      this.errx.nativeElement.textContent='';
    }, 2500);
  }
  else{
    this.socket.checkiti(this.username,Number(this.veric),this.username,this.email,this.password);
  }
}
reset(){
  const code = Math.floor(100000 + Math.random() * 900000);
  this.socket.reset(this.username,this.email,code);
}
restore(){
this.restpp.nativeElement.style.display='flex';
this.signin.nativeElement.disabled=true;
this.crateacc.nativeElement.disabled=true;
this.restrr.nativeElement.disabled=true;
}
checkrest(){
  if(this.restoree===''){
    this.validation44.nativeElement.textContent='* Email field is empty!';
    setTimeout(() => {
      this.validation44.nativeElement.textContent='';
    }, 2500);
  }
  else{
    this.socket.cheemail(this.restoree);
  }
}
cloii(){
  this.restpp.nativeElement.style.display='none';
  this.crateacc.nativeElement.disabled=false;
  this.restrr.nativeElement.disabled=false;
  this.signin.nativeElement.disabled=false;
}
cloiii(){
  this.authetic.nativeElement.style.display='none';
  this.signup.nativeElement.disabled=false;
  this.signup.nativeElement.disabled=false;
  this.register.nativeElement.style.pointerEvents='auto';
  this.register.nativeElement.style.opacity='1';
}
tvals(){
  if(this.tvali.nativeElement.type==='password'){
    this.tvali.nativeElement.type='text';
  }
  else{
    this.tvali.nativeElement.type='password';
  }
}
tvalso(){
  if(this.Password.nativeElement.type==='password'){
    this.Password.nativeElement.type='text';
  }
  else{
    this.Password.nativeElement.type='password';
  }
}
isPhone() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
daaide(){
  this.saaide.nativeElement.style.display='flex';
   this.button31.nativeElement.style.display='none';
  this.saode.nativeElement.style.display='none';
}
colo(){
  this.saaide.nativeElement.style.display='none';
  this.button31.nativeElement.style.display='flex';
  this.saode.nativeElement.style.display='flex';
}
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}



