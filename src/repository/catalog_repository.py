from sqlalchemy.orm import Session
from src.repository.schemas import ProductSchema
from src.domain.models import Product

class CatalogRepository:
    """ Patrón Repositorio asociado al Catálogo de ZapatoFlex """
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, category: str = None, filter_size: float = None):
        query = self.db.query(ProductSchema)
        if category:
            query = query.filter(ProductSchema.category == category)
        if filter_size:
            query = query.filter(ProductSchema.size == filter_size)
        return query.all()

    def create(self, product: Product):
        db_product = ProductSchema(**product.model_dump(exclude={"id"}))
        self.db.add(db_product)
        self.db.commit()
        self.db.refresh(db_product)
        return db_product
