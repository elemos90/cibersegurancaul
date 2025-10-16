// Script para gerar hash de senha para usuarios ficticios
const bcrypt = require('bcryptjs');

const senha = 'UniLicungo@2025';

bcrypt.hash(senha, 10, (err, hash) => {
  if (err) {
    console.error('Erro:', err);
    return;
  }
  console.log('\n=== HASH GERADO ===');
  console.log('Senha:', senha);
  console.log('Hash:', hash);
  console.log('\nCopie o hash acima e substitua no arquivo sql/dados_ficticios.sql');
  console.log('Linha 13: SET @senha_padrao = \'COLE_AQUI\';');
  console.log('==================\n');
});
