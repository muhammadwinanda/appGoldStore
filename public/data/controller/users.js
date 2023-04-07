const fs = require('fs');


const loadData = ()=>{
   const load = fs.readFileSync('./public/data/login.json', 'utf8');
   const success = JSON.parse(load);
   return success;
}

const saveData = (user)=>{
   fs.writeFileSync('./public/data/login.json', JSON.stringify(user));
}

const checkData = (username, password) =>{
   const checkDataLogin = loadData();
   return checkDataLogin.find(getData => getData.username === username && getData.password === password);   
}

const checkDataName = (username) =>{
   const checkDataAktif = loadData();
   return checkDataAktif.find(getUsername => getUsername.username === username);
}

const checkDataNew = (username, email) =>{
   const checkDataLogin = loadData();
   return checkDataLogin.find(getData => getData.username === username || getData.email === email);
}

const addData = (user)=>{
   const newUser = loadData();
   newUser.push(user);
   saveData(newUser);
}

const updateData = (remove)=>{
   const inUpdate = loadData();
   const execution = inUpdate.filter(obj=> obj.username !== remove.username && obj.password !== remove.password);
   saveData(execution);
}

const updateTrxFromUser = (name)=>{
   const data = loadData();
   const close = data.map(transaction=> {
      if (transaction.username === name.username) {
         return name;
      }
      return transaction;
   });
   return saveData(close); 
}

module.exports = {loadData, saveData, checkData, checkDataName ,checkDataNew, addData, updateData, updateTrxFromUser};

// function confirPass() { 
//    const pass = document.getElementById('pass').value;
//    const confirPass = document.getElementById('confirPass').value;
//    if (pass!==confirPass ) {
//       alert('a password not the same of confirmation');
//       console.log(Object.values(inputData));
//    }
//  }