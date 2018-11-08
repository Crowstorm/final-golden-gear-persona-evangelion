# GGPv2

https://github.com/Klaku/Canvas/commit/86410f3e9ab214d4f6b15060c828501564f136c1


<!DOCTYPE HTML>
<html>
 <head>
    <script type="text/javascript" charset="UTF-8">
        var canvas, c;
        var E = [250, 450];
        var d = 3200;
        
        var podstawa = scale([
            //Bottom side
            [20,60,10],
            [30,60,10],
            [30,60,-10],
            [20,60,-10],
             //Top Side
            [22,55,8],
            [28,55,8],
            [28,55,-8],
            [22,55,-8],
        ],10);
         var body = scale([
         //Bottom Range
            [23,55,7],
            [27,55,7],
            [27,55,-7],
            [23,55,-7],
         //Top Range
            [23,35,7],
            [27,35,7],
            [27,35,-7],
            [23,35,-7],
        ],10)
         var roof = scale([
            [25,30,0]
        ],10)
         var wingArm = scale([
            [25,40,-7],
            [25,40,-8]
        ], 10)
        
        var wings = scale([
            [25,50,-8],
            [25,30,-8],
            [15,40,-8],
            [35,40,-8]
        ],10)
         function draw1() {
             //Podstawa
            //Bottom Side
            line3D(podstawa[0],podstawa[1],"white");
            line3D(podstawa[1],podstawa[2],"white");
            line3D(podstawa[2],podstawa[3],"white");
            line3D(podstawa[3],podstawa[0],"white");
             //Top Side
            line3D(podstawa[4],podstawa[5],"white");
            line3D(podstawa[5],podstawa[6],"white");
            line3D(podstawa[6],podstawa[7],"white");
            line3D(podstawa[7],podstawa[4],"white");
             //Bottom/Top connectors
            line3D(podstawa[0],podstawa[4],"white");
            line3D(podstawa[1],podstawa[5],"white");
            line3D(podstawa[2],podstawa[6],"white");
            line3D(podstawa[3],podstawa[7],"white");
             //Body
            //Bottom Side
            line3D(body[0],body[1],"green");
            line3D(body[1],body[2],"green");
            line3D(body[2],body[3],"green");
            line3D(body[3],body[0],"green");
             //Top Side
            line3D(body[4],body[5],"green");
            line3D(body[5],body[6],"green");
            line3D(body[6],body[7],"green");
            line3D(body[7],body[4],"green");
             //Bottom/Top connectors
            line3D(body[0],body[4],"green");
            line3D(body[1],body[5],"green");
            line3D(body[2],body[6],"green");
            line3D(body[3],body[7],"green");
             //Roof
            line3D(body[4],roof[0],"red");
            line3D(body[5],roof[0],"red");
            line3D(body[6],roof[0],"red");
            line3D(body[7],roof[0],"red");
             //Smiglo
            //Ramie
            line3D(wingArm[0],wingArm[1],"blue");
             //Reszta smigiel
            line3D(wingArm[1], wings[0],"blue");
            line3D(wingArm[1], wings[1],"blue");
            line3D(wingArm[1], wings[2],"blue");
            line3D(wingArm[1], wings[3],"blue");
        }
         function animate() {
            //smiglo = tablica punktów do obrócenia o kąt 6 wokół punktu cube[5]
            rotateZVertex(wings, wingArm[0], 1);
            //Czyszczenie sceny
            clear();
            //Rysowanie ponowne sceny
            draw1();
        }
         //Template
        function scale(v, s) {
            for (var i = 0; i < v.length; i++) {
                for (var j = 0; j < v[i].length; j++) {
                    v[i][j] *= s;
                }
            }
            return v;
        }
         //Template
        function clear() {
            canvas = document.getElementById("canvas");
            if (!canvas.getContext) {
                return;
            }
            c = canvas.getContext("2d");
            c.clearRect(0, 0, canvas.width, canvas.height);
        }
        //Template
        function line3D(a, b, color) //Template
        {
            line(projectXY(a, d), projectXY(b, d), color);
        }
         //Template
        function line(a, b, style) //Template
        {
            canvas = document.getElementById("canvas");
            if (!canvas.getContext) {
                return;
            }
            c = canvas.getContext("2d");
            c.beginPath();
            c.moveTo(a[0], a[1]);
            c.lineTo(b[0], b[1]);
            c.strokeStyle = style || "rgb(200,0,0)";
            c.stroke();
        }
         //Template
        function projectXY(p, d) {
            var q = [];
            q[0] = (p[0] - E[0]) * d / (d + p[2]) + E[0];
            q[1] = (p[1] - E[1]) * d / (d + p[2]) + E[1];
            return q;
        }
         var play;
         /**
         * im większa liczba tym wolniejsza aplikacja
         */
        function start() {
            play = setInterval('animate()', 5);
        }
         //template
        function stop() {
            clearInterval(play);
        }
         //Template
        function keyDownHandler(e) {
            e = e || event;
            var keyCode = e.keyCode,
                letter = (String.fromCharCode(e.keyCode) || '').toLowerCase();
            if (37 == keyCode) { //strzałka w lewo
                translateVertex(podstawa, [-10, 0, 0]);
                translateVertex(body, [-10, 0, 0]);
                translateVertex(roof, [-10, 0, 0]);
                translateVertex(wingArm, [-10, 0, 0]);
                translateVertex(wings, [-10, 0, 0]);
                clear();
                draw1();
            }
            if (38 == keyCode) { //strzałka w górę
                translateVertex(podstawa, [0, -10, 0]);
                translateVertex(body, [0, -10, 0]);
                translateVertex(roof, [0, -10, 0]);
                translateVertex(wingArm, [0, -10, 0]);
                translateVertex(wings, [0, -10, 0]);
                clear();
                draw1();
            }
            if (39 == keyCode) { //strzałka w prawo
                translateVertex(podstawa, [10, 0, 0]);
                translateVertex(body, [10, 0, 0]);
                translateVertex(roof, [10, 0, 0]);
                translateVertex(wingArm, [10, 0, 0]);
                translateVertex(wings, [10, 0, 0]);
                clear();
                draw1();
            }
            if (40 == keyCode) { //strzałka w dół
                translateVertex(podstawa, [0, 10, 0]);
                translateVertex(body, [0, 10, 0]);
                translateVertex(roof, [0, 10, 0]);
                translateVertex(wingArm, [0, 10, 0]);
                translateVertex(wings, [0, 10, 0]);
                clear();
                draw1();
            }
            if (33 == keyCode) { //[page up]  (zbliĹĽanie)
                translateVertex(podstawa, [0, 0, -10]);
                translateVertex(body, [0, 0, -10]);
                translateVertex(roof, [0, 0, -10]);
                translateVertex(wingArm, [0, 0, -10]);
                translateVertex(wings, [0, 0, -10]);
                clear();
                draw1();
            }
            if (34 == keyCode) { //[page down] (oddalanie)
                translateVertex(podstawa, [0, 0, 10]);
                translateVertex(body, [0, 0, 10]);
                translateVertex(roof, [0, 0, 10]);
                translateVertex(wingArm, [0, 0, 10]);
                translateVertex(wings, [0, 0, 10]);
                clear();
                draw1();
            }
            if (90 == keyCode) { // z zmiejsza d
                d = d - 50;
                SetDivs();
            }
            if (65 == keyCode) { // a zwieksza d
                d = d + 50;
                SetDivs();
            }
            if (88 == keyCode) { // x zmiejsza x kamery
                E[0] = E[0] - 50;
                SetDivs();
            }
            if (83 == keyCode) { // s zwieksza x kamery
                E[0] = E[0] + 50;
                SetDivs();
            }
            if (67 == keyCode) {
                E[1] = E[1] - 50;
                SetDivs();
            }
            if (68 == keyCode) {
                E[1] = E[1] + 50;
                SetDivs();
            }
            return false;
        }
         //Template
        function napraw() {
            E = [250, 450];
            d = 3200;
            SetDivs();
            clear();
            draw1();
        }
         //Template
        function degreesToRadians(angle) {
            return radians = (Math.PI / 180) * angle;
        }
         //Template
        function rotateX(p, q, angle) {
            var pom = p[1];
            var f = degreesToRadians(angle);
             p[1] = ((p[1] - q[1]) * Math.cos(f) - (p[2] - q[2]) * Math.sin(f)) + q[1];
            p[2] = ((pom - q[1]) * Math.sin(f) + (p[2] - q[2]) * Math.cos(f)) + q[2];
             return p;
        }
         //Template
        function rotateXVertex(v, q, angle) {
            for (var i = 0; i < v.length; i++) {
                v[i] = rotateX(v[i], q, angle);
            }
            return v;
        }
         //Template
        function rotateY(p, q, angle) {
            var pom = p[2];
            var f = degreesToRadians(angle);
             p[2] = ((p[2] - q[2]) * Math.cos(f) - (p[0] - q[0]) * Math.sin(f)) + q[2];
            p[0] = ((pom - q[2]) * Math.sin(f) + (p[0] - q[0]) * Math.cos(f)) + q[0];
             return p;
        }
         //Template
        function rotateYVertex(v, q, angle) {
            for (var i = 0; i < v.length; i++) {
                v[i] = rotateY(v[i], q, angle);
            }
            return v;
        }
         //Template
        function rotateZ(p, q, angle) {
            var pom = p[0];
            var f = degreesToRadians(angle);
             p[0] = ((p[0] - q[0]) * Math.cos(f) - (p[1] - q[1]) * Math.sin(f)) + q[0];
            p[1] = ((pom - q[0]) * Math.sin(f) + (p[1] - q[1]) * Math.cos(f)) + q[1];
             return p;
        }
         //Template
        function rotateZVertex(v, q, angle) {
            for (var i = 0; i < v.length; i++) {
                v[i] = rotateZ(v[i], q, angle);
            }
            return v;
        }
         //Template
        function translate(a, b) {
            a[0] = a[0] + b[0];
            a[1] = a[1] + b[1];
            a[2] = a[2] + b[2];
            return a;
        }
         //Template
        function translateVertex(v, b) {
            for (i = 0; i < v.length; i++) {
                translate(v[i], b);
            }
            return v;
        }
         //Moje ale działa jak Template
        function SetDivs() {
            document.getElementById("E").innerHTML = "Obserwator: " + E[0] + ":" + E[1];
            document.getElementById("D").innerHTML = "Ogniskowa: " + d;
            clear();
            draw1();
        }
    </script>
</head>
 <body style="background-color:#111;" onkeydown="keyDownHandler(event)" onload="SetDivs()">
    <center>
        <canvas id="canvas" width="500" height="800" style="background-color:#333333;"></canvas></center>
    <br />
    <center>
        <button onclick="stop(); start();">Start</button>
        <button onclick="stop();">Stop</button>
        <br />
        <br />
        <button onclick="draw1();">Rysuj</button>
        <button onclick="napraw();">Camera Defaults</button>
        <br />
        <br />
        <div style="border:1px solid #fff;border-radius:5px; position:fixed; top:30px; left:0px; color:#aaa; font-size:22px; background-color:#444; padding:10px;">
            <div id="E"></div>
            <div id="D"></div>
        </div>
        <div style="border:1px solid #fff;border-radius:5px; position:fixed; bottom:30px; left:0px; color:#aaa; font-size:22px; background-color:#444; padding:10px;">
            <span>Ogniskowa [a]/[z]</span><br />
            <span>Obserwator X [s]/[x]</span><br />
            <span>Obserwator Y[d]/[c]</span><br />
            <span>Poruszanie [Strzałki]</span><br />
            <span>Skalowanie [PgUp/PgDown]</span>
        </div>
    </center>
</body>
 </html> 
