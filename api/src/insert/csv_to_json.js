let csvToJson = require('convert-csv-to-json');

let fileInputName = 'music_sheet.csv';
let fileOutputName = 'music_sheet.json';

csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);
