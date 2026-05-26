import Head from 'next/head';
import { useEffect } from 'react';
import { InlineWidget } from 'react-calendly';

export default function Scheduler() {
  useEffect(() => {
    console.log('done');
  }, []);

  return (
    <div className="h-screen">
      <section className="h-screen">
        <InlineWidget
          url="https://calendly.com/dezka/45min?hide_gdpr_banner=1"
          styles={{height: '100vh'}}
        />
      </section>
    </div>
  );
}