from sqlalchemy.orm import relationship
from conexiones.conexion_postgresql import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from pydantic import BaseModel


class CiudadBd(Base):
    __tablename__ = "ciudades"

    id = Column(Integer, primary_key=True)
    nombre = Column(String(20), nullable=False)
    descripcion = Column(String(300), default="Descripción no proporcionada")
    id_pais = Column(Integer, ForeignKey("paises.id"), nullable=False)
    id_provincia = Column(Integer, ForeignKey("provincias.id"), nullable=False)
    pais = relationship("PaisBd")
    provincia = relationship("ProvinciaBd", lazy="joined")


class CiudadSinId(BaseModel):
    nombre: str
    descripcion: str
    id_pais: int
    id_provincia: int

    class Config:
        orm_mode = True


class CiudadApi(CiudadSinId):
    id: int
