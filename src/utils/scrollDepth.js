export default function scrollDepth({values, callback}) {
  const scrollDepthValues = values;

  const scrollDepthEventsTriggered = Array(scrollDepthValues.length).fill(false);

  function trackScrollDepth() {
    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollDistance = window.scrollY + innerHeight;
    const scrollPercentage = (scrollDistance / scrollHeight) * 100;

    for (let i = 0; i < scrollDepthValues.length; i++) {
      if (scrollPercentage >= scrollDepthValues[i] && !scrollDepthEventsTriggered[i]) {
        callback(scrollDepthValues[i])
        scrollDepthEventsTriggered[i] = true;
      }
    }
  }
  window.addEventListener('scroll', trackScrollDepth);
}