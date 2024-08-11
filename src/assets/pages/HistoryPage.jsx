import React from 'react';
import WeatherHistory from '../components/WeatherHistory';
import Navbar from '../components/NavBar';

const HistoryPage = () => {
    return (
        <div>
            <Navbar />
            <div className='container p-6'>
                <h1 className="text-2xl font-bold mb-4">Weather History</h1>
                
                <WeatherHistory />
            </div>

            {/* <div className="mt-4">
                <Link to="/" className="btn btn-primary">
                    Back to Home
                </Link>
            </div> */}
        </div>
    );
};

export default {
    routeProps: {
      path: "/history",
      main: HistoryPage,
    },
  };
