# Data Visualization Web Application

## Explanation
This Data Visualization Web Application allows users to easily create interactive charts from their data. Here's how it works:

1. Upload Data: Users can upload CSV or XLSX files containing their data.
2. Select Chart Type: Choose from various chart types including Bar, Line, Pie, Scatter, and more.
3. Customize Visualization: Select which data columns to use for the X and Y axes.
4. Generate Chart: The application processes the data and creates an interactive chart.
5. Explore Results: Users can interact with the chart, toggle between light and dark modes, and analyze their data visually.

This tool is perfect for quickly turning raw data into meaningful visualizations without the need for complex software or coding knowledge.

[Video Tutorial Coming Soon]

## Project Overview
This is a data visualization web application built with Node.js, Express, EJS, and Chart.js. It supports various chart types and data input formats, allowing users to upload CSV or XLSX files and generate interactive charts.

## Installation Process
1. Clone the repository
2. Run `npm install` to install dependencies
3. Install Tailwind CSS: `npm install tailwindcss@latest postcss@latest autoprefixer@latest`
4. Generate Tailwind config: `npx tailwindcss init -p`

## Development Setup
1. Create `src/styles/tailwind.css` with Tailwind directives
2. Add build script to `package.json`: 
   ```json
   "scripts": {
     "build:css": "tailwindcss -i ./src/styles/tailwind.css -o ./public/styles/tailwind.css --watch"
   }
    ```
3. Run `npm run build:css` to generate `public/styles/tailwind.css`

## Running the Application
1. Start the server: `node server.js`
2. Access the application at `http://localhost:3000`

## File Structure
- `server.js`: Main Express server file
- `src/views/`: EJS templates
- `src/controllers/`: Route controllers
- `src/services/`: Business logic services
- `public/`: Static assets and generated CSS

## Key Features
- File upload (CSV, XLSX)
- Dynamic chart generation
- Multiple chart types support (Bar, Line, Pie, Doughnut,  Radar, Polar Area, Scatter, Bubble, Area)
- Dark mode toggle

## Further Development
- Implement user authentication
- Add more chart customization options
- Integrate with databases for data persistence
- Implement data preprocessing options
- Add export functionality for generated charts

## Testing
- Implement unit tests for services
- Add integration tests for API endpoints
- Perform browser compatibility testing

## Deployment
- Set up CI/CD pipeline
- Configure production environment variables
- Deploy to cloud platform (e.g., Heroku, AWS)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.