# Momentum

A modern, full-stack task management application built with performance, scalability, and elegance in mind. This app allows users to create, manage, and organize their tasks effectively, offering a sleek and minimalistic design inspired by luxury brand aesthetics.

## Features

- **Task Management**: Add, edit, delete, and mark tasks as completed.
- **Daily Organization**: Tasks are categorized into "Daily Discipline", "Daily Wins", and "What's Next" for better organization.
- **Responsive Design**: A seamless experience across desktop, tablet, and mobile devices.
- **Smooth Animations**: Elegant transitions and animations enhance the user experience.

## Tech Stack

### Frontend

- **React**: For building the user interface with reusable components.
- **Tailwind CSS**: For efficient and modern styling, emphasizing minimalism and clean design.

### Backend

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Fast and lightweight web framework for creating RESTful APIs.

### Database

- **Supabase**: A scalable PostgreSQL database with real-time capabilities.

### Additional Tools & Libraries

- **React Icons**: For intuitive and visually appealing icons.
- **TypeScript**: Ensures type safety and minimizes runtime errors.
- **ESLint & Prettier**: For consistent code formatting and quality.

## Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repo/task-manager-app.git
   cd task-manager-app
   ```

2. **Install Dependencies:**

   - Install backend dependencies:
     ```bash
     cd server
     npm install
     ```
   - Install frontend dependencies:
     ```bash
     cd client
     npm install
     ```

3. **Environment Variables:**

   - Create a `.env` file in the `server` directory and configure the following:
     ```env
     DATABASE_URL=your-supabase-database-url
     SUPABASE_KEY=your-supabase-service-key
     PORT=8000
     ```

4. **Start the Development Server:**

   - Backend:
     ```bash
     cd server
     npm start
     ```
   - Frontend:
     ```bash
     cd client
     npm start
     ```

5. **Access the App:**
   Navigate to `http://localhost:3000` to start using the app.

## Project Structure

```
root
├── client           # React frontend
│   ├── src
│   │   ├── components   # Reusable React components
│   │   ├── pages        # Page-level components
│   │   ├── styles       # Global styles
│   │   └── utils        # Helper functions and utilities
├── server           # Node/Express backend
│   ├── routes          # API routes
│   ├── controllers     # Business logic
│   ├── models          # Database models
│   └── utils           # Helper functions
└── README.md
```

## Deployment

This app can be easily deployed using platforms like:

- **Frontend**: [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/)
- **Backend**: [Render](https://render.com/) or [Heroku](https://www.heroku.com/)

For a production build:

- **Frontend:**

  ```bash
  cd client
  npm run build
  ```

- **Backend:**
  Ensure your `DATABASE_URL` and `SUPABASE_KEY` are correctly set in the production environment.

## Future Enhancements

- **User Authentication**: Implement login and signup functionality.
- **Real-Time Updates**: Sync tasks across devices using WebSocket or Supabase's real-time features.
- **Dark Mode Toggle**: Allow users to switch between light and dark themes.
- **Tagging & Filtering**: Enable categorization and filtering of tasks by tags.

## Acknowledgments

This project was inspired by modern productivity tools and designed to emulate the aesthetics and functionality of luxury apps.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to fork this repository and contribute to its development. Your feedback and ideas are welcome!
