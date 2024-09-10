type CustomError = {
  status?: number;
  message: string;
};

// Exemple d'utilisation
const error: CustomError = {
  status: 404,
  message: "Resource not found",
};
