const axios = require('axios');
const fs = require('fs');

const base_url = 'https://cursos.saibamais.org.br/wp-json/saibamais/v2';

// Pegar os estudos na fonte em https://cursos.saibamais.org.br/wp-json/saibamais/v2/lessons
async function getCatalog(){

    const catalog = await axios.get(`${base_url}/lessons`);
    console.log(`Getting catalog`);
    
    const catalog_json = JSON.stringify(catalog.data);
    
    fs.writeFileSync('./catalog.json', catalog_json);

    return catalog.data;

}


// Salvar arquivos um por um em cada arquivo .json
async function getLessons( catalog, lang ){

    if(catalog[lang]){
        console.log(`Getting ${lang} lang lessons`);

        catalog[lang].map(async (lesson) => {
            console.log(`Getting lesson ${lesson.ID} ${lesson.slug}`);
    
            const content_lesson = await axios.get(`${base_url}/lesson/${lesson.ID}`);
    
            const content_lesson_json = JSON.stringify(content_lesson.data);
            
            fs.writeFileSync(`./${lang}/${lesson.slug}.json`, content_lesson_json);
    
        });
    }
}

async function start(){
    
    const catalog = await getCatalog();

    Object.keys(catalog).map(lang => {
        getLessons(catalog, lang);
    });
    
}

start();