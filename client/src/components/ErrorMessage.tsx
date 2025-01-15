const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-8 py-16 bg-neutral-900">
      <p className="text-red-400 font-semibold">{error}</p>
    </main>
  );
};

export default ErrorMessage;
