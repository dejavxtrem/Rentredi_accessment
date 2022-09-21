import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./formcomponent.css";
import { useUserContext } from "../context/UserContext";

const FormComponent = () => {
	const [name, setName] = useState("");
	const [zipCode, setZipCode] = useState("");

	const { userData, createUser, getUser } = useUserContext();

	const submitHandler = (e) => {
		e.preventDefault();
		createUser(name, zipCode);
	};

	return (
		<Container>
			<Row className="formSector">
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="zipcode">
						<Form.Label>Zipcode</Form.Label>
						<Form.Control
							type="zipcode"
							placeholder="zipcode"
							value={zipCode}
							onChange={(e) => setZipCode(e.target.value)}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Row>
			{userData?.map((user) => {
				return (
					<Row className="CardDetails">
						<Card style={{ width: "18rem" }}>
							<Card.Body>
								<Card.Title>Name: {user?.name}</Card.Title>
								<Card.Title>Zipcode: {user?.zip}</Card.Title>
								<Card.Title>longitude: {user?.lon}</Card.Title>
								<Card.Title>latitude: {user?.lat}</Card.Title>
								<Card.Title>
									Country: {user?.country}
								</Card.Title>
							</Card.Body>
						</Card>
					</Row>
				);
			})}
		</Container>
	);
};

export default FormComponent;
