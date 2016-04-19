
var loading = function (e) {
  e.preventDefault()
  e.stopPropagation()
  e.target.classList.add('loading')
  e.target.setAttribute('disabled', 'disabled')
  setTimeout(function () {
    e.target.classList.remove('loading')
    e.target.removeAttribute('disabled')
    document.getElementById('color').value.submit()
  }, 500)
}

var btns = document.querySelectorAll('button')
for (var i = btns.length - 1; i >= 0;i--) {
  btns[i].addEventListener('click', loading)
}
