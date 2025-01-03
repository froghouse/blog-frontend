# Blog Frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/9f347129-4a4c-4b3e-943a-ec1f2cc5f51f/deploy-status)](https://app.netlify.com/sites/preeminent-marigold-b962cc/deploys)

A modern blog frontend built with React and Vite, featuring a clean UI and seamless integration with a Flask backend API.

## Features

- 📱 Responsive design
- 🔄 Real-time updates
- 📖 Pagination (5 posts per page)
- 🎯 Error handling with user-friendly messages
- 🚀 Fast page loads with client-side routing

## Tech Stack

- React 18
- Vite
- React Router v6
- Tailwind CSS
- Flask Backend API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see [Backend Repository](link-to-backend-repo))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/blog-frontend.git
cd blog-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000  # Development
# VITE_API_URL=https://api.yourdomain.com  # Production
```

4. Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` to see the app.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Architecture

This frontend is part of a decoupled architecture:

- Frontend (this repo) - Hosted on Netlify
- [Backend API](link-to-backend-repo) - Separate Flask application

### API Integration

The frontend communicates with the backend through these endpoints:

- `GET /` - Fetch paginated posts
- `GET /post/{id}` - Fetch single post
- `POST /create` - Create new post

## Deployment

This project is configured for continuous deployment with Netlify:

1. Push to `main` branch triggers deployment
2. Netlify builds and serves the static files
3. API calls are made to the production backend

## Development

### Project Structure

```
src/
  ├── components/   # React components
  ├── App.jsx      # Main application component
  ├── main.jsx     # Entry point
  └── index.css    # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite team for the lightning-fast build tool
