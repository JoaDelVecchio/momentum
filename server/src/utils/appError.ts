class AppError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;

    // Set the prototype explicitly (important for extending Error in TypeScript)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
