class DataVisualizationService {
  static createTableHTML(data) {
    if (data.length === 0) return '<p>No data available</p>';

    const headers = Object.keys(data[0]);
    let html = '<table><thead><tr>';
    headers.forEach(header => {
      html += `<th>${header}</th>`;
    });
    html += '</tr></thead><tbody>';

    data.forEach(row => {
      html += '<tr>';
      headers.forEach(header => {
        html += `<td>${row[header]}</td>`;
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
  }

  static createChartData(data, xAxis, yAxis) {
    const labels = data.map(item => item[xAxis]);
    const values = data.map(item => parseFloat(item[yAxis]));

    return {
      labels,
      datasets: [{
        label: yAxis,
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  }
}

module.exports = DataVisualizationService;
