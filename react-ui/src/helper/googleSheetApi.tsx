import axios from "axios";

export default function GetGoogleSheet(onSuccess: (result: any[]) => void, onError: (result: any) => void, sheetTab: string) {
  let sheetTabValue = 0;
  let sheetNameValue = null;

  if (sheetTab.length > 0 && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(sheetTab[0])) {
    sheetTabValue = Number(sheetTab)
  } else if (sheetTab.length > 0) {
    sheetNameValue = sheetTab;
  }

  let options: any = {
    method: 'GET',
    url: '/data',
    params: {
      sheetId: 1,
      //sheetName: "ecclesia3event"
    }
    //url: "http://localhost:5000",
  }

  if (sheetNameValue != null) {
    options.params.sheetName = sheetNameValue;
  }

  axios.request(options)
    .then(function (response) {
      console.log('SUCCESS WHILE FETCHING DATA', response);
      onSuccess(response.data)
    })
    .catch(function (error) {
      console.log('ERROR WHILE FETCHING DATA', error);
      onError(error);
    })
}
