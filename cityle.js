function buttonClicked()
{
    document.getElementById('buttonImage').src = 'new-image.jpg';
    document.getElementById('buttonId').disabled = true;
}



String.format = function() {
            var s = arguments[0];
            for (var i = 0; i < arguments.length - 1; i += 1) {
                var reg = new RegExp('\\{' + i + '\\}', 'gm');
                s = s.replace(reg, arguments[i + 1]);
            }
            return s;
        };


function updateRow (n, data) {
    var field_1 = document.getElementById(String.format("guess_{0}", n));
    var field_2 = document.getElementById(String.format("guess_{0}_pop", n));
    var field_3 = document.getElementById(String.format("guess_{0}_cou", n));
    var field_4 = document.getElementById(String.format("guess_{0}_con", n));
    field_1.style.width = '175px'; 
    field_2.style.display = 'inline';
    field_2.style.background = 'red'
    field_3.style.display = 'inline';
    field_4.style.display = 'inline';
    document.getElementById("city_image").style.filter = String.format('blur({0}px)', 8-(n*1.5));
    if (data.guess_tf == "1") {
        LockGame();
        field_1.style.background = 'green';
        field_2.style.background = 'green'
        field_2.value = String.format("{0}M‏‏‎‎", data.guess_pop);
    } else {
        field_1.style.background = 'red';
    }
    if (data.guess_tf == "0") {
        if (data.guess_pop_tf == "0") {
            field_2.value = String.format("↑ {0}M", data.guess_pop);
        } else {
            field_2.value = String.format("↓ {0}M", data.guess_pop);
        }
    }
    if (data.guess_cou_tf == "1") {
        field_3.style.background = 'green';
    } else {
        field_3.style.background = 'red';
    }
    if (data.guess_con_tf == "1") {
        field_4.style.background = 'green';
    } else {
        field_4.style.background = 'red';
    }
    document.getElementById(String.format("guess_{0}", n)).value = data.guess; 
    document.getElementById(String.format("guess_{0}_cou", n)).value = data.guess_cou;
    document.getElementById(String.format("guess_{0}_con", n)).value = data.guess_con;
    
    if (n == "5") {
        LockGame();
        if (data.guess_tf == "1") {
            return;
        }
        RevealAnswer();
    }
    
}

function LockGame () {
    document.getElementById("guess").style.visibility = 'hidden';
    document.getElementById("guess_btn").style.visibility = 'hidden';
    document.getElementById("city_image").style.filter = 'blur(0px)';
    }
    
    
function RevealAnswer () {
    var url = "/answer";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        key: "999",
    }));
    reply = xhr.status;
    data = JSON.parse(xhr.responseText);
    document.getElementById("reveal_answer").style.visibility = 'visible';
    document.getElementById("reveal_answer_text").style.visibility = 'visible';
    document.getElementById("reveal_answer_close").style.visibility = 'visible';
    document.getElementById("reveal_answer_text").textContent = data.text
    }

function hide_answer () {
    document.getElementById("reveal_answer").style.visibility = 'hidden';
    document.getElementById("reveal_answer_text").style.visibility = 'hidden';
    document.getElementById("reveal_answer_close").style.visibility = 'hidden';
    }

function submitResponse () {
    
    var guess = String(document.getElementById('guess').value)
    if (guess == ""){
        return;
    }

    var url = "/guess";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        guess: guess,
    }));
    reply = xhr.status;
    data = JSON.parse(xhr.responseText);
    if (reply == 201){
        if (document.getElementById('guess_1').value == ""){
            updateRow(1, data);
        } else if (document.getElementById('guess_2').value == ""){
            updateRow(2, data);
        } else if (document.getElementById('guess_3').value == ""){
            updateRow(3, data);
        } else if (document.getElementById('guess_4').value == ""){
            updateRow(4, data);
        } else if (document.getElementById('guess_5').value == ""){
            updateRow(5, data);
        }
        document.getElementById('guess').value = ''
        
    } else {
        return;
    }

    }


function click (e) {
  if (!e)
    e = window.event;
  if ((e.type && e.type == "contextmenu") || (e.button && e.button == 2) || (e.which && e.which == 3)) {
    if (window.opera)
      window.alert("");
    return false;
  }
}
if (document.layers)
  document.captureEvents(Event.MOUSEDOWN);
document.onmousedown = click;
document.oncontextmenu = click;
   
