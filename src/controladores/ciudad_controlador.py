from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositorios.ciudad_repositorio import CiudadRepositorio
from modelos.ciudad_modelo import CiudadSinId, CiudadApi
from conexiones.conexion_postgresql import get_session
from typing import List

ciudades_router = APIRouter(prefix='/ciudades', tags=['Ciudades'])
repo = CiudadRepositorio()


@ciudades_router.get('/')
def get_all(s: Session = Depends(get_session)):
    return repo.get_all(s)


@ciudades_router.get('/{id}')
def get_by_id(id: int, s: Session = Depends(get_session)):
    ciudad = repo.get_by_id(id, s)
    if ciudad is None:
        raise HTTPException(status_code=404, detail='Ciudad no encontrado')
    else:
        return ciudad


@ciudades_router.get('/buscar/{nombre}', response_model=List[CiudadApi])
def get_by_name(nombre: str, s: Session = Depends(get_session)):
    ciudad = repo.get_by_name(nombre, s)
    if ciudad:
        return ciudad
    else:
        raise HTTPException(
            status_code=404, detail='No se econtraron ciudades con ese nombre')


@ciudades_router.post('/', response_model=CiudadApi)
def post_ciudad(datos: CiudadSinId, s: Session = Depends(get_session)):
    ciudad = repo.save(datos, s)
    return ciudad
    # if ciudad:
    #     return ciudad
    # else:
    #     raise HTTPException(
    #         status_code=404, detail='No se pudo agregar la ciudad')


@ciudades_router.delete('/{id}')
def delete_ciudad(id: int, s: Session = Depends(get_session)):
    if repo.delete(id, s):
        return "Ciudad eliminada."
    else:
        raise HTTPException(
            status_code=404, detail='No se encontró la ciudad para eliminar.')


@ciudades_router.put('/{id}', response_model=CiudadApi)
def put_ciudad(id: int, datos: CiudadSinId, s: Session = Depends(get_session)):
    ciudad = repo.update(id, datos, s)
    if ciudad is None:
        raise HTTPException(
            status_code=404, detail='No se encontró la ciudad para modificar.')
    return ciudad
