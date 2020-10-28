import React from 'react';
import BasePage from '../basePage/BasePage';

import { CardBordered } from '../../components/dashboard/Cards';
import {Select2Field, SelectField, TableList} from '../../components/template/Form';
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
    _isMounted2 = false;

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
        this.handleChangeDetails = this.handleChangeDetails.bind(this)
        this.fetchHistoric = this.fetchHistoric.bind(this)
        this.handleInfo = this.handleInfo.bind(this);
        this.handleResponseQuote = this.handleResponseQuote.bind(this);

    }handleResponseQuote(data){
        if (!data?.data?.has_error) {
            this.setState({ quote: data.data.price });
        }
    }
    fetchHistoric() {
        Rest.get("/api/stock/"+this.state.symbol+"/details").then(this.handleResponseQuote)
        return Rest.get(this.props.urlBase+this.state.symbol+"/history");
    }

    handleCompanyChange(e){
        console.log(e)
        this.setState({[e.target.name]: e.target.value});
        this._isMounted = false;
        this.fetchHistoric().then(this.handleInfo).then(() => {
            console.log("acabou")
            this._isMounted = true;
            this.forceUpdate()

        })

    }
	componentDidMount(){
        this.interval = setInterval(() => {
            Rest.get("/api/stock/"+this.state.symbol+"/details").then(this.handleResponseQuote)
            console.log("UPDATING QUOTES")
        },5000);
        this.fetchHistoric().then(this.handleInfo)

        this._isMounted = true;

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
            })

        }
    }
    handleChangeDetails(e) {
        if (
            e.target.name === "symbol"
        ) {
            console.log(e);
            let nome = e.target.label;
            let fieldName = 'empresa_nome';
            this.setState({
                item: {
                    ...this.state.item,
                    [e.target.name]: e.target.value,
                    [fieldName]: nome,
                    fieldErrors: [],
                },
            });
        }
    }


	render()
	{
        console.log(this.state)

        return (

			<React.Fragment>
                <div className="d-auto">

                    <FormPage noIcon bold title="page.dashboard.info">
                        <SelectField
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

                        {  this._isMounted?
                            <div className="d-auto">

                            <h3>Cotação ao vivo: {this.state.quote}</h3>

                            <StockGraph companyName={this.state.symbol} historyData={this.state.historyData}/>
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
