/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens'
import { LOCALE_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
//import { LOCALE_ID } from '@angular/core';
//import { environment } from 'src/environments/environment';

const domino = require('domino');


function setDomTypes(){
  Object.assign(global, domino['impl']);
  (global as any)['KeyboardEvent'] = domino.impl.Event;
}

setDomTypes();

const HTMLAnchorElement = domino.impl.HTMLAnchorElement;
const Element = domino.impl.Element;

// The Express app is exported so that it can be used by serverless Functions.
export function app(lang: string): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), `dist/browser/${lang}`);
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  const win = domino.createWindow(indexHtml.toString());
  global['window'] = win;
  global['document'] = win.document;
  global['self'] = win;
  global['HTMLAnchorElement'] = HTMLAnchorElement;
  global['HTMLAnchorElement'] = Element;
  global['navigator'] = win.navigator;
  global['HTMLElement'] = win.HTMLElement;
  global['Node'] = win.Node;
  global['DOMTokenList'] = win.DOMTokenList;

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)


  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
      extraProviders: [{ provide: LOCALE_ID, useValue: lang }],
    } as any)
  );

  //Commented from issue on github
  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl },
      {provide: REQUEST, useValue: req},
      {provide: RESPONSE, useValue: res}] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4003;

  const appFr = app('fr');
  const appEn = app('en');
  const appEs = app('es');

  // Start up the Node server
  const server = express();

  server.use('/fr', appFr);
  server.use('/en', appEn);
  server.use('/es', appEs);

  server.use('', appEn);

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (
  (!environment.production && moduleFilename === __filename) ||
  moduleFilename.includes('iisnode')
) {
  run();
}

export * from './src/main.server';


