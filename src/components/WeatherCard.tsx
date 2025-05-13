import React from 'react';

interface WeatherData {
  date: string;
  summary: string;
  temperature: {
    max: number;
    min: number;
  };
  sunlight: number;
  rainChance: number;
  rainAmount: number;
  windSpeed: number;
  humidity: number;
  advice: string[];
}

const WeatherCard: React.FC<{ data: WeatherData }> = ({ data }) => {
  return (
    <div className="p-6 bg-gray-200 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{data.date}</h2>
          <p className="text-sm text-gray-600">{data.summary}</p>
        </div>
        <div>
          <div className="text-xl">{data.temperature.max}° / {data.temperature.min}°</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg">রোদ-বৃষ্টি</h3>
            <p>{data.sunlight} ঘণ্টা রোদ, {data.rainChance}% বৃষ্টি, {data.rainAmount} মিমি বৃষ্টি</p>
          </div>
          <div>
            <h3 className="text-lg">বাতাস-আর্দ্রতা</h3>
            <p>{data.windSpeed} কিমি/ঘণ্টা, {data.humidity}% আর্দ্রতা</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">কৃষি পরামর্শ:</h3>
          <ul className="list-disc pl-5">
            {data.advice.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const weatherData: WeatherData = {
    date: '৬ মে ২০২৫, মঙ্গলবার',
    summary: 'মেঘলা, মাঝে মাঝে হালকা বৃষ্টি',
    temperature: {
      max: 33,
      min: 26,
    },
    sunlight: 3,
    rainChance: 60,
    rainAmount: 4,
    windSpeed: 18,
    humidity: 82,
    advice: [
      'বীজ ফেলার জন্য ভালো সময়',
      'ধান সিদ্ধ করার জন্য দিনটি অনুকূল নয়',
      'বাগান বা খেত সেচ দিতে পারো',
      'কোনও ধরনের কীটনাশক ছিটানোর জন্য বৃষ্টি আসতে পারে, তাই বিরত থাকো',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <WeatherCard data={weatherData} />
    </div>
  );
};

export default App;
