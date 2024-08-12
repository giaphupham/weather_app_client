# Weather App Client

## Overview

This is the client-side application for the Weather App, built using React and Vite.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js 
- npm (Node package manager) 

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/weather_app_client.git
    cd weather_app_client
    ```

2. **Install Dependencies**

    Using npm:

    ```bash
    npm install
    ```

3. **Run the Development Server**

    Using npm:

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173/` (or another port if specified).

#### Using Docker

1. **Build the Docker Image**

    ```bash
    docker build -t weather-app-client .
    ```

2. **Run the Docker Container**

    ```bash
    docker run -p 5173:5173 weather-app-client
    ```

    The application will be available at `http://localhost:5173/`.

