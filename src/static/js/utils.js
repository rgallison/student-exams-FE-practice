// async function render(componentName, includeHTML, includeCSS) {
//     const stream = await fetch("header-nav.layout.html");
//     const text = await stream.text();
//     const html = await define(text);

//     console.log(html);

//     return html;

// }

function getStyle(stylesheet) {
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('type', 'text/css');
    linkElem.setAttribute('href', stylesheet);

    return linkElem;
}

async function fetchData (url, callback) {
    try {
        let resp = await fetch(url);
        let data = await resp.json();

        if (callback){
            callback(data);
        }
        return data;
    } catch (err) {
        console.log(err);
    }
}

export default {
    getStyle, fetchData
}