import { AiOutlineSearch } from "react-icons/ai";

const Buscador = (props) => {
	return (
		<form className="input-group">
			<span className="input-group-text bg-dark border-warning">
				{<AiOutlineSearch className="text-warning icon-del-btn" />}
			</span>
			<input
				className="form-control border-warning mi-bg-darker"
				type="text"
				placeholder="Buscar.."
				value={props.busqueda}
				onChange={(e) => props.setBusqueda(e.target.value)}
			/>
		</form>
	);
};
export default Buscador;
