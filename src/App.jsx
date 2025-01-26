
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Main';
import Quotation from './components/Quotation/Main';
import PriceList from './components/PriceList/Main';

function App() 
{
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='upvc/:userName/*' element={<Layout />} >
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="quotation" element={<Quotation />} />
					<Route path="pricelist" element={<PriceList />} />
 				</Route>
			</Routes>
		</Router>
	)
}

export default App