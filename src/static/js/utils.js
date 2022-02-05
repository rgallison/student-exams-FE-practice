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
    linkElem.setAttribute('href', stylesheet);

    return linkElem;
}

export {
    getStyle
}