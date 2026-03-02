from sqlalchemy import Column, Integer, String, Float
from src.repository.database import Base

class ProductSchema(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)  # Deportivos, Casuales, Formales
    size = Column(Float)
    price = Column(Float)
    brand = Column(String)
    color = Column(String)
    stock = Column(Integer)

class UserSchema(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="cliente")
