var coinList = document.getElementById('coinList');
var liste = document.getElementById('liste');
var txtBTC = document.getElementById('txtBTC');
var txtETH = document.getElementById('txtETH');
var txtIOTA = document.getElementById('txtIOTA');
var txtREQ = document.getElementById('txtREQ');


var requestURL = 'https://api.coinmarketcap.com/v1/ticker/';
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', requestURL);


function getCoins(){
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
  };
  ourRequest.send();
}

function renderHTML(data){
  var htmlString = '';
  for (var i = 0; i < data.length; i++) {
    htmlString += '<tr>'
                  +' <td>' + data[i].rank + '</td>'
                  +'<td> ' + data[i].symbol + '</td>'
                  +'<td>' + data[i].name + '</td>'
                  +'<td>$ ' + data[i].market_cap_usd + '</td>'
                  +'<td>$ ' + data[i].price_usd + '</td>'
                  +'<td>% ' + data[i].percent_change_1h + '</td>'
                  +'<td>% ' + data[i].percent_change_24h + '</td>'
                  +'<td>% ' + data[i].percent_change_7d + '</td>'
                  +'<td>  ' + convertTimestamp(data[i].last_updated) + '</td>'
                  +'</tr>';
  }
  liste.insertAdjacentHTML('beforeend',htmlString);
  txtBTC.value = '$ ' + data[0].price_usd;
  txtETH.value = '$ ' + data[1].price_usd;
  txtIOTA.value = '$ ' + data[6].price_usd;
  txtREQ.value = '$ ' + data[83].price_usd;
};

function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),
		dd = ('0' + d.getDate()).slice(-2),
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),
		ampm = 'AM',
		time;

	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}
  
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

	return time;
}
