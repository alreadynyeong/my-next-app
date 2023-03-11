import { NextPage } from "next";
import moment from "moment";
import Link from "next/link";
import React, {useState} from "react";

interface DateData {
    full: string;
    date: string;
}
const CalendarPage : NextPage = () => {
    const [selected, setSelected] = useState(moment());

    const moveNextMonth = () => {
        setSelected(selected.clone().add(1, "month"));
    }

    const movePrevMonth = () => {
        setSelected(selected.clone().subtract(1, "month"));
    }

  return (
    <>
     <p>HI CalendarPage</p>
     <div>
        <button onClick={movePrevMonth}>이전달</button>
        <span>{selected.format("YYYY.MM월")}</span>
        <button onClick={moveNextMonth}>다음달</button>
        <MonthCalendar selected={selected} />
     </div>
    </>
  )
}

const MonthCalendar = ({selected}: {selected: moment.Moment})=>{
    let date = selected.clone().startOf("month");
    let dates: DateData[] = [];

    for(let i=date.date();i>0;i--){
        dates.unshift({full: `${i}`, date: `none`});
    }

    for(;date<selected.clone().endOf("month");date.add(1,"day")){
        const data: DateData = {
            full: date.format("YYYY-MM-DD"),
            date: date.format("DD"),
        };
        dates = dates.concat(data);
    }

    let calendar: DateData[][]= Array.from(Array(6), () => new Array(7));
    dates.forEach((date, index) => {
        calendar[Math.floor(index/7)][index%7]=date;
    });

    return(
        <div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week, index)=>(
                        <tr key={index}>
                            {week.map((day)=>(
                                <td key={day.full}>
                                    {day.date !== "none"?(
                                        <Link href={`/main?date=${day.full}`}>
                                            <span>{day.date}</span>
                                        </Link>
                                    ): (<></>)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CalendarPage;
