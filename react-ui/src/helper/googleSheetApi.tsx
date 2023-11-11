import axios from "axios";

export default function GetGoogleSheet(onSuccess : (result : any[]) => void, onError: (result : any) => void) {
    const options = {
        method: 'GET',
        url: '/data'
        //url: "http://localhost:5000",
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
