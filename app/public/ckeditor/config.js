/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbarGroups = [
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'forms' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'about' }
	];

	// The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.
	config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';

	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced';

	config.language = 'pt-br';

	config.codeSnippet_languages = {
		apache: 'Apache',
		bash: 'Bash',
		coffeescript: 'CoffeeScript',
		cpp: 'C++',
		cs: 'C#',
		css: 'CSS',
		diff: 'Diff',
		html: 'HTML',
		http: 'HTTP',
		ini: 'INI',
		java: 'Java',
		javascript: 'JavaScript',
		json: 'JSON',
		makefile: 'Makefile',
		markdown: 'Markdown',
		nginx: 'Nginx',
		objectivec: 'Objective-C',
		perl: 'Perl',
		php: 'PHP',
		python: 'Python',
		ruby: 'Ruby',
		sql: 'SQL',
		vbscript: 'VBScript',
		xhtml: 'XHTML',
		xml: 'XML'
	};

	config.codeSnippet_theme = 'monokai_sublime';

	config.extraPlugins = 'confighelper, image2';

	config.placeholder = 'Digite aqui o conteúdo';

};
