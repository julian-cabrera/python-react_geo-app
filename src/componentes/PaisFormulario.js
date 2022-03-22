import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { RiEditBoxFill } from "react-icons/ri";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

const PaisFormulario = () => {
	const [pais, setPais] = useState({
		id: 0,
		nombre: "",
		cantidadHabitantes: 0,
	});

	const history = useHistory();

	const { idPais } = useParams();

	const editPais = () => {
		if (idPais) {
			axios
				.put(`http://localhost:8000/paises/${idPais}`, pais)
				.then(history.push("/paises"))
				.catch((error) => alert(`${error} at getPais()=>PUT`));
		} else {
			axios
				.post(`http://localhost:8000/paises`, pais)
				.then(history.push("/paises"))
				.catch((error) => alert(`${error} at editPais()=>POST`));
		}
	};

	const getPais = () => {
		axios
			.get(`http://localhost:8000/paises/${idPais}`)
			.then((response) => setPais(response.data))
			.catch((error) => alert(`${error} at getPais()`));
	};

	const { nombre, cantidadHabitantes } = pais;

	useEffect(() => {
		if (idPais) getPais();
	}, [idPais]);

	const saveFormOnChange = (targetEvent) => {
		setPais({ ...pais, [targetEvent.name]: targetEvent.value });
	};

	return (
		<div>
			<div className="mb-3">
				<label className="form-label">Nombre</label>
				<input
					type="text"
					name="nombre"
					placeholder="Nombre país"
					value={nombre}
					className="form-control mi-bg-darker text-light border-gold"
					onChange={(e) => saveFormOnChange(e.target)}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">Habitantes</label>
				<input
					type="text"
					name="cantidadHabitantes"
					placeholder="Cantidad de habitantes"
					value={cantidadHabitantes}
					className="form-control mi-bg-darker text-light border-gold"
					onChange={(e) => saveFormOnChange(e.target)}
				/>
			</div>
			<div className="d-flex justify-content-evenly">
				<button onClick={editPais} className="btn btn-lg">
					{idPais ? (
						<RiEditBoxFill className="icon-btn mi-text-gold" />
					) : (
						<MdAddCircle className="icon-btn mi-text-gold" />
					)}
				</button>
				<Link to="/paises">
					<IoArrowBackCircle className="icon-btn mi-text-gold" />
				</Link>
			</div>
		</div>
	);
};
export default PaisFormulario;
