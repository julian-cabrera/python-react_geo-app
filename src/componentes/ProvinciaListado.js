import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const ProvinciaListado = () => {
	const [provincias, setProvincias] = useState([]);

	const getProvincias = () => {
		axios
			.get(`http://localhost:8000/provincias`)
			.then((response) => setProvincias(response.data))
			.catch((error) => alert(`${error} at getProvincias`));
	};

	useEffect(() => {
		getProvincias();
	}, []);

	const deleteProvincia = (provId) => {
		axios
			.delete(`http://localhost:8000/provincias/${provId}`)
			.then(getProvincias())
			.catch((error) => alert(`${error} at deleteProvincias`));
	};

	return (
		<div className="container mb-3">
			<div className="col-2 mb-3 flex-fill">
				<Link to="/provincias/nuevo">
					<MdAddCircle className="icon-btn" />
				</Link>
			</div>

			<table className="table mt-2">
				<thead>
					<tr>
						<th scope="col">NOMBRE</th>
						<th scope="col">PAIS</th>
						<th scope="col">DESCRIPCION</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{provincias.map((provincia) => (
						<tr key={provincia.id}>
							<td>
								<Link to={`/provincias/${provincia.id}`}>
									{provincia.nombre}
								</Link>
							</td>
							<td>{provincia.pais.nombre}</td>
							<td>{provincia.descripcion}</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => deleteProvincia(provincia.id)}
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
export default ProvinciaListado;
