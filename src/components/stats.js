import Chart from 'chart.js/auto'
import container from './container';

export default (categoryNames, scores, colors, summary) => {
    const statsDiv = container();
    const element = document.createElement("canvas");
    const statsParagraph = document.createElement("p");
    statsParagraph.innerHTML = summary;
    statsDiv.appendChild(statsParagraph);
    statsDiv.appendChild(element);
    const ctx = element.getContext("2d");
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: categoryNames,
          datasets: [{
            label: 'Score out of 10',
            data: scores,
            backgroundColor: colors,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 10
            }
        }
    }
    });

    return statsDiv;
}