# 🎥 Guion para Video de Presentación: ZapatoFlex S.A.S.
**Duración Objetivo:** 15 minutos.

**Consejo de Preparación:** Ten abierto de antemano tu Visual Studio Code, tus Diapositivas con los Diagramas UML y tu navegador web abierto en la página `http://localhost:8000/docs`.

---

### [Minuto 0:00 - 02:00] 1. Introducción y Análisis de Requisitos
*Lo que muestras en pantalla:* La portada de tu presentación.

**💬 Diálogo a decir:**
> "Hola a todos. Nuestro equipo está presentando la solución arquitectónica para la empresa física **ZapatoFlex S.A.S.**  Durante nuestro análisis, descubrimos que ZapatoFlex necesita expandirse hacia el comercio electrónico mediante una plataforma moderna, segura, y sobre todo escalable a la nube.
>
> Notamos que los requisitos no funcionales son los más retadores: La empresa exige soportar alto tráfico por temporadas promocionales y prepararse en 6 meses para integrarse con una app móvil y abrir un mercado internacional."

---

### [Minuto 02:00 - 06:00] 2. Diseño Arquitectónico y Diagramas UML
*Lo que muestras en pantalla:* Vas pasando las diapositivas de PowerPoint con tus Diagramas UML (Clases, Casos de Uso, Secuencia, Despliegue).

**💬 Diálogo a decir:**
> *(Mostrando Casos de Uso)*: "En el Diagrama de Casos de Uso plasmamos a dos actores principales: El Administrador gestionando el catálogo, y los Clientes consultando tipos de zapatos y utilizando el carrito de compras."
>
> *(Mostrando Diagrama de Clases)*: "Nuestro Modelo Orientado a Objetos (Diagrama de Clases) representa las entidades de Dominio: Categorías de productos, Usuarios y el Carrito. Resalto aquí nuestra Interfaz de Pagos, de donde heredan los diferentes algoritmos como Tarjeta y Contraentrega."
>
> *(Mostrando Diagrama de Despliegue)*: "Para el Diagrama de Despliegue, reflejamos una arquitectura en un entorno Cloud. Tenemos al Cliente Móvil accediendo a nuestro Servidor de API Rest, el cual puede estar alojado en AWS o Vercel, conectándose directamente a nuestra Base de Datos gestionada".

---

### [Minuto 06:00 - 09:00] 3. Justificación de Patrones de Diseño (EL PUNTO CLAVE)
*Lo que muestras en pantalla:* Tu código de la aplicación. Muestra las carpetas a la izquierda para que el profesor vea el orden.

**💬 Diálogo a decir:**
> "Para implementar este prototipo desarrollamos una API Rest en Python, utilizando **Arquitectura por Capas** (Domain, Repository, Services). Esto cumple el requisito del PDF de contar con una arquitectura modular.
>
> Seleccionamos los siguientes **Patrones de Diseño**:
>
> 1. *(Abre el archivo `src/services/payment_strategy.py`)*: **Patrón Strategy.** Para las simulaciones de pago, el caso exigía *contraentrega*. En lugar de programar condicionales rígidos, implementamos *Strategy* para crear a futuro nuevas familias de pasarelas de pago, encapsulando y aislando las diferentes formas de pagar que llegarán después.
> 
> 2. *(Abre el archivo `src/repository/database.py`)*: **Patrón Singleton.** Para la Base de datos, usamos Singleton para asegurar una instancia única de conexión. Esto evita que los recursos del servidor local caigan ante la alta demanda del Black Friday que mencionaba la empresa.
>
> 3. *(Abre el archivo `src/repository/catalog_repository.py`)*: **Patrón Repository.** Separamos la lógica del catálogo en un repositorio para que sea agnóstico. Podremos reemplazar nuestra base de datos actual SQLite por un Servidor de base de datos poderoso en la nube en el futuro."

---

### [Minuto 09:00 - 13:00] 4. Demostración del Prototipo Funcional
*Lo que muestras en pantalla:* Tu navegador en la pantalla verde de desarrollo (Swagger).

**💬 Diálogo a decir:**
> "A continuación, vemos en ejecución el prototipo. Esta es la vista Cliente-Servidor de nuestra plataforma de e-commerce mediante API REST.
> 
> *(Ve a la opción POST `/productos/`, ábrela, dale 'Try it out', llena unos datos para un zapato Casual o Deportivo y presiona Execute)*
> "Imaginemos que soy el administrador ingresando un nuevo zapato al inventario. Al presionar ejecutar, la Base de Datos conectada lo guarda exitosamente, como nos indica el código HTTP 200 de confirmación."
> 
> *(Ve a la opción GET `/productos/`, pon una talla y dale Execute)*
> "Si el cliente filtra el catálogo para zapatos de esta talla, el módulo del Catálogo interroga a nuestro repositorio y le muestra inmediatamente solo el calzado disponible de nuestro inventario."
> 
> *(Ve a la opción POST `/checkout/`, dale 'Try it out', modifica el código para mandar 'contraentrega', dale Execute)*
> "Por último, en el módulo de pagos, nuestro Carrito invoca al Patrón Strategy dinámicamente. Al recibir la orden de pagar *'contraentrega'*, la estrategia correcta procesa el pago y genera su confirmación, cumpliendo el requerimiento simulado."

---

### [Minuto 13:00 - 15:00] 5. Conclusión y Escenario de Crecimiento
*Lo que muestras en pantalla:* Vuelves a la cámara o a una diapositiva final de conclusiones.

**💬 Diálogo a decir:**
> "Para concluir, nos preguntamos: **¿Cómo soporta nuestra arquitectura un crecimiento masivo a 6 meses con 3 veces más usuarios, una app móvil y pagos reales internacionales?**
>
> Gracias al patrón MVC y una Arquitectura por Capas vía servicios, la creación la **app móvil** no requiere reescribir la lógica de la empresa; simplemente apuntará e interconectará sus pantallas a estos mismos "endpoints" (URLs) que acabamos de probar.
>
> Para triplicar el mercado local e internacional, tener el proyecto en **Contenedores Docker** *(muéstrale rápido que tienes el archivo Dockerfile)* nos facilitará su implementación nativa en entornos elásticos de la nube que subirán nuestra capacidad automáticamente, y donde inyectaremos pasarelas internacionales gracias a nuestra "Estrategia" intercambiable de medios de pago.
>
> Muchas gracias."
