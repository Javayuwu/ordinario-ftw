window.onload = function () {
    fetch('datos/datos.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const productos = xml.getElementsByTagName("producto");

            const tablaProductos = document.getElementById("tabla-productos");
            if (tablaProductos) { 
                const tablaBody = tablaProductos.getElementsByTagName("tbody")[0];
    
                tablaBody.innerHTML = ''; 
                for (let i = 0; i < productos.length; i++) {
                    const nombre = productos[i].getElementsByTagName("nombre")[0].textContent;
                    const precio = productos[i].getElementsByTagName("precio")[0].textContent;
                    const imagen = productos[i].getElementsByTagName("imagen")[0].textContent;
                    const tipo = productos[i].getElementsByTagName("tipo")[0].textContent;
                    const marca = productos[i].getElementsByTagName("marca")[0].textContent;
                    const enlace = productos[i].getElementsByTagName("enlace")[0]?.textContent || '#'; 
 

                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                    
                        <td>${nombre}</td>
                        <td>$${precio}</td>
                        <td><img src="${imagen}" alt="${nombre}" width="100"></td>
                        <td>${tipo}</td>
                        <td>${marca}</td>
                    `;
                    fila.style.cursor = 'pointer';
                    fila.setAttribute('role','link');
                    fila.setAttribute('tabindex','0');

                    fila.addEventListener('click',function(){
                        window.open(enlace, '_blank');
                    });

                    fila.addEventListener('keydown',function(event){
                        if (event.key === 'Enter'){
                            window.open(enlace,'_blank');
                        }
                    });
                    tablaBody.appendChild(fila);
                }
            }

            const ProductosDestacadosContainer = document.getElementById("productos-destacados-container");
            if (ProductosDestacadosContainer) {
                ProductosDestacadosContainer.innerHTML = ''; 

                
                const productosToShow = Math.min(productos.length, 6); 

                for (let i = 0; i < productosToShow; i++) {
                    const nombre = productos[i].getElementsByTagName("nombre")[0].textContent;
                    const precio = productos[i].getElementsByTagName("precio")[0].textContent;
                    const imagen = productos[i].getElementsByTagName("imagen")[0].textContent;
                    const enlace = productos[i].getElementsByTagName("enlace")[0].textContent; 

                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card"); 

                    productCard.innerHTML = `
                        <a href="${enlace}" target="_blank" aria-label="Ver detalles de ${nombre}">
                            <img src="${imagen}" alt="${nombre}">
                            <h3>${nombre}</h3>
                            <h4>$${precio}</h4>
                        </a>
                    `;
                    
                    ProductosDestacadosContainer.appendChild(productCard);
                }
            }

            const noticias = xml.getElementsByTagName("noticia");
            const noticiasContainer = document.getElementById("noticias-destacadas");

            if (noticias.length > 0 && noticiasContainer) {
                if (noticias.length > 0 && noticiasContainer) {
                    for (let i = 0; i < noticias.length; i++) {
                        const titulo = noticias[i].getElementsByTagName("titulo")[0].textContent;
                        const contenido = noticias[i].getElementsByTagName("contenido")[0].textContent;
                        const imagen = noticias[i].getElementsByTagName("imagen")[0].textContent;

                        const noticiaHTML = `
                            <article class="noticia">
                                <img src="${imagen}" alt="${titulo}" class="noticia-img">
                                <div class="noticia-contenido">
                                    <h3>${titulo}</h3>
                                    <p>${contenido}</p>
                                </div>
                            </article>
                        `;

                        noticiasContainer.innerHTML += noticiaHTML;
                    }
                }


                const noticiaHTML = `
                    <article class="noticia">
                        <img src="${imagen}" alt="${titulo}" class="noticia-img">
                        <div class="noticia-contenido">
                            <h3>${titulo}</h3>
                            <p>${contenido}</p>
                        </div>
                    </article>
                `;

                noticiasContainer.innerHTML += noticiaHTML;
            }

        
        })
        .catch(error => {
            console.error("Error al cargar el archivo XML:", error);
        });
    const selectInteres = document.getElementById("interes");
    if (selectInteres) {
        selectInteres.setAttribute("aria-expanded", "false");

        selectInteres.addEventListener("focus", () => {
            selectInteres.setAttribute("aria-expanded", "true");
        });

        selectInteres.addEventListener("blur", () => {
            selectInteres.setAttribute("aria-expanded", "false");
        });
    }
      
};