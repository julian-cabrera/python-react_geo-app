import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { RiEditBoxFill } from "react-icons/ri";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

const CiudadFormulario = () => {
	const [ciudad, setCiudad] = useState({
		id: 0,
		nombre: "",
		descripcion: "",
		id_pais: 0,
		id_provincia: 0,
		provincia: {
			id: 0,
			nombre: "",
			descripcion: "",
			id_pais: 0,
			pais: {
				nombre: "",
				cantidadHabitantes: 0,
				id: 0,
			},
		},
	});

	const [provincias, setProvincias] = useState([]);
	const [paises, setPaises] = useState([]);

	const history = useHistory();

	const { idCiudad } = useParams();

	const getPaises = () => {
		axios
			.get(`http://localhost:8000/paises`)
			.then((response) => setPaises(response.data))
			.catch((error) => alert(`${error} at getPaises()`));
	};
	const getProvincias = () => {
		axios
			.get(`http://localhost:8000/provincias`)
			.then((response) => setProvincias(response.data))
			.catch((error) => alert(`${error} at getProvincias()`));
	};
	useEffect(() => {
		getPaises();
		getProvincias();
	}, []);

	const getCiudad = () => {
		axios
			.get(`http://localhost:8000/ciudades/${idCiudad}`)
			.then((response) => {
				setCiudad(response.data);
			})
			.catch((error) => alert(`${error} at getCiudad()`));
	};

	var ciudadPost = {};

	const editCiudad = () => {
		if (idCiudad) {
			axios
				.put(`http://localhost:8000/ciudades/${idCiudad}`, ciudad)
				.then(history.push("/ciudades"))
				.catch((error) => alert(`${error} at putCiudad()`));
		} else {
			ciudadPost = {
				nombre: ciudad.nombre,
				descripcion: ciudad.descripcion,
				id_pais: ciudad.id_pais,
				id_provincia: ciudad.id_provincia,
			};

			axios
				.post(`http://localhost:8000/ciudades`, ciudadPost)
				.then(history.push("/ciudades"))
				.catch((error) => alert(`${error} at postCiudad()`));
		}
	};

	const { nombre, descripcion, provincia } = ciudad;

	useEffect(() => {
		if (idCiudad) {
			getCiudad();
		}
	}, [idCiudad]);

	const saveFormOnChange = (targetEvent) => {
		setCiudad({ ...ciudad, [targetEvent.name]: targetEvent.value });
	};

	return (
		<div>
			<div className="mb-3">
				<label className="form-label">Nombre</label>
				<input
					type="text"
					name="nombre"
					placeholder="Nombre ciudad.."
					value={nombre}
					className="form-control mi-bg-darker text-light border-gold"
					onChange={(e) => saveFormOnChange(e.target)}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Descripcion</label>
				<input
					type="text"
					name="descripcion"
					placeholder="Descripcion ciudad.."
					value={descripcion}
					className="form-control mi-bg-darker text-light border-gold"
					onChange={(e) => saveFormOnChange(e.target)}
				/>
			</div>
			{idCiudad ? (
				<div>
					<div className="mb-3">
						<label className="form-label">Provincia</label>
						<input
							name="provincia"
							className="form-control mi-bg-dark text-light border-gold"
							value={provincia.nombre}
							placeholder={provincia.nombre}
							disabled
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Pais</label>
						<input
							name="pais"
							className="form-control mi-bg-dark text-light border-gold"
							value={provincia.pais.nombre}
							placeholder={provincia.pais.nombre}
							disabled
						/>
					</div>
				</div>
			) : (
				<div>
					<div className="mb-3">
						<label className="form-label">Provincia</label>
						<select
							name="provincia"
							className="form-select mi-bg-darker text-light border-gold"
							value={provincia.id}
							onChange={(e) => saveFormOnChange(e.target)}
						>
							<option value="">Seleccione una opción</option>
							{provincias.map((prov) => (
								<option key={prov.id} value={prov.id}>
									{prov.nombre}
								</option>
							))}
						</select>
					</div>
					<div className="mb-3">
						<label className="form-label">Pais</label>
						<select
							name="pais"
							className="form-select mi-bg-darker text-light border-gold"
							value={provincia.pais}
							onChange={(e) => saveFormOnChange(e.target)}
						>
							<option value="">Seleccione una opción</option>
							{paises.map((p) => (
								<option key={p.id} value={p.id}>
									{p.nombre}
								</option>
							))}
						</select>
					</div>
				</div>
			)}
			<div className="d-flex justify-content-evenly">
				<button onClick={editCiudad} className="btn btn-lg">
					{idCiudad ? (
						<RiEditBoxFill className="icon-btn mi-text-gold" />
					) : (
						<MdAddCircle className="icon-btn mi-text-gold" />
					)}
				</button>
				<Link to="/ciudades">
					<IoArrowBackCircle className="icon-btn mi-text-gold" />
				</Link>
			</div>
		</div>
	);
};
export default CiudadFormulario;
