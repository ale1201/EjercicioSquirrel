const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('eventos');

fetch(url).then((resp) => resp.json()).then(function(data) {
    console.log("respuesta", data)
  let eventos = data;
  return eventos.map(function(event) {
    let li = createNode('li');
    let span = createNode('span');
    span.innerHTML = `${event.events}`;
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});
