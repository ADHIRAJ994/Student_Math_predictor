'use client'

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    gender: '',
    race_ethnicity: '',
    parental_level_of_education: '',
    lunch: '',
    test_preparation_course: '',
    reading_score: '',
    writing_score: '',
  })
  const [result, setResult] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // For demo purposes, calculate a simple prediction based on reading and writing scores
    // In production, this would call your Python model via an API
    const readingScore = parseFloat(formData.reading_score) || 0
    const writingScore = parseFloat(formData.writing_score) || 0
    
    // Simple weighted average with some adjustments for other factors
    let prediction = (readingScore + writingScore) / 2
    
    // Adjust based on test prep
    if (formData.test_preparation_course === 'completed') {
      prediction += 3
    }
    
    // Adjust based on lunch type
    if (formData.lunch === 'standard') {
      prediction += 2
    }
    
    // Adjust based on parental education
    if (formData.parental_level_of_education === "bachelor's degree" || 
        formData.parental_level_of_education === "master's degree") {
      prediction += 3
    }
    
    // Clip to 0-100 range
    prediction = Math.max(0, Math.min(100, Math.round(prediction)))
    
    setTimeout(() => {
      setResult(prediction)
      setIsLoading(false)
    }, 500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-surface border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-primary">Student Performance Predictor</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Student Exam Performance Indicator</h1>
          <p className="text-muted-foreground">Enter student details below to predict their Maths score</p>
        </div>

        {/* Prediction Form */}
        <div className="bg-surface border rounded-xl p-6 sm:p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-1">Student Exam Performance Prediction</h2>
            <p className="text-sm text-muted-foreground">Fill in all the required fields to predict the Maths score</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Gender */}
              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="" disabled>Select your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Race/Ethnicity */}
              <div className="space-y-2">
                <label htmlFor="race_ethnicity" className="text-sm font-medium">Race or Ethnicity</label>
                <select
                  id="race_ethnicity"
                  name="race_ethnicity"
                  value={formData.race_ethnicity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="" disabled>Select Ethnicity</option>
                  <option value="group A">Group A</option>
                  <option value="group B">Group B</option>
                  <option value="group C">Group C</option>
                  <option value="group D">Group D</option>
                  <option value="group E">Group E</option>
                </select>
              </div>

              {/* Parental Level of Education */}
              <div className="space-y-2">
                <label htmlFor="parental_level_of_education" className="text-sm font-medium">
                  Parental Level of Education
                </label>
                <select
                  id="parental_level_of_education"
                  name="parental_level_of_education"
                  value={formData.parental_level_of_education}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="" disabled>Select Parent Education</option>
                  <option value="associate's degree">Associate's Degree</option>
                  <option value="bachelor's degree">Bachelor's Degree</option>
                  <option value="high school">High School</option>
                  <option value="master's degree">Master's Degree</option>
                  <option value="some college">Some College</option>
                  <option value="some high school">Some High School</option>
                </select>
              </div>

              {/* Lunch Type */}
              <div className="space-y-2">
                <label htmlFor="lunch" className="text-sm font-medium">Lunch Type</label>
                <select
                  id="lunch"
                  name="lunch"
                  value={formData.lunch}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="" disabled>Select Lunch Type</option>
                  <option value="free/reduced">Free/Reduced</option>
                  <option value="standard">Standard</option>
                </select>
              </div>

              {/* Test Preparation Course */}
              <div className="space-y-2">
                <label htmlFor="test_preparation_course" className="text-sm font-medium">
                  Test Preparation Course
                </label>
                <select
                  id="test_preparation_course"
                  name="test_preparation_course"
                  value={formData.test_preparation_course}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="" disabled>Select Test Course</option>
                  <option value="none">None</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Reading Score */}
              <div className="space-y-2">
                <label htmlFor="reading_score" className="text-sm font-medium">
                  Reading Score (out of 100)
                </label>
                <input
                  type="number"
                  id="reading_score"
                  name="reading_score"
                  value={formData.reading_score}
                  onChange={handleChange}
                  placeholder="Enter Reading Score"
                  min="0"
                  max="100"
                  required
                  className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Writing Score - Full Width */}
            <div className="space-y-2">
              <label htmlFor="writing_score" className="text-sm font-medium">
                Writing Score (out of 100)
              </label>
              <input
                type="number"
                id="writing_score"
                name="writing_score"
                value={formData.writing_score}
                onChange={handleChange}
                placeholder="Enter Writing Score"
                min="0"
                max="100"
                required
                className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Calculating...' : 'Predict your Maths Score'}
            </button>

            {/* Info Box */}
            <div className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-muted-foreground">
                Enter scores between 0-100 for Reading and Writing. The model will predict the expected Maths score
                based on all provided factors.
              </p>
            </div>
          </form>
        </div>

        {/* Result Card */}
        {result !== null && (
          <div className="bg-surface border rounded-xl p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Prediction Result</h2>
              <p className="text-sm text-muted-foreground">Based on the student information you provided</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-8 text-center">
              <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Predicted Maths Score
              </div>
              <div className="text-6xl font-bold text-primary mb-2">{result}</div>
              <div className="text-sm text-muted-foreground">out of 100</div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-muted-foreground">
        <p>&copy; 2026 Student Performance Predictor. All rights reserved.</p>
      </footer>
    </div>
  )
}
