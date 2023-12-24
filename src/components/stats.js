import Chart from 'chart.js/auto'

export default (categoryNames, scores, colors, summary) => {
    const statsDiv = document.createElement("div");
    const statsParagraph = document.createElement("p");
    statsParagraph.innerHTML = summary;
    const element = document.createElement("canvas");
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