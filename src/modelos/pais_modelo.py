from sqlalchemy.orm import relationship
from conexiones.conexion_postgresql import Base
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel


class PaisBd(Base):
    __tablename__ = "paises"

    id = Column(Integer, primary_key=True)
    nombre = Column(String(20), nullable=False)
    cantidadHabitantes = Column(Integer, nullable=False)
    provincias = relationship(
        "ProvinciaBd", back_populates="pais")
    ciudades = relationship("CiudadBd", back_populates="pais")


class PaisSinId(BaseModel):
    nombre: str
    cantidadHabitantes: int

    class Config:
        orm_mode = True


class PaisApi(PaisSinId):
    id: int
