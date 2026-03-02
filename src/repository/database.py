from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Patrón Singleton: Instancia única de la conexión a DB. 
# Crucial en la nube para no colapsar las conexiones simultáneas.
class DatabaseConnection:
    _instance = None
    _engine = None
    _SessionLocal = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
            # Conexión local simulando una capa física (Data Layer)
            SQLALCHEMY_DATABASE_URL = "sqlite:///./zapatoflex_cloud.db"
            cls._instance._engine = create_engine(
                SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
            )
            cls._instance._SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=cls._instance._engine)
        return cls._instance

    @property
    def session_local(self):
        return self._SessionLocal

    @property
    def engine(self):
        return self._engine

# Ejecutado en runtime local
db_instance = DatabaseConnection()
Base = declarative_base()

# Dependencia inyectable para FastAPI
def get_db():
    db = db_instance.session_local()
    try:
        yield db
    finally:
        db.close()
