{
	"translatorID": "f4b52ab0-f878-4556-85a0-c7aeedd09dfc",
	"label": "Better CSL JSON",
	"description": "exports references in pandoc-compatible CSL-JSON format, with added citation keys and parsing of metadata",
	"creator": "Emiliano heyns",
	"target": "json",
	"minVersion": "4.0.27",
	"maxVersion": "",
	"displayOptions": {
		"keepUpdated": false
	},
	"configOptions": {
		"getCollections": true,
		"hash": "907e8527268cb4b58910af9a42ee4c520e26b0797e4154412b1774bf3134f726"
	},
	"translatorType": 2,
	"browserSupport": "gcsv",
	"inRepository": false,
	"priority": 100,
	"lastUpdated": "2020-10-17 12:59:08"
}

ZOTERO_CONFIG = {"GUID":"zotero@chnm.gmu.edu","ID":"zotero","CLIENT_NAME":"Zotero","DOMAIN_NAME":"zotero.org","REPOSITORY_URL":"https://repo.zotero.org/repo/","BASE_URI":"http://zotero.org/","WWW_BASE_URL":"https://www.zotero.org/","PROXY_AUTH_URL":"https://zoteroproxycheck.s3.amazonaws.com/test","API_URL":"https://api.zotero.org/","STREAMING_URL":"wss://stream.zotero.org/","SERVICES_URL":"https://services.zotero.org/","API_VERSION":3,"CONNECTOR_MIN_VERSION":"5.0.39","PREF_BRANCH":"extensions.zotero.","BOOKMARKLET_ORIGIN":"https://www.zotero.org","BOOKMARKLET_URL":"https://www.zotero.org/bookmarklet/","START_URL":"https://www.zotero.org/start","QUICK_START_URL":"https://www.zotero.org/support/quick_start_guide","PDF_TOOLS_URL":"https://www.zotero.org/download/xpdf/","SUPPORT_URL":"https://www.zotero.org/support/","TROUBLESHOOTING_URL":"https://www.zotero.org/support/getting_help","FEEDBACK_URL":"https://forums.zotero.org/","CONNECTORS_URL":"https://www.zotero.org/download/connectors"}
var {Translator, doExport} =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../gen/citeproc.js":
/*!**************************!*\
  !*** ../gen/citeproc.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 639:0-14 */
/***/ ((module) => {

/*
Copyright (c) 2009-2019 Frank Bennett

	This program is free software: you can redistribute it and/or
	modify it under EITHER

      * the terms of the Common Public Attribution License (CPAL) as
	    published by the Open Source Initiative, either version 1 of
	    the CPAL, or (at your option) any later version; OR

      * the terms of the GNU Affero General Public License (AGPL)
        as published by the Free Software Foundation, either version
        3 of the AGPL, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	Affero General Public License for more details.

	You should have received copies of the Common Public Attribution
    License and of the GNU Affero General Public License along with
    this program.  If not, see <https://opensource.org/licenses/> or
    <http://www.gnu.org/licenses/> respectively.
*/
/*global CSL: true */

/**
 * A Javascript implementation of the CSL citation formatting language.
 *
 * <p>A configured instance of the process is built in two stages,
 * using {@link CSL.Core.Build} and {@link CSL.Core.Configure}.
 * The former sets up hash-accessible locale data and imports the CSL format file
 * to be applied to the citations,
 * transforming it into a one-dimensional token list, and
 * registering functions and parameters on each token as appropriate.
 * The latter sets jump-point information
 * on tokens that constitute potential branch
 * points, in a single back-to-front scan of the token list.
 * This
 * yields a token list that can be executed front-to-back by
 * body methods available on the
 * {@link CSL.Engine} class.</p>
 *
 * <p>This top-level {@link CSL} object itself carries
 * constants that are needed during processing.</p>
 * @namespace A CSL citation formatter.
 */

// IE6 does not implement Array.indexOf().
// IE7 neither, according to rumour.


// Potential skip words:
// under; along; out; between; among; outside; inside; amid; amidst; against; toward; towards.
// See https://forums.zotero.org/discussion/30484/?Focus=159613#Comment_159613




var CSL = {
    toLocaleUpperCase(str) {
        var arr = this.tmp.lang_array;
        try {
            str = str.toLocaleUpperCase(arr);
        } catch (e) {
            str = str.toUpperCase();
        }
        return str;
    },

    toLocaleLowerCase(str) {
        var arr = this.tmp.lang_array;
        try {
            str = str.toLocaleLowerCase(arr);
        } catch (e) {
            str = str.toLowerCase();
        }
        return str;
    },

    PARTICLE_GIVEN_REGEXP: /^([^ ]+(?:\u02bb |\u2019 | |\' ) *)(.+)$/,
    PARTICLE_FAMILY_REGEXP: /^([^ ]+(?:\-|\u02bb|\u2019| |\') *)(.+)$/,
    SKIP_WORDS: ["about","above","across","afore","after","against","al", "along","alongside","amid","amidst","among","amongst","anenst","apropos","apud","around","as","aside","astride","at","athwart","atop","barring","before","behind","below","beneath","beside","besides","between","beyond","but","by","circa","despite","down","during","et", "except","for","forenenst","from","given","in","inside","into","lest","like","modulo","near","next","notwithstanding","of","off","on","onto","out","over","per","plus","pro","qua","sans","since","than","through"," thru","throughout","thruout","till","to","toward","towards","under","underneath","until","unto","up","upon","versus","vs.","v.","vs","v","via","vis-à-vis","with","within","without","according to","ahead of","apart from","as for","as of","as per","as regards","aside from","back to","because of","close to","due to","except for","far from","inside of","instead of","near to","next to","on to","out from","out of","outside of","prior to","pursuant to","rather than","regardless of","such as","that of","up to","where as","or", "yet", "so", "for", "and", "nor", "a", "an", "the", "de", "d'", "von", "van", "c", "ca"]
};

CSL.Doppeler = function(rexStr, stringMangler) {
    var matchRex = new RegExp("(" + rexStr + ")", "g");
    var splitRex = new RegExp(rexStr, "g");
    this.split = function (str) {
        // Normalize markup
        if (stringMangler) {
            str = stringMangler(str);
        }
        var match = str.match(matchRex);
        if (!match) {
            return {
                tags: [],
                strings: [str]
            };
        }
        var split = str.split(splitRex);
        for (var i=match.length-1; i> -1; i--) {
            if (typeof match[i] === "number") {
                match[i] = "";
            }
            var tag = match[i];
            if (tag === "\'" && split[i+1].length > 0) {
                // Fixes https://forums.zotero.org/discussion/comment/294317
                split[i+1] = match[i] + split[i+1];
                match[i] = "";
            }
        }
        return {
            tags: match,
            strings: split,
            origStrings: split.slice()
        };
    };
    this.join = function (obj) {
        var lst = obj.strings.slice(-1);
        for (var i=obj.tags.length-1; i>-1; i--) {
            lst.push(obj.tags[i]);
            lst.push(obj.strings[i]);
        }
        lst.reverse();
        return lst.join("");
    };
};

/*global CSL: true */

CSL.Output = {};

/*global CSL: true */

CSL.Output.Formatters = (function () {
    var rexStr = "(?:\u2018|\u2019|\u201C|\u201D| \"| \'|\"|\'|[-\u2013\u2014\/.,;?!:]|\\[|\\]|\\(|\\)|<span style=\"font-variant: small-caps;\">|<span class=\"no(?:case|decor)\">|<\/span>|<\/?(?:i|sc|b|sub|sup)>)";
    var tagDoppel = new CSL.Doppeler(rexStr, function(str) {
        return str.replace(/(<span)\s+(class=\"no(?:case|decor)\")[^>]*(>)/g, "$1 $2$3").replace(/(<span)\s+(style=\"font-variant:)\s*(small-caps);?(\")[^>]*(>)/g, "$1 $2 $3;$4$5");
    });
    
    var wordDoppel = new CSL.Doppeler("(?:[\u0020\u00A0\u2000-\u200B\u205F\u3000]+)");
    
    /**
     * INTERNAL
     */

    var _tagParams = {
        "<span style=\"font-variant: small-caps;\">": "</span>",
        "<span class=\"nocase\">": "</span>",
        "<span class=\"nodecor\">": "</span>",
        "<sc>": "</sc>",
        "<sub>": "</sub>",
        "<sup>": "</sup>"
    };

    function _capitalise (word) {
        // Weird stuff is (.) transpiled with regexpu
        //   https://github.com/mathiasbynens/regexpu
        var m = word.match(/(^\s*)((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))(.*)/);
        // Do not uppercase lone Greek letters
        // (No case transforms in Greek citations, but chars used in titles to science papers)
        if (m && !(m[2].match(/^[\u0370-\u03FF]$/) && !m[3])) {
            return m[1] + CSL.toLocaleUpperCase.call(this, m[2]) + m[3];
        }
        return word;
    }

    function _textcaseEngine(config, string) {
        if (!string) {
            return "";
        }
        config.doppel = tagDoppel.split(string);
        var quoteParams = {
            " \"": {
                opener: " \'",
                closer: "\""
            },
            " \'": {
                opener: " \"",
                closer: "\'"
            },
            "\u2018": {
                opener: "\u2018",
                closer: "\u2019"
            },
            "\u201C": {
                opener: "\u201C",
                closer: "\u201D"
            },
        };
        function tryOpen(tag, pos) {
            if (config.quoteState.length === 0 || tag === config.quoteState[config.quoteState.length - 1].opener) {
                config.quoteState.push({
                    opener: quoteParams[tag].opener,
                    closer: quoteParams[tag].closer,
                    pos: pos
                });
                return false;
            } else {
                var prevPos = config.quoteState[config.quoteState.length-1].pos;
                config.quoteState.pop();
                config.quoteState.push({
                    opener: quoteParams[tag].opener,
                    closer: quoteParams[tag].closer,
                    positions: pos
                });
                return prevPos;
            }
        }
        function tryClose(tag, pos) {
            if (config.quoteState.length > 0 && tag === config.quoteState[config.quoteState.length - 1].closer) {
                config.quoteState.pop();
            } else {
                return pos;
            }
        }
        function pushQuoteState(tag, pos) {
            var isOpener = ["\u201C", "\u2018", " \"", " \'"].indexOf(tag) > -1 ? true : false;
            if (isOpener) {
                return tryOpen(tag, pos);
            } else {
                return tryClose(tag, pos);
            }
        }
        function quoteFix (tag, positions) {
            var m = tag.match(/(^(?:\u2018|\u2019|\u201C|\u201D|\"|\')|(?: \"| \')$)/);
            if (m) {
                return pushQuoteState(m[1], positions);
            }
        }
        // Run state machine
        if (config.doppel.strings.length && config.doppel.strings[0].trim()) {
            config.doppel.strings[0] = config.capitaliseWords(config.doppel.strings[0], 0, config.doppel.tags[0]);
        }

    	for (var i=0,ilen=config.doppel.tags.length;i<ilen;i++) {
            var tag = config.doppel.tags[i];
            var str = config.doppel.strings[i+1];

            if (config.tagState !== null) {
                // Evaluate tag state for current string
                if (_tagParams[tag]) {
                    config.tagState.push(_tagParams[tag]);
                } else if (config.tagState.length && tag === config.tagState[config.tagState.length - 1]) {
                    config.tagState.pop();
                }
            }

            if (config.afterPunct !== null) {
                // Evaluate punctuation state of current string
                if (tag.match(/[\!\?\:]$/)) {
                    config.afterPunct = true;
                }
            }

            // Process if outside tag scope, else noop for upper-casing
            if (config.tagState.length === 0) {
                config.doppel.strings[i+1] = config.capitaliseWords(str, i+1, config.doppel,config.doppel.tags[i+1]);
                
            } else if (config.doppel.strings[i+1].trim()) {
                config.lastWordPos = null;
            }
            
            if (config.quoteState !== null) {
                // Evaluate quote state of current string and fix chars that have flown
                var quotePos = quoteFix(tag, i);
                if (quotePos || quotePos === 0) {
                    var origChar = config.doppel.origStrings[quotePos+1].slice(0, 1);
                    config.doppel.strings[quotePos+1] = origChar + config.doppel.strings[quotePos+1].slice(1);
                    config.lastWordPos = null;
                }
            }

            // If there was a printable string, unset first-word and after-punctuation
            if (config.isFirst) {
                if (str.trim()) {
                    config.isFirst = false;
                }
            }
            if (config.afterPunct) {
                if (str.trim()) {
                    config.afterPunct = false;
                }
            }
        }
        if (config.quoteState) {
            for (var i=0,ilen=config.quoteState.length;i<ilen;i++) {
                var quotePos = config.quoteState[i].pos;
                // Test for quotePos avoids a crashing error:
                //   https://github.com/citation-style-language/test-suite/blob/master/processor-tests/humans/flipflop_OrphanQuote.txt
                if (typeof quotePos !== 'undefined') {
                    var origChar = config.doppel.origStrings[quotePos+1].slice(0, 1);
                    config.doppel.strings[quotePos+1] = origChar + config.doppel.strings[quotePos+1].slice(1);
                }
            }
        }
        // Specially capitalize the last word if necessary (invert stop-word list)
        if (config.lastWordPos) {
            var lastWords = wordDoppel.split(config.doppel.strings[config.lastWordPos.strings]);
            var lastWord = lastWords.strings[config.lastWordPos.words];
            if (lastWord.length > 1 && CSL.toLocaleLowerCase.call(this, lastWord).match(config.skipWordsRex)) {
                lastWord = _capitalise.call(this, lastWord);
                lastWords.strings[config.lastWordPos.words] = lastWord;
            }
            config.doppel.strings[config.lastWordPos.strings] = wordDoppel.join(lastWords);
        }

        // Recombine the string
        return tagDoppel.join(config.doppel);
    }

    /**
     * PUBLIC
     */

    /**
     * A noop that just delivers the string.
     */
    function passthrough (state, str) {
        return str;
    }

    /**
     * Force all letters in the string to lowercase, skipping nocase spans
     */
    function lowercase(state, string) {
        var config = {
            quoteState: null,
            capitaliseWords: function(str) {
                var words = str.split(" ");
                for (var i=0,ilen=words.length;i<ilen;i++) {
                    var word = words[i];
                    if (word) {
                        words[i] = CSL.toLocaleLowerCase.call(state, word);
                    }
                }
                return words.join(" ");
            },
            skipWordsRex: null,
            tagState: [],
            afterPunct: null,
            isFirst: null
        };
        return _textcaseEngine.call(state, config, string);
    }

    /**
     * Force all letters in the string to uppercase.
     */
    function uppercase(state, string) {
        var config = {
            quoteState: null,
            capitaliseWords: function(str) {
                var words = str.split(" ");
                for (var i=0,ilen=words.length;i<ilen;i++) {
                    var word = words[i];
                    if (word) {
                        // Okay.
                        // So we need to pick up an array of locales from state.tmp.
                        // This function is invoked in the context of queue.js, so
                        // the item is not available here. Three levels to be included
                        // in the array:
                        // 1. Field language tag, if any
                        // 2. Item language tag, if any
                        // 3. Value of state.opt.lang
                        words[i] = CSL.toLocaleUpperCase.call(state, word);
                    }
                }
                return words.join(" ");
            },
            skipWordsRex: null,
            tagState: [],
            afterPunct: null,
            isFirst: null
        };
        return _textcaseEngine.call(state, config, string);
    }

    /**
     * Similar to <b>capitalize_first</b>, but force the
     * subsequent characters to lowercase.
     */
    function sentence(state, string) {
        var config = {
            quoteState: [],
            capitaliseWords: function(str) {
                var words = str.split(" ");
                for (var i=0,ilen=words.length;i<ilen;i++) {
                    var word = words[i];
                    if (word) {
                        if (config.isFirst) {
                            words[i] = _capitalise.call(state, word);
                            config.isFirst = false;
                        } else {
                            words[i] = CSL.toLocaleLowerCase.call(state, word);
                        }
                    }
                }
                return words.join(" ");
            },
            skipWordsRex: null,
            tagState: [],
            afterPunct: null,
            isFirst: true
        };
        return _textcaseEngine.call(state, config, string);
    }

    function title(state, string) {
        var config = {
            quoteState: [],
            capitaliseWords: function(str, i, followingTag) {
                if (str.trim()) {
                    var words = str.split(/[ \u00A0]+/);
                    var wordle = wordDoppel.split(str);
                    var words = wordle.strings;
                    for (var j=0,jlen=words.length;j<jlen;j++) {
                        var word = words[j];
                        if (!word) {
                            continue;
                        }
                        if (word.length > 1 && !CSL.toLocaleLowerCase.call(state, word).match(config.skipWordsRex)) {
                            // Capitalize every word that is not a stop-word
                            words[j] = _capitalise.call(state, words[j]);
                        } else if (j === (words.length - 1) && followingTag === "-") {
                            words[j] = _capitalise.call(state, words[j]);
                        } else if (config.isFirst) {
                            // Capitalize first word, even if a stop-word
                            words[j] = _capitalise.call(state, words[j]);
                        } else if (config.afterPunct) {
                            // Capitalize after punctuation
                            words[j] = _capitalise.call(state, words[j]);
                        }
                        config.afterPunct = false;
                        config.isFirst = false;
                        config.lastWordPos = {
                            strings: i,
                            words: j
                        };
                    }
                    str = wordDoppel.join(wordle);
                }
                return str;
            },
            skipWordsRex: state.locale[state.opt.lang].opts["skip-words-regexp"],
            tagState: [],
            afterPunct: false,
            isFirst: true
        };
        return _textcaseEngine.call(state, config, string);
    }
    
    
    /**
     * Force capitalization of the first letter in the string, leave
     * the rest of the characters untouched.
     */
    function capitalizeFirst(state, string) {
        var config = {
            quoteState: [],
            capitaliseWords: function(str) {
                var words = str.split(" ");
                for (var i=0,ilen=words.length;i<ilen;i++) {
                    var word = words[i];
                    if (word) {
                        if (config.isFirst) {
                            words[i] = _capitalise.call(state, word);
                            config.isFirst = false;
                            break;
                        }
                    }
                }
                return words.join(" ");
            },
            skipWordsRex: null,
            tagState: [],
            afterPunct: null,
            isFirst: true
        };
        return _textcaseEngine.call(state, config, string);
    }

    /**
     * Force the first letter of each space-delimited
     * word in the string to uppercase, and leave the remainder
     * of the string untouched.  Single characters are forced
     * to uppercase.
     */
    function capitalizeAll (state, string) {
        var config = {
            quoteState: [],
            capitaliseWords: function(str) {
                var words = str.split(" ");
                for (var i=0,ilen=words.length;i<ilen;i++) {
                    var word = words[i];
                    if (word) {
                        words[i] = _capitalise.call(state, word);
                    }
                }
                return words.join(" ");
            },
            skipWordsRex: null,
            tagState: [],
            afterPunct: null,
            isFirst: null
        };
        return _textcaseEngine.call(state, config, string);
    }
    return {
        passthrough: passthrough,
        lowercase: lowercase,
        uppercase: uppercase,
        sentence: sentence,
        title: title,
        "capitalize-first": capitalizeFirst,
        "capitalize-all": capitalizeAll
    };
}());

CSL.parseParticles = (function(){
    function splitParticles(nameValue, firstNameFlag, caseOverride) {
		// Parse particles out from name fields.
		// * nameValue (string) is the field content to be parsed.
		// * firstNameFlag (boolean) parse trailing particles
		//	 (default is to parse leading particles)
		// * caseOverride (boolean) include all but one word in particle set
		//	 (default is to include only words with lowercase first char)
        //   [caseOverride is not used in this application]
		// Returns an array with:
		// * (boolean) flag indicating whether a particle was found
		// * (string) the name after removal of particles
		// * (array) the list of particles found
		var origNameValue = nameValue;
		nameValue = caseOverride ? nameValue.toLowerCase() : nameValue;
		var particleList = [];
		var rex;
        var hasParticle;
		if (firstNameFlag) {
			nameValue = nameValue.split("").reverse().join("");
			rex = CSL.PARTICLE_GIVEN_REGEXP;
		} else {
			rex = CSL.PARTICLE_FAMILY_REGEXP;
		}
		var m = nameValue.match(rex);
		while (m) {
			var m1 = firstNameFlag ? m[1].split("").reverse().join("") : m[1];
			var firstChar = m ? m1 : false;
			var firstChar = firstChar ? m1.replace(/^[-\'\u02bb\u2019\s]*(.).*$/, "$1") : false;
			hasParticle = firstChar ? firstChar.toUpperCase() !== firstChar : false;
			if (!hasParticle) {
                break;
            }
			if (firstNameFlag) {
				particleList.push(origNameValue.slice(m1.length * -1));
				origNameValue = origNameValue.slice(0,m1.length * -1);
			} else {
				particleList.push(origNameValue.slice(0,m1.length));
				origNameValue = origNameValue.slice(m1.length);
			}
			//particleList.push(m1);
			nameValue = m[2];
			m = nameValue.match(rex);
		}
		if (firstNameFlag) {
			nameValue = nameValue.split("").reverse().join("");
			particleList.reverse();
			for (var i=1,ilen=particleList.length;i<ilen;i++) {
				if (particleList[i].slice(0, 1) == " ") {
					particleList[i-1] += " ";
				}
			}
			for (var i=0,ilen=particleList.length;i<ilen;i++) {
				if (particleList[i].slice(0, 1) == " ") {
					particleList[i] = particleList[i].slice(1);
				}
			}
			nameValue = origNameValue.slice(0, nameValue.length);
		} else {
			nameValue = origNameValue.slice(nameValue.length * -1);
		}
		return [hasParticle, nameValue, particleList];
	}
    function trimLast(str) {
        var lastChar = str.slice(-1);
        str = str.trim();
        if (lastChar === " " && ["\'", "\u2019"].indexOf(str.slice(-1)) > -1) {
            str += " ";
        }
        return str;
    }
    function parseSuffix(nameObj) {
        if (!nameObj.suffix && nameObj.given) {
            var m = nameObj.given.match(/(\s*,!*\s*)/);
            if (m) {
                var idx = nameObj.given.indexOf(m[1]);
                var possible_suffix = nameObj.given.slice(idx + m[1].length);
                var possible_comma = nameObj.given.slice(idx, idx + m[1].length).replace(/\s*/g, "");
                if (possible_suffix.replace(/\./g, "") === 'et al' && !nameObj["dropping-particle"]) {
                    // This hack covers the case where "et al." is explicitly used in the
                    // authorship information of the work.
                    nameObj["dropping-particle"] = possible_suffix;
                    nameObj["comma-dropping-particle"] = ",";
                } else {
                    if (possible_comma.length === 2) {
                        nameObj["comma-suffix"] = true;
                    }
                    nameObj.suffix = possible_suffix;
                }
                nameObj.given = nameObj.given.slice(0, idx);
            }
        }
    }
    return function(nameObj) {
        // Extract and set non-dropping particle(s) from family name field
        var res = splitParticles(nameObj.family);
        var lastNameValue = res[1];
        var lastParticleList = res[2];
        nameObj.family = lastNameValue;
        var nonDroppingParticle = trimLast(lastParticleList.join(""));
        if (nonDroppingParticle) {
            nameObj['non-dropping-particle'] = nonDroppingParticle;
        }
        // Split off suffix first of all
        parseSuffix(nameObj);
        // Extract and set dropping particle(s) from given name field
        var res = splitParticles(nameObj.given, true);
        var firstNameValue = res[1];
        var firstParticleList = res[2];
        nameObj.given = firstNameValue;
        var droppingParticle = firstParticleList.join("").trim();
        if (droppingParticle) {
            nameObj['dropping-particle'] = droppingParticle;
        }
    };
}());


module.exports = CSL

/***/ }),

/***/ "../gen/items/csl-types.json":
/*!***********************************!*\
  !*** ../gen/items/csl-types.json ***!
  \***********************************/
/*! default exports */
/*! export 0 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 1 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 10 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 11 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 12 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 13 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 14 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 15 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 16 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 17 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 18 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 19 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 2 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 20 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 21 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 22 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 23 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 24 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 25 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 26 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 27 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 28 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 29 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 3 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 30 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 31 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 32 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 33 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 34 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 35 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 36 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 37 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 38 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 39 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 4 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 40 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 41 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 5 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 6 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 7 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 8 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export 9 [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = JSON.parse("[\"thesis\",\"song\",\"speech\",\"gazette\",\"book\",\"legal_case\",\"graphic\",\"article-magazine\",\"entry-dictionary\",\"treaty\",\"review\",\"article-journal\",\"webpage\",\"interview\",\"post\",\"personal_communication\",\"video\",\"regulation\",\"legal_commentary\",\"legislation\",\"post-weblog\",\"standard\",\"entry\",\"patent\",\"bill\",\"article\",\"dataset\",\"pamphlet\",\"chapter\",\"manuscript\",\"report\",\"paper-conference\",\"broadcast\",\"review-book\",\"entry-encyclopedia\",\"hearing\",\"musical_score\",\"map\",\"motion_picture\",\"figure\",\"classic\",\"article-newspaper\"]");

/***/ }),

/***/ "../gen/items/extra-fields.json":
/*!**************************************!*\
  !*** ../gen/items/extra-fields.json ***!
  \**************************************/
/*! default exports */
/*! export DOI [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export ISBN [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export ISSN [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export PMCID [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export PMID [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export URL [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export access date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export accessDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export accessed [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export admin flag [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export admin-flag [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export adminFlag [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export adoption date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export adoptionDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export album [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export application number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export applicationNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export archive [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export archive location [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export archive place [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export archive-place [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export archiveLocation [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export archive_location [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export artist [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export artwork medium [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export artwork size [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export artworkMedium [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export artworkSize [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export assembly number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export assemblyNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export assignee [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export attorney agent [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export attorneyAgent [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export audio file type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export audio recording format [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export audioFileType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export audioRecordingFormat [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export author [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export authority [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*!     export 2 [provided] [unused] [could be renamed] */
/*!     export 3 [provided] [unused] [could be renamed] */
/*!     export 4 [provided] [unused] [could be renamed] */
/*! export bill number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export billNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export blog title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export blogTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export book author [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export book title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export bookAuthor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export bookTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export call number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export call-number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export callNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export cartographer [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export case name [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export caseName [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export cast member [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export castMember [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export chapter number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export chapter-number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export code [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export code number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export code pages [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export code volume [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export codeNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export codePages [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export codeVolume [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export collection editor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export collection number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*!     export 2 [provided] [unused] [could be renamed] */
/*!     export 3 [provided] [unused] [could be renamed] */
/*! export collection title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*!     export 2 [provided] [unused] [could be renamed] */
/*! export collection-editor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export collection-number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export collection-title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export commenter [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export committee [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export company [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export composer [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export conference date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export conference name [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export conferenceDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export conferenceName [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export container author [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export container title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*!     export 2 [provided] [unused] [could be renamed] */
/*! export container title short [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export container-author [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export container-title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export container-title-short [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export contributor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export cosponsor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export counsel [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export country [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export court [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export csl type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export csl-type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export date amended [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export date decided [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export date enacted [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export dateAmended [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export dateDecided [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export dateEnacted [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export dictionary title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export dictionaryTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export dimensions [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export director [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export distributor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export division [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export docket number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export docketNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export document name [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export document number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export document-name [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export documentName [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export documentNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export doi [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export edition [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export editor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export editorial director [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export editorial-director [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export encyclopedia title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export encyclopediaTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export episode number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export episodeNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export event [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*!     export 2 [provided] [unused] [could be renamed] */
/*! export event date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*!     export 2 [provided] [unused] [could be renamed] */
/*! export event place [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export event-date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export event-place [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export filing date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export filingDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export first page [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export firstPage [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export forum title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export forumTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export gazette flag [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export gazette-flag [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export gazetteFlag [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export genre [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export guest [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export history [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export illustrator [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export institution [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export interview medium [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export interviewMedium [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export interviewee [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export interviewer [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export inventor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export isbn [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export issn [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export issue [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export issue date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export issueDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export issued [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export issuing authority [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export issuingAuthority [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export journal abbreviation [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export journalAbbreviation [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export jurisdiction [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export label [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export language [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export legal status [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export legalStatus [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export legislative body [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export legislativeBody [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export letter type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export letterType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export library catalog [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export libraryCatalog [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export manuscript type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export manuscriptType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export map type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export mapType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export medium [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export meeting name [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export meeting number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export meetingName [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export meetingNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export name of act [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export nameOfAct [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export network [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export news case date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export newsCaseDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export num pages [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export numPages [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export number of pages [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export number of volumes [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export number-of-pages [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export number-of-volumes [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export numberOfVolumes [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export opening date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export opening-date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export openingDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export opus [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export original author [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export original date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export original publisher [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export original publisher place [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export original title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export original-author [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export original-date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export original-publisher [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export original-publisher-place [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export original-title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export originalDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export page [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export pages [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export parent treaty [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export parentTreaty [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export patent number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export patentNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export performer [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export place [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export pmcid [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export pmid [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export podcaster [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export post type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export postType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export presentation type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export presentationType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export presenter [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export priority date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export priority numbers [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export priorityDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export priorityNumbers [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export proceedings title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export proceedingsTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export producer [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export program title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export programTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export programmer [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export programming language [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export programmingLanguage [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export public law number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export publicLawNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export publication date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export publication number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export publication title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export publication-date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export publication-number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export publicationDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export publicationNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export publicationTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export publisher [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export publisher place [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export publisher-place [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export recipient [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export references [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export regnal year [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export regnalYear [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export regulation type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export regulationType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export regulatory body [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export regulatoryBody [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export reign [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export release [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export report number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export report type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export reportNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export reportType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export reporter [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export reporter volume [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export reporterVolume [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export resolution label [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export resolutionLabel [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export reviewed author [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export reviewed title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export reviewed-author [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export reviewed-title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export reviewedAuthor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export rights [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export running time [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export runningTime [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export scale [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export scriptwriter [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export section [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export series [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export series editor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export series number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export series text [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export series title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export seriesEditor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export seriesNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export seriesText [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export seriesTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export session [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export session type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export sessionType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!     export 1 [provided] [unused] [could be renamed] */
/*! export short title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export shortTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export signing date [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export signingDate [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export source [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export sponsor [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export status [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export studio [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export subject [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export submitted [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export supplement [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export supplement name [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export supplementName [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export system [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export testimony by [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export testimonyBy [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export thesis type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export thesisType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export title short [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export title-short [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export translator [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export treaty number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export treatyNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export university [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export url [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export version [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export version number [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export versionNumber [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export video recording format [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export videoRecordingFormat [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export volume [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export volume title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export volume-title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*! export volumeTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export website title [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export website type [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export websiteTitle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export websiteType [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export words by [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export wordsBy [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export csl [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export year as volume [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! export yearAsVolume [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*!   export type [provided] [unused] [could be renamed] */
/*!   export zotero [provided] [unused] [could be renamed] */
/*!     export 0 [provided] [unused] [could be renamed] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = JSON.parse("{\"DOI\":{\"csl\":[\"DOI\"],\"type\":\"text\",\"zotero\":[\"DOI\"]},\"ISBN\":{\"csl\":[\"ISBN\"],\"type\":\"text\",\"zotero\":[\"ISBN\"]},\"ISSN\":{\"csl\":[\"ISSN\"],\"type\":\"text\",\"zotero\":[\"ISSN\"]},\"PMCID\":{\"csl\":[\"PMCID\"],\"type\":\"text\"},\"PMID\":{\"csl\":[\"PMID\"],\"type\":\"text\"},\"URL\":{\"csl\":[\"URL\"],\"type\":\"text\"},\"access date\":{\"csl\":[\"accessed\"],\"type\":\"date\",\"zotero\":[\"accessDate\"]},\"accessDate\":{\"type\":\"date\",\"zotero\":[\"accessDate\"]},\"accessed\":{\"csl\":[\"accessed\"],\"type\":\"date\",\"zotero\":[\"accessDate\"]},\"admin flag\":{\"csl\":[\"admin-flag\"],\"type\":\"text\",\"zotero\":[\"adminFlag\"]},\"admin-flag\":{\"csl\":[\"admin-flag\"],\"type\":\"text\"},\"adminFlag\":{\"type\":\"text\",\"zotero\":[\"adminFlag\"]},\"adoption date\":{\"type\":\"date\",\"zotero\":[\"adoptionDate\"]},\"adoptionDate\":{\"type\":\"date\",\"zotero\":[\"adoptionDate\"]},\"album\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"application number\":{\"type\":\"text\",\"zotero\":[\"applicationNumber\"]},\"applicationNumber\":{\"type\":\"text\",\"zotero\":[\"applicationNumber\"]},\"archive\":{\"csl\":[\"archive\"],\"type\":\"text\",\"zotero\":[\"archive\"]},\"archive location\":{\"csl\":[\"archive_location\"],\"type\":\"text\",\"zotero\":[\"archiveLocation\"]},\"archive place\":{\"csl\":[\"archive-place\"],\"type\":\"text\"},\"archive-place\":{\"csl\":[\"archive-place\"],\"type\":\"text\"},\"archiveLocation\":{\"type\":\"text\",\"zotero\":[\"archiveLocation\"]},\"archive_location\":{\"csl\":[\"archive_location\"],\"type\":\"text\"},\"artist\":{\"csl\":[\"author\"],\"type\":\"name\",\"zotero\":[\"artist\"]},\"artwork medium\":{\"type\":\"text\",\"zotero\":[\"medium\"]},\"artwork size\":{\"type\":\"text\",\"zotero\":[\"artworkSize\"]},\"artworkMedium\":{\"type\":\"text\",\"zotero\":[\"medium\"]},\"artworkSize\":{\"type\":\"text\",\"zotero\":[\"artworkSize\"]},\"assembly number\":{\"type\":\"text\",\"zotero\":[\"assemblyNumber\",\"seriesNumber\"]},\"assemblyNumber\":{\"type\":\"text\",\"zotero\":[\"assemblyNumber\",\"seriesNumber\"]},\"assignee\":{\"type\":\"text\",\"zotero\":[\"assignee\"]},\"attorney agent\":{\"csl\":[\"attorneyAgent\"],\"type\":\"name\",\"zotero\":[\"attorneyAgent\"]},\"attorneyAgent\":{\"csl\":[\"attorneyAgent\"],\"type\":\"name\",\"zotero\":[\"attorneyAgent\"]},\"audio file type\":{\"type\":\"text\",\"zotero\":[\"medium\"]},\"audio recording format\":{\"type\":\"text\",\"zotero\":[\"medium\"]},\"audioFileType\":{\"type\":\"text\",\"zotero\":[\"medium\"]},\"audioRecordingFormat\":{\"type\":\"text\",\"zotero\":[\"medium\"]},\"author\":{\"csl\":[\"author\"],\"type\":\"name\",\"zotero\":[\"author\"]},\"authority\":{\"csl\":[\"authority\"],\"type\":\"text\",\"zotero\":[\"court\",\"legislativeBody\",\"issuingAuthority\",\"institution\",\"regulatoryBody\"]},\"bill number\":{\"csl\":[\"number\"],\"type\":\"text\",\"zotero\":[\"number\"]},\"billNumber\":{\"type\":\"text\",\"zotero\":[\"number\"]},\"blog title\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"blogTitle\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"book author\":{\"csl\":[\"container-author\"],\"type\":\"name\",\"zotero\":[\"bookAuthor\"]},\"book title\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"bookAuthor\":{\"type\":\"name\",\"zotero\":[\"bookAuthor\"]},\"bookTitle\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"call number\":{\"csl\":[\"call-number\"],\"type\":\"text\",\"zotero\":[\"callNumber\"]},\"call-number\":{\"csl\":[\"call-number\"],\"type\":\"text\"},\"callNumber\":{\"type\":\"text\",\"zotero\":[\"callNumber\"]},\"cartographer\":{\"csl\":[\"author\"],\"type\":\"name\",\"zotero\":[\"cartographer\"]},\"case name\":{\"csl\":[\"title\"],\"type\":\"text\",\"zotero\":[\"title\"]},\"caseName\":{\"type\":\"text\",\"zotero\":[\"title\"]},\"cast member\":{\"csl\":[\"castMember\"],\"type\":\"name\",\"zotero\":[\"castMember\"]},\"castMember\":{\"csl\":[\"castMember\"],\"type\":\"name\",\"zotero\":[\"castMember\"]},\"chapter number\":{\"csl\":[\"chapter-number\"],\"type\":\"text\",\"zotero\":[\"session\"]},\"chapter-number\":{\"csl\":[\"chapter-number\"],\"type\":\"text\"},\"code\":{\"type\":\"text\",\"zotero\":[\"code\"]},\"code number\":{\"type\":\"text\",\"zotero\":[\"codeNumber\"]},\"code pages\":{\"csl\":[\"page\"],\"type\":\"text\",\"zotero\":[\"pages\"]},\"code volume\":{\"type\":\"text\",\"zotero\":[\"volume\"]},\"codeNumber\":{\"type\":\"text\",\"zotero\":[\"codeNumber\"]},\"codePages\":{\"type\":\"text\",\"zotero\":[\"pages\"]},\"codeVolume\":{\"type\":\"text\",\"zotero\":[\"volume\"]},\"collection editor\":{\"csl\":[\"collection-editor\"],\"type\":\"name\",\"zotero\":[\"seriesEditor\"]},\"collection number\":{\"csl\":[\"collection-number\"],\"type\":\"text\",\"zotero\":[\"seriesNumber\",\"assemblyNumber\",\"regnalYear\",\"yearAsVolume\"]},\"collection title\":{\"csl\":[\"collection-title\"],\"type\":\"text\",\"zotero\":[\"seriesTitle\",\"series\",\"parentTreaty\"]},\"collection-editor\":{\"csl\":[\"collection-editor\"],\"type\":\"name\"},\"collection-number\":{\"csl\":[\"collection-number\"],\"type\":\"text\"},\"collection-title\":{\"csl\":[\"collection-title\"],\"type\":\"text\"},\"commenter\":{\"csl\":[\"commenter\"],\"type\":\"name\",\"zotero\":[\"commenter\"]},\"committee\":{\"csl\":[\"committee\"],\"type\":\"text\",\"zotero\":[\"committee\"]},\"company\":{\"csl\":[\"publisher\"],\"type\":\"text\",\"zotero\":[\"publisher\"]},\"composer\":{\"csl\":[\"composer\"],\"type\":\"name\",\"zotero\":[\"composer\"]},\"conference date\":{\"type\":\"date\",\"zotero\":[\"conferenceDate\"]},\"conference name\":{\"type\":\"text\",\"zotero\":[\"conferenceName\"]},\"conferenceDate\":{\"type\":\"date\",\"zotero\":[\"conferenceDate\"]},\"conferenceName\":{\"type\":\"text\",\"zotero\":[\"conferenceName\"]},\"container author\":{\"csl\":[\"container-author\"],\"type\":\"name\",\"zotero\":[\"bookAuthor\"]},\"container title\":{\"csl\":[\"container-title\"],\"type\":\"text\",\"zotero\":[\"publicationTitle\",\"reporter\",\"code\"]},\"container title short\":{\"csl\":[\"container-title-short\"],\"type\":\"text\",\"zotero\":[\"journalAbbreviation\"]},\"container-author\":{\"csl\":[\"container-author\"],\"type\":\"name\"},\"container-title\":{\"csl\":[\"container-title\"],\"type\":\"text\"},\"container-title-short\":{\"csl\":[\"container-title-short\"],\"type\":\"text\"},\"contributor\":{\"csl\":[\"contributor\"],\"type\":\"name\",\"zotero\":[\"contributor\"]},\"cosponsor\":{\"csl\":[\"cosponsor\"],\"type\":\"name\",\"zotero\":[\"cosponsor\"]},\"counsel\":{\"csl\":[\"counsel\"],\"type\":\"name\",\"zotero\":[\"counsel\"]},\"country\":{\"type\":\"text\",\"zotero\":[\"country\"]},\"court\":{\"type\":\"text\",\"zotero\":[\"court\"]},\"csl type\":{\"csl\":[\"csl-type\"],\"type\":\"text\"},\"csl-type\":{\"csl\":[\"csl-type\"],\"type\":\"text\"},\"date\":{\"csl\":[\"issued\"],\"type\":\"date\",\"zotero\":[\"date\"]},\"date amended\":{\"type\":\"date\",\"zotero\":[\"dateAmended\"]},\"date decided\":{\"csl\":[\"issued\"],\"type\":\"date\",\"zotero\":[\"date\"]},\"date enacted\":{\"csl\":[\"issued\"],\"type\":\"date\",\"zotero\":[\"date\"]},\"dateAmended\":{\"type\":\"date\",\"zotero\":[\"dateAmended\"]},\"dateDecided\":{\"type\":\"date\",\"zotero\":[\"date\"]},\"dateEnacted\":{\"type\":\"date\",\"zotero\":[\"date\"]},\"dictionary title\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"dictionaryTitle\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"dimensions\":{\"csl\":[\"dimensions\"],\"type\":\"text\",\"zotero\":[\"artworkSize\",\"runningTime\"]},\"director\":{\"csl\":[\"director\"],\"type\":\"name\",\"zotero\":[\"director\"]},\"distributor\":{\"csl\":[\"publisher\"],\"type\":\"text\",\"zotero\":[\"publisher\"]},\"division\":{\"csl\":[\"division\"],\"type\":\"text\",\"zotero\":[\"division\"]},\"docket number\":{\"csl\":[\"number\"],\"type\":\"text\",\"zotero\":[\"number\"]},\"docketNumber\":{\"type\":\"text\",\"zotero\":[\"number\"]},\"document name\":{\"csl\":[\"document-name\"],\"type\":\"text\",\"zotero\":[\"documentName\"]},\"document number\":{\"csl\":[\"number\"],\"type\":\"text\",\"zotero\":[\"number\"]},\"document-name\":{\"csl\":[\"document-name\"],\"type\":\"text\"},\"documentName\":{\"type\":\"text\",\"zotero\":[\"documentName\"]},\"documentNumber\":{\"type\":\"text\",\"zotero\":[\"number\"]},\"doi\":{\"csl\":[\"DOI\"],\"type\":\"text\",\"zotero\":[\"DOI\"]},\"edition\":{\"csl\":[\"edition\"],\"type\":\"text\",\"zotero\":[\"edition\"]},\"editor\":{\"csl\":[\"editor\"],\"type\":\"name\",\"zotero\":[\"editor\"]},\"editorial director\":{\"csl\":[\"editorial-director\"],\"type\":\"name\"},\"editorial-director\":{\"csl\":[\"editorial-director\"],\"type\":\"name\"},\"encyclopedia title\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"encyclopediaTitle\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"episode number\":{\"csl\":[\"number\"],\"type\":\"text\",\"zotero\":[\"number\"]},\"episodeNumber\":{\"type\":\"text\",\"zotero\":[\"number\"]},\"event\":{\"csl\":[\"event\"],\"type\":\"text\",\"zotero\":[\"meetingName\",\"conferenceName\",\"resolutionLabel\"]},\"event date\":{\"csl\":[\"event-date\"],\"type\":\"date\",\"zotero\":[\"dateAmended\",\"signingDate\",\"conferenceDate\"]},\"event place\":{\"csl\":[\"event-place\"],\"type\":\"text\"},\"event-date\":{\"csl\":[\"event-date\"],\"type\":\"date\"},\"event-place\":{\"csl\":[\"event-place\"],\"type\":\"text\"},\"filing date\":{\"csl\":[\"submitted\"],\"type\":\"date\",\"zotero\":[\"filingDate\"]},\"filingDate\":{\"type\":\"date\",\"zotero\":[\"filingDate\"]},\"first page\":{\"csl\":[\"page\"],\"type\":\"text\",\"zotero\":[\"pages\"]},\"firstPage\":{\"type\":\"text\",\"zotero\":[\"pages\"]},\"forum title\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"forumTitle\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"gazette flag\":{\"csl\":[\"gazette-flag\"],\"type\":\"text\",\"zotero\":[\"gazetteFlag\"]},\"gazette-flag\":{\"csl\":[\"gazette-flag\"],\"type\":\"text\"},\"gazetteFlag\":{\"type\":\"text\",\"zotero\":[\"gazetteFlag\"]},\"genre\":{\"csl\":[\"genre\"],\"type\":\"text\",\"zotero\":[\"genre\",\"type\"]},\"guest\":{\"csl\":[\"guest\"],\"type\":\"name\",\"zotero\":[\"guest\"]},\"history\":{\"type\":\"text\",\"zotero\":[\"history\"]},\"illustrator\":{\"csl\":[\"illustrator\"],\"type\":\"name\"},\"institution\":{\"csl\":[\"publisher\"],\"type\":\"text\",\"zotero\":[\"institution\",\"publisher\"]},\"interview medium\":{\"type\":\"text\",\"zotero\":[\"medium\"]},\"interviewMedium\":{\"type\":\"text\",\"zotero\":[\"medium\"]},\"interviewee\":{\"csl\":[\"author\"],\"type\":\"name\",\"zotero\":[\"interviewee\"]},\"interviewer\":{\"csl\":[\"interviewer\"],\"type\":\"name\",\"zotero\":[\"interviewer\"]},\"inventor\":{\"csl\":[\"author\"],\"type\":\"name\",\"zotero\":[\"inventor\"]},\"isbn\":{\"csl\":[\"ISBN\"],\"type\":\"text\",\"zotero\":[\"ISBN\"]},\"issn\":{\"csl\":[\"ISSN\"],\"type\":\"text\",\"zotero\":[\"ISSN\"]},\"issue\":{\"csl\":[\"issue\"],\"type\":\"text\",\"zotero\":[\"issue\"]},\"issue date\":{\"csl\":[\"issued\"],\"type\":\"date\",\"zotero\":[\"date\"]},\"issueDate\":{\"type\":\"date\",\"zotero\":[\"date\"]},\"issued\":{\"csl\":[\"issued\"],\"type\":\"date\",\"zotero\":[\"date\"]},\"issuing authority\":{\"type\":\"text\",\"zotero\":[\"issuingAuthority\"]},\"issuingAuthority\":{\"type\":\"text\",\"zotero\":[\"issuingAuthority\"]},\"journal abbreviation\":{\"csl\":[\"container-title-short\"],\"type\":\"text\",\"zotero\":[\"journalAbbreviation\"]},\"journalAbbreviation\":{\"type\":\"text\",\"zotero\":[\"journalAbbreviation\"]},\"jurisdiction\":{\"csl\":[\"jurisdiction\"],\"type\":\"text\",\"zotero\":[\"jurisdiction\"]},\"label\":{\"csl\":[\"publisher\"],\"type\":\"text\",\"zotero\":[\"publisher\"]},\"language\":{\"csl\":[\"language\"],\"type\":\"text\",\"zotero\":[\"language\"]},\"legal status\":{\"type\":\"text\",\"zotero\":[\"legalStatus\"]},\"legalStatus\":{\"type\":\"text\",\"zotero\":[\"legalStatus\"]},\"legislative body\":{\"type\":\"text\",\"zotero\":[\"legislativeBody\"]},\"legislativeBody\":{\"type\":\"text\",\"zotero\":[\"legislativeBody\"]},\"letter type\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"letterType\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"library catalog\":{\"csl\":[\"source\"],\"type\":\"text\",\"zotero\":[\"libraryCatalog\"]},\"libraryCatalog\":{\"type\":\"text\",\"zotero\":[\"libraryCatalog\"]},\"manuscript type\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"manuscriptType\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"map type\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"mapType\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"medium\":{\"csl\":[\"medium\"],\"type\":\"text\",\"zotero\":[\"medium\"]},\"meeting name\":{\"type\":\"text\",\"zotero\":[\"meetingName\"]},\"meeting number\":{\"type\":\"text\",\"zotero\":[\"meetingNumber\"]},\"meetingName\":{\"type\":\"text\",\"zotero\":[\"meetingName\"]},\"meetingNumber\":{\"type\":\"text\",\"zotero\":[\"meetingNumber\"]},\"name of act\":{\"csl\":[\"title\"],\"type\":\"text\",\"zotero\":[\"title\"]},\"nameOfAct\":{\"type\":\"text\",\"zotero\":[\"title\"]},\"network\":{\"csl\":[\"publisher\"],\"type\":\"text\",\"zotero\":[\"publisher\"]},\"news case date\":{\"type\":\"date\",\"zotero\":[\"newsCaseDate\"]},\"newsCaseDate\":{\"type\":\"date\",\"zotero\":[\"newsCaseDate\"]},\"num pages\":{\"csl\":[\"number-of-pages\"],\"type\":\"text\",\"zotero\":[\"numPages\"]},\"numPages\":{\"type\":\"text\",\"zotero\":[\"numPages\"]},\"number\":{\"csl\":[\"number\"],\"type\":\"text\",\"zotero\":[\"number\"]},\"number of pages\":{\"csl\":[\"number-of-pages\"],\"type\":\"text\",\"zotero\":[\"numPages\"]},\"number of volumes\":{\"csl\":[\"number-of-volumes\"],\"type\":\"text\",\"zotero\":[\"numberOfVolumes\"]},\"number-of-pages\":{\"csl\":[\"number-of-pages\"],\"type\":\"text\"},\"number-of-volumes\":{\"csl\":[\"number-of-volumes\"],\"type\":\"text\"},\"numberOfVolumes\":{\"type\":\"text\",\"zotero\":[\"numberOfVolumes\"]},\"opening date\":{\"csl\":[\"opening-date\"],\"type\":\"date\",\"zotero\":[\"openingDate\"]},\"opening-date\":{\"csl\":[\"opening-date\"],\"type\":\"date\"},\"openingDate\":{\"type\":\"date\",\"zotero\":[\"openingDate\"]},\"opus\":{\"type\":\"text\",\"zotero\":[\"opus\"]},\"original author\":{\"csl\":[\"original-author\"],\"type\":\"name\"},\"original date\":{\"csl\":[\"original-date\"],\"type\":\"date\",\"zotero\":[\"originalDate\"]},\"original publisher\":{\"csl\":[\"original-publisher\"],\"type\":\"text\"},\"original publisher place\":{\"csl\":[\"original-publisher-place\"],\"type\":\"text\"},\"original title\":{\"csl\":[\"original-title\"],\"type\":\"text\"},\"original-author\":{\"csl\":[\"original-author\"],\"type\":\"name\"},\"original-date\":{\"csl\":[\"original-date\"],\"type\":\"date\"},\"original-publisher\":{\"csl\":[\"original-publisher\"],\"type\":\"text\"},\"original-publisher-place\":{\"csl\":[\"original-publisher-place\"],\"type\":\"text\"},\"original-title\":{\"csl\":[\"original-title\"],\"type\":\"text\"},\"originalDate\":{\"type\":\"date\",\"zotero\":[\"originalDate\"]},\"page\":{\"csl\":[\"page\"],\"type\":\"text\",\"zotero\":[\"pages\"]},\"pages\":{\"csl\":[\"page\"],\"type\":\"text\",\"zotero\":[\"pages\"]},\"parent treaty\":{\"type\":\"text\",\"zotero\":[\"parentTreaty\"]},\"parentTreaty\":{\"type\":\"text\",\"zotero\":[\"parentTreaty\"]},\"patent number\":{\"csl\":[\"number\"],\"type\":\"text\",\"zotero\":[\"number\"]},\"patentNumber\":{\"type\":\"text\",\"zotero\":[\"number\"]},\"performer\":{\"csl\":[\"performer\"],\"type\":\"name\",\"zotero\":[\"performer\"]},\"place\":{\"csl\":[\"event-place\",\"publisher-place\"],\"type\":\"text\",\"zotero\":[\"place\"]},\"pmcid\":{\"csl\":[\"PMCID\"],\"type\":\"text\"},\"pmid\":{\"csl\":[\"PMID\"],\"type\":\"text\"},\"podcaster\":{\"csl\":[\"author\"],\"type\":\"name\",\"zotero\":[\"podcaster\"]},\"post type\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"postType\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"presentation type\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"presentationType\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"presenter\":{\"csl\":[\"author\"],\"type\":\"name\",\"zotero\":[\"presenter\"]},\"priority date\":{\"type\":\"date\",\"zotero\":[\"priorityDate\"]},\"priority numbers\":{\"type\":\"text\",\"zotero\":[\"priorityNumbers\"]},\"priorityDate\":{\"type\":\"date\",\"zotero\":[\"priorityDate\"]},\"priorityNumbers\":{\"type\":\"text\",\"zotero\":[\"priorityNumbers\"]},\"proceedings title\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"proceedingsTitle\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"producer\":{\"csl\":[\"producer\"],\"type\":\"name\",\"zotero\":[\"producer\"]},\"program title\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"programTitle\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"programmer\":{\"csl\":[\"author\"],\"type\":\"name\",\"zotero\":[\"programmer\"]},\"programming language\":{\"type\":\"text\",\"zotero\":[\"programmingLanguage\"]},\"programmingLanguage\":{\"type\":\"text\",\"zotero\":[\"programmingLanguage\"]},\"public law number\":{\"csl\":[\"number\"],\"type\":\"text\",\"zotero\":[\"number\"]},\"publicLawNumber\":{\"type\":\"text\",\"zotero\":[\"number\"]},\"publication date\":{\"csl\":[\"publication-date\"],\"type\":\"date\",\"zotero\":[\"publicationDate\"]},\"publication number\":{\"csl\":[\"publication-number\"],\"type\":\"text\",\"zotero\":[\"publicationNumber\"]},\"publication title\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"publication-date\":{\"csl\":[\"publication-date\"],\"type\":\"date\"},\"publication-number\":{\"csl\":[\"publication-number\"],\"type\":\"text\"},\"publicationDate\":{\"type\":\"date\",\"zotero\":[\"publicationDate\"]},\"publicationNumber\":{\"type\":\"text\",\"zotero\":[\"publicationNumber\"]},\"publicationTitle\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"publisher\":{\"csl\":[\"publisher\"],\"type\":\"text\",\"zotero\":[\"publisher\"]},\"publisher place\":{\"csl\":[\"publisher-place\"],\"type\":\"text\"},\"publisher-place\":{\"csl\":[\"publisher-place\"],\"type\":\"text\"},\"recipient\":{\"csl\":[\"recipient\"],\"type\":\"name\",\"zotero\":[\"recipient\"]},\"references\":{\"csl\":[\"references\"],\"type\":\"text\",\"zotero\":[\"references\"]},\"regnal year\":{\"type\":\"text\",\"zotero\":[\"regnalYear\"]},\"regnalYear\":{\"type\":\"text\",\"zotero\":[\"regnalYear\"]},\"regulation type\":{\"type\":\"text\",\"zotero\":[\"regulationType\",\"type\"]},\"regulationType\":{\"type\":\"text\",\"zotero\":[\"regulationType\",\"type\"]},\"regulatory body\":{\"type\":\"text\",\"zotero\":[\"regulatoryBody\",\"legislativeBody\"]},\"regulatoryBody\":{\"type\":\"text\",\"zotero\":[\"regulatoryBody\",\"legislativeBody\"]},\"reign\":{\"type\":\"text\",\"zotero\":[\"reign\"]},\"release\":{\"csl\":[\"edition\"],\"type\":\"text\",\"zotero\":[\"edition\"]},\"report number\":{\"csl\":[\"number\"],\"type\":\"text\",\"zotero\":[\"number\"]},\"report type\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"reportNumber\":{\"type\":\"text\",\"zotero\":[\"number\"]},\"reportType\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"reporter\":{\"type\":\"text\",\"zotero\":[\"reporter\",\"publicationTitle\"]},\"reporter volume\":{\"type\":\"text\",\"zotero\":[\"volume\"]},\"reporterVolume\":{\"type\":\"text\",\"zotero\":[\"volume\"]},\"resolution label\":{\"type\":\"text\",\"zotero\":[\"resolutionLabel\"]},\"resolutionLabel\":{\"type\":\"text\",\"zotero\":[\"resolutionLabel\"]},\"reviewed author\":{\"csl\":[\"reviewed-author\"],\"type\":\"name\",\"zotero\":[\"reviewedAuthor\"]},\"reviewed title\":{\"csl\":[\"reviewed-title\"],\"type\":\"text\"},\"reviewed-author\":{\"csl\":[\"reviewed-author\"],\"type\":\"name\"},\"reviewed-title\":{\"csl\":[\"reviewed-title\"],\"type\":\"text\"},\"reviewedAuthor\":{\"type\":\"name\",\"zotero\":[\"reviewedAuthor\"]},\"rights\":{\"csl\":[\"rights\"],\"type\":\"text\",\"zotero\":[\"rights\"]},\"running time\":{\"type\":\"text\",\"zotero\":[\"runningTime\"]},\"runningTime\":{\"type\":\"text\",\"zotero\":[\"runningTime\"]},\"scale\":{\"csl\":[\"scale\"],\"type\":\"text\",\"zotero\":[\"scale\"]},\"scriptwriter\":{\"csl\":[\"scriptwriter\"],\"type\":\"name\",\"zotero\":[\"scriptwriter\"]},\"section\":{\"csl\":[\"section\"],\"type\":\"text\",\"zotero\":[\"section\"]},\"series\":{\"type\":\"text\",\"zotero\":[\"series\"]},\"series editor\":{\"csl\":[\"collection-editor\"],\"type\":\"name\",\"zotero\":[\"seriesEditor\"]},\"series number\":{\"type\":\"text\",\"zotero\":[\"seriesNumber\"]},\"series text\":{\"type\":\"text\",\"zotero\":[\"seriesText\"]},\"series title\":{\"type\":\"text\",\"zotero\":[\"seriesTitle\"]},\"seriesEditor\":{\"type\":\"name\",\"zotero\":[\"seriesEditor\"]},\"seriesNumber\":{\"type\":\"text\",\"zotero\":[\"seriesNumber\"]},\"seriesText\":{\"type\":\"text\",\"zotero\":[\"seriesText\"]},\"seriesTitle\":{\"type\":\"text\",\"zotero\":[\"seriesTitle\"]},\"session\":{\"csl\":[\"chapter-number\"],\"type\":\"text\",\"zotero\":[\"session\"]},\"session type\":{\"type\":\"text\",\"zotero\":[\"sessionType\",\"type\"]},\"sessionType\":{\"type\":\"text\",\"zotero\":[\"sessionType\",\"type\"]},\"short title\":{\"csl\":[\"title-short\"],\"type\":\"text\",\"zotero\":[\"shortTitle\"]},\"shortTitle\":{\"type\":\"text\",\"zotero\":[\"shortTitle\"]},\"signing date\":{\"type\":\"date\",\"zotero\":[\"signingDate\"]},\"signingDate\":{\"type\":\"date\",\"zotero\":[\"signingDate\"]},\"source\":{\"csl\":[\"source\"],\"type\":\"text\",\"zotero\":[\"libraryCatalog\"]},\"sponsor\":{\"csl\":[\"author\"],\"type\":\"name\",\"zotero\":[\"sponsor\"]},\"status\":{\"csl\":[\"status\"],\"type\":\"text\",\"zotero\":[\"status\"]},\"studio\":{\"csl\":[\"publisher\"],\"type\":\"text\",\"zotero\":[\"publisher\"]},\"subject\":{\"csl\":[\"title\"],\"type\":\"text\",\"zotero\":[\"title\"]},\"submitted\":{\"csl\":[\"submitted\"],\"type\":\"date\",\"zotero\":[\"filingDate\"]},\"supplement\":{\"csl\":[\"supplement\"],\"type\":\"text\",\"zotero\":[\"supplementName\"]},\"supplement name\":{\"csl\":[\"supplement\"],\"type\":\"text\",\"zotero\":[\"supplementName\"]},\"supplementName\":{\"type\":\"text\",\"zotero\":[\"supplementName\"]},\"system\":{\"type\":\"text\",\"zotero\":[\"system\"]},\"testimony by\":{\"csl\":[\"testimonyBy\"],\"type\":\"name\",\"zotero\":[\"testimonyBy\"]},\"testimonyBy\":{\"csl\":[\"testimonyBy\"],\"type\":\"name\",\"zotero\":[\"testimonyBy\"]},\"thesis type\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"thesisType\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"title\":{\"csl\":[\"title\"],\"type\":\"text\",\"zotero\":[\"title\"]},\"title short\":{\"csl\":[\"title-short\"],\"type\":\"text\",\"zotero\":[\"shortTitle\"]},\"title-short\":{\"csl\":[\"title-short\"],\"type\":\"text\"},\"translator\":{\"csl\":[\"translator\"],\"type\":\"name\",\"zotero\":[\"translator\"]},\"treaty number\":{\"csl\":[\"number\"],\"type\":\"text\",\"zotero\":[\"number\"]},\"treatyNumber\":{\"type\":\"text\",\"zotero\":[\"number\"]},\"type\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"university\":{\"csl\":[\"publisher\"],\"type\":\"text\",\"zotero\":[\"publisher\"]},\"url\":{\"csl\":[\"URL\"],\"type\":\"text\",\"zotero\":[\"url\"]},\"version\":{\"csl\":[\"version\"],\"type\":\"text\",\"zotero\":[\"versionNumber\"]},\"version number\":{\"csl\":[\"version\"],\"type\":\"text\",\"zotero\":[\"versionNumber\"]},\"versionNumber\":{\"type\":\"text\",\"zotero\":[\"versionNumber\"]},\"video recording format\":{\"type\":\"text\",\"zotero\":[\"medium\"]},\"videoRecordingFormat\":{\"type\":\"text\",\"zotero\":[\"medium\"]},\"volume\":{\"csl\":[\"volume\"],\"type\":\"text\",\"zotero\":[\"volume\"]},\"volume title\":{\"csl\":[\"volume-title\"],\"type\":\"text\",\"zotero\":[\"volumeTitle\"]},\"volume-title\":{\"csl\":[\"volume-title\"],\"type\":\"text\"},\"volumeTitle\":{\"type\":\"text\",\"zotero\":[\"volumeTitle\"]},\"website title\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"website type\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"websiteTitle\":{\"type\":\"text\",\"zotero\":[\"publicationTitle\"]},\"websiteType\":{\"type\":\"text\",\"zotero\":[\"type\"]},\"words by\":{\"csl\":[\"wordsBy\"],\"type\":\"name\",\"zotero\":[\"wordsBy\"]},\"wordsBy\":{\"csl\":[\"wordsBy\"],\"type\":\"name\",\"zotero\":[\"wordsBy\"]},\"year as volume\":{\"type\":\"text\",\"zotero\":[\"yearAsVolume\"]},\"yearAsVolume\":{\"type\":\"text\",\"zotero\":[\"yearAsVolume\"]}}");

/***/ }),

/***/ "../gen/preferences/defaults.json":
/*!****************************************!*\
  !*** ../gen/preferences/defaults.json ***!
  \****************************************/
/*! default exports */
/*! export DOIandURL [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export ascii [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export asciiBibLaTeX [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export asciiBibTeX [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export autoAbbrev [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export autoAbbrevStyle [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export autoExport [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export autoExportDelay [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export autoExportIdleWait [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export autoExportPathReplaceDiacritics [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export autoExportPathReplaceDirSep [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export autoExportPathReplaceSpace [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export autoPinDelay [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export automaticTags [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export auxImport [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export biblatexExtendedDateFormat [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export biblatexExtendedNameFormat [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export biblatexExtractEprint [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export bibtexParticleNoOp [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export bibtexURL [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export cacheFlushInterval [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export citeCommand [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export citekeyFold [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export citekeyFormat [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export citeprocNoteCitekey [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export csquotes [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export debugLogDir [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export exportBibTeXStrings [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export exportBraceProtection [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export exportTitleCase [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export extraMergeCSL [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export extraMergeCitekeys [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export extraMergeTeX [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export git [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export ignorePostscriptErrors [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export import [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export importBibTeXStrings [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export importCaseProtection [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export importCitationKey [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export importExtra [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export importJabRefAbbreviations [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export importJabRefStrings [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export importSentenceCase [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export itemObserverDelay [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export jabrefFormat [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export keyConflictPolicy [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export keyScope [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export kuroshiro [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export mapMath [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export mapText [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export mapUnicode [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export newTranslatorsAskRestart [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export parseParticles [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export platform [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export postscript [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export postscriptOverride [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export qualityReport [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export quickCopyMode [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export quickCopyPandocBrackets [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export rawImports [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export rawLaTag [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export relativeFilePaths [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export retainCache [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export scrubDatabase [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export skipFields [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export skipWords [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export strings [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export testing [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export verbatimFields [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export warnBulkModify [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export warnTitleCased [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export workers [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = JSON.parse("{\"DOIandURL\":\"both\",\"automaticTags\":true,\"asciiBibLaTeX\":false,\"ascii\":\"\",\"asciiBibTeX\":true,\"autoExport\":\"immediate\",\"quickCopyMode\":\"latex\",\"citeCommand\":\"cite\",\"quickCopyPandocBrackets\":false,\"citekeyFormat\":\"​[auth:lower][shorttitle3_3][year]\",\"citekeyFold\":true,\"keyConflictPolicy\":\"keep\",\"auxImport\":false,\"keyScope\":\"library\",\"exportBibTeXStrings\":\"off\",\"importBibTeXStrings\":true,\"bibtexParticleNoOp\":false,\"skipFields\":\"\",\"bibtexURL\":\"off\",\"warnBulkModify\":10,\"postscript\":\"\",\"strings\":\"\",\"autoAbbrev\":false,\"autoAbbrevStyle\":\"\",\"autoExportIdleWait\":10,\"cacheFlushInterval\":5,\"csquotes\":\"\",\"rawLaTag\":\"#LaTeX\",\"rawImports\":false,\"skipWords\":\"a,ab,aboard,about,above,across,after,against,al,along,amid,among,an,and,anti,around,as,at,before,behind,below,beneath,beside,besides,between,beyond,but,by,d,da,das,de,del,dell,dello,dei,degli,della,dell,delle,dem,den,der,des,despite,die,do,down,du,during,ein,eine,einem,einen,einer,eines,el,en,et,except,for,from,gli,i,il,in,inside,into,is,l,la,las,le,les,like,lo,los,near,nor,of,off,on,onto,or,over,past,per,plus,round,save,since,so,some,sur,than,the,through,to,toward,towards,un,una,unas,under,underneath,une,unlike,uno,unos,until,up,upon,versus,via,von,while,with,within,without,yet,zu,zum\",\"verbatimFields\":\"url,doi,file,eprint,verba,verbb,verbc,groups\",\"jabrefFormat\":0,\"qualityReport\":false,\"biblatexExtendedDateFormat\":true,\"biblatexExtractEprint\":true,\"biblatexExtendedNameFormat\":false,\"exportTitleCase\":true,\"exportBraceProtection\":true,\"retainCache\":false,\"importSentenceCase\":\"on+guess\",\"importCaseProtection\":\"as-needed\",\"autoExportDelay\":1,\"warnTitleCased\":false,\"itemObserverDelay\":5,\"autoPinDelay\":0,\"parseParticles\":true,\"citeprocNoteCitekey\":false,\"import\":true,\"importExtra\":true,\"importCitationKey\":true,\"extraMergeTeX\":true,\"extraMergeCSL\":true,\"extraMergeCitekeys\":true,\"importJabRefStrings\":true,\"importJabRefAbbreviations\":true,\"autoExportPathReplaceDirSep\":\"-\",\"autoExportPathReplaceSpace\":\" \",\"autoExportPathReplaceDiacritics\":false,\"postscriptOverride\":\"\",\"scrubDatabase\":false,\"ignorePostscriptErrors\":true,\"debugLogDir\":\"\",\"testing\":false,\"kuroshiro\":false,\"relativeFilePaths\":false,\"git\":\"config\",\"mapUnicode\":\"conservative\",\"mapText\":\"\",\"mapMath\":\"\",\"newTranslatorsAskRestart\":true,\"workers\":1,\"platform\":\"\"}");

/***/ }),

/***/ "../node_modules/safe-stable-stringify/index.js":
/*!******************************************************!*\
  !*** ../node_modules/safe-stable-stringify/index.js ***!
  \******************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 5:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const stringify = __webpack_require__(/*! ./stable */ "../node_modules/safe-stable-stringify/stable.js")

module.exports = stringify
stringify.default = stringify


/***/ }),

/***/ "../node_modules/safe-stable-stringify/stable.js":
/*!*******************************************************!*\
  !*** ../node_modules/safe-stable-stringify/stable.js ***!
  \*******************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 3:0-14 */
/***/ ((module) => {



module.exports = stringify

var indentation = ''
// eslint-disable-next-line
const strEscapeSequencesRegExp = /[\x00-\x1f\x22\x5c]/
// eslint-disable-next-line
const strEscapeSequencesReplacer = /[\x00-\x1f\x22\x5c]/g

// Escaped special characters. Use empty strings to fill up unused entries.
const meta = [
  '\\u0000', '\\u0001', '\\u0002', '\\u0003', '\\u0004',
  '\\u0005', '\\u0006', '\\u0007', '\\b', '\\t',
  '\\n', '\\u000b', '\\f', '\\r', '\\u000e',
  '\\u000f', '\\u0010', '\\u0011', '\\u0012', '\\u0013',
  '\\u0014', '\\u0015', '\\u0016', '\\u0017', '\\u0018',
  '\\u0019', '\\u001a', '\\u001b', '\\u001c', '\\u001d',
  '\\u001e', '\\u001f', '', '', '\\"',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '\\\\'
]

function escapeFn (str) {
  return meta[str.charCodeAt(0)]
}

// Escape control characters, double quotes and the backslash.
// Note: it is faster to run this only once for a big string instead of only for
// the parts that it is necessary for. But this is only true if we do not add
// extra indentation to the string before.
function strEscape (str) {
  // Some magic numbers that worked out fine while benchmarking with v8 6.0
  if (str.length < 5000 && !strEscapeSequencesRegExp.test(str)) {
    return str
  }
  if (str.length > 100) {
    return str.replace(strEscapeSequencesReplacer, escapeFn)
  }
  var result = ''
  var last = 0
  for (var i = 0; i < str.length; i++) {
    const point = str.charCodeAt(i)
    if (point === 34 || point === 92 || point < 32) {
      if (last === i) {
        result += meta[point]
      } else {
        result += `${str.slice(last, i)}${meta[point]}`
      }
      last = i + 1
    }
  }
  if (last === 0) {
    result = str
  } else if (last !== i) {
    result += str.slice(last)
  }
  return result
}

// Full version: supports all options
function stringifyFullFn (key, parent, stack, replacer, indent) {
  var i, res, join
  const originalIndentation = indentation
  var value = parent[key]

  if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
    value = value.toJSON(key)
  }
  value = replacer.call(parent, key, value)

  switch (typeof value) {
    case 'object':
      if (value === null) {
        return 'null'
      }
      for (i = 0; i < stack.length; i++) {
        if (stack[i] === value) {
          return '"[Circular]"'
        }
      }
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return '[]'
        }
        stack.push(value)
        res = '['
        indentation += indent
        res += `\n${indentation}`
        join = `,\n${indentation}`
        // Use null as placeholder for non-JSON values.
        for (i = 0; i < value.length - 1; i++) {
          const tmp = stringifyFullFn(i, value, stack, replacer, indent)
          res += tmp !== undefined ? tmp : 'null'
          res += join
        }
        const tmp = stringifyFullFn(i, value, stack, replacer, indent)
        res += tmp !== undefined ? tmp : 'null'
        if (indentation !== '') {
          res += `\n${originalIndentation}`
        }
        res += ']'
        stack.pop()
        indentation = originalIndentation
        return res
      }

      var keys = insertSort(Object.keys(value))
      if (keys.length === 0) {
        return '{}'
      }
      stack.push(value)
      res = '{'
      indentation += indent
      res += `\n${indentation}`
      join = `,\n${indentation}`
      var separator = ''
      for (i = 0; i < keys.length; i++) {
        key = keys[i]
        const tmp = stringifyFullFn(key, value, stack, replacer, indent)
        if (tmp !== undefined) {
          res += `${separator}"${strEscape(key)}": ${tmp}`
          separator = join
        }
      }
      if (separator !== '') {
        res += `\n${originalIndentation}`
      } else {
        res = '{'
      }
      res += '}'
      stack.pop()
      indentation = originalIndentation
      return res
    case 'string':
      return `"${strEscape(value)}"`
    case 'number':
      // JSON numbers must be finite. Encode non-finite numbers as null.
      return isFinite(value) ? String(value) : 'null'
    case 'boolean':
      return value === true ? 'true' : 'false'
  }
}

function stringifyFullArr (key, value, stack, replacer, indent) {
  var i, res, join
  const originalIndentation = indentation

  if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
    value = value.toJSON(key)
  }

  switch (typeof value) {
    case 'object':
      if (value === null) {
        return 'null'
      }
      for (i = 0; i < stack.length; i++) {
        if (stack[i] === value) {
          return '"[Circular]"'
        }
      }
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return '[]'
        }
        stack.push(value)
        res = '['
        indentation += indent
        res += `\n${indentation}`
        join = `,\n${indentation}`
        // Use null as placeholder for non-JSON values.
        for (i = 0; i < value.length - 1; i++) {
          const tmp = stringifyFullArr(i, value[i], stack, replacer, indent)
          res += tmp !== undefined ? tmp : 'null'
          res += join
        }
        const tmp = stringifyFullArr(i, value[i], stack, replacer, indent)
        res += tmp !== undefined ? tmp : 'null'
        if (indentation !== '') {
          res += `\n${originalIndentation}`
        }
        res += ']'
        stack.pop()
        indentation = originalIndentation
        return res
      }

      if (replacer.length === 0) {
        return '{}'
      }
      stack.push(value)
      res = '{'
      indentation += indent
      res += `\n${indentation}`
      join = `,\n${indentation}`
      var separator = ''
      for (i = 0; i < replacer.length; i++) {
        if (typeof replacer[i] === 'string' || typeof replacer[i] === 'number') {
          key = replacer[i]
          const tmp = stringifyFullArr(key, value[key], stack, replacer, indent)
          if (tmp !== undefined) {
            res += `${separator}"${strEscape(key)}": ${tmp}`
            separator = join
          }
        }
      }
      if (separator !== '') {
        res += `\n${originalIndentation}`
      } else {
        res = '{'
      }
      res += '}'
      stack.pop()
      indentation = originalIndentation
      return res
    case 'string':
      return `"${strEscape(value)}"`
    case 'number':
      // JSON numbers must be finite. Encode non-finite numbers as null.
      return isFinite(value) ? String(value) : 'null'
    case 'boolean':
      return value === true ? 'true' : 'false'
  }
}

// Supports only the spacer option
function stringifyIndent (key, value, stack, indent) {
  var i, res, join
  const originalIndentation = indentation

  switch (typeof value) {
    case 'object':
      if (value === null) {
        return 'null'
      }
      if (typeof value.toJSON === 'function') {
        value = value.toJSON(key)
        // Prevent calling `toJSON` again.
        if (typeof value !== 'object') {
          return stringifyIndent(key, value, stack, indent)
        }
        if (value === null) {
          return 'null'
        }
      }
      for (i = 0; i < stack.length; i++) {
        if (stack[i] === value) {
          return '"[Circular]"'
        }
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return '[]'
        }
        stack.push(value)
        res = '['
        indentation += indent
        res += `\n${indentation}`
        join = `,\n${indentation}`
        // Use null as placeholder for non-JSON values.
        for (i = 0; i < value.length - 1; i++) {
          const tmp = stringifyIndent(i, value[i], stack, indent)
          res += tmp !== undefined ? tmp : 'null'
          res += join
        }
        const tmp = stringifyIndent(i, value[i], stack, indent)
        res += tmp !== undefined ? tmp : 'null'
        if (indentation !== '') {
          res += `\n${originalIndentation}`
        }
        res += ']'
        stack.pop()
        indentation = originalIndentation
        return res
      }

      var keys = insertSort(Object.keys(value))
      if (keys.length === 0) {
        return '{}'
      }
      stack.push(value)
      res = '{'
      indentation += indent
      res += `\n${indentation}`
      join = `,\n${indentation}`
      var separator = ''
      for (i = 0; i < keys.length; i++) {
        key = keys[i]
        const tmp = stringifyIndent(key, value[key], stack, indent)
        if (tmp !== undefined) {
          res += `${separator}"${strEscape(key)}": ${tmp}`
          separator = join
        }
      }
      if (separator !== '') {
        res += `\n${originalIndentation}`
      } else {
        res = '{'
      }
      res += '}'
      stack.pop()
      indentation = originalIndentation
      return res
    case 'string':
      return `"${strEscape(value)}"`
    case 'number':
      // JSON numbers must be finite. Encode non-finite numbers as null.
      return isFinite(value) ? String(value) : 'null'
    case 'boolean':
      return value === true ? 'true' : 'false'
  }
}

// Supports only the replacer option
function stringifyReplacerArr (key, value, stack, replacer) {
  var i, res
  // If the value has a toJSON method, call it to obtain a replacement value.
  if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
    value = value.toJSON(key)
  }

  switch (typeof value) {
    case 'object':
      if (value === null) {
        return 'null'
      }
      for (i = 0; i < stack.length; i++) {
        if (stack[i] === value) {
          return '"[Circular]"'
        }
      }
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return '[]'
        }
        stack.push(value)
        res = '['
        // Use null as placeholder for non-JSON values.
        for (i = 0; i < value.length - 1; i++) {
          const tmp = stringifyReplacerArr(i, value[i], stack, replacer)
          res += tmp !== undefined ? tmp : 'null'
          res += ','
        }
        const tmp = stringifyReplacerArr(i, value[i], stack, replacer)
        res += tmp !== undefined ? tmp : 'null'
        res += ']'
        stack.pop()
        return res
      }

      if (replacer.length === 0) {
        return '{}'
      }
      stack.push(value)
      res = '{'
      var separator = ''
      for (i = 0; i < replacer.length; i++) {
        if (typeof replacer[i] === 'string' || typeof replacer[i] === 'number') {
          key = replacer[i]
          const tmp = stringifyReplacerArr(key, value[key], stack, replacer)
          if (tmp !== undefined) {
            res += `${separator}"${strEscape(key)}":${tmp}`
            separator = ','
          }
        }
      }
      res += '}'
      stack.pop()
      return res
    case 'string':
      return `"${strEscape(value)}"`
    case 'number':
      // JSON numbers must be finite. Encode non-finite numbers as null.
      return isFinite(value) ? String(value) : 'null'
    case 'boolean':
      return value === true ? 'true' : 'false'
  }
}

function stringifyReplacerFn (key, parent, stack, replacer) {
  var i, res
  var value = parent[key]
  // If the value has a toJSON method, call it to obtain a replacement value.
  if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
    value = value.toJSON(key)
  }
  value = replacer.call(parent, key, value)

  switch (typeof value) {
    case 'object':
      if (value === null) {
        return 'null'
      }
      for (i = 0; i < stack.length; i++) {
        if (stack[i] === value) {
          return '"[Circular]"'
        }
      }
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return '[]'
        }
        stack.push(value)
        res = '['
        // Use null as placeholder for non-JSON values.
        for (i = 0; i < value.length - 1; i++) {
          const tmp = stringifyReplacerFn(i, value, stack, replacer)
          res += tmp !== undefined ? tmp : 'null'
          res += ','
        }
        const tmp = stringifyReplacerFn(i, value, stack, replacer)
        res += tmp !== undefined ? tmp : 'null'
        res += ']'
        stack.pop()
        return res
      }

      var keys = insertSort(Object.keys(value))
      if (keys.length === 0) {
        return '{}'
      }
      stack.push(value)
      res = '{'
      var separator = ''
      for (i = 0; i < keys.length; i++) {
        key = keys[i]
        const tmp = stringifyReplacerFn(key, value, stack, replacer)
        if (tmp !== undefined) {
          res += `${separator}"${strEscape(key)}":${tmp}`
          separator = ','
        }
      }
      res += '}'
      stack.pop()
      return res
    case 'string':
      return `"${strEscape(value)}"`
    case 'number':
      // JSON numbers must be finite. Encode non-finite numbers as null.
      return isFinite(value) ? String(value) : 'null'
    case 'boolean':
      return value === true ? 'true' : 'false'
  }
}

// Simple without any options
function stringifySimple (key, value, stack) {
  var i, res
  switch (typeof value) {
    case 'object':
      if (value === null) {
        return 'null'
      }
      if (typeof value.toJSON === 'function') {
        value = value.toJSON(key)
        // Prevent calling `toJSON` again
        if (typeof value !== 'object') {
          return stringifySimple(key, value, stack)
        }
        if (value === null) {
          return 'null'
        }
      }
      for (i = 0; i < stack.length; i++) {
        if (stack[i] === value) {
          return '"[Circular]"'
        }
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return '[]'
        }
        stack.push(value)
        res = '['
        // Use null as placeholder for non-JSON values.
        for (i = 0; i < value.length - 1; i++) {
          const tmp = stringifySimple(i, value[i], stack)
          res += tmp !== undefined ? tmp : 'null'
          res += ','
        }
        const tmp = stringifySimple(i, value[i], stack)
        res += tmp !== undefined ? tmp : 'null'
        res += ']'
        stack.pop()
        return res
      }

      var keys = insertSort(Object.keys(value))
      if (keys.length === 0) {
        return '{}'
      }
      stack.push(value)
      var separator = ''
      res = '{'
      for (i = 0; i < keys.length; i++) {
        key = keys[i]
        const tmp = stringifySimple(key, value[key], stack)
        if (tmp !== undefined) {
          res += `${separator}"${strEscape(key)}":${tmp}`
          separator = ','
        }
      }
      res += '}'
      stack.pop()
      return res
    case 'string':
      return `"${strEscape(value)}"`
    case 'number':
      // JSON numbers must be finite. Encode non-finite numbers as null.
      // Convert the numbers implicit to a string instead of explicit.
      return isFinite(value) ? String(value) : 'null'
    case 'boolean':
      return value === true ? 'true' : 'false'
  }
}

function insertSort (arr) {
  for (var i = 1; i < arr.length; i++) {
    const tmp = arr[i]
    var j = i
    while (j !== 0 && arr[j - 1] > tmp) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = tmp
  }

  return arr
}

function stringify (value, replacer, spacer) {
  var i
  var indent = ''
  indentation = ''

  if (arguments.length > 1) {
    // If the spacer parameter is a number, make an indent string containing that
    // many spaces.
    if (typeof spacer === 'number') {
      for (i = 0; i < spacer; i += 1) {
        indent += ' '
      }
    // If the spacer parameter is a string, it will be used as the indent string.
    } else if (typeof spacer === 'string') {
      indent = spacer
    }
    if (indent !== '') {
      if (replacer !== undefined && replacer !== null) {
        if (typeof replacer === 'function') {
          return stringifyFullFn('', { '': value }, [], replacer, indent)
        }
        if (Array.isArray(replacer)) {
          return stringifyFullArr('', value, [], replacer, indent)
        }
      }
      return stringifyIndent('', value, [], indent)
    }
    if (typeof replacer === 'function') {
      return stringifyReplacerFn('', { '': value }, [], replacer)
    }
    if (Array.isArray(replacer)) {
      return stringifyReplacerArr('', value, [], replacer)
    }
  }
  return stringifySimple('', value, [])
}


/***/ }),

/***/ "../content/client.ts":
/*!****************************!*\
  !*** ../content/client.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export client [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.client = void 0;
// we may be running in a translator, which will have it pre-loaded
if (typeof Components !== 'undefined')
    Components.utils.import('resource://zotero/config.js');
exports.client = ZOTERO_CONFIG.GUID.replace(/@.*/, '').replace('-', '');


/***/ }),

/***/ "../content/extra.ts":
/*!***************************!*\
  !*** ../content/extra.ts ***!
  \***************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export cslCreator [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export get [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export set [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export zoteroCreator [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.set = exports.get = exports.zoteroCreator = exports.cslCreator = void 0;
const mapping = __webpack_require__(/*! ../gen/items/extra-fields.json */ "../gen/items/extra-fields.json");
const CSL = __webpack_require__(/*! ../gen/citeproc */ "../gen/citeproc.js");
function cslCreator(value) {
    const creator = value.split(/\s*\|\|\s*/);
    if (creator.length === 2) { // tslint:disable-line:no-magic-numbers
        const _creator = { family: creator[0] || '', given: creator[1] || '' };
        CSL.parseParticles(_creator);
        return _creator;
    }
    else {
        // return { literal: value, isInstitution: 1 }
        return { literal: value };
    }
}
exports.cslCreator = cslCreator;
function zoteroCreator(value) {
    const creator = value.split(/\s*\|\|\s*/);
    if (creator.length === 2) { // tslint:disable-line:no-magic-numbers
        return { lastName: creator[0] || '', firstName: creator[1] || '' };
    }
    else {
        return { name: value };
    }
}
exports.zoteroCreator = zoteroCreator;
const re = {
    // fetch fields as per https://forums.zotero.org/discussion/3673/2/original-date-of-publication/. Spurious 'tex.' so I can do a single match
    old: /^{:((?:bib(?:la)?)?tex\.)?([^:]+)(:)\s*([^}]+)}$/,
    new: /^((?:bib(?:la)?)?tex\.)?([^:=]+)\s*([:=])\s*([\S\s]*)/,
};
const otherFields = ['lccn', 'mr', 'zbl', 'arxiv', 'jstor', 'hdl', 'googlebooksid'];
const casing = {
    arxiv: 'arXiv',
};
function get(extra, mode, options) {
    if (!options)
        options = { citationKey: true, aliases: true, kv: true, tex: true };
    const other = { zotero: 'csl', csl: 'zotero' }[mode];
    extra = extra || '';
    const extraFields = {
        kv: {},
        creator: {},
        tex: {},
        citationKey: '',
        aliases: [],
    };
    let ef;
    extra = extra.split('\n').filter(line => {
        const m = line.match(re.old) || line.match(re.new);
        if (!m)
            return true;
        let [, tex, key, assign, value] = m;
        const raw = (assign === '=');
        if (!tex && raw)
            return true;
        if (tex) {
            key = key.trim().toLowerCase();
        }
        else {
            key = key.trim().replace(/[-_]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
        }
        value = value.trim();
        if (options.citationKey && !tex && options.citationKey && ['citation key', 'bibtex'].includes(key)) {
            extraFields.citationKey = value;
            return false;
        }
        if (options.aliases && !tex && options.aliases && key === 'citation key alias') {
            extraFields.aliases = value.split(/s*,\s*/).filter(alias => alias);
            return false;
        }
        if (options.aliases && tex && !raw && options.aliases && key === 'ids') {
            extraFields.aliases = value.split(/s*,\s*/).filter(alias => alias);
            return false;
        }
        if (options.kv && (ef = mapping[key]) && !tex) {
            for (const field of (ef[mode] || ef[other])) {
                switch (ef.type) {
                    case 'name':
                        extraFields.creator[field] = extraFields.creator[key] || [];
                        extraFields.creator[field].push(value);
                        break;
                    case 'text':
                    case 'date':
                        extraFields.kv[field] = value;
                        break;
                    default:
                        throw new Error(`Unexpected extra field type ${ef.type}`);
                }
            }
            return false;
        }
        if (options.tex && tex && !key.includes(' ')) {
            extraFields.tex[key] = { value, raw };
            if (tex === 'bibtex' || tex === 'biblatex')
                extraFields.tex[key].type = tex;
            return false;
        }
        if (options.tex && !tex && otherFields.includes(key.replace(/[- ]/g, ''))) {
            extraFields.tex[key.replace(/[- ]/g, '')] = { value };
            return false;
        }
        return true;
    }).join('\n').trim();
    return { extra, extraFields };
}
exports.get = get;
function set(extra, options = {}) {
    const parsed = get(extra, 'zotero', options);
    if (options.citationKey)
        parsed.extra += `\nCitation Key: ${options.citationKey}`;
    if (options.aliases && options.aliases.length) {
        const aliases = Array.from(new Set(options.aliases)).sort().join(', ');
        parsed.extra += `\ntex.ids: ${aliases}`;
    }
    if (options.tex) {
        for (const name of Object.keys(options.tex).sort()) {
            const value = options.tex[name];
            const prefix = otherFields.includes(name) ? '' : 'tex.';
            parsed.extra += `\n${prefix}${casing[name] || name}${value.raw ? '=' : ':'} ${value.value}`;
        }
    }
    if (options.kv) {
        for (const name of Object.keys(options.kv).sort()) {
            const value = options.kv[name];
            if (Array.isArray(value)) { // creators
                parsed.extra += value.map(creator => `\n${name}: ${value}`).join(''); // do not sort!!
            }
            else {
                parsed.extra += `\n${name}: ${value}`;
            }
        }
    }
    return parsed.extra.trim();
}
exports.set = set;


/***/ }),

/***/ "../content/logger.ts":
/*!****************************!*\
  !*** ../content/logger.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export log [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.log = void 0;
const stringify_1 = __webpack_require__(/*! ./stringify */ "../content/stringify.ts");
const worker_1 = __webpack_require__(/*! ./worker */ "../content/worker.ts");
class Logger {
    format(error, msg) {
        let diff = null;
        const now = Date.now();
        if (this.timestamp)
            diff = now - this.timestamp;
        this.timestamp = now;
        if (typeof msg !== 'string') {
            let _msg = '';
            for (const m of msg) {
                const type = typeof m;
                if (type === 'string' || m instanceof String || type === 'number' || type === 'undefined' || type === 'boolean' || m === null) {
                    _msg += m;
                }
                else if (m instanceof Error) {
                    _msg += `<Error: ${m.message || m.name}${m.stack ? `\n${m.stack}` : Object.keys(m).join(', ')}>`;
                }
                else if (m && type === 'object' && m.message) { // mozilla exception, no idea on the actual instance type
                    // message,fileName,lineNumber,column,stack,errorCode
                    _msg += `<Error: ${m.message}#\n${m.stack}>`;
                }
                else {
                    _msg += stringify_1.stringify(m);
                }
                _msg += ' ';
            }
            msg = _msg;
        }
        const translator = typeof Translator !== 'undefined' && Translator.header.label;
        const prefix = ['better-bibtex', translator, error, worker_1.worker ? '(worker)' : ''].filter(p => p).join(' ');
        return `{${prefix}} +${diff} ${stringify_1.asciify(msg)}`;
    }
    debug(...msg) {
        // cannot user Zotero.Debug.enabled because it is not available in foreground exporters
        if (!Zotero.BetterBibTeX || Zotero.BetterBibTeX.debugEnabled())
            Zotero.debug(this.format('', msg));
    }
    error(...msg) {
        Zotero.debug(this.format('error', msg));
    }
}
exports.log = new Logger;


/***/ }),

/***/ "../content/stringify.ts":
/*!*******************************!*\
  !*** ../content/stringify.ts ***!
  \*******************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export asciify [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export stringify [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringify = exports.asciify = void 0;
// import _stringify from 'fast-safe-stringify'
const safe_stable_stringify_1 = __webpack_require__(/*! safe-stable-stringify */ "../node_modules/safe-stable-stringify/index.js");
function asciify(str) {
    return str.replace(/[\u007F-\uFFFF]/g, chr => '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).substr(-4)); // tslint:disable-line:no-magic-numbers
}
exports.asciify = asciify;
function stringify(obj, replacer, indent, ucode) {
    const stringified = safe_stable_stringify_1.default(obj, replacer, indent);
    return ucode ? asciify(stringified) : stringified;
}
exports.stringify = stringify;


/***/ }),

/***/ "../content/worker.ts":
/*!****************************!*\
  !*** ../content/worker.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export worker [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.worker = void 0;
exports.worker = (typeof importScripts !== 'undefined');


/***/ }),

/***/ "../gen/items/items.ts":
/*!*****************************!*\
  !*** ../gen/items/items.ts ***!
  \*****************************/
/*! flagged exports */
/*! export __esModule [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export label [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export name [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export simplifyForExport [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export simplifyForImport [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export valid [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.simplifyForImport = exports.simplifyForExport = exports.label = exports.name = exports.valid = void 0;
const client_1 = __webpack_require__(/*! ../../content/client */ "../content/client.ts");
const jurism = client_1.client === 'jurism';
const zotero = !jurism;
exports.valid = {
    type: {
        artwork: true,
        attachment: true,
        audioRecording: true,
        bill: true,
        blogPost: true,
        book: true,
        bookSection: true,
        case: true,
        classic: jurism,
        computerProgram: true,
        conferencePaper: true,
        dictionaryEntry: true,
        document: true,
        email: true,
        encyclopediaArticle: true,
        film: true,
        forumPost: true,
        gazette: jurism,
        hearing: true,
        instantMessage: true,
        interview: true,
        journalArticle: true,
        legalCommentary: jurism,
        letter: true,
        magazineArticle: true,
        manuscript: true,
        map: true,
        newspaperArticle: true,
        note: true,
        patent: true,
        podcast: true,
        presentation: true,
        radioBroadcast: true,
        regulation: jurism,
        report: true,
        standard: jurism,
        statute: true,
        thesis: true,
        treaty: jurism,
        tvBroadcast: true,
        videoRecording: true,
        webpage: true,
    },
    field: {
        artwork: {
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            artworkMedium: true,
            artworkSize: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            medium: true,
            multi: true,
            notes: true,
            publicationTitle: jurism,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
            websiteTitle: jurism,
        },
        attachment: {
            accessDate: true,
            dateAdded: true,
            dateModified: true,
            id: true,
            itemID: true,
            itemType: true,
            tags: true,
            title: true,
            url: true,
        },
        audioRecording: {
            ISBN: true,
            abstractNote: true,
            accessDate: true,
            album: jurism,
            archive: true,
            archiveLocation: true,
            attachments: true,
            audioRecordingFormat: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            edition: jurism,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            label: true,
            language: true,
            libraryCatalog: true,
            medium: true,
            multi: true,
            notes: true,
            numberOfVolumes: true,
            opus: jurism,
            originalDate: jurism,
            place: true,
            publicationTitle: jurism,
            publisher: true,
            release: jurism,
            rights: true,
            runningTime: true,
            seeAlso: true,
            seriesTitle: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
            volume: true,
        },
        bill: {
            abstractNote: true,
            accessDate: true,
            archiveLocation: jurism,
            assemblyNumber: jurism,
            attachments: true,
            billNumber: true,
            code: true,
            codePages: true,
            codeVolume: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            history: true,
            id: true,
            itemID: true,
            itemType: true,
            jurisdiction: jurism,
            language: true,
            legislativeBody: true,
            multi: true,
            notes: true,
            number: true,
            pages: true,
            publicationTitle: jurism,
            reporter: jurism,
            resolutionLabel: jurism,
            rights: true,
            section: true,
            seeAlso: true,
            seriesNumber: jurism,
            session: true,
            sessionType: jurism,
            shortTitle: true,
            tags: true,
            title: true,
            type: jurism,
            url: true,
            volume: true,
        },
        blogPost: {
            abstractNote: true,
            accessDate: true,
            attachments: true,
            blogTitle: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            multi: true,
            notes: true,
            publicationTitle: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            type: true,
            url: true,
            websiteType: true,
        },
        book: {
            ISBN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            edition: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            medium: jurism,
            multi: true,
            notes: true,
            numPages: true,
            numberOfVolumes: true,
            place: true,
            publisher: true,
            rights: true,
            seeAlso: true,
            series: true,
            seriesNumber: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
            volume: true,
            volumeTitle: jurism,
        },
        bookSection: {
            ISBN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            bookTitle: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            edition: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            multi: true,
            notes: true,
            numberOfVolumes: true,
            pages: true,
            place: true,
            publicationTitle: true,
            publisher: true,
            rights: true,
            seeAlso: true,
            series: true,
            seriesNumber: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
            volume: true,
            volumeTitle: jurism,
        },
        case: {
            abstractNote: true,
            accessDate: true,
            adminFlag: jurism,
            archive: jurism,
            archiveLocation: jurism,
            attachments: true,
            callNumber: jurism,
            caseName: true,
            court: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateDecided: true,
            dateModified: true,
            division: jurism,
            docketNumber: true,
            documentName: jurism,
            extra: true,
            filingDate: jurism,
            firstPage: true,
            history: true,
            id: true,
            issue: jurism,
            itemID: true,
            itemType: true,
            jurisdiction: jurism,
            language: true,
            multi: true,
            notes: true,
            number: true,
            pages: true,
            place: jurism,
            publicationDate: jurism,
            publicationTitle: jurism,
            publisher: jurism,
            reign: jurism,
            reporter: true,
            reporterVolume: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            supplementName: jurism,
            tags: true,
            title: true,
            url: true,
            volume: true,
            yearAsVolume: jurism,
        },
        classic: {
            abstractNote: jurism,
            accessDate: jurism,
            archive: jurism,
            archiveLocation: jurism,
            attachments: true,
            callNumber: jurism,
            creators: true,
            date: jurism,
            dateAdded: true,
            dateModified: true,
            extra: jurism,
            id: true,
            itemID: true,
            itemType: true,
            language: jurism,
            libraryCatalog: jurism,
            manuscriptType: jurism,
            multi: true,
            notes: true,
            numPages: jurism,
            place: jurism,
            rights: jurism,
            seeAlso: true,
            shortTitle: jurism,
            tags: true,
            title: jurism,
            type: jurism,
            url: jurism,
            volume: jurism,
        },
        computerProgram: {
            ISBN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            company: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            libraryCatalog: true,
            multi: true,
            notes: true,
            place: true,
            programmingLanguage: true,
            publisher: true,
            rights: true,
            seeAlso: true,
            seriesTitle: true,
            shortTitle: true,
            system: true,
            tags: true,
            title: true,
            url: true,
            versionNumber: true,
        },
        conferencePaper: {
            DOI: true,
            ISBN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            conferenceDate: jurism,
            conferenceName: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            institution: jurism,
            issue: jurism,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            multi: true,
            notes: true,
            pages: true,
            place: true,
            proceedingsTitle: true,
            publicationTitle: true,
            publisher: true,
            rights: true,
            seeAlso: true,
            series: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
            volume: true,
        },
        dictionaryEntry: {
            ISBN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            dictionaryTitle: true,
            edition: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            multi: true,
            notes: true,
            numberOfVolumes: true,
            pages: true,
            place: true,
            publicationTitle: true,
            publisher: true,
            rights: true,
            seeAlso: true,
            series: true,
            seriesNumber: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
            volume: true,
        },
        document: {
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            multi: true,
            notes: true,
            publisher: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
            versionNumber: jurism,
        },
        email: {
            abstractNote: true,
            accessDate: true,
            attachments: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            multi: true,
            notes: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            subject: true,
            tags: true,
            title: true,
            url: true,
        },
        encyclopediaArticle: {
            ISBN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            edition: true,
            encyclopediaTitle: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            multi: true,
            notes: true,
            numberOfVolumes: true,
            pages: true,
            place: true,
            publicationTitle: true,
            publisher: true,
            rights: true,
            seeAlso: true,
            series: true,
            seriesNumber: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
            volume: true,
        },
        film: {
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            distributor: true,
            extra: true,
            genre: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            medium: true,
            multi: true,
            notes: true,
            publisher: true,
            rights: true,
            runningTime: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            type: true,
            url: true,
            videoRecordingFormat: true,
        },
        forumPost: {
            abstractNote: true,
            accessDate: true,
            attachments: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            forumTitle: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            multi: true,
            notes: true,
            postType: true,
            publicationTitle: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            type: true,
            url: true,
        },
        gazette: {
            abstractNote: jurism,
            accessDate: jurism,
            attachments: true,
            code: jurism,
            codeNumber: jurism,
            creators: true,
            date: jurism,
            dateAdded: true,
            dateEnacted: jurism,
            dateModified: true,
            extra: jurism,
            history: jurism,
            id: true,
            itemID: true,
            itemType: true,
            jurisdiction: jurism,
            language: jurism,
            multi: true,
            nameOfAct: jurism,
            notes: true,
            number: jurism,
            pages: jurism,
            publicLawNumber: jurism,
            publicationDate: jurism,
            publisher: jurism,
            regnalYear: jurism,
            reign: jurism,
            rights: jurism,
            section: jurism,
            seeAlso: true,
            session: jurism,
            shortTitle: jurism,
            tags: true,
            title: jurism,
            url: jurism,
        },
        hearing: {
            abstractNote: true,
            accessDate: true,
            archiveLocation: jurism,
            assemblyNumber: jurism,
            attachments: true,
            committee: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            documentNumber: true,
            extra: true,
            history: true,
            id: true,
            itemID: true,
            itemType: true,
            jurisdiction: jurism,
            language: true,
            legislativeBody: true,
            meetingName: jurism,
            meetingNumber: jurism,
            multi: true,
            notes: true,
            number: true,
            numberOfVolumes: true,
            pages: true,
            place: true,
            publicationTitle: jurism,
            publisher: true,
            reporter: jurism,
            resolutionLabel: jurism,
            rights: true,
            seeAlso: true,
            seriesNumber: jurism,
            session: true,
            sessionType: jurism,
            shortTitle: true,
            tags: true,
            title: true,
            type: jurism,
            url: true,
            volume: jurism,
        },
        instantMessage: {
            abstractNote: true,
            accessDate: true,
            attachments: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            multi: true,
            notes: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
        },
        interview: {
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            interviewMedium: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            medium: true,
            multi: true,
            notes: true,
            place: jurism,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
        },
        journalArticle: {
            DOI: true,
            ISSN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            issue: true,
            itemID: true,
            itemType: true,
            journalAbbreviation: true,
            jurisdiction: jurism,
            language: true,
            libraryCatalog: true,
            multi: true,
            notes: true,
            pages: true,
            publicationTitle: true,
            rights: true,
            seeAlso: true,
            series: true,
            seriesText: true,
            seriesTitle: true,
            shortTitle: true,
            status: jurism,
            tags: true,
            title: true,
            url: true,
            volume: true,
        },
        legalCommentary: {
            ISBN: jurism,
            abstractNote: jurism,
            accessDate: jurism,
            archive: jurism,
            archiveLocation: jurism,
            attachments: true,
            bookTitle: jurism,
            callNumber: jurism,
            creators: true,
            date: jurism,
            dateAdded: true,
            dateModified: true,
            edition: jurism,
            extra: jurism,
            id: true,
            itemID: true,
            itemType: true,
            language: jurism,
            libraryCatalog: jurism,
            multi: true,
            notes: true,
            numberOfVolumes: jurism,
            pages: jurism,
            place: jurism,
            publicationTitle: jurism,
            publisher: jurism,
            rights: jurism,
            seeAlso: true,
            series: jurism,
            seriesNumber: jurism,
            shortTitle: jurism,
            tags: true,
            title: jurism,
            url: jurism,
            volume: jurism,
            volumeTitle: jurism,
        },
        letter: {
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            letterType: true,
            libraryCatalog: true,
            multi: true,
            notes: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            type: true,
            url: true,
        },
        magazineArticle: {
            ISSN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            issue: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            multi: true,
            notes: true,
            pages: true,
            place: jurism,
            publicationTitle: true,
            publisher: jurism,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
            volume: true,
        },
        manuscript: {
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            manuscriptType: true,
            multi: true,
            notes: true,
            numPages: true,
            place: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            type: true,
            url: true,
        },
        map: {
            ISBN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            edition: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            mapType: true,
            multi: true,
            notes: true,
            place: true,
            publisher: true,
            rights: true,
            scale: true,
            seeAlso: true,
            seriesTitle: true,
            shortTitle: true,
            tags: true,
            title: true,
            type: true,
            url: true,
        },
        newspaperArticle: {
            ISSN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            court: jurism,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            edition: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            jurisdiction: jurism,
            language: true,
            libraryCatalog: true,
            multi: true,
            newsCaseDate: jurism,
            notes: true,
            pages: true,
            place: true,
            publicationTitle: true,
            rights: true,
            section: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
        },
        note: {
            dateAdded: true,
            dateModified: true,
            id: true,
            itemID: true,
            itemType: true,
            note: true,
            tags: true,
        },
        patent: {
            abstractNote: true,
            accessDate: true,
            applicationNumber: true,
            assignee: true,
            attachments: true,
            country: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            filingDate: true,
            genre: jurism,
            id: true,
            issueDate: true,
            issuingAuthority: true,
            itemID: true,
            itemType: true,
            jurisdiction: jurism,
            language: true,
            legalStatus: true,
            multi: true,
            notes: true,
            number: true,
            pages: true,
            patentNumber: true,
            place: true,
            priorityDate: jurism,
            priorityNumbers: true,
            publicationDate: jurism,
            publicationNumber: jurism,
            references: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            type: jurism,
            url: true,
        },
        podcast: {
            abstractNote: true,
            accessDate: true,
            attachments: true,
            audioFileType: true,
            creators: true,
            date: jurism,
            dateAdded: true,
            dateModified: true,
            episodeNumber: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            medium: true,
            multi: true,
            notes: true,
            number: true,
            publisher: jurism,
            rights: true,
            runningTime: true,
            seeAlso: true,
            seriesTitle: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
        },
        presentation: {
            abstractNote: true,
            accessDate: true,
            attachments: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            meetingName: true,
            multi: true,
            notes: true,
            place: true,
            presentationType: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            type: true,
            url: true,
        },
        radioBroadcast: {
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            audioRecordingFormat: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            episodeNumber: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            medium: true,
            multi: true,
            network: true,
            notes: true,
            number: true,
            place: true,
            programTitle: true,
            publicationTitle: true,
            publisher: true,
            rights: true,
            runningTime: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
        },
        regulation: {
            abstractNote: jurism,
            accessDate: jurism,
            attachments: true,
            code: jurism,
            codeNumber: jurism,
            creators: true,
            date: jurism,
            dateAdded: true,
            dateEnacted: jurism,
            dateModified: true,
            extra: jurism,
            gazetteFlag: jurism,
            history: jurism,
            id: true,
            itemID: true,
            itemType: true,
            jurisdiction: jurism,
            language: jurism,
            legislativeBody: jurism,
            multi: true,
            nameOfAct: jurism,
            notes: true,
            number: jurism,
            pages: jurism,
            publicLawNumber: jurism,
            publicationDate: jurism,
            publisher: jurism,
            regulationType: jurism,
            regulatoryBody: jurism,
            rights: jurism,
            section: jurism,
            seeAlso: true,
            session: jurism,
            shortTitle: jurism,
            tags: true,
            title: jurism,
            type: jurism,
            url: jurism,
        },
        report: {
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            assemblyNumber: jurism,
            attachments: true,
            bookTitle: jurism,
            callNumber: true,
            committee: jurism,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            institution: true,
            itemID: true,
            itemType: true,
            jurisdiction: jurism,
            language: true,
            libraryCatalog: true,
            medium: jurism,
            multi: true,
            notes: true,
            number: true,
            pages: true,
            place: true,
            publicationTitle: jurism,
            publisher: true,
            reportNumber: true,
            reportType: true,
            rights: true,
            seeAlso: true,
            seriesNumber: jurism,
            seriesTitle: true,
            shortTitle: true,
            status: jurism,
            tags: true,
            title: true,
            type: true,
            url: true,
        },
        standard: {
            abstractNote: jurism,
            accessDate: jurism,
            archive: jurism,
            archiveLocation: jurism,
            attachments: true,
            callNumber: jurism,
            creators: true,
            date: jurism,
            dateAdded: true,
            dateModified: true,
            extra: jurism,
            id: true,
            itemID: true,
            itemType: true,
            jurisdiction: jurism,
            language: jurism,
            libraryCatalog: jurism,
            multi: true,
            notes: true,
            number: jurism,
            publisher: jurism,
            rights: jurism,
            seeAlso: true,
            shortTitle: jurism,
            tags: true,
            title: jurism,
            url: jurism,
            versionNumber: jurism,
        },
        statute: {
            abstractNote: true,
            accessDate: true,
            attachments: true,
            code: true,
            codeNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateAmended: jurism,
            dateEnacted: true,
            dateModified: true,
            extra: true,
            gazetteFlag: jurism,
            history: true,
            id: true,
            itemID: true,
            itemType: true,
            jurisdiction: jurism,
            language: true,
            multi: true,
            nameOfAct: true,
            notes: true,
            number: true,
            originalDate: jurism,
            pages: true,
            publicLawNumber: true,
            publicationDate: jurism,
            publisher: jurism,
            regnalYear: jurism,
            reign: jurism,
            rights: true,
            section: true,
            seeAlso: true,
            session: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
        },
        thesis: {
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            multi: true,
            notes: true,
            numPages: true,
            place: true,
            publisher: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            thesisType: true,
            title: true,
            type: true,
            university: true,
            url: true,
        },
        treaty: {
            abstractNote: jurism,
            accessDate: jurism,
            adoptionDate: jurism,
            archive: jurism,
            archiveLocation: jurism,
            attachments: true,
            callNumber: jurism,
            creators: true,
            date: jurism,
            dateAdded: true,
            dateModified: true,
            extra: jurism,
            id: true,
            itemID: true,
            itemType: true,
            language: jurism,
            libraryCatalog: jurism,
            multi: true,
            notes: true,
            number: jurism,
            openingDate: jurism,
            pages: jurism,
            parentTreaty: jurism,
            publicationTitle: jurism,
            publisher: jurism,
            reporter: jurism,
            rights: jurism,
            section: jurism,
            seeAlso: true,
            shortTitle: jurism,
            signingDate: jurism,
            supplementName: jurism,
            tags: true,
            title: jurism,
            treatyNumber: jurism,
            url: jurism,
            versionNumber: jurism,
            volume: jurism,
        },
        tvBroadcast: {
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            episodeNumber: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            medium: true,
            multi: true,
            network: true,
            notes: true,
            number: true,
            place: true,
            programTitle: true,
            publicationTitle: true,
            publisher: true,
            rights: true,
            runningTime: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            url: true,
            videoRecordingFormat: true,
        },
        videoRecording: {
            ISBN: true,
            abstractNote: true,
            accessDate: true,
            archive: true,
            archiveLocation: true,
            attachments: true,
            callNumber: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            libraryCatalog: true,
            medium: true,
            multi: true,
            notes: true,
            numberOfVolumes: true,
            place: true,
            publicationTitle: jurism,
            publisher: true,
            rights: true,
            runningTime: true,
            seeAlso: true,
            seriesTitle: true,
            shortTitle: true,
            studio: true,
            tags: true,
            title: true,
            url: true,
            videoRecordingFormat: true,
            volume: true,
            websiteTitle: jurism,
        },
        webpage: {
            abstractNote: true,
            accessDate: true,
            attachments: true,
            creators: true,
            date: true,
            dateAdded: true,
            dateModified: true,
            extra: true,
            id: true,
            itemID: true,
            itemType: true,
            language: true,
            multi: true,
            notes: true,
            publicationTitle: true,
            rights: true,
            seeAlso: true,
            shortTitle: true,
            tags: true,
            title: true,
            type: true,
            url: true,
            websiteTitle: true,
            websiteType: true,
        },
    },
};
exports.name = {
    type: {
        artwork: 'artwork',
        attachment: 'attachment',
        audiorecording: 'audioRecording',
        bill: 'bill',
        blogpost: 'blogPost',
        book: 'book',
        booksection: 'bookSection',
        case: 'case',
        classic: jurism && 'classic',
        computerprogram: 'computerProgram',
        conferencepaper: 'conferencePaper',
        dictionaryentry: 'dictionaryEntry',
        document: 'document',
        email: 'email',
        encyclopediaarticle: 'encyclopediaArticle',
        film: 'film',
        forumpost: 'forumPost',
        gazette: jurism && 'gazette',
        hearing: 'hearing',
        instantmessage: 'instantMessage',
        interview: 'interview',
        journalarticle: 'journalArticle',
        legalcommentary: jurism && 'legalCommentary',
        letter: 'letter',
        magazinearticle: 'magazineArticle',
        manuscript: 'manuscript',
        map: 'map',
        newspaperarticle: 'newspaperArticle',
        patent: 'patent',
        podcast: 'podcast',
        presentation: 'presentation',
        radiobroadcast: 'radioBroadcast',
        regulation: jurism && 'regulation',
        report: 'report',
        standard: jurism && 'standard',
        statute: 'statute',
        thesis: 'thesis',
        treaty: jurism && 'treaty',
        tvbroadcast: 'tvBroadcast',
        videorecording: 'videoRecording',
        webpage: 'webpage',
    },
    field: {
        abstractnote: 'abstractNote',
        accessdate: 'accessDate',
        adminflag: jurism && 'adminFlag',
        adoptiondate: jurism && 'adoptionDate',
        album: jurism && 'publicationTitle',
        applicationnumber: 'applicationNumber',
        archive: 'archive',
        archivelocation: 'archiveLocation',
        artworkmedium: 'medium',
        artworksize: 'artworkSize',
        assemblynumber: jurism && 'seriesNumber',
        assignee: 'assignee',
        audiofiletype: 'medium',
        audiorecordingformat: 'medium',
        billnumber: 'number',
        blogtitle: 'publicationTitle',
        booktitle: 'publicationTitle',
        callnumber: 'callNumber',
        casename: 'title',
        code: 'code',
        codenumber: 'codeNumber',
        codepages: 'pages',
        codevolume: 'volume',
        committee: 'committee',
        company: 'publisher',
        conferencedate: jurism && 'conferenceDate',
        conferencename: 'conferenceName',
        country: 'country',
        court: 'court',
        date: 'date',
        dateadded: 'dateAdded',
        dateamended: jurism && 'dateAmended',
        datedecided: 'date',
        dateenacted: 'date',
        datemodified: 'dateModified',
        dictionarytitle: 'publicationTitle',
        distributor: 'publisher',
        division: jurism && 'division',
        docketnumber: 'number',
        documentname: jurism && 'documentName',
        documentnumber: 'number',
        doi: 'DOI',
        edition: 'edition',
        encyclopediatitle: 'publicationTitle',
        episodenumber: 'number',
        extra: 'extra',
        filingdate: 'filingDate',
        firstpage: 'pages',
        forumtitle: 'publicationTitle',
        gazetteflag: jurism && 'gazetteFlag',
        genre: 'type',
        history: 'history',
        institution: zotero ? 'publisher' : 'institution',
        interviewmedium: 'medium',
        isbn: 'ISBN',
        issn: 'ISSN',
        issue: 'issue',
        issuedate: 'date',
        issuingauthority: 'issuingAuthority',
        journalabbreviation: 'journalAbbreviation',
        jurisdiction: jurism && 'jurisdiction',
        label: 'publisher',
        language: 'language',
        legalstatus: 'legalStatus',
        legislativebody: 'legislativeBody',
        lettertype: 'type',
        librarycatalog: 'libraryCatalog',
        manuscripttype: 'type',
        maptype: 'type',
        medium: 'medium',
        meetingname: 'meetingName',
        meetingnumber: jurism && 'meetingNumber',
        nameofact: 'title',
        network: 'publisher',
        newscasedate: jurism && 'newsCaseDate',
        number: 'number',
        numberofvolumes: 'numberOfVolumes',
        numpages: 'numPages',
        openingdate: jurism && 'openingDate',
        opus: jurism && 'opus',
        originaldate: jurism && 'originalDate',
        pages: 'pages',
        parenttreaty: jurism && 'parentTreaty',
        patentnumber: 'number',
        place: 'place',
        posttype: 'type',
        presentationtype: 'type',
        prioritydate: jurism && 'priorityDate',
        prioritynumbers: 'priorityNumbers',
        proceedingstitle: 'publicationTitle',
        programminglanguage: 'programmingLanguage',
        programtitle: 'publicationTitle',
        publicationdate: jurism && 'publicationDate',
        publicationnumber: jurism && 'publicationNumber',
        publicationtitle: 'publicationTitle',
        publiclawnumber: 'number',
        publisher: 'publisher',
        references: 'references',
        regnalyear: jurism && 'regnalYear',
        regulationtype: jurism && 'type',
        regulatorybody: jurism && 'legislativeBody',
        reign: jurism && 'reign',
        release: jurism && 'edition',
        reporter: zotero ? 'reporter' : 'publicationTitle',
        reportervolume: 'volume',
        reportnumber: 'number',
        reporttype: 'type',
        resolutionlabel: jurism && 'resolutionLabel',
        rights: 'rights',
        runningtime: 'runningTime',
        scale: 'scale',
        section: 'section',
        series: 'series',
        seriesnumber: 'seriesNumber',
        seriestext: 'seriesText',
        seriestitle: 'seriesTitle',
        session: 'session',
        sessiontype: jurism && 'type',
        shorttitle: 'shortTitle',
        signingdate: jurism && 'signingDate',
        status: jurism && 'status',
        studio: 'publisher',
        subject: 'title',
        supplementname: jurism && 'supplementName',
        system: 'system',
        thesistype: 'type',
        title: 'title',
        treatynumber: jurism && 'number',
        type: 'type',
        university: 'publisher',
        url: 'url',
        versionnumber: 'versionNumber',
        videorecordingformat: 'medium',
        volume: 'volume',
        volumetitle: jurism && 'volumeTitle',
        websitetitle: 'publicationTitle',
        websitetype: 'type',
        yearasvolume: jurism && 'yearAsVolume',
    },
};
// maps variable to its extra-field label
exports.label = {
    abstractnote: 'Abstract note',
    accessdate: 'Access date',
    adminflag: jurism && 'Admin flag',
    adoptiondate: jurism && 'Adoption date',
    album: jurism && 'Publication title',
    applicationnumber: 'Application number',
    archive: 'Archive',
    archivelocation: 'Archive location',
    artwork: 'Artwork',
    artworkmedium: 'Medium',
    artworksize: 'Artwork size',
    assemblynumber: jurism && 'Series number',
    assignee: 'Assignee',
    attachment: 'Attachment',
    audiofiletype: 'Medium',
    audiorecording: 'Audio recording',
    audiorecordingformat: 'Medium',
    bill: 'Bill',
    billnumber: 'Number',
    blogpost: 'Blog post',
    blogtitle: 'Publication title',
    book: 'Book',
    booksection: 'Book section',
    booktitle: 'Publication title',
    callnumber: 'Call number',
    case: 'Case',
    casename: 'Title',
    classic: jurism && 'Classic',
    code: 'Code',
    codenumber: 'Code number',
    codepages: 'Pages',
    codevolume: 'Volume',
    committee: 'Committee',
    company: 'Publisher',
    computerprogram: 'Computer program',
    conferencedate: jurism && 'Conference date',
    conferencename: 'Conference name',
    conferencepaper: 'Conference paper',
    country: 'Country',
    court: 'Court',
    date: 'Date',
    dateamended: jurism && 'Date amended',
    datedecided: 'Date',
    dateenacted: 'Date',
    dictionaryentry: 'Dictionary entry',
    dictionarytitle: 'Publication title',
    distributor: 'Publisher',
    division: jurism && 'Division',
    docketnumber: 'Number',
    document: 'Document',
    documentname: jurism && 'Document name',
    documentnumber: 'Number',
    doi: 'DOI',
    edition: 'Edition',
    email: 'Email',
    encyclopediaarticle: 'Encyclopedia article',
    encyclopediatitle: 'Publication title',
    episodenumber: 'Number',
    extra: 'Extra',
    filingdate: 'Filing date',
    film: 'Film',
    firstpage: 'Pages',
    forumpost: 'Forum post',
    forumtitle: 'Publication title',
    gazette: jurism && 'Gazette',
    gazetteflag: jurism && 'Gazette flag',
    genre: 'Type',
    hearing: 'Hearing',
    history: 'History',
    instantmessage: 'Instant message',
    institution: zotero ? 'Publisher' : 'Institution',
    interview: 'Interview',
    interviewmedium: 'Medium',
    isbn: 'ISBN',
    issn: 'ISSN',
    issue: 'Issue',
    issuedate: 'Date',
    issuingauthority: 'Issuing authority',
    journalabbreviation: 'Journal abbreviation',
    journalarticle: 'Journal article',
    jurisdiction: jurism && 'Jurisdiction',
    label: 'Publisher',
    language: 'Language',
    legalcommentary: jurism && 'Legal commentary',
    legalstatus: 'Legal status',
    legislativebody: 'Legislative body',
    letter: 'Letter',
    lettertype: 'Type',
    librarycatalog: 'Library catalog',
    magazinearticle: 'Magazine article',
    manuscript: 'Manuscript',
    manuscripttype: 'Type',
    map: 'Map',
    maptype: 'Type',
    medium: 'Medium',
    meetingname: 'Meeting name',
    meetingnumber: jurism && 'Meeting number',
    nameofact: 'Title',
    network: 'Publisher',
    newscasedate: jurism && 'News case date',
    newspaperarticle: 'Newspaper article',
    number: 'Number',
    numberofvolumes: 'Number of volumes',
    numpages: 'Number of pages',
    openingdate: jurism && 'Opening date',
    opus: jurism && 'Opus',
    originaldate: jurism && 'Original date',
    pages: 'Pages',
    parenttreaty: jurism && 'Parent treaty',
    patent: 'Patent',
    patentnumber: 'Number',
    place: 'Place',
    podcast: 'Podcast',
    posttype: 'Type',
    presentation: 'Presentation',
    presentationtype: 'Type',
    prioritydate: jurism && 'Priority date',
    prioritynumbers: 'Priority numbers',
    proceedingstitle: 'Publication title',
    programminglanguage: 'Programming language',
    programtitle: 'Publication title',
    publicationdate: jurism && 'Publication date',
    publicationnumber: jurism && 'Publication number',
    publicationtitle: 'Publication title',
    publiclawnumber: 'Number',
    publisher: 'Publisher',
    radiobroadcast: 'Radio broadcast',
    references: 'References',
    regnalyear: jurism && 'Regnal year',
    regulation: jurism && 'Regulation',
    regulationtype: jurism && 'Type',
    regulatorybody: jurism && 'Legislative body',
    reign: jurism && 'Reign',
    release: jurism && 'Edition',
    report: 'Report',
    reporter: zotero ? 'Reporter' : 'Publication title',
    reportervolume: 'Volume',
    reportnumber: 'Number',
    reporttype: 'Type',
    resolutionlabel: jurism && 'Resolution label',
    rights: 'Rights',
    runningtime: 'Running time',
    scale: 'Scale',
    section: 'Section',
    series: 'Series',
    seriesnumber: 'Series number',
    seriestext: 'Series text',
    seriestitle: 'Series title',
    session: 'Session',
    sessiontype: jurism && 'Type',
    shorttitle: 'Short title',
    signingdate: jurism && 'Signing date',
    standard: jurism && 'Standard',
    status: jurism && 'Status',
    statute: 'Statute',
    studio: 'Publisher',
    subject: 'Title',
    supplementname: jurism && 'Supplement name',
    system: 'System',
    thesis: 'Thesis',
    thesistype: 'Type',
    title: 'Title',
    treaty: jurism && 'Treaty',
    treatynumber: jurism && 'Number',
    tvbroadcast: 'Tv broadcast',
    type: 'Type',
    university: 'Publisher',
    url: 'Url',
    versionnumber: 'Version number',
    videorecording: 'Video recording',
    videorecordingformat: 'Medium',
    volume: 'Volume',
    volumetitle: jurism && 'Volume title',
    webpage: 'Webpage',
    websitetitle: 'Publication title',
    websitetype: 'Type',
    yearasvolume: jurism && 'Year as volume',
};
function unalias(item) {
    delete item.inPublications;
    let v;
    if (v = (item.artworkMedium || item.audioRecordingFormat || item.videoRecordingFormat || item.interviewMedium || item.audioFileType))
        item.medium = v;
    delete item.artworkMedium;
    delete item.audioRecordingFormat;
    delete item.videoRecordingFormat;
    delete item.interviewMedium;
    delete item.audioFileType;
    if (v = (item.label || item.company || item.distributor || item.network || item.university || item.studio))
        item.publisher = v;
    delete item.label;
    delete item.company;
    delete item.distributor;
    delete item.network;
    delete item.university;
    delete item.studio;
    if (v = (item.billNumber || item.docketNumber || item.documentNumber || item.patentNumber || item.episodeNumber || item.reportNumber || item.publicLawNumber))
        item.number = v;
    delete item.billNumber;
    delete item.docketNumber;
    delete item.documentNumber;
    delete item.patentNumber;
    delete item.episodeNumber;
    delete item.reportNumber;
    delete item.publicLawNumber;
    if (v = (item.codeVolume || item.reporterVolume))
        item.volume = v;
    delete item.codeVolume;
    delete item.reporterVolume;
    if (v = (item.codePages || item.firstPage))
        item.pages = v;
    delete item.codePages;
    delete item.firstPage;
    if (v = (item.blogTitle || item.bookTitle || item.proceedingsTitle || item.dictionaryTitle || item.encyclopediaTitle || item.forumTitle || item.programTitle || item.websiteTitle))
        item.publicationTitle = v;
    delete item.blogTitle;
    delete item.bookTitle;
    delete item.proceedingsTitle;
    delete item.dictionaryTitle;
    delete item.encyclopediaTitle;
    delete item.forumTitle;
    delete item.programTitle;
    delete item.websiteTitle;
    if (v = (item.websiteType || item.genre || item.postType || item.letterType || item.manuscriptType || item.mapType || item.presentationType || item.reportType || item.thesisType))
        item.type = v;
    delete item.websiteType;
    delete item.genre;
    delete item.postType;
    delete item.letterType;
    delete item.manuscriptType;
    delete item.mapType;
    delete item.presentationType;
    delete item.reportType;
    delete item.thesisType;
    if (v = (item.caseName || item.subject || item.nameOfAct))
        item.title = v;
    delete item.caseName;
    delete item.subject;
    delete item.nameOfAct;
    if (v = (item.dateDecided || item.issueDate || item.dateEnacted))
        item.date = v;
    delete item.dateDecided;
    delete item.issueDate;
    delete item.dateEnacted;
    if (zotero) {
        if (item.institution)
            item.publisher = item.institution;
        delete item.institution;
    }
    if (jurism) {
        if (v = (item.album || item.reporter))
            item.publicationTitle = v;
        delete item.album;
        delete item.reporter;
        if (item.release)
            item.edition = item.release;
        delete item.release;
        if (item.assemblyNumber)
            item.seriesNumber = item.assemblyNumber;
        delete item.assemblyNumber;
        if (v = (item.sessionType || item.regulationType))
            item.type = v;
        delete item.sessionType;
        delete item.regulationType;
        if (item.regulatoryBody)
            item.legislativeBody = item.regulatoryBody;
        delete item.regulatoryBody;
        if (item.treatyNumber)
            item.number = item.treatyNumber;
        delete item.treatyNumber;
    }
}
// import & export translators expect different creator formats... nice
function simplifyForExport(item, dropAttachments = false) {
    unalias(item);
    if (item.filingDate)
        item.filingDate = item.filingDate.replace(/^0000-00-00 /, '');
    if (item.creators) {
        for (const creator of item.creators) {
            if (creator.fieldMode) {
                creator.name = creator.name || creator.lastName;
                delete creator.lastName;
                delete creator.firstName;
                delete creator.fieldMode;
            }
        }
    }
    if (item.itemType === 'attachment' || item.itemType === 'note') {
        delete item.attachments;
        delete item.notes;
    }
    else {
        item.attachments = (!dropAttachments && item.attachments) || [];
        item.notes = item.notes ? item.notes.map(note => note.note || note) : [];
    }
    return item;
}
exports.simplifyForExport = simplifyForExport;
function simplifyForImport(item) {
    unalias(item);
    if (item.creators) {
        for (const creator of item.creators) {
            if (creator.name) {
                creator.lastName = creator.lastName || creator.name;
                creator.fieldMode = 1;
                delete creator.firstName;
                delete creator.name;
            }
            if (!jurism)
                delete creator.multi;
        }
    }
    if (!jurism)
        delete item.multi;
    return item;
}
exports.simplifyForImport = simplifyForImport;


/***/ }),

/***/ "./Better CSL JSON.ts":
/*!****************************!*\
  !*** ./Better CSL JSON.ts ***!
  \****************************/
/*! flagged exports */
/*! export Translator [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export doExport [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.doExport = exports.Translator = void 0;
const translator_1 = __webpack_require__(/*! ./lib/translator */ "./lib/translator.ts");
Object.defineProperty(exports, "Translator", ({ enumerable: true, get: function () { return translator_1.Translator; } }));
const csl_1 = __webpack_require__(/*! ./csl/csl */ "./csl/csl.ts");
function date2csl(date) {
    switch (date.type) {
        case 'open':
            return [0];
        case 'date':
            const csl = [date.year > 0 ? date.year : date.year - 1];
            if (date.month) {
                csl.push(date.month);
                if (date.day) {
                    csl.push(date.day);
                }
            }
            return csl;
        case 'season':
            // https://github.com/retorquere/zotero-better-bibtex/issues/860
            return [date.year > 0 ? date.year : date.year - 1, date.season + 12]; // tslint:disable-line:no-magic-numbers
        default:
            throw new Error(`Expected date or open, got ${date.type}`);
    }
}
csl_1.CSLExporter.date2CSL = date => {
    switch (date.type) {
        case 'date':
            return {
                'date-parts': [date2csl(date)],
                circa: (date.approximate || date.uncertain) ? true : undefined,
            };
        case 'interval':
            return {
                'date-parts': [date2csl(date.from), date2csl(date.to)],
                circa: (date.from.approximate || date.from.uncertain || date.to.approximate || date.to.uncertain) ? true : undefined,
            };
        case 'verbatim':
            return { literal: date.verbatim };
        case 'season':
            return {
                'date-parts': [[date.year]],
                season: date.season,
                circa: (date.approximate || date.uncertain) ? true : undefined,
            };
        default:
            throw new Error(`Unexpected date type ${JSON.stringify(date)}`);
    }
};
csl_1.CSLExporter.serialize = csl => JSON.stringify(csl);
csl_1.CSLExporter.flush = items => `[\n${(items.map(item => `  ${item}`)).join(',\n')}\n]\n`;
function doExport() {
    translator_1.Translator.init('export');
    csl_1.CSLExporter.initialize();
    csl_1.CSLExporter.doExport();
}
exports.doExport = doExport;


/***/ }),

/***/ "./csl/csl.ts":
/*!********************!*\
  !*** ./csl/csl.ts ***!
  \********************/
/*! flagged exports */
/*! export CSLExporter [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CSLExporter = void 0;
const translator_1 = __webpack_require__(/*! ../lib/translator */ "./lib/translator.ts");
const itemfields = __webpack_require__(/*! ../../gen/items/items */ "../gen/items/items.ts");
const Extra = __webpack_require__(/*! ../../content/extra */ "../content/extra.ts");
const ExtraFields = __webpack_require__(/*! ../../gen/items/extra-fields.json */ "../gen/items/extra-fields.json");
const logger_1 = __webpack_require__(/*! ../../content/logger */ "../content/logger.ts");
const worker_1 = __webpack_require__(/*! ../../content/worker */ "../content/worker.ts");
const validCSLTypes = __webpack_require__(/*! ../../gen/items/csl-types.json */ "../gen/items/csl-types.json");
const keyOrder = [
    'id',
    'year',
    'season',
    'month',
    'day',
    'circa',
].reduce((acc, field, idx, fields) => { acc[field] = idx + 1; return acc; }, {});
// export singleton: https://k94n.com/es6-modules-single-instance-pattern
exports.CSLExporter = new class {
    initialize() {
        const postscript = translator_1.Translator.preferences.postscript;
        if (typeof postscript === 'string' && postscript.trim() !== '') {
            try {
                this.postscript = new Function('reference', 'item', 'Translator', 'Zotero', postscript);
                logger_1.log.debug(`Installed postscript: ${JSON.stringify(postscript)}`);
            }
            catch (err) {
                if (translator_1.Translator.preferences.testing)
                    throw err;
                logger_1.log.error(`Failed to compile postscript: ${err}\n\n${JSON.stringify(postscript)}`);
            }
        }
    }
    postscript(reference, item, _translator, _zotero) { } // tslint:disable-line:no-empty
    doExport() {
        const items = [];
        const order = [];
        for (const item of translator_1.Translator.items()) {
            if (item.itemType === 'note' || item.itemType === 'attachment')
                continue;
            order.push({ citationKey: item.citationKey, i: items.length });
            let cached;
            if (cached = Zotero.BetterBibTeX.cacheFetch(item.itemID, translator_1.Translator.options, translator_1.Translator.preferences)) {
                items.push(cached.reference);
                continue;
            }
            itemfields.simplifyForExport(item);
            if (item.accessDate) { // WTH is Juris-M doing with those dates?
                item.accessDate = item.accessDate.replace(/T?[0-9]{2}:[0-9]{2}:[0-9]{2}.*/, '').trim();
            }
            Object.assign(item, Extra.get(item.extra, 'csl'));
            // until export translators can be async, itemToCSLJSON must run before the translator starts, so it actually doesn't do anything in a worker context
            // so re-assigne the extracted extra here
            let csl = Zotero.Utilities.itemToCSLJSON(item);
            if (worker_1.worker)
                csl.note = item.extra || undefined;
            // 637
            /* TODO: is this still needed with the new extra-parser?
            delete csl['publisher-place']
            delete csl['archive-place']
            delete csl['event-place']
            delete csl['original-publisher-place']
            delete csl['publisher-place']
            */
            if (item.place)
                csl[item.itemType === 'presentation' ? 'event-place' : 'publisher-place'] = item.place;
            // https://github.com/retorquere/zotero-better-bibtex/issues/811#issuecomment-347165389
            if (item.ISBN)
                csl.ISBN = item.ISBN;
            delete csl.authority;
            if (item.itemType === 'videoRecording' && csl.type === 'video')
                csl.type = 'motion_picture';
            [csl.journalAbbreviation, csl['container-title-short']] = [csl['container-title-short'], csl.journalAbbreviation];
            if (item.date) {
                const parsed = Zotero.BetterBibTeX.parseDate(item.date);
                if (parsed.type)
                    csl.issued = this.date2CSL(parsed); // possible for there to be an orig-date only
                if (parsed.orig)
                    csl['original-date'] = this.date2CSL(parsed.orig);
            }
            if (item.accessDate)
                csl.accessed = this.date2CSL(Zotero.BetterBibTeX.parseDate(item.accessDate));
            /* ham-fisted workaround for #365 */
            if ((csl.type === 'motion_picture' || csl.type === 'broadcast') && csl.author && !csl.director)
                [csl.author, csl.director] = [csl.director, csl.author];
            csl.id = item.citationKey;
            if (csl.type === 'broadcast' && csl.genre === 'television broadcast')
                delete csl.genre;
            // special case for #587... not pretty
            // checked separately because .type isn't actually a CSL var so wouldn't pass the ef.type test below
            if (!validCSLTypes.includes(item.extraFields.kv['csl-type']) && validCSLTypes.includes(item.extraFields.kv.type)) {
                csl.type = item.extraFields.kv.type;
                delete item.extraFields.kv.type;
            }
            for (const [name, value] of Object.entries(item.extraFields.kv)) {
                const ef = ExtraFields[name];
                if (!ef.csl)
                    continue;
                if (ef.type === 'date') {
                    csl[name] = this.date2CSL(Zotero.BetterBibTeX.parseDate(value));
                }
                else if (name === 'csl-type') {
                    if (!validCSLTypes.includes(value))
                        continue; // and keep the kv variable, maybe for postscripting
                    csl.type = value;
                }
                else if (!csl[name]) {
                    csl[name] = value;
                }
                delete item.extraFields.kv[name];
            }
            for (const [field, value] of Object.entries(item.extraFields.creator)) {
                if (!ExtraFields[field].csl)
                    continue;
                csl[field] = value.map(Extra.cslCreator);
                delete item.extraFields.creator[field];
            }
            /* Juris-M workarounds to match Zotero as close as possible */
            for (const kind of ['translator', 'author', 'editor', 'director', 'reviewed-author']) {
                for (const creator of csl[kind] || []) {
                    delete creator.multi;
                }
            }
            delete csl.multi;
            delete csl.system_id;
            let cache;
            try {
                cache = this.postscript(csl, item, translator_1.Translator, Zotero);
            }
            catch (err) {
                if (translator_1.Translator.preferences.testing && !translator_1.Translator.preferences.ignorePostscriptErrors)
                    throw err;
                cache = false;
            }
            for (const field of translator_1.Translator.skipFields) {
                delete csl[field];
            }
            csl = this.sortObject(csl);
            csl = this.serialize(csl);
            if (typeof cache !== 'boolean' || cache)
                Zotero.BetterBibTeX.cacheStore(item.itemID, translator_1.Translator.options, translator_1.Translator.preferences, csl);
            items.push(csl);
        }
        order.sort((a, b) => a.citationKey.localeCompare(b.citationKey, undefined, { sensitivity: 'base' }));
        Zotero.write(this.flush(order.map(o => items[o.i])));
    }
    keySort(a, b) {
        const oa = keyOrder[a];
        const ob = keyOrder[b];
        if (oa && ob)
            return oa - ob;
        if (oa)
            return -1;
        if (ob)
            return 1;
        return a.localeCompare(b, undefined, { sensitivity: 'base' });
    }
    sortObject(obj) {
        if (obj && !Array.isArray(obj) && typeof obj === 'object') {
            for (const field of Object.keys(obj).sort(this.keySort)) {
                const value = obj[field];
                delete obj[field];
                obj[field] = this.sortObject(value);
            }
        }
        return obj;
    }
};


/***/ }),

/***/ "./lib/translator.ts":
/*!***************************!*\
  !*** ./lib/translator.ts ***!
  \***************************/
/*! flagged exports */
/*! export Translator [provided] [used in Better CSL JSON] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used in Better CSL JSON (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in Better CSL JSON (runtime-defined)] */
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
        this.header = {"browserSupport":"gcsv","configOptions":{"getCollections":true},"creator":"Emiliano heyns","description":"exports references in pandoc-compatible CSL-JSON format, with added citation keys and parsing of metadata","displayOptions":{"keepUpdated":false},"inRepository":false,"label":"Better CSL JSON","maxVersion":"","minVersion":"4.0.27","priority":100,"target":"json","translatorID":"f4b52ab0-f878-4556-85a0-c7aeedd09dfc","translatorType":2};
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
/******/ 	return __webpack_require__("./Better CSL JSON.ts");
/******/ })()
;
