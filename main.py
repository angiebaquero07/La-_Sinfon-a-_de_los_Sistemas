from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from src.api.routes import router
from src.repository.database import Base, db_instance

# Configuración de Nube (Data Layer): 
# Automáticamente crear las tablas reales en SQLite
Base.metadata.create_all(bind=db_instance.engine)

app = FastAPI(
    title="ZapatoFlex S.A.S - Plataforma Web Escalable",
    version="1.0.0"
)

# Conectando los módulos del sistema (Módulos de Autenticación, Catálogo, Pagos)
app.include_router(router, prefix="/api/v1")

# FrontEnd Gráfico Glassmorphism 
app.mount("/", StaticFiles(directory="static", html=True), name="static")
