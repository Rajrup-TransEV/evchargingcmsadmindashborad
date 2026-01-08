// import React from 'react';
// import BarChart from '../../charts/BarChart01';

// // Import utilities
// import { tailwindConfig } from '../../utils/Utils';

// function DashboardCard04() {

//   const chartData = {
//     labels: [
//       '12-01-2022', '01-01-2023', '02-01-2023',
//       '03-01-2023', '04-01-2023', '05-01-2023',
//     ],
//     datasets: [
//       // Light blue bars
//       {
//         label: 'Direct',
//         data: [
//           800, 1600, 900, 1300, 1950, 1700,
//         ],
//         backgroundColor: tailwindConfig().theme.colors.sky[500],
//         hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
//         barPercentage: 0.7,
//         categoryPercentage: 0.7,
//         borderRadius: 4,
//       },
//       // Blue bars
//       {
//         label: 'Indirect',
//         data: [
//           4900, 2600, 5350, 4800, 5200, 4800,
//         ],
//         backgroundColor: tailwindConfig().theme.colors.violet[500],
//         hoverBackgroundColor: tailwindConfig().theme.colors.violet[600],
//         barPercentage: 0.7,
//         categoryPercentage: 0.7,
//         borderRadius: 4,
//       },
//     ],
//   };

//   return (
//     <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
//       <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
//         <h2 className="font-semibold text-gray-800 dark:text-gray-100">Direct VS Indirect</h2>
//       </header>
//       {/* Chart built with Chart.js 3 */}
//       {/* Change the height attribute to adjust the chart height */}
//       <BarChart data={chartData} width={595} height={248} />
//     </div>
//   );
// }

// export default DashboardCard04;
import React from 'react';
import BarChart from '../../charts/BarChart01';
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04() {
  const chartData = {
    labels: [
      'Dec 2022', 'Jan 2023', 'Feb 2023',
      'Mar 2023', 'Apr 2023', 'May 2023',
    ],
    datasets: [
      {
        label: 'Direct',
        data: [800, 1600, 900, 1300, 1950, 1700],
        backgroundColor: tailwindConfig().theme.colors.sky[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
        barPercentage: 0.65,
        categoryPercentage: 0.6,
        borderRadius: 6,
      },
      {
        label: 'Indirect',
        data: [4900, 2600, 5350, 4800, 5200, 4800],
        backgroundColor: tailwindConfig().theme.colors.violet[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[600],
        barPercentage: 0.65,
        categoryPercentage: 0.6,
        borderRadius: 6,
      },
    ],
  };

  return (
    <div
      className="relative flex flex-col col-span-full sm:col-span-6
      rounded-2xl border border-gray-200/60 dark:border-gray-700/60
      bg-gradient-to-br from-white via-indigo-50 to-purple-50
      dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
      shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-violet-400/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="relative px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Direct vs Indirect Revenue
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Monthly comparison overview
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              Direct
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span>
              Indirect
            </div>
          </div>
        </div>
      </header>

      {/* Chart */}
      <div className="relative px-4 pb-6">
        <BarChart data={chartData} width={595} height={260} />
      </div>

      {/* Bottom Accent */}
      <div className="px-6 pb-4">
        <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-purple-500 opacity-40"></div>
      </div>
    </div>
  );
}

export default DashboardCard04;
