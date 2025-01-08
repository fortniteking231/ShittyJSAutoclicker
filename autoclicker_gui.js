javascript:(function() {
    setTimeout(function() {
        document.body.innerHTML += `
            <div class="maingui" id="autoclicker_gui">
                <div>
                    <div id="dragbtn"></div>
                </div>
                <hr style="background-color: black; border: none; height: 0.2vh;">
                <h1 id="IsItRunning?">Running: False</h1>
                <hr style="background-color: black; border: none; height: 0.2vh;">
                <button class="autoclickertogglebutton" type="button" id="toggle_button">
                    Toggle Autoclicker
                </button>
                <input type="number" id="cps" placeholder="CPS">
                <p><strong>You Can Use The Keybind Ctrl+E To Toggle It</strong></p>
            </div>
            <style>
                .maingui {
                    width: 20%;
                    height: auto;
                    border: 1px solid black;
                    font-family: 'Courier New', Courier, monospace;
                    text-align: center;
                    background-color: gray;
                    border: 0.4vh solid black;
                    opacity: 98%;
                    padding: 1vh;
                    position: absolute;
                }
                .autoclickertogglebutton {
                    cursor: pointer;
                    width: 80%;
                    height: auto;
                    padding: 1vh;
                    border-radius: 1vh;
                    margin-bottom: 1vh;
                    outline: none;
                }
                #cps {
                    width: 40%;
                    height: 5vh;
                    outline: none;
                    font-size: larger;
                    text-align: center;
                }
                #dragbtn {
                    width: 105%;
                    height: 2vh;
                    background-color: black;
                    margin-top: -1vh;
                    margin-left: -1vh;
                    cursor: move;
                }
            </style>
        `;

        let autoclicker_status = false;
        let clickInterval;
        let mousepos = { x: 0, y: 0 };

        document.addEventListener('mousemove', function(event) {
            mousepos.x = event.clientX;
            mousepos.y = event.clientY;
        });

        function toggleautoclicker() {
            if (!autoclicker_status) {
                autoclicker_status = true;
                document.getElementById('IsItRunning?').textContent = 'Running: True';
                startauto();
            } else {
                autoclicker_status = false;
                document.getElementById('IsItRunning?').textContent = 'Running: False';
                stopauto();
            }
        }

        function startauto() {
            console.log("Autoclicker started");

            let clickspersecond = document.getElementById('cps').value;
            if (isNaN(clickspersecond) || clickspersecond <= 0) {
                stopauto();
                autoclicker_status = false;
                document.getElementById('IsItRunning?').textContent = 'Running: False';
                alert("Invalid CPS Value");
                return;
            }

            document.getElementById('cps').disabled = true;

            if (clickInterval) clearInterval(clickInterval);

            clickInterval = setInterval(() => {
                var elementtoclick = document.elementFromPoint(mousepos.x, mousepos.y);
                if (elementtoclick) {
                    elementtoclick.click();
                }
            }, 1000 / clickspersecond);
        }

        function stopauto() {
            document.getElementById('cps').disabled = false;
            console.log("Autoclicker stopped");
            clearInterval(clickInterval);
        }

        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === 'e') {
                toggleautoclicker();
            }
        });

        document.getElementById('toggle_button').addEventListener('click', toggleautoclicker);

        const automovegui = document.getElementById('dragbtn');
        let UIisDragging = false;

        automovegui.addEventListener('mousedown', function(event) {
            UIisDragging = true;
        });

        document.addEventListener('mousemove', function(event) {
            if (UIisDragging) {
                let autoclickergui = document.getElementById('autoclicker_gui');
                autoclickergui.style.left = event.clientX + 'px';
                autoclickergui.style.top = event.clientY + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            UIisDragging = false;
        });

    }, 500); // Delayed execution to ensure DOM elements exist
})();
