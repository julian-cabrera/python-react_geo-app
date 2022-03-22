from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositorios.pais_repositorio import PaisRepositorio
from modelos.pais_modelo import PaisApi, PaisSinId
from conexiones.conexion_postgresql import get_session
from typing import List

paises_router = APIRouter(prefix='/paises', tags=['Paises'])
repo = PaisRepositorio()


@paises_router.get('/')
def get_all(s: Session = Depends(get_session)):
    return repo.get_all(s)


@paises_router.get('/{id}')
def get_by_id(id: int, s: Session = Depends(get_session)):
    pais = repo.get_by_id(id, s)
    if pais is None:
        raise HTTPException(status_code=404, detail='Pais no encontrado')
    else:
        return pais


@paises_router.get('/buscar/{nombre}', response_model=List[PaisApi])
def get_by_name(nombre: str, s: Session = Depends(get_session)):
    pais = repo.get_by_name(nombre, s)
    if pais:
        return pais


@paises_router.post('/', response_model=PaisApi)
def post_pais(datos: PaisSinId, s: Session = Depends(get_session)):
    pais = repo.save(datos, s)
    return pais


@paises_router.delete('/{id}')
def delete_pais(id: int, s: Session = Depends(get_session)):
    if repo.delete(id, s):
        return "País eliminado."
    else:
        raise HTTPException(
            status_code=404, detail='No se encontró el país para eliminar.')


@paises_router.put('/{id}', response_model=PaisApi)
def put_pais(id: int, datos: PaisSinId, s: Session = Depends(get_session)):
    pais = repo.update(id, datos, s)
    if pais is None:
        raise HTTPException(
            status_code=404, detail='No se encontró el país para modificar.')
    return pais
