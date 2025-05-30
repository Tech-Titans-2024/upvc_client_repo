import React from 'react'
import BarChart from './BarChart'
import HrChart from './HrChart'
import LineChart from './LineChart'
import PieChart1 from './PieChart1'
import PieChart2 from './PieChart2'
import PieChart3 from './PieChart3'

function Main() 
{
	return (
		<div className="w-full h-auto p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50">
			<div className="flex flex-col gap-6">
				<h1 className="text-4xl font-bold text-center text-gray-800">Dashboard</h1>
				{/* <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transforM">
					<BarChart />
				</div> */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform">
						<HrChart />
					</div>
					<div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform">
						<LineChart />
					</div>
				</div>
				<div className="grid grid-cols-3 gap-6">
					<PieChart1 />
					<PieChart2 />
					<PieChart3 />
				</div>
			</div>
		</div>
	)
}

export default Main