const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

let pool = null;
let currentDatabase = null;

function displayError(message) {
    console.error(`\x1b[31m⚠️ ERROR: ${message}\x1b[0m`);
}

function displaySuccess(message) {
    console.log(`\x1b[32m✅ ${message}\x1b[0m`);
}

function displayWarning(message) {
    console.warn(`\x1b[33m⚠️ ${message}\x1b[0m`);
}

async function connectToMySQL() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'host', message: 'Host MySQL:', default: 'localhost' },
        { type: 'input', name: 'port', message: 'Port MySQL:', default: '3306' },
        { type: 'input', name: 'user', message: 'Username MySQL:', default: 'root' },
        { type: 'password', name: 'password', message: 'Password MySQL:', mask: '*' },
        { type: 'input', name: 'database', message: 'Database awal (kosongkan jika tidak ada):' }
    ]);

    try {
        pool = mysql.createPool({
            host: answers.host,
            port: parseInt(answers.port),
            user: answers.user,
            password: answers.password,
            database: answers.database || undefined,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        await pool.getConnection();
        if (answers.database) {
            currentDatabase = answers.database;
        }
        displaySuccess('Terhubung ke MySQL');
        return true;
    } catch (error) {
        displayError(`Gagal terhubung: ${error.message}`);
        return false;
    }
}

async function disconnectFromMySQL() {
    if (pool) {
        await pool.end();
        pool = null;
        currentDatabase = null;
        displaySuccess('Terputus dari MySQL');
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
        displayError(`Gagal mengambil daftar database: ${error.message}`);
    }
}

async function createDatabase() {
    const { dbName } = await inquirer.prompt([
        { type: 'input', name: 'dbName', message: 'Nama database baru:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    try {
        await pool.query(`CREATE DATABASE \`${dbName}\``);
        displaySuccess(`Database '${dbName}' dibuat`);
    } catch (error) {
        displayError(`Gagal membuat database: ${error.message}`);
    }
}

async function dropDatabase() {
    const { dbName } = await inquirer.prompt([
        { type: 'input', name: 'dbName', message: 'Nama database yang akan dihapus:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    const { confirm } = await inquirer.prompt([
        { type: 'confirm', name: 'confirm', message: `Yakin menghapus database '${dbName}'?`, default: false }
    ]);
    if (!confirm) {
        displayWarning('Dibatalkan');
        return;
    }
    try {
        await pool.query(`DROP DATABASE \`${dbName}\``);
        displaySuccess(`Database '${dbName}' dihapus`);
        if (currentDatabase === dbName) {
            currentDatabase = null;
        }
    } catch (error) {
        displayError(`Gagal menghapus database: ${error.message}`);
    }
}

async function useDatabase() {
    const { dbName } = await inquirer.prompt([
        { type: 'input', name: 'dbName', message: 'Nama database yang akan digunakan:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    try {
        await pool.query(`USE \`${dbName}\``);
        currentDatabase = dbName;
        displaySuccess(`Sekarang menggunakan database: ${currentDatabase}`);
    } catch (error) {
        displayError(`Gagal beralih ke database: ${error.message}`);
    }
}

async function listTables() {
    if (!currentDatabase) {
        displayError('Belum pilih database');
        return;
    }
    try {
        const [rows] = await pool.query('SHOW TABLES');
        console.log(`\n📂 DAFTAR TABEL (${currentDatabase}):`);
        if (rows.length === 0) {
            console.log('   (kosong)');
        } else {
            rows.forEach(row => {
                const tableName = Object.values(row)[0];
                console.log(`   - ${tableName}`);
            });
        }
    } catch (error) {
        displayError(`Gagal mengambil daftar tabel: ${error.message}`);
    }
}

async function createTable() {
    if (!currentDatabase) {
        displayError('Belum pilih database');
        return;
    }
    const { tableName } = await inquirer.prompt([
        { type: 'input', name: 'tableName', message: 'Nama tabel baru:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    console.log('Masukkan definisi kolom (contoh: id INT AUTO_INCREMENT PRIMARY KEY).');
    console.log('Ketik "selesai" jika sudah.');
    const columns = [];
    let addMore = true;
    while (addMore) {
        const { colDef } = await inquirer.prompt([
            { type: 'input', name: 'colDef', message: 'Kolom:' }
        ]);
        if (colDef.toLowerCase() === 'selesai') {
            addMore = false;
        } else if (colDef.trim() !== '') {
            columns.push(colDef);
        }
    }
    if (columns.length === 0) {
        displayWarning('Tidak ada kolom, pembatalan');
        return;
    }
    const query = `CREATE TABLE \`${tableName}\` (${columns.join(', ')})`;
    try {
        await pool.query(query);
        displaySuccess(`Tabel '${tableName}' dibuat`);
    } catch (error) {
        displayError(`Gagal membuat tabel: ${error.message}`);
    }
}

async function dropTable() {
    if (!currentDatabase) {
        displayError('Belum pilih database');
        return;
    }
    const { tableName } = await inquirer.prompt([
        { type: 'input', name: 'tableName', message: 'Nama tabel yang akan dihapus:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    const { confirm } = await inquirer.prompt([
        { type: 'confirm', name: 'confirm', message: `Yakin menghapus tabel '${tableName}'?`, default: false }
    ]);
    if (!confirm) {
        displayWarning('Dibatalkan');
        return;
    }
    try {
        await pool.query(`DROP TABLE \`${tableName}\``);
        displaySuccess(`Tabel '${tableName}' dihapus`);
    } catch (error) {
        displayError(`Gagal menghapus tabel: ${error.message}`);
    }
}

async function describeTable() {
    if (!currentDatabase) {
        displayError('Belum pilih database');
        return;
    }
    const { tableName } = await inquirer.prompt([
        { type: 'input', name: 'tableName', message: 'Nama tabel:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    try {
        const [rows] = await pool.query(`DESCRIBE \`${tableName}\``);
        if (rows.length === 0) {
            console.log('Tabel tidak ditemukan');
        } else {
            console.table(rows);
        }
    } catch (error) {
        displayError(`Gagal mengambil struktur: ${error.message}`);
    }
}

async function viewTableData() {
    if (!currentDatabase) {
        displayError('Belum pilih database');
        return;
    }
    const { tableName } = await inquirer.prompt([
        { type: 'input', name: 'tableName', message: 'Nama tabel:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    try {
        const [rows] = await pool.query(`SELECT * FROM \`${tableName}\` LIMIT 100`);
        if (rows.length === 0) {
            console.log('Tabel kosong');
        } else {
            console.table(rows);
        }
    } catch (error) {
        displayError(`Gagal mengambil data: ${error.message}`);
    }
}

async function insertRecord() {
    if (!currentDatabase) {
        displayError('Belum pilih database');
        return;
    }
    const { tableName } = await inquirer.prompt([
        { type: 'input', name: 'tableName', message: 'Nama tabel:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    try {
        const [columns] = await pool.query(`DESCRIBE \`${tableName}\``);
        if (columns.length === 0) {
            displayError(`Tabel '${tableName}' tidak ditemukan`);
            return;
        }
        const values = [];
        for (const col of columns) {
            if (col.Field === 'id' && col.Extra && col.Extra.includes('auto_increment')) {
                continue;
            }
            const { value } = await inquirer.prompt([
                { type: 'input', name: 'value', message: `Nilai untuk '${col.Field}' (kosongkan untuk NULL):` }
            ]);
            values.push(value === '' ? null : value);
        }
        const placeholders = values.map(() => '?').join(', ');
        const query = `INSERT INTO \`${tableName}\` VALUES (${placeholders})`;
        const [result] = await pool.query(query, values);
        displaySuccess(`Data ditambahkan, ID: ${result.insertId}`);
    } catch (error) {
        displayError(`Gagal insert: ${error.message}`);
    }
}

async function selectRecords() {
    if (!currentDatabase) {
        displayError('Belum pilih database');
        return;
    }
    const { tableName } = await inquirer.prompt([
        { type: 'input', name: 'tableName', message: 'Nama tabel:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    try {
        const [columns] = await pool.query(`DESCRIBE \`${tableName}\``);
        if (columns.length === 0) {
            displayError(`Tabel '${tableName}' tidak ditemukan`);
            return;
        }
        const { useFilter } = await inquirer.prompt([
            { type: 'confirm', name: 'useFilter', message: 'Ingin filter data?', default: false }
        ]);
        let whereClause = '';
        let values = [];
        if (useFilter) {
            console.log('Bangun kondisi WHERE (semua kondisi akan digabung dengan AND)');
            let addCondition = true;
            const conditions = [];
            while (addCondition) {
                const columnChoices = columns.map(c => ({ name: c.Field, value: c.Field }));
                const { column } = await inquirer.prompt([
                    { type: 'list', name: 'column', message: 'Pilih kolom:', choices: columnChoices }
                ]);
                const { operator } = await inquirer.prompt([
                    { type: 'list', name: 'operator', message: 'Operator:', choices: ['=', '!=', '>', '<', '>=', '<=', 'LIKE'] }
                ]);
                const { value } = await inquirer.prompt([
                    { type: 'input', name: 'value', message: 'Nilai:' }
                ]);
                conditions.push(`\`${column}\` ${operator} ?`);
                values.push(value);
                const { again } = await inquirer.prompt([
                    { type: 'confirm', name: 'again', message: 'Tambah kondisi lagi?', default: false }
                ]);
                addCondition = again;
            }
            if (conditions.length > 0) {
                whereClause = 'WHERE ' + conditions.join(' AND ');
            }
        }
        const query = `SELECT * FROM \`${tableName}\` ${whereClause} LIMIT 100`;
        const [rows] = await pool.query(query, values);
        if (rows.length === 0) {
            console.log('Tidak ada data');
        } else {
            console.table(rows);
        }
    } catch (error) {
        displayError(`Gagal mengambil data: ${error.message}`);
    }
}

async function updateRecord() {
    if (!currentDatabase) {
        displayError('Belum pilih database');
        return;
    }
    const { tableName } = await inquirer.prompt([
        { type: 'input', name: 'tableName', message: 'Nama tabel:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    try {
        const [columns] = await pool.query(`DESCRIBE \`${tableName}\``);
        if (columns.length === 0) {
            displayError(`Tabel '${tableName}' tidak ditemukan`);
            return;
        }
        const setPairs = [];
        const setValues = [];
        console.log('Tentukan nilai yang akan diubah (SET)');
        let addSet = true;
        while (addSet) {
            const columnChoices = columns.map(c => ({ name: c.Field, value: c.Field }));
            const { column } = await inquirer.prompt([
                { type: 'list', name: 'column', message: 'Pilih kolom:', choices: columnChoices }
            ]);
            const { value } = await inquirer.prompt([
                { type: 'input', name: 'value', message: `Nilai baru untuk '${column}':` }
            ]);
            setPairs.push(`\`${column}\` = ?`);
            setValues.push(value);
            const { again } = await inquirer.prompt([
                { type: 'confirm', name: 'again', message: 'Ubah kolom lain?', default: false }
            ]);
            addSet = again;
        }
        if (setPairs.length === 0) {
            displayWarning('Tidak ada perubahan, dibatalkan');
            return;
        }
        const { useFilter } = await inquirer.prompt([
            { type: 'confirm', name: 'useFilter', message: 'Tentukan kondisi WHERE? (jika tidak, semua data akan diupdate)', default: true }
        ]);
        let whereClause = '';
        const whereValues = [];
        if (useFilter) {
            console.log('Bangun kondisi WHERE');
            let addCondition = true;
            const conditions = [];
            while (addCondition) {
                const columnChoices = columns.map(c => ({ name: c.Field, value: c.Field }));
                const { column } = await inquirer.prompt([
                    { type: 'list', name: 'column', message: 'Pilih kolom:', choices: columnChoices }
                ]);
                const { operator } = await inquirer.prompt([
                    { type: 'list', name: 'operator', message: 'Operator:', choices: ['=', '!=', '>', '<', '>=', '<=', 'LIKE'] }
                ]);
                const { value } = await inquirer.prompt([
                    { type: 'input', name: 'value', message: 'Nilai:' }
                ]);
                conditions.push(`\`${column}\` ${operator} ?`);
                whereValues.push(value);
                const { again } = await inquirer.prompt([
                    { type: 'confirm', name: 'again', message: 'Tambah kondisi lagi?', default: false }
                ]);
                addCondition = again;
            }
            if (conditions.length > 0) {
                whereClause = 'WHERE ' + conditions.join(' AND ');
            }
        } else {
            const { confirm } = await inquirer.prompt([
                { type: 'confirm', name: 'confirm', message: 'TANPA WHERE! Semua data akan diupdate. Lanjut?', default: false }
            ]);
            if (!confirm) {
                displayWarning('Dibatalkan');
                return;
            }
        }
        const query = `UPDATE \`${tableName}\` SET ${setPairs.join(', ')} ${whereClause}`;
        const allValues = [...setValues, ...whereValues];
        const [result] = await pool.query(query, allValues);
        displaySuccess(`Data diupdate, baris terpengaruh: ${result.affectedRows}`);
    } catch (error) {
        displayError(`Gagal update: ${error.message}`);
    }
}

async function deleteRecord() {
    if (!currentDatabase) {
        displayError('Belum pilih database');
        return;
    }
    const { tableName } = await inquirer.prompt([
        { type: 'input', name: 'tableName', message: 'Nama tabel:', validate: input => input ? true : 'Nama tidak boleh kosong' }
    ]);
    try {
        const [columns] = await pool.query(`DESCRIBE \`${tableName}\``);
        if (columns.length === 0) {
            displayError(`Tabel '${tableName}' tidak ditemukan`);
            return;
        }
        const { useFilter } = await inquirer.prompt([
            { type: 'confirm', name: 'useFilter', message: 'Tentukan kondisi WHERE? (jika tidak, semua data akan dihapus)', default: true }
        ]);
        let whereClause = '';
        const values = [];
        if (useFilter) {
            console.log('Bangun kondisi WHERE');
            let addCondition = true;
            const conditions = [];
            while (addCondition) {
                const columnChoices = columns.map(c => ({ name: c.Field, value: c.Field }));
                const { column } = await inquirer.prompt([
                    { type: 'list', name: 'column', message: 'Pilih kolom:', choices: columnChoices }
                ]);
                const { operator } = await inquirer.prompt([
                    { type: 'list', name: 'operator', message: 'Operator:', choices: ['=', '!=', '>', '<', '>=', '<=', 'LIKE'] }
                ]);
                const { value } = await inquirer.prompt([
                    { type: 'input', name: 'value', message: 'Nilai:' }
                ]);
                conditions.push(`\`${column}\` ${operator} ?`);
                values.push(value);
                const { again } = await inquirer.prompt([
                    { type: 'confirm', name: 'again', message: 'Tambah kondisi lagi?', default: false }
                ]);
                addCondition = again;
            }
            if (conditions.length > 0) {
                whereClause = 'WHERE ' + conditions.join(' AND ');
            }
        } else {
            const { confirm } = await inquirer.prompt([
                { type: 'confirm', name: 'confirm', message: 'TANPA WHERE! Semua data akan dihapus. Lanjut?', default: false }
            ]);
            if (!confirm) {
                displayWarning('Dibatalkan');
                return;
            }
        }
        const query = `DELETE FROM \`${tableName}\` ${whereClause}`;
        const [result] = await pool.query(query, values);
        displaySuccess(`Data dihapus, baris terpengaruh: ${result.affectedRows}`);
    } catch (error) {
        displayError(`Gagal delete: ${error.message}`);
    }
}

async function runCustomQuery() {
    if (!pool) {
        displayError('Tidak terhubung ke MySQL');
        return;
    }
    const { query } = await inquirer.prompt([
        { type: 'editor', name: 'query', message: 'Tulis query SQL (akan dieksekusi):' }
    ]);
    if (!query.trim()) {
        displayWarning('Query kosong');
        return;
    }
    try {
        const [rows] = await pool.query(query);
        console.log('Hasil:');
        console.table(rows);
    } catch (error) {
        displayError(`Query gagal: ${error.message}`);
    }
}

async function menuDatabase() {
    while (true) {
        console.log('\n:::::> MANAJEMEN DATABASE <:::::');
        await listDatabases();
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Pilih aksi:',
                choices: [
                    'Buat database baru',
                    'Hapus database',
                    'Masuk ke database',
                    'Kembali'
                ]
            }
        ]);
        if (action === 'Buat database baru') {
            await createDatabase();
        } else if (action === 'Hapus database') {
            await dropDatabase();
        } else if (action === 'Masuk ke database') {
            await useDatabase();
            if (currentDatabase) {
                await menuTabel();
            }
        } else {
            break;
        }
    }
}

async function menuTabel() {
    while (true) {
        console.log(`\n:::::> MANAJEMEN TABEL (${currentDatabase}) <:::::`);
        await listTables();
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Pilih aksi:',
                choices: [
                    'Buat tabel baru',
                    'Hapus tabel',
                    'Lihat struktur tabel',
                    'Lihat isi tabel',
                    'Kelola data (CRUD)',
                    'Kembali ke menu database'
                ]
            }
        ]);
        if (action === 'Buat tabel baru') {
            await createTable();
        } else if (action === 'Hapus tabel') {
            await dropTable();
        } else if (action === 'Lihat struktur tabel') {
            await describeTable();
        } else if (action === 'Lihat isi tabel') {
            await viewTableData();
        } else if (action === 'Kelola data (CRUD)') {
            await menuData();
        } else {
            break;
        }
    }
}

async function menuData() {
    while (true) {
        console.log(`\n:::::> MANAJEMEN DATA (${currentDatabase}) <:::::`);
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Pilih operasi:',
                choices: [
                    'Tambah data (INSERT)',
                    'Cari data (SELECT dengan filter)',
                    'Ubah data (UPDATE)',
                    'Hapus data (DELETE)',
                    'Kembali'
                ]
            }
        ]);
        if (action === 'Tambah data (INSERT)') {
            await insertRecord();
        } else if (action === 'Cari data (SELECT dengan filter)') {
            await selectRecords();
        } else if (action === 'Ubah data (UPDATE)') {
            await updateRecord();
        } else if (action === 'Hapus data (DELETE)') {
            await deleteRecord();
        } else {
            break;
        }
    }
}

async function mainMenu() {
    const dbIndicator = currentDatabase ? `[${currentDatabase}]` : '[tidak ada database]';
    console.log(`\n:::::> MYSQL SERVER ${dbIndicator} <:::::`);
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Menu utama:',
            choices: [
                'Kelola Database',
                'Kelola Data (CRUD)',
                'Jalankan Query SQL',
                'Ubah Koneksi',
                'Keluar'
            ]
        }
    ]);
    return choice;
}

async function main() {
    console.log('SISTEM OPERASI MYSQL (OSM)\n');
    const connected = await connectToMySQL();
    if (!connected) {
        process.exit(1);
    }

    await listDatabases();

    let running = true;
    while (running) {
        const pilihan = await mainMenu();
        if (pilihan === 'Kelola Database') {
            await menuDatabase();
        } else if (pilihan === 'Kelola Data (CRUD)') {
            if (!currentDatabase) {
                displayError('Pilih database dulu');
            } else {
                await menuData();
            }
        } else if (pilihan === 'Jalankan Query SQL') {
            await runCustomQuery();
        } else if (pilihan === 'Ubah Koneksi') {
            await disconnectFromMySQL();
            displayWarning('Silakan connect ulang');
            const ok = await connectToMySQL();
            if (ok) {
                await listDatabases();
            } else {
                running = false;
            }
        } else {
            running = false;
        }
    }

    await disconnectFromMySQL();
    console.log('👋 Selesai');
}

main().catch(error => {
    displayError(`Kesalahan fatal: ${error.message}`);
    process.exit(1);
});