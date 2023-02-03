const main = document.querySelectorAll('main')
const root = document.querySelectorAll(':root')
const input = document.getElementById('calculationArea')
const resultInput = document.getElementById('result')
const body = document.getElementById('body')
const switcher = document.getElementById('switcher')

const allowedKeys = [ "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "%", " "]

document.querySelectorAll('.charKey').forEach(function(charKeyBtn) {
    charKeyBtn.addEventListener('click', function() {
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

document.getElementById('clear').addEventListener('click', function()
{
    input.value = ''
    input.focus()
})

input.addEventListener('keydown', function(ev) {
    ev.preventDefault()
    if (allowedKeys.includes(ev.key)) {
        input.value += ev.key 
    }

    if(ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1)
    }

    if(ev.key === 'Enter') {
        calculate()
    }
})

document.getElementById('equal').addEventListener('click', calculate)

function calculate() {
    resultInput.value = 'Error'
    resultInput.classList.add('error')

    const result = eval(input.value)
    resultInput.value = "= " + result

    resultInput.classList.remove('error')
}

document.getElementById('copy').addEventListener('click', function(ev) {
    const button = ev.currentTarget

    if(button.innerText === 'Copy') {
        navigator.clipboard.writeText(resultInput.value)
        button.innerText = 'Copied'
        button.classList.add('success')
    } else
    {
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})

switcher.onclick = function() {

    if(switcher.innerText == 'Theme Light') {
        body.style.background = '#fff';
        body.style.transition = '0.5s ease-in-out';
        switcher.classList.add('themeSwitcher-light');
        switcher.classList.remove('themeSwitcher');
        switcher.innerText = 'Theme Dark';
        document.getElementById('copy').classList.add('copy-light');
        document.getElementById('copy').classList.remove('copy');
        document.getElementById('title').style.color = '#000';
        resultInput.classList.remove('input');
        resultInput.classList.add('input-light');
        input.classList.remove('input');
        input.classList.add('input-light');
    } else {
        body.style.background = '#000';
        switcher.classList.add('themeSwitcher');
        switcher.innerText = 'Theme Light';
        switcher.classList.remove('themeSwitcher-light');
        document.getElementById('copy').classList.remove('copy-light');
        document.getElementById('copy').classList.add('copy');
        document.getElementById('title').style.color = '#fff';
        resultInput.classList.remove('input-light');
        resultInput.classList.add('input');
        input.classList.remove('input-light');
        input.classList.add('input');
    }
}