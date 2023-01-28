const express = require("express");
const path = require("path");

//https://github.com/angular/universal/issues/1454

function app() {
    const server = express();
    const defaultLocale = 'en';

    [defaultLocale, 'fr', 'es'].forEach((locale) => {
        const appServerModule = require(path.join(__dirname, 'server', locale, 'main.js'));
        server.use(locale === defaultLocale ? "/" : `/${locale}`, appServerModule.app(locale));
    });

    return server;
}

function run() {
    var PORT = 4002
    app().listen(PORT, () => {
        console.log(`Node Express server listening on http://localhost:${PORT}`);
    });
}

run();