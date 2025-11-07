# PM-Pulse Frontend# Getting Started with Create React App



A modern React-based project management and team analytics platform built with Vite, Ant Design, and Tailwind CSS.This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## ✨ Features## Available Scripts



- **User Authentication** - Secure login and registrationIn the project directory, you can run:

- **Project Management** - Create and manage projects

- **Risk Analysis** - AI-powered risk assessment### `npm start`

- **Team Planning** - Intelligent team composition recommendations

- **SDLC Prediction** - Software development lifecycle predictionsRuns the app in the development mode.\

- **Complexity Analysis** - Project complexity evaluationOpen [http://localhost:3000](http://localhost:3000) to view it in your browser.

- **KPI Management** - Track and manage employee KPIs

- **Employee Management** - Add and view employee informationThe page will reload when you make changes.\

- **Interactive Charts** - Data visualization with RechartsYou may also see any lint errors in the console.

- **PDF Export** - Export reports to PDF

### `npm test`

## 🛠️ Tech Stack

Launches the test runner in the interactive watch mode.\

- **React 18** - UI librarySee the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- **Vite** - Fast build tool and dev server

- **React Router v6** - Client-side routing### `npm run build`

- **Ant Design** - Enterprise-grade UI components

- **Tailwind CSS** - Utility-first CSS frameworkBuilds the app for production to the `build` folder.\

- **Axios** - HTTP client for API callsIt correctly bundles React in production mode and optimizes the build for the best performance.

- **Recharts** - Charting library

- **SweetAlert2** - Beautiful alertsThe build is minified and the filenames include the hashes.\

- **html2canvas & jsPDF** - PDF generationYour app is ready to be deployed!



## 📋 PrerequisitesSee the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



- **Node.js** >= 16.x### `npm run eject`

- **npm** >= 8.x or **yarn** >= 1.x

- Backend server running on `http://127.0.0.1:5001` (or configure in `.env`)**Note: this is a one-way operation. Once you `eject`, you can't go back!**



## 🚀 InstallationIf you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.



1. **Install dependencies**:Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

   ```bash

   npm installYou don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

   ```

## Learn More

2. **Configure environment variables**:

   The `.env` file is already configured for local development:You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

   ```env

   VITE_API_BASE_URL=http://127.0.0.1:5000To learn React, check out the [React documentation](https://reactjs.org/).

   ```

   ### Code Splitting

   Update this if your backend runs on a different port.

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

## 🎯 Running the Application

### Analyzing the Bundle Size

### Development Mode

```bashThis section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

npm run dev

```### Making a Progressive Web App



The application will start at `http://localhost:5173`This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)



### Production Build### Advanced Configuration

```bash

npm run buildThis section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

```

### Deployment

### Preview Production Build

```bashThis section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

npm run serve

```### `npm run build` fails to minify



## 📁 Key DirectoriesThis section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# pm-pulse-FE

```
pm-pulse-FE/
├── src/
│   ├── apis/            # API configuration
│   ├── components/      # Reusable components
│   ├── guards/          # Route protection
│   ├── pages/           # Page components
│   │   └── Content/     # Feature pages
│   └── router/          # Routing setup
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## 🔒 Authentication

- Login sets authentication state in localStorage
- Protected routes automatically redirect to login
- AuthGuard prevents authenticated users from accessing login/register

## 🌐 API Integration

All API calls use `src/apis/axiosInstance.js` with the base URL from `.env`.

### Main Endpoints:
- `POST /login` - User login
- `POST /register` - User registration
- `POST /risk` - Risk analysis
- `POST /complexity` - Complexity prediction
- `POST /sdlc` - SDLC prediction
- `GET /employee/all` - Get employees
- `POST /kpi/employee` - Employee KPIs
- `GET /get-projects` - Get projects

## ✅ Recent Improvements

1. ✅ Fixed login navigation path typo
2. ✅ Cleaned up console.log statements
3. ✅ Added environment variable support
4. ✅ Updated author information
5. ✅ Enhanced .gitignore configuration

## 🐛 Troubleshooting

**API Connection Issues:**
- Ensure backend is running on port 5001
- Check `.env` file has correct `VITE_API_BASE_URL`

**Build Errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 👤 Author

**Kavindu Perera** (kavinduperera)

---

**Last Updated:** November 7, 2025
