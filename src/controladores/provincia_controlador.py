from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositorios.provincia_repositorio import ProvinciaRepositorio
from modelos.provincia_modelo import ProvinciaSinId, ProvinciaApi
from conexiones.conexion_postgresql import get_session
from typing import List

provincias_router = APIRouter(prefix='/provincias', tags=['Provincias'])
repo = ProvinciaRepositorio()


@provincias_router.get('/')
def get_all(s: Session = Depends(get_session)):
    return repo.get_all(s)


@provincias_router.get('/{id}')
def get_by_id(id: int, s: Session = Depends(get_session)):
    provincia = repo.get_by_id(id, s)
    if provincia is None:
        raise HTTPException(status_code=404, detail='Provincia no encontrado')
    else:
        return provincia


@provincias_router.get('/buscar/{nombre}', response_model=List[ProvinciaApi])
def get_by_name(nombre: str, s: Session = Depends(get_session)):
    provincia = repo.get_by_name(nombre, s)
    if provincia:
        return provincia
    else:
        raise HTTPException(
            status_code=404, detail='No se econtraron provincias con ese nombre')


@provincias_router.post('/', response_model=ProvinciaApi)
def post_provincia(datos: ProvinciaSinId, s: Session = Depends(get_session)):
    provincia = repo.save(datos, s)
    return provincia


@provincias_router.delete('/{id}')
def delete_provincia(id: int, s: Session = Depends(get_session)):
    if repo.delete(id, s):
        return "Provincia eliminado."
    else:
        raise HTTPException(
            status_code=404, detail='No se encontró la provincia para eliminar.')


@provincias_router.put('/{id}', response_model=ProvinciaApi)
def put_provincia(id: int, datos: ProvinciaSinId, s: Session = Depends(get_session)):
    provincia = repo.update(id, datos, s)
    if provincia is None:
        raise HTTPException(
            status_code=404, detail='No se encontró la provincia para modificar.')
    return provincia
