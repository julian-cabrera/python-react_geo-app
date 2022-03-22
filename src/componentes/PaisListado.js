import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const PaisListado = ({ busqueda }) => {
	const [paises, setPaises] = useState([]);

	const getPaises = () => {
		axios
			.get(`http://localhost:8000/paises`)
			.then((response) => {
				setPaises(response.data);
			})
			.catch((error) => alert(error));
	};
	useEffect(() => {
		getPaises();
	}, []);

	// ! Anda pero se rompe cuando no se ingresa un nombre no válido.
	// const getPaisesByName = () => {
	// 	if (busqueda) {
	// 		axios
	// 			.get(`http://localhost:8000/paises/buscar/${busqueda}`)
	// 			.then((response) => {
	// 				setPaises(response.data);
	// 			})
	// 			.catch((error) => alert(`${error} at getPaisesByName()`));
	// 	} else if (busqueda === "") {
	// 		getPaises();
	// 	}
	// };
	// useEffect(() => {
	// 	getPaisesByName();
	// }, [busqueda]);

	const deletePais = (id) => {
		axios
			.delete(`http://localhost:8000/paises/${id}`)
			.then(getPaises())
			.catch((error) => {
				alert(`${error} at deletePais()`);
			});
	};

	return (
		<div className="container mb-3">
			<div className="col-2 mb-3 flex-fill">
				<Link to="/paises/nuevo">
					<MdAddCircle className="icon-btn" />
				</Link>
			</div>

			<table className="table mt-2">
				<thead>
					<tr>
						<th scope="col">NOMBRE</th>
						<th scope="col">HABITANTES</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{paises.map((pais) => (
						<tr key={pais.id}>
							<td>
								<Link to={`/paises/${pais.id}`}>{pais.nombre}</Link>
							</td>
							<td>{pais.cantidadHabitantes}</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => deletePais(pais.id)}
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
export default PaisListado;
