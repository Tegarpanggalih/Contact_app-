const yargs = require("yargs");
const contacts = require('./contacts');
// console.log(yargs.argv);

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
        noHp: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHp)
    },
}).demandCommand();

//menampilkan daftar semua nama & no hp contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan daftar nama dan nohp',
    handler(){
        contacts.listContact();
    },
});

//menampilkan detail sebuah contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    },
});


//menghapus kontak berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();










// const {tulisPertanyaan,simpanContact} = require('./contacts');

// const main = async () => {
//     const nama = await tulisPertanyaan('Masukkan nama anda : ');
//     const email = await tulisPertanyaan('Masukkan email anda : ');
//     const noHp = await tulisPertanyaan('Masukkan No Hp anda : ');

//     simpanContact(nama,email,noHp);
// }

// main();
