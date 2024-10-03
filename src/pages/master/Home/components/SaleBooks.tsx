import { useEffect, useState } from "react";
import booksImg from "../../../../assets/images/books.png";

function SaleBooks() {
  const [time, setTime] = useState({
    days: 768,
    hours: 1,
    minutes: 27,
    seconds: 55,
  });

  // Countdown logic in useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          seconds = 59;
          minutes -= 1;
        } else if (hours > 0) {
          minutes = 59;
          seconds = 59;
          hours -= 1;
        } else if (days > 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
          days -= 1;
        } else {
          // If the countdown reaches zero, clear the interval
          clearInterval(interval);
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="pb-10 px-20 max-sm:px-10">
      <div
        className="bg-[#FCECEC] rounded-md py-10 px-12 flex flex-col lg:flex-row items-start justify-between 
      gap-1 max-lg:gap-4 max-[500px]:px-7"
      >
        <div className="flex flex-col pt-4">
          <h2 className="text-[#463C74] text-[45px] font-bold max-[500px]:text-3xl">
            All books are 50% off now! Don't miss such a deal!
          </h2>
          <p className="text-lg text-[#463C74] mt-3 max-[500px]:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
            feugiat amet, libero ipsum enim pharetra hac.
          </p>
          <div className="flex flex-row items-center mt-6 gap-x-10 gap-y-2 flex-wrap max-[400px]:gap-x-5">
            <div className="flex flex-col items-center">
              <span className="text-[#ED553B] font-bold text-2xl tracking-wide max-[500px]:text-xl">
                {time.days}
              </span>
              <span className="uppercase tracking-wide font-medium max-[500px]:text-sm">
                days
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#ED553B] font-bold text-2xl tracking-wide max-[500px]:text-xl">
                {String(time.hours).padStart(2, "0")}
              </span>
              <span className="uppercase tracking-wide font-medium max-[500px]:text-sm">
                hour
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#ED553B] font-bold text-2xl tracking-wide max-[500px]:text-xl">
                {String(time.minutes).padStart(2, "0")}
              </span>
              <span className="uppercase tracking-wide font-medium max-[500px]:text-sm">
                min
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#ED553B] font-bold text-2xl tracking-wide max-[500px]:text-xl">
                {String(time.seconds).padStart(2, "0")}
              </span>
              <span className="uppercase tracking-wide font-medium max-[500px]:text-sm">
                sec
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center max-lg:w-full">
          <img className="lg:min-w-[400px]" src={booksImg} alt="books" />
        </div>
      </div>
    </section>
  );
}

export default SaleBooks;
