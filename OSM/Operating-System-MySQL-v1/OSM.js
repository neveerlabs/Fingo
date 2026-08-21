const mysql = require('mysql2/promise');
const readline = require('readline');
const util = require('util');

let pool = null;
let currentDatabase = null;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = util.promisify(rl.question).bind(rl);

function tampilkanError(message) {
    console.error(`\x1b[31m⚠️ ERROR: ${message}\x1b[0m`);
}

async function connectToMySQL() {
    try {
        const host = await question('Host MySQL (default: localhost): ') || 'localhost';
        const user = await question('Username MySQL (default: root): ') || 'root';
        const password = await question('Password MySQL: ') || '';

        pool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        const connection = await pool.getConnection();
        connection.release();

        return true;
    } catch (error) {
        tampilkanError(`Gagal terhubung ke MySQL: ${error.message}`);
        return false;
    }
}

async function disconnectFromMySQL() {
    if (pool) {
        await pool.end();
        pool = null;
        currentDatabase = null;
    }
}

async function tampilkanMenuUtama() {
    console.log('\n:::::> MYSQL SERVER <:::::');
    console.log('1. Kelola Database');
    console.log('2. Kelola Data (CRUD)');
    console.log('3. Ubah Koneksi Database');
    console.log('4. Keluar');
    const pilihan = await question('\nMasukkan input: ');
    return pilihan;
}

async function menuDatabase() {
    while (true) {
        console.log('\n:::::> MANAJEMEN DATABASE <:::::');
        await listDatabases();
        console.log('\n1. Buat database baru');
        console.log('2. Hapus database');
        console.log('3. Masuk ke dalam database');
        console.log('4. Kembali ke menu utama');
        const pilihan = await question('\nMasukkan input: ');

        if (pilihan === '1') {
            await createDatabase();
        } else if (pilihan === '2') {
            await dropDatabase();
        } else if (pilihan === '3') {
            await useDatabase();
        } else if (pilihan === '4') {
            break;
        } else {
            tampilkanError('Pilihan tidak valid!');
        }
    }
}

async function menuTabelDalamDatabase() {
    if (!currentDatabase) {
        tampilkanError('Belum ada database yang dipilih! Silakan pilih database terlebih dahulu.');
        return;
    }
    while (true) {
        console.log('\n:::::> MANAJEMEN TABEL <:::::');
        await listTables();
        console.log('\n1. Buat tabel baru');
        console.log('2. Hapus tabel');
        console.log('3. Lihat struktur tabel');
        console.log('4. Kembali ke menu database');
        const pilihan = await question('\nMasukkan input: ');

        if (pilihan === '1') {
            await createTable();
        } else if (pilihan === '2') {
            await dropTable();
        } else if (pilihan === '3') {
            await describeTable();
        } else if (pilihan === '4') {
            break;
        } else {
            tampilkanError('Pilihan tidak valid!');
        }
    }
}

async function menuData() {
    if (!currentDatabase) {
        tampilkanError('Belum ada database yang dipilih! Silakan pilih database terlebih dahulu.');
        return;
    }
    while (true) {
        console.log('\n:::::> MANAJEMEN DATA <:::::');
        console.log('1. Tambah data (INSERT)');
        console.log('2. Lihat data (SELECT)');
        console.log('3. Ubah data (UPDATE)');
        console.log('4. Hapus data (DELETE)');
        console.log('5. Kembali ke menu utama');
        const pilihan = await question('\nMasukkan input: ');

        if (pilihan === '1') {
            await insertRecord();
        } else if (pilihan === '2') {
            await selectRecords();
        } else if (pilihan === '3') {
            await updateRecord();
        } else if (pilihan === '4') {
            await deleteRecord();
        } else if (pilihan === '5') {
            break;
        } else {
            tampilkanError('Pilihan tidak valid.');
        }
    }
}

async function listDatabases() {
    try {
        const [rows] = await pool.query('SHOW DATABASES');
        console.log('\n📁 DAFTAR DATABASE:');
        if (rows.length === 0) {
            console.log('   (kosong)');
        } else {
            rows.forEach(row => console.log(`   📂 ${row.Database}`));
        }
    } catch (error) {
        tampilkanError(`Gagal mengambil daftar database: ${error.message}`);
    }
}

async function createDatabase() {
    try {
        const dbName = await question('Masukkan nama database baru: ');
        if (!dbName) {
            tampilkanError('Nama database tidak boleh kosong!');
            return;
        }
        await pool.query(`CREATE DATABASE \`${dbName}\``);
        console.log(`✅ Database '${dbName}' berhasil dibuat!`);
    } catch (error) {
        tampilkanError(`Gagal membuat database: ${error.message}`);
    }
}

async function dropDatabase() {
    try {
        const dbName = await question('Masukkan nama database yang akan dihapus: ');
        if (!dbName) {
            tampilkanError('Nama database tidak boleh kosong!');
            return;
        }
        const confirm = await question(`⚠️ Yakin ingin menghapus database '${dbName}'? (y/n): `);
        if (confirm.toLowerCase() !== 'y') {
            console.log('Penghapusan dibatalkan.');
            return;
        }
        await pool.query(`DROP DATABASE \`${dbName}\``);
        console.log(`✅ Database '${dbName}' berhasil dihapus!`);
        if (currentDatabase === dbName) {
            currentDatabase = null;
        }
    } catch (error) {
        tampilkanError(`Gagal menghapus database: ${error.message}`);
    }
}

async function useDatabase() {
    try {
        const dbName = await question('Masukkan nama database yang akan digunakan: ');
        if (!dbName) {
            tampilkanError('Nama database tidak boleh kosong!');
            return;
        }
        await pool.query(`USE \`${dbName}\``);
        currentDatabase = dbName;
        console.log(`✅ Sekarang menggunakan database: ${currentDatabase}`);
        await menuTabelDalamDatabase();
    } catch (error) {
        tampilkanError(`Gagal beralih ke database: ${error.message}`);
    }
}

async function listTables() {
    try {
        const [rows] = await pool.query('SHOW TABLES');
        console.log(`\n📂 DAFTAR TABEL (database: ${currentDatabase}):`);
        if (rows.length === 0) {
            console.log('   (kosong)');
        } else {
            rows.forEach(row => {
                const tableName = Object.values(row)[0];
                console.log(`   - ${tableName}`);
            });
        }
    } catch (error) {
        tampilkanError(`Gagal mengambil daftar tabel: ${error.message}`);
    }
}

async function createTable() {
    try {
        const tableName = await question('Masukkan nama tabel baru: ');
        if (!tableName) {
            tampilkanError('Nama tabel tidak boleh kosong!');
            return;
        }

        console.log('🔧 Masukkan definisi kolom (contoh: id INT AUTO_INCREMENT PRIMARY KEY).');
        console.log('Ketik "selesai" pada baris kosong untuk mengakhiri.');
        const columns = [];
        while (true) {
            const colDef = await question('   Kolom: ');
            if (colDef.toLowerCase() === 'selesai') break;
            if (colDef.trim() === '') continue;
            columns.push(colDef);
        }
        if (columns.length === 0) {
            tampilkanError('Tidak ada definisi kolom, pembatalan.');
            return;
        }

        const query = `CREATE TABLE \`${tableName}\` (${columns.join(', ')})`;
        await pool.query(query);
        console.log(`✅ Tabel '${tableName}' berhasil dibuat!`);
    } catch (error) {
        tampilkanError(`Gagal membuat tabel: ${error.message}`);
    }
}

async function dropTable() {
    try {
        const tableName = await question('Masukkan nama tabel yang akan dihapus: ');
        if (!tableName) {
            tampilkanError('Nama tabel tidak boleh kosong.');
            return;
        }
        const confirm = await question(`⚠️ Yakin ingin menghapus tabel '${tableName}'? (y/n): `);
        if (confirm.toLowerCase() !== 'y') {
            console.log('Penghapusan dibatalkan.');
            return;
        }
        await pool.query(`DROP TABLE \`${tableName}\``);
        console.log(`✅ Tabel '${tableName}' berhasil dihapus!`);
    } catch (error) {
        tampilkanError(`Gagal menghapus tabel: ${error.message}`);
    }
}

async function describeTable() {
    try {
        const tableName = await question('Masukkan nama tabel: ');
        if (!tableName) {
            tampilkanError('Nama tabel tidak boleh kosong!');
            return;
        }
        const [rows] = await pool.query(`DESCRIBE \`${tableName}\``);
        if (rows.length === 0) {
            console.log('Tabel tidak ditemukan atau tidak memiliki struktur.');
        } else {
            console.table(rows);
        }
    } catch (error) {
        tampilkanError(`Gagal mengambil struktur tabel: ${error.message}`);
    }
}

async function insertRecord() {
    try {
        const tableName = await question('Masukkan nama tabel: ');
        if (!tableName) {
            tampilkanError('Nama tabel tidak boleh kosong.');
            return;
        }
        const [columns] = await pool.query(`DESCRIBE \`${tableName}\``);
        if (columns.length === 0) {
            tampilkanError(`Tabel '${tableName}' tidak ditemukan.`);
            return;
        }
        const columnNames = columns.map(col => col.Field);
        const values = [];
        for (const col of columnNames) {
            const value = await question(`   Nilai untuk kolom '${col}' (kosongkan jika NULL): `);
            values.push(value || null);
        }
        const placeholders = values.map(() => '?').join(', ');
        const query = `INSERT INTO \`${tableName}\` (${columnNames.map(c => `\`${c}\``).join(', ')}) VALUES (${placeholders})`;
        const [result] = await pool.query(query, values);
        console.log(`✅ Data berhasil ditambahkan. ID baris baru: ${result.insertId}`);
    } catch (error) {
        tampilkanError(`Gagal menambah data: ${error.message}`);
    }
}

async function selectRecords() {
    try {
        const tableName = await question('Masukkan nama tabel: ');
        if (!tableName) {
            tampilkanError('Nama tabel tidak boleh kosong!');
            return;
        }
        const [tables] = await pool.query('SHOW TABLES LIKE ?', [tableName]);
        if (tables.length === 0) {
            tampilkanError(`Tabel '${tableName}' tidak ditemukan.`);
            return;
        }
        const kondisi = await question('   Kondisi WHERE (contoh: id=1), kosongkan jika semua: ');
        const query = kondisi ? `SELECT * FROM \`${tableName}\` WHERE ${kondisi} LIMIT 100` : `SELECT * FROM \`${tableName}\` LIMIT 100`;
        const [rows] = await pool.query(query);
        if (rows.length === 0) {
            console.log('   Tidak ada data ditemukan!');
        } else {
            console.table(rows);
        }
    } catch (error) {
        tampilkanError(`Gagal mengambil data: ${error.message}`);
    }
}

async function updateRecord() {
    try {
        const tableName = await question('Masukkan nama tabel: ');
        if (!tableName) {
            tampilkanError('Nama tabel tidak boleh kosong!');
            return;
        }
        const [tables] = await pool.query('SHOW TABLES LIKE ?', [tableName]);
        if (tables.length === 0) {
            tampilkanError(`Tabel '${tableName}' tidak ditemukan.`);
            return;
        }
        const setClause = await question('   Bagian SET (contoh: nama="baru", umur=30): ');
        if (!setClause) {
            tampilkanError('SET tidak boleh kosong.');
            return;
        }
        const kondisi = await question('   Kondisi WHERE (contoh: id=1), kosongkan jika semua: ');
        const query = kondisi ? `UPDATE \`${tableName}\` SET ${setClause} WHERE ${kondisi}` : `UPDATE \`${tableName}\` SET ${setClause}`;
        const [result] = await pool.query(query);
        console.log(`✅ Data berhasil diupdate. Baris terpengaruh: ${result.affectedRows}`);
    } catch (error) {
        tampilkanError(`Gagal mengupdate data: ${error.message}`);
    }
}

async function deleteRecord() {
    try {
        const tableName = await question('Masukkan nama tabel: ');
        if (!tableName) {
            tampilkanError('Nama tabel tidak boleh kosong!');
            return;
        }
        const [tables] = await pool.query('SHOW TABLES LIKE ?', [tableName]);
        if (tables.length === 0) {
            tampilkanError(`Tabel '${tableName}' tidak ditemukan.`);
            return;
        }
        const kondisi = await question('   Kondisi WHERE (contoh: id=1), kosongkan jika semua: ');
        if (!kondisi) {
            const confirm = await question('⚠️ TANPA KONDISI WHERE! Semua data akan dihapus. Lanjut? (y/n): ');
            if (confirm.toLowerCase() !== 'y') {
                console.log('Penghapusan dibatalkan.');
                return;
            }
        }
        const query = kondisi ? `DELETE FROM \`${tableName}\` WHERE ${kondisi}` : `DELETE FROM \`${tableName}\``;
        const [result] = await pool.query(query);
        console.log(`✅ Data berhasil dihapus. Baris terpengaruh: ${result.affectedRows}`);
    } catch (error) {
        tampilkanError(`Gagal menghapus data: ${error.message}`);
    }
}

async function main() {
    console.log('SISTEM OPERASI MYSQL\n');
    const connected = await connectToMySQL();
    if (!connected) {
        rl.close();
        return;
    }

    await listDatabases();

    let running = true;
    while (running) {
        const pilihan = await tampilkanMenuUtama();
        switch (pilihan) {
            case '1':
                await menuDatabase();
                break;
            case '2':
                await menuData();
                break;
            case '3':
                await disconnectFromMySQL();
                console.log('\n⚠️ Silahkan connect ulang!');
                const ulang = await connectToMySQL();
                if (!ulang) {
                    running = false;
                } else {
                    await listDatabases();
                }
                break;
            case '4':
                running = false;
                break;
            default:
                tampilkanError('Pilihan tidak valid!');
        }
    }

    await disconnectFromMySQL();
    rl.close();
    console.log('Terima kasih telah menggunakan sistem operasi MySQL...');
}

main().catch(error => {
    tampilkanError(`Kesalahan tak terduga: ${error.message}`);
    process.exit(1);
});