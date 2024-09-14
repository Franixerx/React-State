import { useEffect, useState } from 'react';

const SetTimeOut = ({ start, duration = 3000, onComplete }) => {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    if (!start) return;

    const interval = 100;
    const decrement = 100 / (duration / interval);

    const timer = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth <= 0) {
          clearInterval(timer);
          if (onComplete) onComplete();
          return 0;
        }
        return prevWidth - decrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [start, duration, onComplete]);

  return (
    <div style={{ width: '200px', backgroundColor: 'lightgray', height: '20px'}}>
      <div style={{ width: `${width}%`, backgroundColor: 'green', height: '100%' }} />
    </div>
  );
};

export default SetTimeOut;
