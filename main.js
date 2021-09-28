const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

fetch(url).then((resp) => resp.json()).then(function(data) {
    console.log("respuesta", data)
  let eventos = data;
  var temp = "";
  var relations = [];
  var names = [];
  for (let i = 0; i < eventos.length; i++) {
    if (eventos[i].squirrel === true){
      temp += "<tr class = 'table-danger'>";
      temp += "<th scope='row'>" + (i+1) + "</th>";
      temp += "<td>" + eventos[i].events + "</td>";
      temp += "<td>" + eventos[i].squirrel + "</td></tr>";
      document.getElementById('eventos').innerHTML = temp;
    }
    else{
      temp += "<tr>";
      temp += "<th scope='row'>" + (i+1) + "</th>";
      temp += "<td>" + eventos[i].events + "</td>";
      temp += "<td>" + eventos[i].squirrel + "</td></tr>";
      document.getElementById('eventos').innerHTML = temp;
    }
    for (let j = 0; j < eventos[i].events.length; j++) {
      if(!names.includes(eventos[i].events[j])){
      var tp = 0;
      var tn = 0;
      var fp = 0;
      var fn = 0;
      for (let k = 0; k < eventos.length; k++) {
        if (eventos[k].squirrel === false){
          if (eventos[k].events.includes(eventos[i].events[j])){
            fn +=1
          }
          else{ tn +=1}
        }
        else{
          if (eventos[k].events.includes(eventos[i].events[j])){
            tp +=1
          }
          else{ fp +=1}
        }
      }
      var mcc = ((tp*tn)-(fp*fn))/(Math.sqrt((tp+fp)*(tp+fn)*(tn+fp)*(tn+fn)))
      var aux = {'name' : eventos[i].events[j], 'mcc': mcc}
      relations.push(aux)
      names.push(eventos[i].events[j])
      }
    }
  }
  relations.sort(((a, b) => b['mcc'] - a['mcc']))
  var temp = "";
  for (let i = 0; i < relations.length; i++) {
    temp += "<tr>";
    temp += "<th scope='row'>" + (i+1) + "</th>";
    temp += "<td>" + relations[i]['name'] + "</td>";
    temp += "<td class = 'text-right'>" + relations[i]['mcc'] + "</td></tr>";
    document.getElementById('corr').innerHTML = temp;
  }
})
.catch(function(error) {
  console.log(error);
});

