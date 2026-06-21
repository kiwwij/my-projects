const techTranslations = {
    'хтмл': 'html',
    'цсс': 'css',
    'жс': 'js',
    'джаваскрипт': 'javascript',
    'яваскрипт': 'javascript',
    'тайпскрипт': 'typescript',
    'тс': 'ts',
    'реакт': 'react',
    'вуе': 'vue',
    'вю': 'vue',
    'ангуляр': 'angular',
    'нод': 'node',
    'нода': 'node',
    'питон': 'python',
    'пайтон': 'python',
    'пхп': 'php',
    'джава': 'java',
    'ява': 'java',
    'си++': 'c++',
    'плюсы': 'c++',
    'спп': 'cpp',
    'си': 'c',
    'шарп': 'c#',
    'котлин': 'kotlin',
    'руби': 'ruby',
    'го': 'go',
    'раст': 'rust',
    
    'база': 'sql',
    'бд': 'sql',
    'скюэль': 'sql',
    'эскюэль': 'sql',
    'майскюэль': 'mysql',
    'постгрес': 'postgresql',
    'монго': 'mongodb',
    
    'гит': 'git',
    'гитхаб': 'github',
    'докер': 'docker',
    'фигма': 'figma',
    'блендер': 'blender',
    'апи': 'api',
    
    'тейлвинд': 'tailwind',
    'бутстрап': 'bootstrap',
    'джейквери': 'jquery',
    'чарт': 'chart.js',
    'лифлет': 'leaflet.js',
    
    'игра': 'game',
    'игры': 'games',
    'аниме': 'anime',
    'тайтл': 'anime',
    'карта': 'map',
    'карты': 'map',
    'руководство': 'guide',
    'гайд': 'guide',
    'тест': 'test',
    'кьюэй': 'qa',
    'универ': 'university',
    'внту': 'vntu',
    'лаба': 'lab',
    'бот': 'bot',
    'дизайн': 'design',
    'портфолио': 'portfolio'
};

const ruKeys = "йцукенгшщзхъфывапролджэячсмитьбюёЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮЁ";
const enKeys = "qwertyuiop[]asdfghjkl;'zxcvbnm,.`QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>~";

function processSearchQuery(input) {
    const lowerInput = input.toLowerCase();
    
    for (const [ru, en] of Object.entries(techTranslations)) {
        if (lowerInput.includes(ru)) {
            return lowerInput.replace(new RegExp(ru, 'g'), en);
        }
    }

    let result = '';
    for (let i = 0; i < input.length; i++) {
        const index = ruKeys.indexOf(input[i]);
        result += index !== -1 ? enKeys[index] : input[i];
    }
    
    return result.toLowerCase();
}