const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// //menggabung write dan read
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

//membuat folder jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file contact,json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf8");
}

// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (nama) => {
//       resolve(nama);
//     });
//   });
// };

const loadContact = () => {
    const fileBuffer = fs.readFileSync("data/contacts.json", "utf8");
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}


const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
//   const fileBuffer = fs.readFileSync("data/contacts.json", "utf8");
//   const contacts = JSON.parse(fileBuffer);
    const contacts = loadContact();

  //cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold("Contact sudah terdaftar,gunakkan nama lain!"));
    return false;
  }

  //cek email
  if(email){
    if(!validator.isEmail(email)){
        console.log(chalk.red.inverse.bold("Email tidak valid!"));
    return false;
    }
  }

  //cek nohp
  if(!validator.isMobilePhone(noHp,'id-ID')){
    console.log(chalk.red.inverse.bold("No Hp tidak valid!"));
return false;
}

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold("Terimakasih sudah memasukkan data."));
 
};

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold("Daftar Kontak : "));
    contacts.forEach((contact,i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
    })
};

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );

    if(!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    console.log(chalk.blue.inverse.bold(contact.nama));
    console.log(contact.noHp);
    if(contact.email){

        console.log(contact.email);
    }

};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => 
        contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if (contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil di hapus`));
};

module.exports = {simpanContact, listContact, detailContact, deleteContact}; 
