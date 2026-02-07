export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Student Math Performance Predictor
          </h1>
          <p className="text-lg text-muted-foreground">
            Predict student math performance based on various demographic and educational factors
          </p>
        </div>
        
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Welcome</h2>
          <p className="text-muted-foreground">
            This application uses machine learning to predict student math scores based on factors such as:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Gender</li>
            <li>Race/Ethnicity</li>
            <li>Parental level of education</li>
            <li>Lunch type</li>
            <li>Test preparation course completion</li>
            <li>Reading and writing scores</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
