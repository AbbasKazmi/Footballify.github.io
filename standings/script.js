var premierLeague = document.queryselector('.prem')
var p = document.querySelector('.p')
var laLiga = document.queryselector('.laliga')
var l = document.querySelector('.l')
var bundesliga = document.queryselector('.bund')
var b = document.querySelector('.b')
var serieA = document.queryselector('.seriea')
var s = document.querySelector('.s')
var ligue1 = document.queryselector('.ligue1')
var lig = document.querySelector('.lig')
var championsLeague = document.queryselector('.ucl')
var u = document.querySelector('.u')

function premFunc() {
p.classList.remove("hidden")
l.classList.add("hidden")
b.classList.add("hidden")
s.classList.add("hidden")
lig.classList.add("hidden")
u.classList.add("hidden")
}

function laligaFunc() {
    p.classList.add("hidden")
    l.classList.remove("hidden")
    b.classList.add("hidden")
    s.classList.add("hidden")
    lig.classList.add("hidden")
    u.classList.add("hidden")
    }

function bundFunc() {
p.classList.add("hidden")
l.classList.add("hidden")
b.classList.remove("hidden")
s.classList.add("hidden")
lig.classList.add("hidden")
u.classList.add("hidden")
}
function serieaFunc() {
p.classList.add("hidden")
l.classList.add("hidden")
b.classList.add("hidden")
s.classList.remove("hidden")
lig.classList.add("hidden")
u.classList.add("hidden")
    }
function ligFunc() {
p.classList.add("hidden")
l.classList.add("hidden")
b.classList.add("hidden")
s.classList.add("hidden")
lig.classList.remove("hidden")
u.classList.add("hidden")
}
function uclFunc() {
p.classList.add("hidden")
l.classList.add("hidden")
b.classList.add("hidden")
s.classList.add("hidden")
lig.classList.add("hidden")
u.classList.remove("hidden")
}
// ON CLICK SHOW TABLES
premierLeague.addEventListener('click', premFunc)
laLiga.addEventListener('click', laligaFunc)
bundesliga.addEventListener('click', bundFunc)
serieA.addEventListener('click', serieaFunc)
ligue1.addEventListener('click', ligFunc)
championsLeague.addEventListener('click', uclFunc)

