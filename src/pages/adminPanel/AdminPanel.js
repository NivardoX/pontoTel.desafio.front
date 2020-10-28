import React from 'react';
import BasePage from '../basePage/BasePage';

import { CardBordered } from '../../components/dashboard/Cards';
import {Select2Field, SelectField, SelectStockField, TableList} from '../../components/template/Form';
import MessageService from '../../services/MessageService';
import { Icons } from '../../iconSet';
import RestService from '../../services/RestService';
import {Pie, ColumnChart, ColumnData, StockGraph, RealtimeGraph, ApexChart} from '../../components/dashboard/Graphs';
import {FormRow, FormPage} from '../../components/template/Layout';
import { AlertifyError } from '../../services/AlertifyService';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const Messages = new MessageService;
const Rest = new RestService;

class AdminPanel extends BasePage {
    _isMounted = false;
    _isFetching = true;
    static defaultProps = {
        urlBase: "company/",
         spinnerCss : {textAlign: 'center',
             top: "50%"         }

    }

	constructor(props){

        super(props);
        this.state = {
            symbol:"^BVSP",
            quote:0,
            historyData:[],
            item:{},
            fieldErrors:[]

        }
        this.handleCompanyChange = this.handleCompanyChange.bind(this)
        this.fetchHistoric = this.fetchHistoric.bind(this)
        this.handleInfo = this.handleInfo.bind(this);
        this.handleResponseQuote = this.handleResponseQuote.bind(this);

    }handleResponseQuote(data){
        if (!data?.data?.has_error) {
            this.setState({ quote: data.data.price });
        }
    }
    fetchHistoric() {
        Rest.get("/stock/"+this.state.symbol+"/price").then(this.handleResponseQuote)
        return Rest.get(this.props.urlBase+this.state.symbol+"/history");

    }

    handleCompanyChange(e){
        this.setState({[e.target.name]: e.target.value},() =>{
            this._isMounted = false;
            this._isFetching = false;
            this.fetchHistoric().then(this.handleInfo).then(() => {
                console.log("acabou")
                this._isMounted = true;

            })
        });


    }
	componentDidMount(){
        this.interval = setInterval(() => {
            Rest.get("/stock/"+this.state.symbol+"/price").then(this.handleResponseQuote)
            console.log("UPDATING QUOTES")
            this.forceUpdate()

        },5000);
        this.fetchHistoric().then(this.handleInfo)


    }
    componentWillUnmount() {
        clearInterval(this.interval);
        this._isMounted = false;
	}
    handleInfo(data){
        console.log(data)
        if(this.state.has_error || data.data.error){
            AlertifyError([{message: data.data.message}]);
        }else{

            let historyData = []
            for (var quote of data.data.history){
                historyData.push([quote.date,quote.price_closed])
            }

            this.setState({
                historyData:historyData,
                info: data.data
            },() => {
                    this._isMounted = true;
                    this._isFetching = false;
                this.forceUpdate()}
                )



        }
    }

	render()
	{
        console.log(this.state)

        return (

			<React.Fragment>
                <div className="d-auto">

                    <FormPage noIcon bold title="page.dashboard.info">
                        <SelectStockField
                            value={this.state.symbol}
                            empty={true}
                            name="symbol"
                            value_name="symbol"
                            errors={this.state.fieldErrors}
                            onChange={this.handleCompanyChange}
                            label="page.company.fields.symbol"
                            required="required"
                            url="/companies"
                            colsize="3"
                            urlParameters={{"ROWS_PER_PAGE":100}}
                        />

                        {  this._isMounted && !this._isFetching?
                            <div className="d-auto">

                            <h3>Cotação ao vivo: {this.state.quote}</h3>
                                {!this._isFetching ?
                                    <StockGraph companyName={this.state.symbol} historyData={this.state.historyData}/> :<div/>
                                }
                            </div>

                            :  <div style={this.props.spinnerCss}>
                            <div className="sweet-loading">
                                <ClipLoader
                                    size={150}
                                    color={"#123abc"}
                                    loading={true}
                                />
                            </div>
                        </div>}
                    </FormPage>

                </div>
			</React.Fragment>





		)
	}
}

export {AdminPanel};
