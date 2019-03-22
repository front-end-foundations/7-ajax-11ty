document.addEventListener('click', clickHandlers)

function clickHandlers(){
  console.log(event.target)
  if (event.target.matches('button')){
    getData()
  }
}

var addContent = function(data){
  console.log(data)
	document.querySelector('.content').innerText = data[1].body;
}

var getData = function () {
	fetch('https://jsonplaceholder.typicode.com/photos')
  .then(response => response.json())
  .then(json => addContent(json))
}