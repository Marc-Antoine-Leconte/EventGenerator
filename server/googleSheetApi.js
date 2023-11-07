import GSheetReader from 'g-sheets-api';
import dotenv from 'dotenv';

const myGoogleSheetUrl = process.env.GOOGLE_SHEET_URL;
const myGoogleSheetUrlInTheWeb = process.env.GOOGLE_SHEET_URL_IN_WEB;

const options = {
  apiKey: process.env.API_KEY,
  sheetId: process.env.SHEET_ID,
  sheetNumber: 1,
  //sheetName: 'myCustomSheetName', // if sheetName is supplied, this will take precedence over sheetNumber
  returnAllResults: true,
  //filter: {
  //  'department': 'archaeology',
  //  'module description': 'introduction'
  //},
  //filterOptions: {
  //  operator: 'or',
  //  matching: 'loose'
  //}
}

export function GetGoogleSheet(onSuccess, onError) {
  GSheetReader(
    options,
    results => {
      console.log('Results => ', results);
      onSuccess(results);
    },
    error => {
      console.log('There was an error (optional) => ', error);
      onError();
      // OPTIONAL: handle errors here
    }).catch((err) => {
      console.log('There was an error (catch) => ', err);
      // do something with the error message here
    });
}