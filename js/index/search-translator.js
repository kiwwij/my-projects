const techTranslations = {
    'аниме': 'anime',
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
    'гитхаб': 'github',
    'гит': 'git',
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
    'портфолио': 'portfolio',
    'дота': 'dota',
    'финалка': 'final',
    'нир': 'nier',
    'октопас': 'octopath',
    'стим': 'steam',
    'змейка': 'snake',
    'резеро': 'rezero',
    'хигураши': 'higurashi',
    'цикады': 'higurashi',
    'вайолет': 'violet',
    'тирлист': 'tier',
    'новелла': 'novel',
    'новеллы': 'novel',
    'манга': 'manga',
    'бзвп': 'bzvp',
    'опи': 'opi',
    'пз': 'pz',
    'осбб': 'homeowners',
    'расписание': 'timetable',
    'пк': 'pc',
    'винда': 'windows',
    'виндовс': 'windows',
    'тикток': 'tiktok',
    'тт': 'tt',
    'телега': 'tg',
    'телеграм': 'tg',
    'ии': 'ai',
    'мопс': 'pug',
    'мопсы': 'pugs',
    'англ': 'eng',
    'английский': 'eng',
    'календарь': 'holidays'
};

const ruKeys = "йцукенгшщзхъфывапролджэячсмитьбюёЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮЁ";
const enKeys = "qwertyuiop[]asdfghjkl;'zxcvbnm,.`QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>~";

function processSearchQuery(input) {
    const lowerInput = input.toLowerCase().trim();
    if (!lowerInput) return '';

    for (const [ru, en] of Object.entries(techTranslations)) {
        if (ru.startsWith(lowerInput) || lowerInput.includes(ru)) {
            return en;
        }
    }

    let result = '';
    for (let i = 0; i < input.length; i++) {
        const index = ruKeys.indexOf(input[i]);
        result += index !== -1 ? enKeys[index] : input[i];
    }
    
    return result.toLowerCase();
}