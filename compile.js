const axios = require('axios');
const fs = require('fs');
const bibleTools = require('./lib/bible-tools/bible_tools_bcv');

const base_url = 'https://cursos.saibamais.org.br/wp-json/saibamais/v2';

/*
 * Pega o catálogo de estudo no Wordpress em `${base_url}/lessons`\
 */
async function getCatalog(){
    console.log(`Getting catalog`);

    const catalog = await axios.get(`${base_url}/lessons`);
        
    const catalog_json = JSON.stringify(catalog.data);
    
    fs.writeFileSync('./catalog.json', catalog_json);

    return catalog.data;
}


/*
 * Salva arquivos um por um em cada arquivo .json
 */
async function getLessons( catalog, lang ){

    if(catalog[lang]){
        console.log(`Getting ${lang} lang lessons`);

        catalog[lang].map(async (lesson) => {
            console.log(`Getting lesson ${lesson.ID} ${lesson.slug}`);
    
            const content_lesson = await axios.get(`${base_url}/lesson/${lesson.ID}`);
            
            const content_lesson_json = parse[lang](content_lesson.data);
            
            fs.writeFileSync(`./${lang}/${lesson.slug}.json`, content_lesson_json);
    
        });
    }
}

/*
 * Faz o processamento do conteúdo da lição de acordo com o idioma
 */
const parse = {
    pt: function(content_lesson){

        return JSON.stringify(content_lesson);

    },
    en: function(content_lesson){

        content_lesson.questions.map(async (question, index) => {
            content_lesson.questions[index].appendix = [];
            content_lesson.questions[index] = bible_ref_parser(question, 'description', 'en', 'nkjv' );
            content_lesson.questions[index] = bible_ref_parser(question, 'questionAppendix', 'en', 'nkjv' );
        });
        
        return JSON.stringify(content_lesson);
    },
    es: function(content_lesson){

        content_lesson.questions.map(async (question, index) => {
            content_lesson.questions[index].appendix = [];
            content_lesson.questions[index] = bible_ref_parser(question, 'description', 'es', 'nkjv' );
            content_lesson.questions[index] = bible_ref_parser(question, 'questionAppendix', 'es', 'nkjv' );
        });
        
        return JSON.stringify(content_lesson);
    }
}

/*
 * Recebe uma questão e substitui as passagens bíblicas por hiperlinks 
 * e adiciona o conteúdo dos versos no objeto question.
 */
function bible_ref_parser( question, param, lang, version ){

    if(question[param]){
        const bible_search = bibleTools.search(lang, version, question[param]);
        question[param] = bible_search.output;
        if(bible_search.verses){
            bible_search.verses.map((verse, i) => {
                question.appendix.push({
                    appendixType: "versicle",
                    appendixId: Object.keys(verse)[i],
                    appendixTitle: Object.keys(verse)[i],
                    appendixContent: verse[Object.keys(verse)[i]],
                    autoOpen: false
                })
            });
        }
    }

    return question;
}

async function start(){
    
    const catalog = await getCatalog();

    Object.keys(catalog).map(lang => {
        getLessons(catalog, lang);
    });
    
}

start();