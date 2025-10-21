<?php
/**
 * Script Simples para Ver Logs do Servidor
 * =========================================
 * Upload este arquivo para a pasta pública e acesse via browser
 * Exemplo: https://cyberul.cycode.net/ver-logs.php
 * 
 * ATENÇÃO: APAGUE este arquivo após usar (questões de segurança)!
 */

// Proteção básica (troque a senha)
$senha_acesso = 'admin123';

if (!isset($_GET['senha']) || $_GET['senha'] !== $senha_acesso) {
    die('Acesso negado. Use: ?senha=admin123');
}

header('Content-Type: text/plain; charset=utf-8');

echo "=".str_repeat("=", 70)."=\n";
echo "  LOGS DO SERVIDOR - Portal CyberUL\n";
echo "=".str_repeat("=", 70)."=\n\n";

// Possíveis locais de logs
$possiveis_logs = [
    $_SERVER['DOCUMENT_ROOT'] . '/../logs/error.log',
    $_SERVER['DOCUMENT_ROOT'] . '/../logs/output.log',
    $_SERVER['DOCUMENT_ROOT'] . '/.next/trace',
    $_SERVER['DOCUMENT_ROOT'] . '/logs/error.log',
    $_SERVER['HOME'] . '/logs/cyberul-error.log',
    $_SERVER['HOME'] . '/logs/cyberul-out.log',
    $_SERVER['HOME'] . '/.pm2/logs/cyberul-error.log',
    $_SERVER['HOME'] . '/.pm2/logs/cyberul-out.log',
    '/tmp/cyberul.log',
    '/var/log/nodejs/cyberul.log',
];

echo "📁 Procurando logs em locais comuns...\n\n";

$encontrou = false;

foreach ($possiveis_logs as $log_path) {
    if (file_exists($log_path)) {
        echo "✅ ENCONTRADO: $log_path\n";
        echo str_repeat("-", 72) . "\n";
        
        $linhas = file($log_path);
        $ultimas_50 = array_slice($linhas, -50);
        
        echo implode("", $ultimas_50);
        echo "\n" . str_repeat("-", 72) . "\n\n";
        
        $encontrou = true;
    }
}

if (!$encontrou) {
    echo "❌ Nenhum arquivo de log encontrado nos locais padrão.\n\n";
    
    echo "🔍 Procurando TODOS os arquivos .log modificados recentemente:\n\n";
    
    $home = $_SERVER['HOME'];
    exec("find $home -name '*.log' -type f -mtime -1 2>/dev/null | head -20", $logs_recentes);
    
    if (!empty($logs_recentes)) {
        foreach ($logs_recentes as $log_file) {
            echo "  - $log_file\n";
        }
        
        echo "\n📌 Tente abrir esses arquivos via File Manager\n";
    } else {
        echo "  Nenhum log recente encontrado.\n";
    }
}

echo "\n" . str_repeat("=", 72) . "\n";
echo "💡 DICA: Se os logs do console.log não aparecem aqui,\n";
echo "   podem estar apenas no stdout do processo Node.js\n";
echo "   que não está sendo redirecionado para arquivo.\n";
echo str_repeat("=", 72) . "\n";

echo "\n⚠️  LEMBRE-SE: APAGUE este arquivo após usar!\n\n";
?>
