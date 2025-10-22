const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = '123456';
  const hash = await bcrypt.hash(password, 10);
  
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nSQL:');
  console.log(`UPDATE \`user\` SET \`password\` = '${hash}' WHERE \`email\` = 'teste@unilicungo.ac.mz';`);
}

generateHash();