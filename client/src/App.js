import FormComponent from "./component/FormComponent";
import UserContextProvider from "./context/UserContext";

const App = () => {
	return (
		<UserContextProvider>
			<div>
				<FormComponent />
			</div>
		</UserContextProvider>
	);
};

export default App;
