import React from 'react';
import ReactApexChart from 'react-apexcharts'


class Pie extends React.Component {
    constructor(props) {
      super(props);

      this.state = {

        series: this.props.values,
        options: {
          title: {
              text: this.props.title,
              align: 'left',
              margin: 10,
              offsetX: 0,
              offsetY: 0,
              floating: false,
              style: {
                  fontSize:  '14px',
                  fontWeight:  'bold',
                  fontFamily:  undefined,
                  color:  '#263238'
              },
          },
            chart: {

              width: 380,
              type: 'pie',
            },
            labels: this.props.labels,
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
        },


      };
    }


    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.props.values} type="pie" width={380} />
            </div>
        );
    }
  }




class StockGraph extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      series: [{
        data: this.props.historyData,
        name: this.props.companyName

      }],
      options: {
        chart: {
          animations: {
            enabled: false,
            easing: 'easeinout',
            speed: 800,

            dynamicAnimation: {
              enabled: false
            }
          },
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },

          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Preço',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return (val / 1).toFixed(0);
            },
          },
          title: {
            text: 'Preço x Tempo'
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val / 1).toFixed(2)
            }
          }
        }
      }
    };
  }



  render() {
    return (

        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
        </div>



    );
  }
}

/*----------------------------------------------------------------------------------------------------*/

class ColumnChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        name: 'Emitidas',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, {
        name: 'Recebidas',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }, {
        name: 'Inabilitadas',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Aug', 'Set', 'Out'],
        },
        yaxis: {
          title: {
            text: 'Faturamento R$ (reais)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "R$ " + val + " reais"
            }
          }
        }
      },


    };
  }



  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} width={1000} />
      </div>
    );
  }
}

/*----------------------------------------------------------------------------------------------------*/

class ColumnData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [
        {
          name: "2013",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "2014",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Notas emitidas',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
          title: {
            text: 'Mês'
          }
        },
        yaxis: {
          title: {
            text: 'Qnt.'
          },
          min: 5,
          max: 40
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },


    };
  }



  render() {
    return (


      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={500} />
      </div>


    );
  }
}
    /*----------------------------------------------------------------------------------------------------*/

export {Pie, ColumnChart, ColumnData, StockGraph};
