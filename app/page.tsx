'use client';
import { useState } from 'react';

export default function LessonPage() {
  const [topic, setTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('6th grade');
  const [lesson, setLesson] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const res = await fetch('/api/generatelesson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, gradeLevel }),
    });
    const text = await res.text();
    setLesson(text);
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI-Powered Mini Lesson Generator</h1>
      <input
        type="text"
        placeholder="Enter a topic (e.g. Photosynthesis)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <select
        value={gradeLevel}
        onChange={(e) => setGradeLevel(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option>4th grade</option>
        <option>6th grade</option>
        <option>9th grade</option>
        <option>12th grade</option>
      </select>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Generating...' : 'Generate Lesson'}
      </button>
      <div className="whitespace-pre-wrap bg-gray-100 p-4 mt-6 rounded" dangerouslySetInnerHTML={{__html: lesson}} />
    </div>
  );
}
