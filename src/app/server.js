require('dotenv').config({ path: './.env' });
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { type } = require('os');
const axios = require("axios");
let cachedRates = null;
let lastUpdated = 0;
const CACHE_INTERVAL = 1.5 * 24 * 60 * 60 * 1000;
const ACCESS_KEY = process.env.EXCHANGERATE_KEY || "AwlMU4sbGWcCTY1plP3tZp4PD6k93M45";

async function refreshRates(base = "USD") {
  try {
    const url = `https://api.apilayer.com/exchangerates_data/latest?base=${base}`;
    const resp = await fetch(url, { headers: { apikey: ACCESS_KEY } });

    if (!resp.ok) {
      console.warn(`Rate fetch failed ${resp.status}`);
      return null; 
    }

    const data = await resp.json();
    if (data.error) {
      console.warn(`API error: ${JSON.stringify(data)}`);
      return null;
    }

    cache = { base, at: Date.now(), rates: data.rates || {} };
    console.log("Rates refreshed:", cache);
    return cache.rates;
  } catch (err) {
    console.error("Error fetching rates:", err);
    return null;
  }
}

async function getRates() {
  const now = Date.now();
  if (!cachedRates || now - lastUpdated > CACHE_INTERVAL) {
    console.log("Fetching new rates...");
    const newRates = await refreshRates("USD");
    if (newRates) {
      cachedRates = newRates;
      lastUpdated = now;
    } else {
      console.warn("⚠️ Failed to fetch new rates, using old cache if available.");
    }
  } else {
    console.log("Using cached rates");
  }
  return cachedRates;
}

const app = express();
const server = http.createServer(app);
const MONGO_URI = process.env.MONGO_URI || 'your-backup-uri-here';
const PORT = process.env.PORT || 3000;

console.log("📦 MONGO_URI is:", MONGO_URI);

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

const IdSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  maxmum: { type: String, required: true }
}, { timestamps: true });
const Ids = mongoose.model('Ids', IdSchema);

const TaskSchema = new mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  id: { type: String, required: true }
}, { timestamps: true });
const Tasks = mongoose.model('Tasks', TaskSchema);

const TasksSchema = new mongoose.Schema({
  id: {type: String, required:true},
  idd: {type: String, required: true},
  taskname: {type: String, required:true},
  tasktitle: {type: String, required:true},
  taskdescription: {type: String, required:true}},
  {timestamps: true});
  const Taskebi = mongoose.model('Taskebi', TasksSchema);

  const LoansSchema = new mongoose.Schema({
    id: {type: String, required:true},
  idd: {type: String, required: true},
  user:{type:String, required: true},
  loaner:{type:String, required: true},
  amount:{type: String, required: true},
  currency:{type: String, required: true},
  datetime: { type: String, required: true },
  duedate:{type:String, required: true},
 taskdescription: {type: String, required:true},
 status: {type:String, required:true}
},
 {timestamps: true});
const Loans = mongoose.model('Loans',LoansSchema);

  const LoansSchemaa = new mongoose.Schema({
    id: {type: String, required:true},
  idd: {type: String, required: true},
  user:{type:String, required: true},
  loaner:{type:String, required: true},
  amount:{type: String, required: true},
  currency:{type: String, required: true},
  datetime: { type: String, required: true },
  duedate:{type:String, required: true},
 taskdescription: {type: String, required:true},
 status: {type:String, required:true},
 sent: {type:Number, default:0}
},
 {timestamps: true});
const Loanss = mongoose.model('Loanss',LoansSchemaa);

const Codee = new mongoose.Schema({
  user: {type:String, required:true},
  code: {type:String, required:true}
},
{timestamps: true});
const Code = mongoose.model('Codee',Codee);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: false
}));

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 200000,
  pingInterval: 30000
});

io.on('connection', (socket) => {
  console.log('🟢 New user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });

  socket.on('register', async (username, email, password) => {
    console.log('📩 Registering user:', username);
      const useremailExists = await User.findOne({ user: username, email: email });
      if (useremailExists) {
        console.log('❌ Email and username already exists');
        socket.emit('register-taken', 'eutaken');
        return;
      }

      const userExists = await User.findOne({ user: username });
      if (userExists) {
        console.log('❌ User already exists');
        socket.emit('register-taken', 'utaken');
      
        return;
      }

      const emailExists = await User.findOne({ email: email });
      if (emailExists) {
        console.log('❌ Email already exists');
        socket.emit('register-taken', 'etaken'); 
        return;
      }
      socket.emit('register-success','added');
    
  });

  socket.on('login', async (user, pass) => {
    const checkuser = await User.findOne({ user: user });
    const checkpassword = await User.findOne({ password: pass });
    const checkuserpass = await User.findOne({ user: user, password: pass });

    if (!checkuser) {
      console.log(`❌ User ${user} not found!`);
      socket.emit('wronguser', 'nousername');
      return;
    }
    if (!checkpassword) {
      console.log(`❌ Wrong password!`);
      socket.emit('wronguser', 'nopassword');
      return;
    }
    if (checkuserpass) {
      console.log(`✅ ${user} logged in!`);
      socket.emit('wronguser', 'logged', user);
    }
  });

  socket.on('Add', async (userr, id) => {
    const checkmax = await Ids.findOne({ id: id });
    const numuses = await Tasks.find({id:id });
    const ioo= await Tasks.findOne({user:userr,id:id});
    const haa=numuses;
    if(!checkmax){
      socket.emit('respi', 'errii');
      console.log("❌ Wrong id!");
      return;
    }
    if(ioo){
      socket.emit('respi','aro');
      console.log("❌ Already registered!");
      return;
    }
    if (haa.length < Number(checkmax.maxmum)) {
      
      const newuser = new Tasks({ user: userr, name: checkmax.name, id: id });
      await newuser.save();
      console.log('✅ Successfully added!');
      socket.emit('respi', 'addded');
    } else {
      console.log('❌ Max amount of users reached for this Id!');
      socket.emit('respi', 'erri');
    }
  });

  socket.on('check', async (id, nami, maxmumi,useri) => {
    console.log('🔍 Checking ID:', id, maxmumi);
    const checkid = await Ids.findOne({ id: id });
    const checknam= await Ids.findOne({name:nami});
    if (checkid) {
      console.log('❌ This ID already exists!');
      socket.emit('resp', "exists");
    } 
   
    else {
      const newId = new Ids({ id: id, name: nami, maxmum: maxmumi });
      await newId.save();
      const newts = new Tasks({user:useri,name:nami, id:id});
      await newts.save();
      console.log('✅ New ID added!');
      socket.emit('resp', 'addd');
    }
  });

  socket.on('load', async (userr) => {
    const taskss = await Tasks.find({ user: userr });
    socket.emit('loaded', taskss);
  });

 socket.on('addnew', async (idd, iddd, user, loaner, amount, currency, formattedDate,datee, taskdesc,status, naxe) => {
  console.log('Adding loan:', amount, currency, formattedDate, loaner);
  const chec= await User.findOne({user:loaner});  
  const tass= await Tasks.findOne({user:loaner,id:idd});
  if(!chec || !tass){
    socket.emit('rep', 'netu', idd, iddd, user, loaner, amount, currency, formattedDate,datee, taskdesc,status);
    return;
  }
  if(user===loaner){
    socket.emit('rep', 'vera', idd, iddd, user, loaner, amount, currency, formattedDate,datee, taskdesc,status);
    return;
  }
  const existing = await Loans.find({ id: idd, idd: iddd });
  const roomId = String(idd);
console.log(formattedDate,typeof formattedDate);
  if (naxe || existing.length === 0) {
    const newLoan = new Loans({
      id: idd,
      idd: iddd,
      user,
      loaner,
      amount,
      currency,
      datetime: formattedDate, 
      duedate: datee,
      taskdescription: taskdesc,
      status:status
    });
    await newLoan.save();
    const newLoans = new Loanss({
      id: idd,
      idd: iddd,
      user,
      loaner,
      amount,
      currency,
      datetime: formattedDate, 
      duedate: datee,
      taskdescription: taskdesc,
      status:status
    });
    await newLoans.save();
    console.log('✅ Successfully added!');
    io.to(roomId).emit('rep', 'add', idd, iddd, user, loaner, amount, currency, formattedDate,datee, taskdesc,status);
  } else {
    socket.emit('rep', 'aris', idd, iddd, user, loaner, amount, currency, formattedDate,datee, taskdesc,status);
  }
});


socket.on('laodtasks', async (ids) => {
  const roomId = String(ids);
  socket.join(roomId);

  const taskunebi = await Loans.find({ id: ids });
  console.log(`Socket ${socket.id} rooms after join:`, socket.rooms);
  if (taskunebi && taskunebi.length > 0) {

    socket.emit('taskunebi', taskunebi, ids);
  } else {
    console.log('⚠️ No loans found for this ID.');
  }
});


socket.on('complete', async (iddi,nama) => {
  let mash=false;
  try {
    const tass = await Loans.findOne({ idd: iddi });
    if (!tass) {
      console.log(`⚠️ Loans not found for idd: ${iddi}`);
      return;
    }

    const roomId = tass.id;

    if (
      tass.taskname === 'Behave' &&
      tass.tasktitle === 'Woman of word' &&
      tass.taskdescription === 'Be mgood 😁'
    ) {
      io.to(roomId).emit('deleted', 'ara');
      return;
    }

    socket.join(roomId);

    const findd = await Loanss.findOne({ idd: iddi });
    if(nama===tass.user){
      if(!findd){
        io.to(roomId).emit('deleted', 'nwu', 'nwa');
      }
      else{
    io.to(roomId).emit('deleted', 'cannt', 'cannt');
      }
    return;
    }
    if (findd) {
      const newLoan = new Loans({
        id: tass.id,
        idd: tass.idd,
        user: tass.user,
        loaner: tass.loaner,
        amount: tass.amount,
        currency: tass.currency,
        datetime: tass.datetime,
        duedate: tass.duedate,
        taskdescription: tass.taskdescription,
        status: "payed"
      });
      await newLoan.save();

      console.log(`✅ Successfully payed ${tass.user}!`);
      io.to(roomId).emit('deleted', tass.user, tass.loaner);
      mash=true;
      const as = await Loans.find({ id: tass.id });
      console.log(as.length);

      await Loanss.deleteOne({ idd: iddi });
      await Taskebi.deleteOne({ idd: iddi });
    } else {
      io.to(roomId).emit('deleted', 'nwu', 'nwa');
    }
    if(mash){
    const remainingTasks = await Taskebi.find({ id: roomId });
    io.to(roomId).emit('taskunebii', remainingTasks, iddi);
    }

  } catch (err) {
    console.error('❌ Error in complete event:', err.message);
  }
});


socket.on('remv', async (idd, nam, usa) => {
  const session = await Tasks.startSession();
  session.startTransaction();
  try {
    console.log(`${idd},${nam},${usa}`);

    const ta = await Tasks.deleteOne({ id: idd, name: nam, user: usa }, { session });
    if (ta.deletedCount > 0) {
      console.log(`✅ ${nam} was deleted!`);
    } else {
      console.log(`⚠️ No matching task found for deletion: ${nam}`);
    }
    const ch = await Tasks.countDocuments({ id: idd }).session(session);
    if (ch === 0) {
      await Ids.deleteOne({ id: idd }, { session });
    }
    await session.commitTransaction();
    const to = await Tasks.find({ user: usa });
    socket.emit('loaded', to);
  } catch (err) {
    await session.abortTransaction();
    console.error("❌ Transaction failed:", err.message);
  } finally {
    session.endSession();
  }
});


  socket.on('users', async(sid)=>{
    const users= await Tasks.find({id:sid});
    socket.emit('userebi',users);
  });

  socket.on('idebi',(idda)=>{
    socket.emit('loaad',idda);
  });

  socket.on('searchh', async(name,us)=>{
    const find= await Tasks.find({name:name,user:us});
    socket.emit('found',find);
  });
  socket.on('searchhh', async(name,ids)=>{
    const find= await Taskebi.find({id:ids,taskname:name});
    socket.emit('foundd',find);
  });

  socket.on('filter', async(name,sas,id,view)=>{
    if(sas==='name'){
      if(view==='me'){
        const filt = await Loans.find({
          id:id,
          $or:[
            {user:name.uso,loaner:name.usi},
            {loaner:name.uso,user:name.usi}
          ]
        });
         socket.emit('taskunebi',filt,filt.idd);console.log(filt);
      return;

      }
      else{
const filt = await Loans.find({
  id: id,
  $or: [
    { user: name },
    { loaner: name }
  ]
});
      socket.emit('taskunebi',filt,filt.idd);
      return;
}
    }
    if(sas==='all'){
      const filt = await Loans.find({
        id:id,
        $or: [
    { user: name },
    { loaner: name }
  ]
      });
      socket.emit('taskunebi',filt,filt.idd);
      return;
    }

    if(sas==='lended'){
      const filt = await Loans.find({
        id:id,
        user:name,
        status:'unpayed'
      });
      socket.emit('taskunebi',filt,filt.idd);
      return;
    }

    if(sas==='loaned'){
      const filt= await Loans.find({
        id:id,
        loaner:name,
        status:'unpayed'
      });
       socket.emit('taskunebi',filt,filt.idd);
       return;
    }

    if(sas==='every'){
      if(view==='me'){
        const filt = await Loans.find({
          id:id,
                 $or: [
    { user: name },
    { loaner: name }
  ]
        });
        socket.emit('taskunebi',filt,filt.idd);
        return;
      }
      else{
      const filt = await Loans.find({
        id:id
      });
      socket.emit('taskunebi',filt,filt.idd);
      return;
    }
    }

    if(sas==='due'){
const loansArray = []; 
let filt
if(view==='me'){
 filt = await Loanss.find({
        id:id,
          $or: [
    { user: name },
    { loaner: name }
  ]
      });
}else{
      filt = await Loanss.find({
        id:id,
      });
    }
      const today = new Date();

const day = today.getDate();      
const month = today.getMonth() + 1; 
const year = today.getFullYear();   

    filt.slice().reverse().forEach(async (element) =>{
 const [dd, mm, yyyy] = element.duedate.split("/").map(Number);
 const dueDate = new Date(yyyy, mm - 1, dd);
 if (dueDate < today) {
    const newLoan = {
    id: element.id,
    idd: element.idd,
    user: element.user,
    loaner: element.loaner,
    amount: element.amount,
    currency: element.currency,
    datetime: element.datetime,
    duedate: element.duedate,
    taskdescription: element.taskdescription,
    status: element.status
  };
  loansArray.push(newLoan);}
    });
    socket.emit('taskunebi',loansArray,filt.idd);
loansArray.length=0;}

if(sas==='unpayed'){
  if(view==='me'){
    const filt= await Loanss.find({
      id:id,
      loaner:name,
      status:'unpayed'
    });
     socket.emit('taskunebi',filt,filt.idd);
  }
  else{
    const filt= await Loanss.find({
      id:id,
      status:'unpayed'
    });
      socket.emit('taskunebi',filt,filt.idd);
  }
}
  });

  socket.on('filterd', async(dt1,dt2,id,name,view)=>{
    
const loansArray = []; 
 const [dd, mm, yyyy] = dt1.split("/").map(Number);
 const [ddd, mmm, yyyyy] = dt2.split("/").map(Number);
 const startDate = new Date(yyyy, mm - 1, dd);
const endDate = new Date(yyyyy, mmm - 1, ddd);
let filt
if(view==='me'){
 filt = await Loanss.find({
        id:id,
          $or: [
    { user: name },
    { loaner: name }
  ]
      });
}else{
      filt = await Loanss.find({
        id:id,
      });
    }
      const today = new Date();

    filt.slice().reverse().forEach((element) =>{
const [dd, mm, yyyyTime] = element.datetime.split("/");
const yyyya = Number(yyyyTime.split(" ")[0]); 
const day = Number(dd);
const month = Number(mm);
const current = new Date(yyyya, month - 1, day);
if (current >= startDate && current <= endDate) {
    const newLoan = {
    id: element.id,
    idd: element.idd,
    user: element.user,
    loaner: element.loaner,
    amount: element.amount,
    currency: element.currency,
    datetime: element.datetime,
    duedate: element.duedate,
    taskdescription: element.taskdescription,
    status: element.status
  };
  loansArray.push(newLoan);
}
});
socket.emit('taskunebi',loansArray,filt.idd);
loansArray.length=0;
  });
socket.on("convert", async (am, fr, to) => {
  const rates = await getRates();

  if (!rates) { 
    console.log(`Could not fetch rates`);
    socket.emit("converted", `Error: Could not fetch rates`);
    return;
  }

  const rate = rates[to]; 
  if (!rate) {
    console.log(`No rate found for ${to}`);
    socket.emit("converted", `Error: No rate found for ${to}`);
    return;
  }

  const converted = am * rate;
  socket.emit("converted", `${converted} ${to}`);
});

socket.on('lendfin', async(id,user)=>{
const myMap = new Map();
 const lendings= await Loanss.find({
  id:id,
  user:user
 });
  lendings.slice().reverse().forEach((element) => {
    if (!myMap[element.currency]) {
  myMap[element.currency] = 0;  
}
    myMap[element.currency]+=Number(element.amount);
    });
 socket.emit('lendsfin',myMap);
 myMap.clear();
});

socket.on('loanfin', async(id,user)=>{
 const myMap = new Map();
 const loanings= await Loanss.find({
  id:id,
  loaner:user
 });
  loanings.slice().reverse().forEach((element) => {
    if (!myMap[element.currency]) {
  myMap[element.currency] = 0;  
}
    myMap[element.currency]+=Number(element.amount);
    });
 socket.emit('loandsfin',myMap);
 myMap.clear();
});

socket.on('totals',async(total)=>{
  let converted=0;
const allRates = await getRates(); 
  if (!allRates) {  
    console.log("Could not fetch rates, skipping totals calculation.");
    socket.emit('totaled', 0);
    return;
  }
  for (const element of total) {
    const rate = allRates[element.curr];
    if (!rate) {
      console.log(`No USD rate for ${element.curr}, skipping...`);
      continue;
    }
    converted += Number(element.amount) * rate;
  }

socket.emit('totaled',converted);
});

socket.on('totalss',async(total)=>{
  let converted=0;
const allRates = await getRates();
  if (!allRates) { 
    console.log("Could not fetch rates, skipping totals calculation.");
    socket.emit('totaledd', 0);
    return;
  }
  for (const element of total) {
    const rate = allRates[element.curr];
    if (!rate) {
      console.log(`No USD rate for ${element.curr}, skipping...`);
      continue;
    }
    converted += Number(element.amount) * rate;
  }

socket.emit('totaledd',converted);
});
socket.on('sento',async(id,idd,user)=>{

  const haia= await Loanss.findOne({id:id,idd:idd,loaner:user});
  const hio = await Loanss.find({id:id});
if (haia && haia.loaner===user) {
  if (haia.sent==0 && haia.loaner===user) {
    const updated = await Loanss.findOneAndUpdate(
      { id, idd, loaner: user, $or: [ { sent: 0 }, { sent: { $exists: false } } ] },
      { $set: { sent: 1 } },
      { new: true }
    ); 
    const checki = await User.findOne({user:user});
    socket.emit('onseto', haia.user, haia.loaner, haia.currency, haia.amount, checki.email);
  }
}
else{return;}
});

socket.on('emaili', async(id,idd,user,loaner,amount,currency)=>{
const haia= await Tasks.find({id:id});
haia.forEach(async element=>{
const usi= await User.findOne({user:element.user});
if(usi){
  socket.emit('onemaili',id,idd,user,loaner,amount,currency,usi.email);
}
});
});

socket.on('dacheke',async (name,code,username,email,password)=>{
  const cod= await Code.findOne({user:name});
  if(code==cod.code){
    try{
       const newUser = new User({ user: username, email:email, password:password });
      await newUser.save();
      console.log('✅ User saved to DB');
      socket.emit('onchecki', 'added');
    } catch (err) {
      console.error('❌ Error saving user:', err.message);
      socket.emit('register-error', 'Error registering user');
    }
    await Code.deleteMany({user:name});
  }
  else{
    socket.emit('onchecki',"wrong");
  }
});
socket.on('dakode',async (name,email,code)=>{
  await Code.deleteMany({user:name});
const codi = new Code({
  user:name,
  code:code
});
await codi.save();
console.log( `code for ${name} is - ${code}`);
socket.emit('daaemail',email,name,code);
});

socket.on('reset',async(name,email,code)=>{
await Code.deleteMany({user:name});
const codi = new Code({
  user:name,
  code:code
});
await codi.save();
console.log( `New code for ${name} is - ${code}`);
socket.emit('daaemail',email,name,code);
});

socket.on('cheemail',async(email)=>{
const chek = await User.findOne({email:email});
if(!chek){
  socket.emit('checkedemail','wrong');
  return;
}
else{
  socket.emit('sendee',email,chek.user,chek.password);
  socket.emit('checkedemail','done');
}
});
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
