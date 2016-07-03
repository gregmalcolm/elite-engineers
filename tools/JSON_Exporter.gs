// Includes functions for exporting active sheet or all sheets as JSON object (also Python object syntax compatible).
// Tweak the makePrettyJSON_ function to customize what kind of JSON to export.

var FORMAT_ONELINE   = 'One-line';
var FORMAT_MULTILINE = 'Multi-line';
var FORMAT_PRETTY    = 'Pretty';

var LANGUAGE_JS      = 'JavaScript';
var LANGUAGE_PYTHON  = 'Python';

var STRUCTURE_LIST = 'List';
var STRUCTURE_HASH = 'Hash (keyed by "id" column)';

/* Defaults for this particular spreadsheet, change as desired */
var DEFAULT_FORMAT = FORMAT_PRETTY;
var DEFAULT_LANGUAGE = LANGUAGE_JS;
var DEFAULT_STRUCTURE = STRUCTURE_LIST;


function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [
    {name: "Export JSON for this sheet", functionName: "exportSheet"},
    {name: "Export JSON for all sheets", functionName: "exportAllSheets"},
    {name: "Export JSON v2 (all in one)", functionName: "exportSheetV2"},
    {name: "Export JSON v2 (Save all files to Drive)", functionName: "exportSheetV2SaveFiles"},

    {name: "Configure export", functionName: "exportOptions"},
  ];
  ss.addMenu("Export JSON", menuEntries);
}


function exportOptions() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var app = UiApp.createApplication().setTitle('Export JSON');

  var grid = app.createGrid(4, 2);
  grid.setWidget(0, 0, makeLabel(app, 'Language:'));
  grid.setWidget(0, 1, makeListBox(app, 'language', [LANGUAGE_JS, LANGUAGE_PYTHON]));
  grid.setWidget(1, 0, makeLabel(app, 'Format:'));
  grid.setWidget(1, 1, makeListBox(app, 'format', [FORMAT_PRETTY, FORMAT_MULTILINE, FORMAT_ONELINE]));
  grid.setWidget(2, 0, makeLabel(app, 'Structure:'));
  grid.setWidget(2, 1, makeListBox(app, 'structure', [STRUCTURE_LIST, STRUCTURE_HASH]));
  grid.setWidget(3, 0, makeButton(app, grid, 'Export Active Sheet', 'exportSheet'));
  grid.setWidget(3, 1, makeButton(app, grid, 'Export All Sheets', 'exportAllSheets'));
  app.add(grid);

  doc.show(app);
}

function makeLabel(app, text, id) {
  var lb = app.createLabel(text);
  if (id) lb.setId(id);
  return lb;
}

function makeListBox(app, name, items) {
  var listBox = app.createListBox().setId(name).setName(name);
  listBox.setVisibleItemCount(1);

  var cache = CacheService.getPublicCache();
  var selectedValue = cache.get(name);
  Logger.log(selectedValue);
  for (var i = 0; i < items.length; i++) {
    listBox.addItem(items[i]);
    if (items[1] == selectedValue) {
      listBox.setSelectedIndex(i);
    }
  }
  return listBox;
}

function makeButton(app, parent, name, callback) {
  var button = app.createButton(name);
  app.add(button);
  var handler = app.createServerClickHandler(callback).addCallbackElement(parent);;
  button.addClickHandler(handler);
  return button;
}

function makeTextBox(app, name) {
  var textArea    = app.createTextArea().setWidth('100%').setHeight('200px').setId(name).setName(name);
  return textArea;
}

function exportAllSheets(e) {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var sheetsData = {};
  for (var i = 0; i < sheets.length; i++) {
    var sheet = sheets[i];
    var rowsData = getRowsData_(sheet, getExportOptions(e));
    var sheetName = sheet.getName();
    sheetsData[sheetName] = rowsData;
  }
  var json = makeJSON_(sheetsData, getExportOptions(e));
  return displayText_(json);
}

function exportSheet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var rowsData = getRowsData_(sheet, getExportOptions(e));
  var json = makeJSON_(rowsData, getExportOptions(e));
  return displayText_(json);
}

function getExportOptions(e) {
  var options = {};

  options.language = e && e.parameter.language || DEFAULT_LANGUAGE;
  options.format   = e && e.parameter.format || DEFAULT_FORMAT;
  options.structure = e && e.parameter.structure || DEFAULT_STRUCTURE;

  var cache = CacheService.getPublicCache();
  cache.put('language', options.language);
  cache.put('format',   options.format);
  cache.put('structure',   options.structure);

  Logger.log(options);
  return options;
}

function makeJSON_(object, options) {
  if (options.format == FORMAT_PRETTY) {
    var jsonString = JSON.stringify(object, null, 4);
  } else if (options.format == FORMAT_MULTILINE) {
    var jsonString = Utilities.jsonStringify(object);
    jsonString = jsonString.replace(/},/gi, '},\n');
    jsonString = prettyJSON.replace(/":\[{"/gi, '":\n[{"');
    jsonString = prettyJSON.replace(/}\],/gi, '}],\n');
  } else {
    var jsonString = Utilities.jsonStringify(object);
  }
  if (options.language == LANGUAGE_PYTHON) {
    // add unicode markers
    jsonString = jsonString.replace(/"([a-zA-Z]*)":\s+"/gi, '"$1": u"');
  }
  return jsonString;
}

function displayText_(text) {
  var app = UiApp.createApplication().setTitle('Exported JSON');
  app.add(makeTextBox(app, 'json'));
  app.getElementById('json').setText(text);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.show(app);
  return app;
}
function displayLinkText_(text) {
  var app = UiApp.createApplication().setTitle('Generated JSON files');
  app.add(makeTextBox(app, 'json'));
  app.getElementById('json').setText(text);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.show(app);
  return app;
}

// getRowsData iterates row by row in the input range and returns an array of objects.
// Each object contains all the data for a given row, indexed by its normalized column name.
// Arguments:
//   - sheet: the sheet object that contains the data to be processed
//   - range: the exact range of cells where the data is stored
//   - columnHeadersRowIndex: specifies the row number where the column names are stored.
//       This argument is optional and it defaults to the row immediately above range;
// Returns an Array of objects.
function getRowsData_(sheet, options) {
  var headersRange = sheet.getRange(1, 1, sheet.getFrozenRows(), sheet.getMaxColumns());
  var headers = headersRange.getValues()[0];
  var dataRange = sheet.getRange(sheet.getFrozenRows()+1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  var objects = getObjects_(dataRange.getValues(), normalizeHeaders_(headers));
  if (options.structure == STRUCTURE_HASH) {
    var objectsById = {};
    objects.forEach(function(object) {
      objectsById[object.id] = object;
    });
    return objectsById;
  } else {
    return objects;
  }
}

// getColumnsData iterates column by column in the input range and returns an array of objects.
// Each object contains all the data for a given column, indexed by its normalized row name.
// Arguments:
//   - sheet: the sheet object that contains the data to be processed
//   - range: the exact range of cells where the data is stored
//   - rowHeadersColumnIndex: specifies the column number where the row names are stored.
//       This argument is optional and it defaults to the column immediately left of the range;
// Returns an Array of objects.
function getColumnsData_(sheet, range, rowHeadersColumnIndex) {
  rowHeadersColumnIndex = rowHeadersColumnIndex || range.getColumnIndex() - 1;
  var headersTmp = sheet.getRange(range.getRow(), rowHeadersColumnIndex, range.getNumRows(), 1).getValues();
  var headers = normalizeHeaders_(arrayTranspose_(headersTmp)[0]);
  return getObjects(arrayTranspose_(range.getValues()), headers);
}


// For every row of data in data, generates an object that contains the data. Names of
// object fields are defined in keys.
// Arguments:
//   - data: JavaScript 2d array
//   - keys: Array of Strings that define the property names for the objects to create
function getObjects_(data, keys) {
  var objects = [];
  for (var i = 0; i < data.length; ++i) {
    var object = {};
    var hasData = false;
    for (var j = 0; j < data[i].length; ++j) {
      var cellData = data[i][j];
      if (isCellEmpty_(cellData)) {
        continue;
      }
      object[keys[j]] = cellData;
      hasData = true;
    }
    if (hasData) {
      objects.push(object);
    }
  }
  return objects;
}

// Returns an Array of normalized Strings.
// Arguments:
//   - headers: Array of Strings to normalize
function normalizeHeaders_(headers) {
  var keys = [];
  for (var i = 0; i < headers.length; ++i) {
    var key = normalizeHeader_(headers[i]);
    if (key.length > 0) {
      keys.push(key);
    }
  }
  return keys;
}

// Normalizes a string, by removing all alphanumeric characters and using mixed case
// to separate words. The output will always start with a lower case letter.
// This function is designed to produce JavaScript object property names.
// Arguments:
//   - header: string to normalize
// Examples:
//   "First Name" -> "firstName"
//   "Market Cap (millions) -> "marketCapMillions
//   "1 number at the beginning is ignored" -> "numberAtTheBeginningIsIgnored"
function normalizeHeader_(header) {
  var key = "";
  var upperCase = false;
  for (var i = 0; i < header.length; ++i) {
    var letter = header[i];
    if (letter == " " && key.length > 0) {
      upperCase = true;
      continue;
    }
    if (!isAlnum_(letter)) {
      continue;
    }
    if (key.length == 0 && isDigit_(letter)) {
      continue; // first character must be a letter
    }
    if (upperCase) {
      upperCase = false;
      key += letter.toUpperCase();
    } else {
      key += letter.toLowerCase();
    }
  }
  return key;
}

// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty_(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}

// Returns true if the character char is alphabetical, false otherwise.
function isAlnum_(char) {
  return char >= 'A' && char <= 'Z' ||
    char >= 'a' && char <= 'z' ||
    isDigit_(char);
}

// Returns true if the character char is a digit, false otherwise.
function isDigit_(char) {
  return char >= '0' && char <= '9';
}

// Given a JavaScript 2d Array, this function returns the transposed table.
// Arguments:
//   - data: JavaScript 2d Array
// Returns a JavaScript 2d Array
// Example: arrayTranspose([[1,2,3],[4,5,6]]) returns [[1,4],[2,5],[3,6]].
function arrayTranspose_(data) {
  if (data.length == 0 || data[0].length == 0) {
    return null;
  }

  var ret = [];
  for (var i = 0; i < data[0].length; ++i) {
    ret.push([]);
  }

  for (var i = 0; i < data.length; ++i) {
    for (var j = 0; j < data[i].length; ++j) {
      ret[j][i] = data[i][j];
    }
  }

  return ret;
}



//------------------------------------------------------------------------------
//-- V2 export

function exportSheetV2(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = ss.getSheetByName('EngDB');
  var rowsData = getRowsData_(sheet, getExportOptions(e));

  var sheet = ss.getSheetByName('EngINFOS');
  var rowsDataInfos = getRowsData_(sheet, getExportOptions(e));

  var structure = improveJsonEngineers(rowsData, rowsDataInfos);
  //var json = JSON.stringify(rowsData);
  var json = makeJSON_(structure, getExportOptions(e));

  return displayText_(json);
}

function exportSheetV2SaveFiles(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var sheet = ss.getSheetByName('EngDB');
  var rowsData = getRowsData_(sheet, getExportOptions(e));

  var sheet = ss.getSheetByName('EngINFOS');
  var rowsDataInfos = getRowsData_(sheet, getExportOptions(e));

  var structure = improveJsonEngineers(rowsData, rowsDataInfos);

  saveTo(structure);
}

//------------------------------------------------------------------------------
//-- Engineer structure

// Enginner

function objEng () {
  this.name = null;
  this.location = {
    system: null,
    planet: null,
    station: null
  };
  this.allegiance = null;
  this.specialization = null;
  this.welcomeGift = null;
  this.requirements = null;
  this.modules = {};
  this.blueprints = [];
}

// Blueprint

function objBlueprint () {
  this.name = null;
  this.module = null;
  this.recipes = {};
}

// Component

function objComponent () {
  this.name = null;
  this.type = null;
}


//------------------------------------------------------------------------------
//-- Improve engineer struture

function improveJsonEngineers(rowsData, rowsDataInfos) {

  var fullStruct = {
    engineers:  {},
    blueprints: {},
    components:  {}
  };

  rowsData.forEach(function(row) {

    // Get engineer data

    var idEng = generateKeyObject(row.engineername);

    if(fullStruct.engineers[idEng] == undefined) {
      var objE = new objEng();
      objE.name = row.engineername;
      rowsDataInfos.forEach(function(infos) {
        var idEngInfo = generateKeyObject(infos.dbname);
        if(idEngInfo == idEng) {
          objE.allegiance      = infos.allegiance;
          objE.location.system = infos.system;
          objE.location.planet = infos.location;
          objE.specialization  = infos.engspec;
          objE.welcomeGift     = infos.welcomegift;
          objE.requirements    = infos.requirements;
          return;
        }
      });
    } else {
      var objE = fullStruct.engineers[idEng];
    }

    // Module data

    if(objE.modules[row.module] == undefined) {
      objE.modules[row.module] = 0;
    }
    if(objE.modules[row.module] < row.modlvl)
      objE.modules[row.module] = row.modlvl;

    //-- Blueprint data

    var idBlu = generateKeyObject(row.module + '-' + row.moduletype);

    if(fullStruct.blueprints[idBlu] == undefined) {
      var objB = new objBlueprint();
      objB.name = row.moduletype;
      objB.module = row.module;
    } else {
      var objB = fullStruct.blueprints[idBlu];
    }

    if(objE.blueprints.indexOf(idBlu) == -1) {
      objE.blueprints.push(idBlu);
    }

    //-- Conponent

    for(i=1; i<=5; i++) {

      var keyMat = 'mat'+i;
      if(row[keyMat] != undefined && row[keyMat] !== '') {
        var idCmp = generateKeyObject(row[keyMat]);

        if(fullStruct.components[idCmp] == undefined) {
          var objC = new objComponent();
          objC.name = row[keyMat];
        } else {
          var objC = fullStruct.components[idCmp];
        }
        fullStruct.components[idCmp] = objC;
      }
    }



    // Append to full struct

    fullStruct.engineers[idEng] = objE;
    fullStruct.blueprints[idBlu] = objB;


  });


  return fullStruct;

}

function generateKeyObject(nameElem) {

  var objKey = nameElem.toLowerCase()
    .replace(/\)/g,'')
    .replace(/\(/,'')
    .replace(/'/g,'')
    .replace(/ /g,'-');

  return objKey;

}

function saveTo (json) {

  var folderName = 'Engineers-data-json';
  var folder = getFolder(folderName);
  displayLinkText_(folder.getUrl());
  var filename = 'engineers-fullpack.json';
  setFile(filename,json,folder);
  var filename = 'engineers-fullpack.min.json';
  setFile(filename,json,folder,true);

  // Save engineers into separate files
  var folderEng = getFolder("engineers",folder);

  for(var idEng in json.engineers) {

    var filename = idEng+'.json';
    setFile(filename,json.engineers[idEng],folderEng);

  }

  // Save blueprints into separate files
  var folderBlueprint = getFolder("blueprints",folder);

  for(var idBlp in json.blueprints) {

    var filename = idBlp+'.json';
    setFile(filename,json.blueprints[idBlp],folderBlueprint);

  }



  return displayLinkText_(folder.getUrl());
}



function getFolder(newFolder, parent) {

  if(parent == undefined) parent = DriveApp;

  var folders = parent.getFolders();
  var theReturn = false,
      i=0,
      folderName = "",
      folder;

  while (folders.hasNext()) {
    folder = folders.next();
    folderName = folder.getName();

    if (folderName === newFolder) {
      return folder;
      break;
    };
  };

  return parent.createFolder(newFolder);

};
function setFile(newFile, json, parent, minified) {

  if(minified == undefined) minified = false;

  var files = parent.getFiles();
  var theReturn = false,
      i=0,
      fileName = "",
      file;

  while (files.hasNext()) {
    file = files.next();
    fileName = file.getName();

    if (fileName === newFile) {
      json = (!minified)
        ? makeJSON_(json, getExportOptions())
        : JSON.stringify(json);

      file.setContent(json);
      return;
      break;
    };
  };

  json = (!minified)
    ? makeJSON_(json, getExportOptions())
    : JSON.stringify(json);

  parent.createFile(newFile,json);


};