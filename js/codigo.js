{
     calc = {
        contenido :"",
        elemento1 :"",
        elemento2 :"",
        result : "0",
        coma: false,
        numero1: 0,
        numero2: 0,
        hayOperador: false,
        cajaResultado: "0",
        operador: "",
        botones : ["CE", "C", "%", "+", "7", "8", "9", "-", "4", "5", "6", "x", "1", "2", "3", "/", "0" ,"+/-", ".", "=" ],

        crearCalc: function() {
            calc.contenido = document.createElement("div");
            calc.contenido.id = "contenido";
            document.body.appendChild(calc.contenido);
        },
        
        crearResultado: function() {
            calc.elemento1 = document.createElement("div");
            calc.elemento1.id = "resultado";
            calc.contenido.appendChild(calc.elemento1);
            calc.result = document.createElement("input");
            calc.result.id = "result";
            calc.result.disabled = "disabled";
            calc.result.value = "0";
            calc.result.type = "text";
            calc.elemento1.appendChild(calc.result);
        },
        
        crearBotones: function() {
            calc.elemento2 = document.createElement("div");
            calc.elemento2.id = "botones";
            calc.contenido.appendChild(calc.elemento2);
            for (var i = 0; i < 20; i++) {                  
                let boton = document.createElement('input');     
                let atributoType = document.createAttribute('type');
                let atributoValue = document.createAttribute('value');
                let atributoID = document.createAttribute('id');
                boton.type = "button";
                boton.value = calc.botones[i];
                boton.id = calc.botones[i];
                calc.elemento2.appendChild(boton); 
            }
            calc.cajaResultado = document.getElementById("result");   
        },

        crearTodo: function() {
            calc.crearCalc();
            calc.crearResultado();
            calc.crearBotones();
        },

        iniciar: function() {
            for (var i = 0; i < 20; i++) {           
                switch(calc.botones[i]) {
                    case 'CE':
                         document.getElementById(calc.botones[i]).onclick = calc.borrarTodo;
                         break;
                    case 'C':
                         document.getElementById(calc.botones[i]).onclick = calc.borrar;
                         break;
                    case '=': 
                        document.getElementById(calc.botones[i]).onclick = calc.calcular;
                        break;
                    case '.':
                         document.getElementById(calc.botones[i]).onclick = calc.ponerComa;
                         break;
                    case '+/-':
                        document.getElementById(calc.botones[i]).onclick = calc.negativo;
                        break;
                    case '%': 
                        document.getElementById(calc.botones[i]).onclick = calc.porcentaje;
                        break;
                    default:
                        document.getElementById(calc.botones[i]).onclick = calc.añadirNum;
                        break; 
                }  
            }
        },
        añadirNum: function() {
        
            if (calc.cajaResultado.value == "0"){              
                if(this.value != 0 && this.value != '+' && this.value != '-' && this.value != 'x' && this.value != '/'){
                    calc.numero1 = this.value;
                    calc.cajaResultado.value = this.value;
                }            
            }else if (this.value == '+' || this.value == '-' || this.value == 'x' || this.value == '/' ){
                if(calc.hayOperador){
                    calc.calcular();
                }
                calc.operador = this.value;
                calc.hayOperador = true;
                
            }else { 
                
                if (calc.operador != "") {
                    if (calc.numero2 == 0){
                        calc.numero2 = this.value;
                    }else{
                        calc.numero2 += this.value;
                    }
                    calc.cajaResultado.value = calc.numero2
                }else{
                    
                    calc.numero1 = this.value;
                    calc.cajaResultado.value = calc.numero1;
                }
                    

            }
        },
        borrarTodo: function() {
            calc.cajaResultado.value = "0";
            calc.numero1 = 0;
            calc.numero2 = 0;
        },
        borrar: function() {
            calc.cajaResultado.value = calc.cajaResultado.value.substring(0, calc.cajaResultado.value.length-1)
            if(calc.cajaResultado.value == ""){
                calc.cajaResultado.value = "0";
                calc.numero1 = 0;
                calc.numero2 = 0;
            }

        },
        negativo: function(){
            if(calc.numero2 != 0){
                if(Math.sign(calc.numero2) == 1){
                    calc.numero2 = -Math.abs(calc.numero2); 
                }else{
                    calc.numero2 = Math.abs(calc.numero2);
                }
                calc.cajaResultado.value = calc.numero2;
            }else{
                if(Math.sign(calc.numero1) == 1){ 
                    calc.numero1 = -Math.abs(calc.numero1);
                }else{
                    calc.numero1 = Math.abs(calc.numero1);
                }
                calc.cajaResultado.value = calc.numero1;
            }

        },
        ponerComa: function() {
            if(calc.cajaResultado.value.indexOf('.') == -1) {
                if (calc.numero2 == 0){
                    calc.numero1 += '.';
                    calc.cajaResultado.value = calc.numero1;
                }else{
                    calc.numero2 += '.';
                    calc.cajaResultado.value = calc.numero2;
                }
            }
        },
        calcular: function(){
            switch(calc.operador){
                case '+': 
                    calc.cajaResultado.value = (parseFloat(calc.numero1) + parseFloat(calc.numero2));
                    break;
                case '-': 
                    calc.cajaResultado.value = (parseFloat(calc.numero1) - parseFloat(calc.numero2));
                    break;
                case 'x': 
                    calc.cajaResultado.value = (parseFloat(calc.numero1) * parseFloat(calc.numero2));
                    break;
                case '/': 
                    calc.cajaResultado.value = (parseFloat(calc.numero1) / parseFloat(calc.numero2));
                    break;
            }
            calc.numero1 = calc.cajaResultado.value;
            calc.numero2 = 0;
            calc.operador = "";
            
        },
        porcentaje: function(){
            if(calc.numero2 == 0){
                    calc.cajaResultado.value = (calc.numero1 /100);
                    calc.numero1 = calc.cajaResultado.value;
            }else{
                    calc.cajaResultado.value = (calc.numero2 /100);
                    calc.numero2 = calc.cajaResultado.value;
            }
        }
    };
 
    calc.crearTodo();
    calc.iniciar();
}