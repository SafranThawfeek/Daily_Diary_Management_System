import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function CalendarView() {
  const [entries, setEntries] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    api.get('/diary').then(res => {
      setEntries(res.data);
    });
  }, []);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentDate);
    const startDay = firstDayOfMonth(currentDate);
    const calendarDays = [];

    for (let i = 0; i < startDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="border p-2 h-24"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEntries = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === date.toDateString();
      });

      calendarDays.push(
        <div key={day} className="border p-2 h-24 overflow-y-auto">
          <div className="font-bold">{day}</div>
          {dayEntries.map(entry => (
            <div key={entry._id} className="text-sm bg-blue-100 rounded p-1 mt-1">
              {entry.title}
            </div>
          ))}
        </div>
      );
    }

    return calendarDays;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="px-4 py-2 bg-blue-500 text-white rounded">Previous</button>
        <h2 className="text-xl font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={goToNextMonth} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-bold text-center">{day}</div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
}
