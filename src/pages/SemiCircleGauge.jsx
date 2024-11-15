// SemiCircleGauge.js
import React from 'react';
import Chart from 'react-apexcharts';

const SemiCircleGauge = ({rating, rating_count}) => {
    // Convert the percentage to a fraction

    const fraction = `${(rating/rating_count).toFixed(1)}/5`;  // Change this to whatever fraction you want to display
    const numericPercentage = (rating/rating_count)*20; // 4/5 as a percentage

    const options = {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
                enabled: true,
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: '#CBC3E3',
                    strokeWidth: '97%',
                    margin: 5, // Space between the track and the gauge
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        offsetY: -10,
                        fontSize: '22px',
                        color: '#FFFFFF',
                        formatter: function () {
                            return fraction; // Display the fraction here
                        },
                    },
                },
            },
        },
        fill: {
            colors: ['#008080'],
        },
        series: [numericPercentage], // Use the numeric percentage for the gauge
        labels: ['Progress'],
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-black shadow-lg rounded-lg p-6 items-center flex flex-col">
                <h1 className='text-white font-bold'>Events Rating</h1>
                <Chart
                    options={options}
                    series={options.series}
                    type="radialBar"
                    height={250}
                />
            </div>
        </div>
    );
};

export default SemiCircleGauge;