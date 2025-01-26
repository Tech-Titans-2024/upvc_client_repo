import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faChartLine, faFileInvoice, faShoppingCart, faListAlt, faSignOutAlt, faUserAlt, 
faTag, faCogs, faBookmark, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.jpeg';
import './Layout.css'

function Sidebar() 
{
	const { userName } = useParams();
	
	const menus = [
		{
			icon: faChartLine,
			name: 'Dashboard',
			path: `/upvc/${userName}/dashboard`
		},
		{
			icon: faFileInvoice,
			name: 'Quotation Builder',
			path: `/upvc/${userName}/quotation`
		},
		{
			icon: faShoppingCart,
			name: 'Order Processing',
			path: `/upvc/${userName}/orderprocessing`
		},
		{
			icon: faListAlt,
			name: 'Reports',
			path: `/upvc/${userName}/report`
		},
		{
			icon: faTag,
			name: 'Price List',
			path: `/upvc/${userName}/pricelist`
		},
		{
			icon:  faPeopleGroup ,
			name: 'Sales Executive',
			path: `/upvc/${userName}/salesexecutive`
		},
		{
			icon: faUserAlt,
			name: 'Customer Profile',
			path: `/upvc/${userName}/customerprofile`
		},
		{
			icon: faCogs,
			name: 'Manage',
			path: `/upvc/${userName}/manage`
		},
		{
			icon: faBookmark,
			name: 'Profile',
			path: `/upvc/${userName}/profile`
		},
		{
			icon: faSignOutAlt,
			name: 'Logout',
			path: '/'
		}
	]

	return (
        <div className="flex flex-row h-screen">
			<div className="bg-gradient-to-b from-blue-600 to-blue-700 w-[21%] p-4 flex flex-col overflow-y-auto hide-scrollbar shadow-lg gap-6 h-full">
				<div className="flex-none flex flex-col items-center">
					<img
						src={Logo}
						alt="Logo"
						className="w-full h-36 shadow-sm rounded-md shadow-white border-2 border-white"
					/>
				</div>
				<div className="flex flex-col gap-3">
					{menus.map((item, index) => (
						<NavLink
							key={index}
							to={item.path}
							className={({ isActive }) =>
								`flex items-center gap-4 text-base font-medium px-3 py-2.5 rounded-md transition-all duration-300 ${
									isActive
										? 'bg-blue-900 text-white'
										: 'hover:bg-blue-900 text-white'
								}`
							}
						>
							<FontAwesomeIcon icon={item.icon} className="text-xl w-[18px]" />
							<span>{item.name}</span>
						</NavLink>
					))}
				</div>
			</div>
            <div className="flex-1 overflow-auto p-2.5">
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar;