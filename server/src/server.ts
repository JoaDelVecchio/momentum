import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";
import tasksRoutes from "./routes/tasksRoutes";
import taskRoutes from "./routes/taskRoutes";

//.env Variables
const PORT = process.env.PORT;

//Initialize express app
const app = express();

//CORS Policy
app.use(cors());

//Body parser
app.use(express.json());

//Routes
app.use("/api/tasks", tasksRoutes);
app.use("/api/task", taskRoutes);

//Error handler middleware
app.use(notFound);
app.use(errorHandler);

//Run Server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
