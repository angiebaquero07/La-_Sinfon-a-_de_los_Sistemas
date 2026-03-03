#  **ZapatoFlex S.A.S. - Prototipo Escalable**

Este repositorio contiene la arquitectura, el código y la documentación funcional de la plataforma de comercio electrónico de calzado ZapatoFlex, simulando un entorno de Nube y cumpliendo rigurosamente los lineamientos del Caso de Estudio.

## Requisitos Arquitectónicos Implementados
El código presente es un sistema "API Backend / Cliente Servidor" escrito bajo el ecosistema escalable de **FastAPI / Python, utilizando SQLite como persistencia de datos (base de datos conectada en tiempo real).**

La arquitectura soporta los **Escenarios de Crecimiento a 6 meses** debido al desacoplamiento (Modularización) en carpetas. Si ZapatoFlex se expande, la separación visual permite portar rápido el módulo a otro servidor para manejar la carga extra o agregar una "app móvil" (ya que la app consumirá los endpoint de API rest estandarizados y no HTML puro).

## Cómo Iniciar / Correr
1. Instalar dependencias e integración:
   `pip install -r requirements.txt`
2. Arrancar servidor en puerto 8000:
   `uvicorn main:app --reload`
3. ¡Ingresar al área interactiva (Swagger) para probar registro y compras!:
   `http://127.0.0.1:8000/docs`


