import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const CiudadListado = () => {
	const [ciudades, setCiudades] = useState([]);

	const getCiudades = () => {
		axios
			.get(`http://localhost:8000/ciudades`)
			.then((response) => setCiudades(response.data))
			.catch((error) => alert(`${error} at getCiudades`));
	};
	useEffect(() => {
		getCiudades();
	}, []);

	const deleteCiudad = (ciudadId) => {
		axios
			.delete(`http://localhost:8000/ciudades/${ciudadId}`)
			.then(getCiudades())
			.catch((error) => alert(`${error} at getCiudades()`));
	};

	return (
		<div className="row mb-3">
			<div className="col-2 mb-3 flex-fill">
				<Link to="/ciudades/nuevo">
					<MdAddCircle className="icon-btn" />
				</Link>
			</div>

			<table className="table mt-2">
				<thead>
					<tr>
						<th scope="col">NOMBRE</th>
						<th scope="col">PAIS</th>
						<th scope="col">PROVINCIA</th>
						<th scope="col">DESCRIPCION</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{ciudades.map((ciudad) => (
						<tr key={ciudad.id}>
							<td>
								<Link to={`/ciudades/${ciudad.id}`}>{ciudad.nombre}</Link>
							</td>
							<td>{ciudad.provincia.pais.nombre}</td>
							<td>{ciudad.provincia.nombre}</td>
							<td>{ciudad.descripcion}</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => deleteCiudad(ciudad.id)}
								>
									<AiFillDelete className="icon-del-btn" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default CiudadListado;
