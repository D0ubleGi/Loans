
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { max } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket!: Socket;
  isBrowser: boolean = false;
constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(this.platformId);

  const savedName = this.isBrowser ? localStorage.getItem('name') : '';
  const savedPassword = this.isBrowser ? localStorage.getItem('password') : '';

this.socket = io('https://beckend1-g67t.onrender.com', {
    transports: ['websocket', 'polling'],
  withCredentials: false,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  timeout: 20000,
  auth: {
    name: savedName || '',
    pass: savedPassword || ''
  }
});
    this.socket.io.on('reconnect_attempt', () => {
      console.log('[Debug] Attempting to reconnect...');
    });

    this.socket.io.on('reconnect', (attempt: any) => {
      console.log(`[Debug] Reconnected after ${attempt} attempts, new socket id: ${this.socket.id}`);
    });

    this.socket.on('connect', () => {
      console.log('[Debug] Connected to Socket.IO server:', this.socket.id);
    });

    this.socket.on('connect_error', (err: { message: any }) => {
      console.error('[Debug] Socket connection error:', err.message);
    });
  }

  submit(user:string,email:string,password:string){
    this.socket.emit('register',user,email,password);
  }
  onerror(callback: (err:string)=>void){
    this.socket.on('register-taken',(err:string)=>{
      callback(err);
    });
  }
   onsuccess(callback:(succ:string)=>void){
    this.socket.on('register-success',(succ:string)=>{
      callback(succ);
    });
    }

    signin(user:string,pass:string){
      this.socket.emit('login',user,pass);
    }
    onsignin(callback:(vall:string,user:string)=>void){
      this.socket.on('wronguser',(vall:string,user:string)=>{
        callback(vall,user);
      });
    }
    Add(Idd:string,user:string){
      this.socket.emit('Add',user,Idd);
    }
    onAdded(callback: (respi:string)=>void){
      this.socket.on('respi',(respi:string)=>{
        callback(respi);
      });
    }

    check(idd:string,nami:string,maxx:string,useri:string){
      this.socket.emit('check',idd,nami,maxx,useri);
    }
    oncheck(callback: (resp:string)=>void){
      this.socket.on('resp',(resp:string)=>{
        callback(resp);
      });
    }

    load(user:string){
      this.socket.emit('load',user);
    }
    onload(callback: (tasks:any)=>void){
      this.socket.on('loaded',(tasks:any)=>{
        callback(tasks);
      });
    }
    tasks(id: any){
      this.socket.emit('tasks',id);
    }

    Addnew(idd:string,iddd:string,user:string,loaner:string,amount:string,currecny:string,date:any,datee:any,taskdesc:string,status:string,naxe:boolean){
      this.socket.emit('addnew',idd,iddd,user,loaner,amount,currecny,date,datee,taskdesc,status,naxe);
    }
    onAddnew(callback: (rep:string,idd:string,iddd:string,user:string,loaner:string,amount:string,currecny:string,date:any,datee:any,taskdesc:string,status:string)=>void){
      this.socket.on('rep',(rep:string,idd:string,iddd:string,user:string,loaner:string,amount:string,currecny:string,date:any,datee:any,taskdesc:string,status:string)=>{
        callback(rep,idd,iddd,user,loaner,amount,currecny,date,datee,taskdesc,status);
      });
    }
    loadtasks(idd:string){
      this.socket.emit('laodtasks',idd);
    }
    onloadtasks(callback: (taskunebi:any,ids:string)=>void){
      this.socket.on('taskunebi',(taskunebi:any,ids:string)=>{
        callback(taskunebi,ids);
      });
    }
    completed(idd:string,name:string){
      this.socket.emit('complete',idd,name);
    }
    oncompleted(callback:(del:any,dul:any)=>void){
      this.socket.on('deleted',(del:any,dul:any)=>{
        callback(del,dul);
      });
    }
      onloadtaskss(callback: (taskunebii:any)=>void){
      this.socket.on('taskunebii',(taskunebii:any)=>{
        callback(taskunebii);
      });
    }

    removeid(id:string,nam:string,usa:string){
      this.socket.emit('remv',id,nam,usa);
    }
    users(id:string){
      this.socket.emit('users',id);
    }
    onusers(callback:(users:any)=>void){
      this.socket.on('userebi',(users:any)=>{
        callback(users);
      });
    }

    loadid(id:string){
      this.socket.emit('idebi',id);
    }
    onloadid(callback: (idda:string)=>void){
      this.socket.on('loaad',(idda:string)=>{
        callback(idda);
      });
    }

    search(name:string,us:string){
      this.socket.emit('searchh',name,us);
    }
     searchh(name:string,us:string){
      this.socket.emit('searchhh',name,us);
    }
    onsearch(callback:(tas:any)=>void){
      this.socket.on('found',(tas:any)=>{
        callback(tas);
      });
    }
    onsearchh(callback:(tas:any)=>void){
      this.socket.on('foundd',(tas:any)=>{
        callback(tas);
      });
    }

    filter(name:any,stat:string,id:string,st:string){
      this.socket.emit('filter',name,stat,id,st);
    }
    filot(date1:string,date2:string,id:string,name:string,ss:string){
      this.socket.emit('filterd',date1,date2,id,name,ss);
    }
    convert(am:string,fr:string,to:string){
      this.socket.emit('convert',am,fr,to);
    }
    onconverted(callback: (result:string)=>void){
      this.socket.on('converted',(result:string)=>{
        callback(result);
      });
    }

    finans(id:string,user:string){
      this.socket.emit('lendfin',id,user);
    }
    finanse(id:string,loaner:string){
      this.socket.emit('loanfin',id,loaner);
    }
    onfinans(callback:(haia:any)=>void){
      this.socket.on('lendsfin',(haia:any)=>{
        callback(haia);
      });
    }
     onfinanse(callback:(haia:any)=>void){
      this.socket.on('loandsfin',(haia:any)=>{
        callback(haia);
      });
    }
    total(haia:any){
      this.socket.emit('totals',haia);
    }
    totals(haia:any){
      this.socket.emit('totalss',haia);
    }
    ontotals(callback:(haia:number)=>void){
    this.socket.on('totaled',(haia:number)=>{
      callback(haia);
    });
    }
    ontotalss(callback:(haia:number)=>void){
    this.socket.on('totaledd',(haia:number)=>{
      callback(haia);
    });
    }

    sento(id:string,idd:string,user:string){
      this.socket.emit('sento',id,idd,user);
    }
    onsento(callback: (user:string,loaner:string,currecny:string,amount:string,email:string)=>void){
      this.socket.on('onseto',(user:string,loaner:string,currecny:string,amount:string,email:string)=>{
        callback(user,loaner,currecny,amount,email);
      });
    }   

    emaili(id:string,idd:string,user:string,loaner:string,amount:string,currency:string){
      this.socket.emit('emaili',id,idd,user,loaner,amount,currency);
    }
    onemaili(callback:( id:string,idd:string,user:string,loaner:string,amount:string,currency:string,email:string)=>void){
      this.socket.on('onemaili',( id:string,idd:string,user:string,loaner:string,amount:string,currency:string,email:string)=>{
        callback(id,idd,user,loaner,amount,currency,email);
      });
}
checkiti(name:string,code:number,username:string,email:string,password:string){
  this.socket.emit('dacheke',name,code,username,email,password);
}
oncheckiti(callback: (code:string)=>void){
  this.socket.on('onchecki',(code:string)=>{
    callback(code);
  });
}
adcodi(name:string,email:string,code:number){
  this.socket.emit('dakode',name,email,code);
}
reset(name:string,email:string,code:number){
  this.socket.emit('reset',name,email,code);
}
ondaaemail(callback:(email:string,name:string,code:number)=>void){
  this.socket.on('daaemail',(email:string,name:string,code:number)=>{
    callback(email,name,code);
  });
}
cheemail(email:string){
  this.socket.emit('cheemail',email);
}
oncheemail(callback: (res:string)=>void){
this.socket.on('checkedemail',(res:string)=>{
callback(res);
});
}
sendee(callback:(email:string,user:string,pass:string)=>void){
  this.socket.on('sendee',(email:string,user:string,pass:string)=>{
    callback(email,user,pass);
  });
}
}

