let socket = io();
let title = document.getElementById('title');
let price = document.getElementById('price');
let thumbnail = document.getElementById('thumbnail');
let guardar = document.getElementById('Guardar');
let log = document.getElementById('log');
let tabla = document.getElementById('tabla');
let mail = document.getElementById('mail');
let enviar = document.getElementById('Enviar')
let chatBox = document.getElementById('chatBox');
let user;


mail.onchange = ()=>{
    user = mail.value
}

enviar.onclick = ()=>{
    function validarEmail(valor) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)){
         return true
        } else {
         alert("La dirección de email es incorrecta.");
        }
    }

    if(chatBox.value.trim().length>0 && validarEmail(mail.value)){
        let ahora = new Date();
        let fecha = ahora.getDate() + '/' + ( ahora.getMonth() + 1 ) + '/' + ahora.getFullYear();
        let hora = ahora.getHours() + ':' + ahora.getMinutes() + ':' + ahora.getSeconds();
        socket.emit('message',{user:user,message:chatBox.value.trim(),fecha:fecha,hora:hora});
        chatBox.value="";
    }
}

socket.on('log',data=>{
    let message="";
    data.forEach(log => {
        message=message + `<h7 style="color:rgb(111, 70, 2);"><b style="color:rgb(2, 21, 248);">${log.user}</b> [${log.fecha} ${log.hora}]: <i style="color:rgb(9, 156, 2);">${log.message}</i></h7></br>`
    })
    log.innerHTML=message;
})



guardar.onclick = ()=>{
    if(title.value.trim().length>0 && price.value.trim().length>0 && thumbnail.value.trim().length>0){
        socket.emit('guardar',{title:title.value,price:price.value,thumbnail:thumbnail.value});
        title.value="";
        price.value="";
        thumbnail.value="";

    }
}

socket.on('listar',data=>{
    let tbody = document.getElementById('tbody');
    if(tbody !== null) tabla.removeChild(tbody);
    tbody = document.createElement("tbody");
    tbody.setAttribute("id","tbody");
    data.forEach(producto => {
        let fila = document.createElement("tr");
        let celda1 = document.createElement("td");
        celda1.appendChild(document.createTextNode(producto.title));
        let celda2 = document.createElement("td");
        celda2.appendChild(document.createTextNode(producto.price));
        let celda3 = document.createElement("td");
        celda3.appendChild(document.createTextNode(producto.thumbnail));
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(celda3);
        tbody.appendChild(fila)
        tabla.appendChild(tbody);
        
    })
})


