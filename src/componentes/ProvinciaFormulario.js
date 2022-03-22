import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { RiEditBoxFill } from "react-icons/ri";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

const ProvinciaFormulario = () => {
	const [provincia, setProvincia] = useState({
		id: 0,
		nombre: "",
		descripcion: "",
		id_pais: 0,
		pais: {
			nombre: "",
			cantidadHabitantes: 0,
			id: 0,
		},
	});

	const [paises, setPaises] = useState([]);

	const history = useHistory();

	const { idProvincia } = useParams();

	const getPaises = () => {
		axios
			.get(`http://localhost:8000/paises`)
			.then((response) => setPaises(response.data))
			.catch((error) => alert(`${error} at getPaises()`));
	};
	useEffect(() => {
		getPaises();
	}, []);

	const getProvincia = () => {
		axios
			.get(`http://localhost:8000/provincias/${idProvincia}`)
			.then((response) => setProvincia(response.data))
			.catch((error) => alert(`${error} at getProvincia()`));
	};

	var provinciaPost = {};

	const editProvincia = () => {
		if (idProvincia) {
			axios
				.put(`http://localhost:8000/provincias/${idProvincia}`, provincia)
				.then(history.push("/provincias"))
				.catch((error) => alert(`${error} at putProvincia()`));
		} else {
			provinciaPost = {
				nombre: provincia.nombre,
				descripcion: provincia.descripcion,
				id_pais: provincia.pais,
			};

			axios
				.post(`http://localhost:8000/provincias`, provinciaPost)
				.then(history.push("/provincias"))
				.catch((error) => alert(`${error} at postProvincia()`));
		}
	};

	const { nombre, descripcion, pais } = provincia;

	useEffect(() => {
		if (idProvincia) getProvincia();
	}, [idProvincia]);

	const saveFormOnChange = (targetEvent) => {
		setProvincia({ ...provincia, [targetEvent.name]: targetEvent.value });
	};

	return (
		<div>
			<div className="mb-3">
				<label className="form-label">Nombre</label>
				<input
					type="text"
					name="nombre"
					placeholder="Nombre provincia.."
					value={nombre}
					className="form-control mi-bg-darker text-light border-gold"
					onChange={(e) => saveFormOnChange(e.target)}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label mi-bg-darker text-light border-gold">
					Descripcion
				</label>
				<input
					type="text"
					name="descripcion"
					placeholder="Descripción de la provincia.."
					value={descripcion}
					className="form-control mi-bg-darker text-light border-gold"
					onChange={(e) => saveFormOnChange(e.target)}
				/>
			</div>
			{idProvincia ? (
				<div className="mb-3">
					<label className="form-label">Pais</label>
					<input
						name="pais"
						className="form-select mi-bg-darker text-light border-gold"
						value={pais.nombre}
						placeholder={pais.nombre}
						disabled
					/>
				</div>
			) : (
				<div className="mb-3">
					<label className="form-label">Pais</label>
					<select
						name="pais"
						className="form-select mi-bg-darker text-light border-gold"
						value={pais.nombre}
						onChange={(e) => saveFormOnChange(e.target)}
					>
						<option value="">Seleccione una opción</option>
						{paises.map((pais) => (
							<option key={pais.id} value={pais.id}>
								{pais.nombre}
							</option>
						))}
					</select>
				</div>
			)}
			<div className="d-flex justify-content-evenly">
				<button onClick={editProvincia} className="btn btn-lg">
					{idProvincia ? (
						<RiEditBoxFill className="icon-btn mi-text-gold" />
					) : (
						<MdAddCircle className="icon-btn mi-text-gold" />
					)}
				</button>
				<Link to="/provincias">
					<IoArrowBackCircle className="icon-btn mi-text-gold" />
				</Link>
			</div>
		</div>
	);
};
export default ProvinciaFormulario;
