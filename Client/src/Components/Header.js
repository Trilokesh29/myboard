import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Header() {
    return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="/">RetroTool</Navbar.Brand>
			<Nav className="mr-auto">
			<Nav.Link href="/">Home</Nav.Link>
			<Nav.Link href="board">Board</Nav.Link>
			</Nav>			
		</Navbar>
    )
}

export default Header;