import uvicorn
from conexiones import conexion_postgresql as db
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controladores.pais_controlador import paises_router
from controladores.provincia_controlador import provincias_router
from controladores.ciudad_controlador import ciudades_router
from modelos.pais_modelo import PaisBd
from modelos.provincia_modelo import ProvinciaBd
from modelos.ciudad_modelo import CiudadBd

app = FastAPI()
app.include_router(paises_router)
app.include_router(provincias_router)
app.include_router(ciudades_router)


origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# db.drop_all()
db.create_all()

if __name__ == "__main__":
    uvicorn.run("main_geolocalizacion:app", reload=True)
