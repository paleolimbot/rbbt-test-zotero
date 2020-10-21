{
	"translatorID": "19afa3fd-1c7f-4eb8-a37e-8d07768493e8",
	"label": "Citation graph",
	"description": "exports a citation graph in graphml format. Use gephi or yEd to clean up and visualize",
	"creator": "Emiliano heyns",
	"target": "dot",
	"minVersion": "4.0.27",
	"maxVersion": "",
	"translatorType": 2,
	"browserSupport": "gcsv",
	"inRepository": false,
	"displayOptions": {
		"Title": false,
		"Authors": false,
		"Year": false
	},
	"priority": 100,
	"configOptions": {
		"hash": "ed47a78079d5d678fe422207a862c3842710650b15933623d325de29e482c0ba"
	},
	"lastUpdated": "2020-10-17 12:59:08"
}

ZOTERO_CONFIG = {"GUID":"zotero@chnm.gmu.edu","ID":"zotero","CLIENT_NAME":"Zotero","DOMAIN_NAME":"zotero.org","REPOSITORY_URL":"https://repo.zotero.org/repo/","BASE_URI":"http://zotero.org/","WWW_BASE_URL":"https://www.zotero.org/","PROXY_AUTH_URL":"https://zoteroproxycheck.s3.amazonaws.com/test","API_URL":"https://api.zotero.org/","STREAMING_URL":"wss://stream.zotero.org/","SERVICES_URL":"https://services.zotero.org/","API_VERSION":3,"CONNECTOR_MIN_VERSION":"5.0.39","PREF_BRANCH":"extensions.zotero.","BOOKMARKLET_ORIGIN":"https://www.zotero.org","BOOKMARKLET_URL":"https://www.zotero.org/bookmarklet/","START_URL":"https://www.zotero.org/start","QUICK_START_URL":"https://www.zotero.org/support/quick_start_guide","PDF_TOOLS_URL":"https://www.zotero.org/download/xpdf/","SUPPORT_URL":"https://www.zotero.org/support/","TROUBLESHOOTING_URL":"https://www.zotero.org/support/getting_help","FEEDBACK_URL":"https://forums.zotero.org/","CONNECTORS_URL":"https://www.zotero.org/download/connectors"}
var {Translator, doExport} =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../gen/preferences/defaults.json":
/*!****************************************!*\
  !*** ../gen/preferences/defaults.json ***!
  \****************************************/
/*! default exports */
/*! export DOIandURL [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export ascii [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export asciiBibLaTeX [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export asciiBibTeX [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export autoAbbrev [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export autoAbbrevStyle [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export autoExport [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export autoExportDelay [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export autoExportIdleWait [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export autoExportPathReplaceDiacritics [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export autoExportPathReplaceDirSep [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export autoExportPathReplaceSpace [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export autoPinDelay [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export automaticTags [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export auxImport [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export biblatexExtendedDateFormat [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export biblatexExtendedNameFormat [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export biblatexExtractEprint [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export bibtexParticleNoOp [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export bibtexURL [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export cacheFlushInterval [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export citeCommand [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export citekeyFold [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export citekeyFormat [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export citeprocNoteCitekey [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export csquotes [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export debugLogDir [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export exportBibTeXStrings [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export exportBraceProtection [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export exportTitleCase [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export extraMergeCSL [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export extraMergeCitekeys [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export extraMergeTeX [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export git [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export ignorePostscriptErrors [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export import [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export importBibTeXStrings [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export importCaseProtection [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export importCitationKey [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export importExtra [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export importJabRefAbbreviations [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export importJabRefStrings [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export importSentenceCase [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export itemObserverDelay [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export jabrefFormat [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export keyConflictPolicy [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export keyScope [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export kuroshiro [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export mapMath [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export mapText [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export mapUnicode [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export newTranslatorsAskRestart [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export parseParticles [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export platform [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export postscript [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export postscriptOverride [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export qualityReport [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export quickCopyMode [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export quickCopyPandocBrackets [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export rawImports [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export rawLaTag [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export relativeFilePaths [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export retainCache [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export scrubDatabase [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export skipFields [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export skipWords [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export strings [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export testing [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export verbatimFields [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export warnBulkModify [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export warnTitleCased [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export workers [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Citation graph (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = JSON.parse("{\"DOIandURL\":\"both\",\"automaticTags\":true,\"asciiBibLaTeX\":false,\"ascii\":\"\",\"asciiBibTeX\":true,\"autoExport\":\"immediate\",\"quickCopyMode\":\"latex\",\"citeCommand\":\"cite\",\"quickCopyPandocBrackets\":false,\"citekeyFormat\":\"​[auth:lower][shorttitle3_3][year]\",\"citekeyFold\":true,\"keyConflictPolicy\":\"keep\",\"auxImport\":false,\"keyScope\":\"library\",\"exportBibTeXStrings\":\"off\",\"importBibTeXStrings\":true,\"bibtexParticleNoOp\":false,\"skipFields\":\"\",\"bibtexURL\":\"off\",\"warnBulkModify\":10,\"postscript\":\"\",\"strings\":\"\",\"autoAbbrev\":false,\"autoAbbrevStyle\":\"\",\"autoExportIdleWait\":10,\"cacheFlushInterval\":5,\"csquotes\":\"\",\"rawLaTag\":\"#LaTeX\",\"rawImports\":false,\"skipWords\":\"a,ab,aboard,about,above,across,after,against,al,along,amid,among,an,and,anti,around,as,at,before,behind,below,beneath,beside,besides,between,beyond,but,by,d,da,das,de,del,dell,dello,dei,degli,della,dell,delle,dem,den,der,des,despite,die,do,down,du,during,ein,eine,einem,einen,einer,eines,el,en,et,except,for,from,gli,i,il,in,inside,into,is,l,la,las,le,les,like,lo,los,near,nor,of,off,on,onto,or,over,past,per,plus,round,save,since,so,some,sur,than,the,through,to,toward,towards,un,una,unas,under,underneath,une,unlike,uno,unos,until,up,upon,versus,via,von,while,with,within,without,yet,zu,zum\",\"verbatimFields\":\"url,doi,file,eprint,verba,verbb,verbc,groups\",\"jabrefFormat\":0,\"qualityReport\":false,\"biblatexExtendedDateFormat\":true,\"biblatexExtractEprint\":true,\"biblatexExtendedNameFormat\":false,\"exportTitleCase\":true,\"exportBraceProtection\":true,\"retainCache\":false,\"importSentenceCase\":\"on+guess\",\"importCaseProtection\":\"as-needed\",\"autoExportDelay\":1,\"warnTitleCased\":false,\"itemObserverDelay\":5,\"autoPinDelay\":0,\"parseParticles\":true,\"citeprocNoteCitekey\":false,\"import\":true,\"importExtra\":true,\"importCitationKey\":true,\"extraMergeTeX\":true,\"extraMergeCSL\":true,\"extraMergeCitekeys\":true,\"importJabRefStrings\":true,\"importJabRefAbbreviations\":true,\"autoExportPathReplaceDirSep\":\"-\",\"autoExportPathReplaceSpace\":\" \",\"autoExportPathReplaceDiacritics\":false,\"postscriptOverride\":\"\",\"scrubDatabase\":false,\"ignorePostscriptErrors\":true,\"debugLogDir\":\"\",\"testing\":false,\"kuroshiro\":false,\"relativeFilePaths\":false,\"git\":\"config\",\"mapUnicode\":\"conservative\",\"mapText\":\"\",\"mapMath\":\"\",\"newTranslatorsAskRestart\":true,\"workers\":1,\"platform\":\"\"}");

/***/ }),

/***/ "../content/client.ts":
/*!****************************!*\
  !*** ../content/client.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export client [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Citation graph (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.client = void 0;
// we may be running in a translator, which will have it pre-loaded
if (typeof Components !== 'undefined')
    Components.utils.import('resource://zotero/config.js');
exports.client = ZOTERO_CONFIG.GUID.replace(/@.*/, '').replace('-', '');


/***/ }),

/***/ "./Citation graph.ts":
/*!***************************!*\
  !*** ./Citation graph.ts ***!
  \***************************/
/*! flagged exports */
/*! export Translator [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! export doExport [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Citation graph (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.doExport = exports.Translator = void 0;
const translator_1 = __webpack_require__(/*! ./lib/translator */ "./lib/translator.ts");
Object.defineProperty(exports, "Translator", ({ enumerable: true, get: function () { return translator_1.Translator; } }));
function node(id, attributes = {}) {
    let _node = JSON.stringify(id);
    const attrs = Object.entries(attributes).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(', ');
    if (attrs)
        _node += ` [${attrs}]`;
    Zotero.write(`  ${_node};\n`);
}
function edge(source, target, attributes = {}) {
    let _edge = `${JSON.stringify(source)} -> ${JSON.stringify(target)}`;
    const attrs = Object.entries(attributes).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(', ');
    if (attrs)
        _edge += ` [${attrs}]`;
    Zotero.write(`  ${_edge};\n`);
}
function doExport() {
    var _a, _b;
    translator_1.Translator.init('export');
    Zotero.write('digraph CitationGraph {\n');
    Zotero.write('  concentrate=true;\n');
    const add = {
        title: Zotero.getOption('Title'),
        authors: Zotero.getOption('Authors'),
        year: Zotero.getOption('Year'),
    };
    const items = [];
    for (const item of translator_1.Translator.items()) {
        if (['note', 'attachment'].includes(item.itemType))
            continue;
        const label = [item.citationKey];
        if (add.title && item.title) {
            label.push(`\u201C${item.title.replace(/"/g, "'")}\u201D`);
        }
        const author = [];
        if (add.authors && item.creators && item.creators.length) {
            const name = (_a = item.creators) === null || _a === void 0 ? void 0 : _a.map(creator => (creator.name || creator.lastName || '').replace(/"/g, "'")).filter(creator => creator).join(', ');
            if (name)
                author.push(name);
        }
        if (add.year && item.date) {
            let date = Zotero.BetterBibTeX.parseDate(item.date);
            if (date.from)
                date = date.from;
            if (date.year)
                author.push(`(${date.year})`);
        }
        if (author.length)
            label.push(author.join(' '));
        items.push({
            id: 'node-' + item.uri.replace(/.*\//, ''),
            label: label.join('\n'),
            relations: (((_b = item.relations) === null || _b === void 0 ? void 0 : _b['dc:relation']) || []),
            cites: [].concat.apply([], (item.extra || '')
                .split('\n')
                .filter(line => line.startsWith('cites:'))
                .map(line => line.replace(/^cites:/, '').trim())
                .filter(keys => keys)
                .map(keys => keys.split(/\s*,\s*/))),
            citationKey: item.citationKey,
            uri: item.uri,
        });
    }
    for (const item of items) {
        node(item.id, { label: item.label });
        for (const uri of item.relations) {
            const other = items.find(o => o.uri === uri);
            if (other) {
                edge(item.id, other.id);
            }
            else {
                edge(item.id, uri.replace(/.*\//, ''), { style: 'dashed', dir: 'both' });
            }
        }
        for (const citationKey of item.cites) {
            const other = items.find(o => o.citationKey === citationKey);
            if (other) {
                edge(item.id, other.id);
            }
            else {
                edge(item.id, citationKey, { style: 'dashed' });
            }
        }
    }
    Zotero.write('}');
}
exports.doExport = doExport;


/***/ }),

/***/ "./lib/translator.ts":
/*!***************************!*\
  !*** ./lib/translator.ts ***!
  \***************************/
/*! flagged exports */
/*! export Translator [provided] [used in Citation graph] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used in Citation graph (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Citation graph (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Translator = void 0;
const preferences = __webpack_require__(/*! ../../gen/preferences/defaults.json */ "../gen/preferences/defaults.json");
const client_1 = __webpack_require__(/*! ../../content/client */ "../content/client.ts");
const cacheDisabler = new class {
    get(target, property) {
        // collections: jabref 4 stores collection info inside the reference, and collection info depends on which part of your library you're exporting
        if (['collections'].includes(property))
            target.cachable = false;
        return target[property];
    }
};
exports.Translator = new class {
    constructor() {
        this.export = { dir: undefined, path: undefined };
        this.initialized = false;
        this.header = {"browserSupport":"gcsv","creator":"Emiliano heyns","description":"exports a citation graph in graphml format. Use gephi or yEd to clean up and visualize","displayOptions":{"Authors":false,"Title":false,"Year":false},"inRepository":false,"label":"Citation graph","maxVersion":"","minVersion":"4.0.27","priority":100,"target":"dot","translatorID":"19afa3fd-1c7f-4eb8-a37e-8d07768493e8","translatorType":2};
        this[this.header.label.replace(/[^a-z]/ig, '')] = true;
        this.BetterTeX = this.BetterBibTeX || this.BetterBibLaTeX;
        this.BetterCSL = this.BetterCSLJSON || this.BetterCSLYAML;
        this.preferences = preferences;
        this.options = this.header.displayOptions || {};
        this.stringCompare = (new Intl.Collator('en')).compare;
    }
    get exportDir() {
        this.currentItem.cachable = false;
        return this.export.dir;
    }
    get exportPath() {
        this.currentItem.cachable = false;
        return this.export.path;
    }
    typefield(field) {
        field = field.trim();
        if (field.startsWith('bibtex.'))
            return this.BetterBibTeX ? field.replace(/^bibtex\./, '') : '';
        if (field.startsWith('biblatex.'))
            return this.BetterBibLaTeX ? field.replace(/^biblatex\./, '') : '';
        return field;
    }
    init(mode) {
        var _a;
        this.platform = Zotero.getHiddenPref('better-bibtex.platform');
        this.isJurisM = client_1.client === 'jurism';
        this.isZotero = !this.isJurisM;
        this.paths = {
            caseSensitive: this.platform !== 'mac' && this.platform !== 'win',
            sep: this.platform === 'win' ? '\\' : '/',
        };
        for (const key in this.options) {
            if (typeof this.options[key] === 'boolean') {
                this.options[key] = !!Zotero.getOption(key);
            }
            else {
                this.options[key] = Zotero.getOption(key);
            }
        }
        // special handling
        if (mode === 'export') {
            this.cache = {
                hits: 0,
                misses: 0,
            };
            this.export = {
                dir: Zotero.getOption('exportDir'),
                path: Zotero.getOption('exportPath'),
            };
            if (this.export.dir && this.export.dir.endsWith(this.paths.sep))
                this.export.dir = this.export.dir.slice(0, -1);
        }
        for (const pref of Object.keys(this.preferences)) {
            let value;
            try {
                value = Zotero.getOption(`preference_${pref}`);
            }
            catch (err) {
                value = undefined;
            }
            if (typeof value === 'undefined')
                value = Zotero.getHiddenPref(`better-bibtex.${pref}`);
            this.preferences[pref] = value;
        }
        // special handling
        this.skipFields = this.preferences.skipFields.toLowerCase().split(',').map(field => this.typefield(field)).filter(s => s);
        this.skipField = this.skipFields.reduce((acc, field) => { acc[field] = true; return acc; }, {});
        this.verbatimFields = this.preferences.verbatimFields.toLowerCase().split(',').map(field => this.typefield(field)).filter(s => s);
        if (!this.verbatimFields.length)
            this.verbatimFields = null;
        this.csquotes = this.preferences.csquotes ? { open: this.preferences.csquotes[0], close: this.preferences.csquotes[1] } : null;
        this.preferences.testing = Zotero.getHiddenPref('better-bibtex.testing');
        if (mode === 'export') {
            this.unicode = (this.BetterBibTeX && !exports.Translator.preferences.asciiBibTeX) || (this.BetterBibLaTeX && !exports.Translator.preferences.asciiBibLaTeX);
            // when exporting file data you get relative paths, when not, you get absolute paths, only one version can go into the cache
            // relative file paths are going to be different based on the file being exported to
            this.cachable = !(this.options.exportFileData || this.preferences.relativeFilePaths);
        }
        this.collections = {};
        if (mode === 'export' && ((_a = this.header.configOptions) === null || _a === void 0 ? void 0 : _a.getCollections) && Zotero.nextCollection) {
            let collection;
            while (collection = Zotero.nextCollection()) {
                const children = collection.children || collection.descendents || [];
                const key = (collection.primary ? collection.primary : collection).key;
                this.collections[key] = {
                    // id: collection.id,
                    key,
                    parent: collection.fields.parentKey,
                    name: collection.name,
                    items: collection.childItems,
                    collections: children.filter(coll => coll.type === 'collection').map(coll => coll.key),
                };
            }
            for (collection of Object.values(this.collections)) {
                if (collection.parent && !this.collections[collection.parent]) {
                    collection.parent = false;
                    Zotero.debug(`BBT translator: collection with key ${collection.key} has non-existent parent ${collection.parent}, assuming root collection`);
                }
            }
        }
        this.initialized = true;
    }
    items() {
        if (!this.sortedItems) {
            this.sortedItems = [];
            let item;
            while (item = Zotero.nextItem()) {
                item.cachable = this.cachable;
                item.journalAbbreviation = item.journalAbbreviation || item.autoJournalAbbreviation;
                this.sortedItems.push(new Proxy(item, cacheDisabler));
            }
            // fallback to itemType.itemID for notes and attachments. And some items may have duplicate keys
            this.sortedItems.sort((a, b) => {
                const ka = [a.citationKey || a.itemType, a.dateModified || a.dateAdded, a.itemID].join('\t');
                const kb = [b.citationKey || b.itemType, b.dateModified || b.dateAdded, b.itemID].join('\t');
                return ka.localeCompare(kb, undefined, { sensitivity: 'base' });
            });
        }
        return this.sortedItems;
    }
    nextItem() {
        return (this.currentItem = this.items().shift());
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./Citation graph.ts");
/******/ })()
;
