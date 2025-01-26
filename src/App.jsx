
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Main';
import Quotation from './components/Quotation/Main';
import PriceList from './components/PriceList/Main';
import Sales from './components/SalesExecutive/Main';
import Customer from './components/Customer/Main';
import Manage from './components/Manage/Main';
import Order from './components/Order/Main';
import Profile from './components/Profile/Main';
import Report from './components/Report/Main';

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
					<Route path="salesexecutive" element={<Sales />} />
					<Route path="customerprofile" element={<Customer />} />
					<Route path="manage" element={<Manage />} />
					<Route path="orderprocessing" element={<Order />} />
					<Route path="profile" element={<Profile />} />
					<Route path="report" element={<Report />} />
 				</Route>
			</Routes>
		</Router>
	)
}

export default App