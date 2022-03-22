from sqlalchemy.orm import relationship
from conexiones.conexion_postgresql import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from pydantic import BaseModel


class ProvinciaBd(Base):
    __tablename__ = "provincias"

    id = Column(Integer, primary_key=True)
    nombre = Column(String(20), nullable=False)
    descripcion = Column(String(300), default="Descripción no proporcionada")
    id_pais = Column(Integer, ForeignKey("paises.id"), nullable=False)
    pais = relationship("PaisBd", lazy="joined")
    ciudades = relationship("CiudadBd", back_populates="provincia")


class ProvinciaSinId(BaseModel):
    nombre: str
    descripcion: str
    id_pais: int

    class Config:
        orm_mode = True


class ProvinciaApi(ProvinciaSinId):
    id: int
