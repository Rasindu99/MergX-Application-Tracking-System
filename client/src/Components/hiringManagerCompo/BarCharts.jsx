import React from 'react';
import ReactApexChart from 'react-apexcharts';

class BarCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        data: [props.vacancies, props.hired, props.faced, props.accepted, props.totalapp]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Created Vacancies', 'Hired', 'Faced Interview', 'Approved Applications', 'Total Applications'],
        },
        colors: ['#EA7122'] // Change fill color of the bars
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.vacancies !== this.props.vacancies ||
      prevProps.hired !== this.props.hired ||
      prevProps.faced !== this.props.faced ||
      prevProps.accepted !== this.props.accepted ||
      prevProps.totalapp !== this.props.totalapp
    ) {
      this.setState({
        series: [{
          data: [this.props.vacancies, this.props.hired, this.props.faced, this.props.accepted, this.props.totalapp]
        }]
      });
    }
  }

  render() {
    return (
      <div className='w-[92%]'>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={300} />
        </div>
        <div id="html-dist"></div>
        <style>
          {`
          .apexcharts-text tspan {
              fill: #ffffff;
          }
          .apexcharts-gridline {
            display: none;
          }
          .apexcharts-menu {
            background: #1f1f1f;
            border: none;
          }
          .apexcharts-menu-item:hover {
            color: #EA7122;
          }
          .apexcharts-menu-item.exportSVG:hover {
            background: #2b2b2b;
          }
          .apexcharts-menu-item.exportPNG:hover {
            background: #2b2b2b;
          }
          .apexcharts-menu-item.exportCSV:hover {
            background: #2b2b2b;
          }
          .apexcharts-tooltip {
            background: #1f1f1f !important;
          }
          .apexcharts-tooltip .apexcharts-theme-dark {
            background: #1f1f1f !important;
          }
          .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
            background:#362e2e;
          }
          .apexcharts-tooltip-text-y-label{
            display:none;
          }
          `}
        </style>
      </div>
    );
  }
}

export default BarCharts;
