from sqlalchemy import select, Column
from sqlalchemy.orm import Session
from modelos.provincia_modelo import ProvinciaBd, ProvinciaSinId


class ProvinciaRepositorio():

    def get_all(self, session: Session):
        return session.execute(select(ProvinciaBd)).scalars().all()

    def get_by_id(self, id: int, session: Session):
        provincia = session.get(ProvinciaBd, id)
        if provincia:
            return provincia
        else:
            ValueError('Error con provincia id')

    def get_by_name(self, nombre: str, session: Session):
        provincia = session.execute(select(ProvinciaBd).where(
            ProvinciaBd.nombre.ilike(f'%{nombre}%'))).scalars().all()
        if provincia:
            return provincia
        else:
            ValueError('No se pudo buscar la provincia por nombre')

    def save(self, datos: ProvinciaSinId, session: Session):
        provincia = ProvinciaBd(**datos.dict())
        session.add(provincia)
        session.commit()
        return provincia

    def update(self, id: int, datos: ProvinciaSinId, session: Session):
        provincia = session.get(ProvinciaBd, id)
        try:
            provincia.nombre = datos.nombre
            provincia.descripcion = datos.descripcion
            provincia.id_pais = datos.id_pais
            session.commit()
            return provincia
        except:
            ValueError('No se pudo actualizar la provincia')
        return None

    def delete(self, id: int, session: Session):
        provincia = session.get(ProvinciaBd, id)
        try:
            session.delete(provincia)
            session.commit()
            return True
        except:
            ValueError('No se pudo borrar la provincia')
        return False
