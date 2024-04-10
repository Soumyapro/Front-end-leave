import React, { useState } from 'react';

const CalenderPage = () => {
    const [date, setDate] = useState(new Date());
    const nationalHolidays = [
        { date: new Date(2024, 0, 1), name: "New Year's Day" },
        { date: new Date(2024, 4, 1), name: "Labor Day" },
        { date: new Date(2024, 6, 4), name: "Independence Day" },
    ];

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getMonthData = (month, year) => {
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = daysInMonth(month, year);
        const data = [];

        let day = 1;
        for (let i = 0; i < 6; i++) {
            data[i] = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    data[i][j] = '';
                } else if (day <= totalDays) {
                    data[i][j] = day++;
                }
            }
        }

        return data;
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthData = getMonthData(date.getMonth(), date.getFullYear());

    const handlePrevMonth = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        setDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        setDate(newDate);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-gray-300 rounded-lg shadow-md p-8 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
                <div className="flex items-center justify-between mb-4">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md" onClick={handlePrevMonth}>Previous</button>
                    <h1 className="text-3xl font-semibold">{monthNames[date.getMonth()]} {date.getFullYear()}</h1>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md" onClick={handleNextMonth}>Next</button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                    <div className="font-semibold text-gray-500">Sun</div>
                    <div className="font-semibold text-gray-500">Mon</div>
                    <div className="font-semibold text-gray-500">Tue</div>
                    <div className="font-semibold text-gray-500">Wed</div>
                    <div className="font-semibold text-gray-500">Thu</div>
                    <div className="font-semibold text-gray-500">Fri</div>
                    <div className="font-semibold text-gray-500">Sat</div>
                    {monthData.map((week, index) => (
                        week.map((day, index) => (
                            <div key={index} className={`py-2 ${day === '' ? 'text-gray-300' : ''}`}>
                                {day}
                                {nationalHolidays.some(holiday => holiday.date.getDate() === day && holiday.date.getMonth() === date.getMonth() && holiday.date.getFullYear() === date.getFullYear()) && (
                                    <span className="block text-xs text-red-500">{nationalHolidays.find(holiday => holiday.date.getDate() === day && holiday.date.getMonth() === date.getMonth() && holiday.date.getFullYear() === date.getFullYear()).name}</span>
                                )}
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalenderPage;
