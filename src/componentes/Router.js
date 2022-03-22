import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import MainComponent from "./MainComponent";
import Buscador from "./Buscador";
import PaisListado from "./PaisListado";
import PaisFormulario from "./PaisFormulario";
import ProvinciaListado from "./ProvinciaListado";
import ProvinciaFormulario from "./ProvinciaFormulario";
import CiudadListado from "./CiudadListado";
import CiudadFormulario from "./CiudadFormulario";
import { AiOutlineHome } from "react-icons/ai";
const RouterComponent = () => {
	const [busqueda, setBusqueda] = useState("");

	return (
		<BrowserRouter>
			<div className="container mt-5 ">
				<ul className="nav nav-tabs mx-auto justify-content-center">
					<li className="nav-item">
						<Link className="nav-link" to="/">
							<AiOutlineHome className="icon-del-btn" />
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/paises">
							Paises
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/provincias">
							Provincias
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/ciudades">
							Ciudades
						</Link>
					</li>
					<li>
						<Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
					</li>
				</ul>
				<div className="mt-5">
					<Switch>
						<Route path="/paises/nuevo" component={PaisFormulario} exact />
						<Route path="/paises/:idPais" component={PaisFormulario} exact />
						<Route
							path="/paises"
							render={() => <PaisListado busqueda={busqueda} />}
						/>

						<Route
							path="/provincias/nuevo"
							component={ProvinciaFormulario}
							exact
						/>
						<Route
							path="/provincias/:idProvincia"
							component={ProvinciaFormulario}
							exact
						/>
						<Route
							path="/provincias"
							render={() => <ProvinciaListado busqueda={busqueda} />}
						/>

						<Route path="/ciudades/nuevo" component={CiudadFormulario} exact />
						<Route
							path="/ciudades/:idCiudad"
							component={CiudadFormulario}
							exact
						/>
						<Route
							path="/ciudades"
							render={() => <CiudadListado busqueda={busqueda} />}
						/>

						<Route path="/" component={MainComponent} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
};
export default RouterComponent;
