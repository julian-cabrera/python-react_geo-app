from sqlalchemy import select, Column
from sqlalchemy.orm import Session
from modelos.ciudad_modelo import CiudadBd, CiudadSinId


class CiudadRepositorio():

    def get_all(self, session: Session):
        return session.execute(select(CiudadBd)).scalars().all()

    def get_by_id(self, id: int, session: Session):
        ciudad = session.get(CiudadBd, id)
        if ciudad:
            return ciudad
        else:
            ValueError('Error con ciudad id')

    def get_by_name(self, nombre: str, session: Session):
        ciudad = session.execute(select(CiudadBd).where(
            CiudadBd.nombre.ilike(f'%{nombre}%'))).scalars().all()
        if ciudad:
            return ciudad
        else:
            return None

    def save(self, datos: CiudadSinId, session: Session):
        ciudad = CiudadBd(**datos.dict())
        session.add(ciudad)
        session.commit()
        return ciudad

    def update(self, id: int, datos: CiudadSinId, session: Session):
        ciudad = session.get(CiudadBd, id)
        try:
            ciudad.nombre = datos.nombre
            ciudad.descripcion = datos.descripcion
            ciudad.id_pais = datos.id_pais
            ciudad.id_provincia = datos.id_provincia
            session.commit()
            return ciudad
        except:
            ValueError('No se pudo actualizar la ciudad')
        return None

    def delete(self, id: int, session: Session):
        ciudad = session.get(CiudadBd, id)
        try:
            session.delete(ciudad)
            session.commit()
            return True
        except:
            ValueError('No se pudo borrar la ciudad')
        return False
