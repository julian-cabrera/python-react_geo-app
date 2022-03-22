from sqlalchemy import select, Column
from sqlalchemy.orm import Session
from modelos.pais_modelo import PaisBd, PaisSinId


class PaisRepositorio():

    def get_all(self, session: Session):
        return session.execute(select(PaisBd)).scalars().all()

    def get_by_id(self, id: int, session: Session):
        pais = session.get(PaisBd, id)
        if pais:
            return pais
        else:
            ValueError('Error con pais id')

    def get_by_name(self, nombre: str, session: Session):
        pais = session.execute(select(PaisBd).where(
            Column('nombre').ilike(f'%{nombre}%'))).scalars().all()
        if pais:
            return pais
        else:
            return None

    def save(self, datos: PaisSinId, session: Session):
        pais = PaisBd(**datos.dict())
        session.add(pais)
        session.commit()
        return pais

    def update(self, id: int, datos: PaisSinId, session: Session):
        pais = session.get(PaisBd, id)
        try:
            pais.nombre = datos.nombre
            pais.cantidadHabitantes = datos.cantidadHabitantes
            session.commit()
            return pais
        except:
            ValueError('No se pudo actualizar el país')
        return None

    def delete(self, id: int, session: Session):
        pais = session.get(PaisBd, id)
        try:
            session.delete(pais)
            session.commit()
            return True
        except:
            ValueError('No se pudo borrar el país')
        return False
