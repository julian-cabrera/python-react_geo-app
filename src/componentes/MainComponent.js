import { AiOutlineUser } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";

const MainComponent = () => {
	return (
		<div className="card mi-bg-dark rounded">
			<h1 className="card-title text-center mt-3 mi-text-gold text-title">
				Trabajo Práctico V
			</h1>
			<hr />
			<div className="card-body text-center">
				<h2 className="card-title">
					<BiWorld className="icon-btn" /> App Geolocalización
				</h2>
				<br />
				<br />
				<h4 className="card-title">
					<AiOutlineUser className="icon-btn" /> Julián Exequiel Cabrera
				</h4>
				<br />
				<p className="card-text">
					Aplicación de geolocalización aplicando backend con Python y frontend
					con React.
				</p>
			</div>
		</div>
	);
};
export default MainComponent;
