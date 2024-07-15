
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import ReactVirtualized from '../pages/ReactVirtualized';
import ReactWindow from '../pages/ReactWindow';
import PureReactCode from '../pages/PureReactCode';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/react-virtualized">Using React Virtualized</Nav.Link>
            <Nav.Link as={NavLink} to="/react-window">Using React Window</Nav.Link>
            <Nav.Link as={NavLink} to="/pure-react">Pure React Code</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/react-virtualized" element={<ReactVirtualized />} />
        <Route path="/react-window" element={<ReactWindow />} />
        <Route path="/pure-react" element={<PureReactCode />} />
        <Route path="/" element={<Navigate to="/react-virtualized" />} />
      </Routes>
    </Router>
  );
};
  
  export default AppRouter;