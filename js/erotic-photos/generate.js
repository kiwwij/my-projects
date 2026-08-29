const fs = require('fs');
const path = require('path');

const mediaDir = path.join(__dirname, '../../html/erotic-photos'); 
const outputFile = path.join(__dirname, 'data.js');

let vaultData = [];

let instCounter = 1;
let tgCounter = 1;
let otherCounter = 1;

const videoExts = ['.mp4', '.webm', '.mov', '.avi'];
const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

function scanDirectory(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`Папка ${dir} не существует. Создай её.`);
        return;
    }

    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            let type = '';
            
            if (videoExts.includes(ext)) type = 'video';
            else if (imageExts.includes(ext)) type = 'image';
            else return; 
            
            const relativePath = path.relative(mediaDir, fullPath);
            const pathParts = relativePath.split(path.sep);
            pathParts.pop(); 
            
            const tags = pathParts.map(tag => tag.toLowerCase());
            const webPath = 'erotic-photos/' + relativePath.split(path.sep).join('/');
            
            let currentId = 0;
            if (tags.includes('inst')) {
                currentId = instCounter++;
            } else if (tags.includes('tg')) {
                currentId = tgCounter++;
            } else {
                currentId = otherCounter++;
            }

            vaultData.push({
                id: currentId,
                type: type,
                src: webPath,
                tags: tags
            });
        }
    });
}

console.log('Сканирую папку erotic-photos...');
scanDirectory(mediaDir);

const fileContent = `const vaultData = ${JSON.stringify(vaultData, null, 4)};`;
fs.writeFileSync(outputFile, fileContent);
console.log(`Готово! Сохранено файлов: ${vaultData.length}. Файл data.js обновлен.`);