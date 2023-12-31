import React from "react";
import ModelSelectorPane from "./ModelSelectorPane";
import LeftOptionsMenu from "./LeftOptionsMenu";
import LineChart from "../Charts/LineChart";
import ScatterChart from "../Charts/ScatterChart";
import OptimizationRemote from "./flux/remote/OptimizationRemote";
import SessionsRemote from "../Constants/flux/remote/SessionsRemote";
import ModelsRemote from "../Models/flux/ModelsRemote";
import Swal from "sweetalert2";
import {Navigate} from "react-router-dom";
import { read, utils } from 'xlsx';
import StatisticsModal from "./StatisticsModal";

class Optimization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingPage: true,
            validSessionPresent: false,
            selectedModel: null,
            userModels: null,
            modelData: null,
            modelingType: "ABCD",
            parameters: null,
            origParamList: null,
            errorRates: {
                optimization: {
                    rmse: null,
                    nse: null,
                    qModelDeviation: null,
                    obsmmDeviation: null,
                    qModelSkewness: null,
                    obsmmSkewness: null,
                    qModelAvg: null,
                    obsmmAvg: null
                },
                verification: {
                    rmse: null,
                    nse: null,
                    qModelDeviation: null,
                    obsmmDeviation: null,
                    qModelSkewness: null,
                    obsmmSkewness: null,
                    qModelAvg: null,
                    obsmmAvg: null
                }
            },
            observedDataOptimization: null,
            predictedDataOptimization: null,
            observedDataVerification: null,
            predictedDataVerification: null,
            scatterDataOptimization: null,
            scatterDataVerification: null,
            samples: null,
            runningOptimization: false,
            showStatisticsModal: false,
            dates: null,
            optimizationPercentage: 0,
            optimizationDates: null,
            verificationDates: null,
        };
    }
    
    componentDidMount() {
        this.checkPermissions();
    }

    checkPermissions = () => {
        let session = window.localStorage.getItem("hydroFlowSession");
        if (session !== null) {
            SessionsRemote.validateSession(session, (status) => {
                if (status) {
                    this.setState({ 
                        validSessionPresent: true,
                        loadingPage: false
                    }, () => {
                        // Fetch models
                        OptimizationRemote.getModelsOfUser(session).then(response => {
                            if (response.status === 200) {
                                response.json().then(modelList => {
                                    this.setState({ userModels: modelList });
                                });
                            }
                        });
                    });
                } else {
                    window.localStorage.removeItem("hydroFlowSession");
                    SessionsRemote.logoutUser(session).then(response => {
                        Swal.fire({
                            title: "Session Expired",
                            text: `Your session has expired. Login required for this page.`,
                            icon: "warning"
                        }).then(() => {
                            this.setState({
                                loadingPage: false,
                                validSessionPresent: false
                            });
                        });
                    });
                }
            });
        } else {
            this.setState({ loadingPage: false });
        }
    }

    onOptimizationFinished = (result) => {
        this.setState({
            type1: result.type1,
            actualObsmmValues: result.actualValues.map(value => Math.trunc(value)),
            type2: result.type2,
            predictedQmodelValues: result.qModelValues.map(value => Math.trunc(value)),
            date: result.date.map(value => value),
            errorRates: {
                rmse: result.rmse_Calibrate,
                nse: result.nse_Calibrate,
                ...result.statistics
            },
            runningOptimization: false
        });
    }

    onCalibrationScatter = (result) => {
        this.setState({
            samples: result.samples
        });
    }
    
    onParameterChange = (newParameters) => {
        this.setState({ parameters: newParameters });
    }

    changeSelectedModel = (event) => {
        if (event.target.value === "SelectModelOption") { return; }
        const model = JSON.parse(event.target.value);
        ModelsRemote.downloadModelData(model.id).then(response => response.json().then(modelData => {
            const dataBase64 = modelData.modelFile;
            this.setState({
                selectedModel: model,
                modelData: dataBase64,
                actualObsmmValues: null,
                predictedQmodelValues: null,
                samples: null,
                errorRates: {
                    optimization: {
                        rmse: null,
                        nse: null,
                        qModelDeviation: null,
                        obsmmDeviation: null,
                        qModelSkewness: null,
                        obsmmSkewness: null,
                        qModelAvg: null,
                        obsmmAvg: null
                    },
                    verification: {
                        rmse: null,
                        nse: null,
                        qModelDeviation: null,
                        obsmmDeviation: null,
                        qModelSkewness: null,
                        obsmmSkewness: null,
                        qModelAvg: null,
                        obsmmAvg: null
                    }
                },
                observedDataOptimization: null,
                predictedDataOptimization: null,
                observedDataVerification: null,
                predictedDataVerification: null,
                scatterDataOptimization: null,
                scatterDataVerification: null,
                optimizationDates: null,
                verificationDates: null,
            })
        }));
        let session = JSON.parse(window.localStorage.getItem("hydroFlowSession"));
        OptimizationRemote.getModelParameters({"Model_Id": model.id, "User_Id": session.sessionUserId}).then(response => response.json().then(parameterData => {
            const modelingType = parameterData.modelingType;
            const parameters = this.getParameters(parameterData.parameters, modelingType);
            this.setState({
                modelingType: modelingType,
                parameters: parameters,
                origParamList: parameterData.parameters
            });
        }));
    }
    
    getParameters = (parameters, modelingType) => {
        if (modelingType === "ABCD") {
            return {
                a: (parameters.find(p => p.model_Param_Name === "a")).model_Param,
                b: (parameters.find(p => p.model_Param_Name === "b")).model_Param,
                c: (parameters.find(p => p.model_Param_Name === "c")).model_Param,
                d: (parameters.find(p => p.model_Param_Name === "d")).model_Param,
                initialSt: (parameters.find(p => p.model_Param_Name === "initialSt")).model_Param,
                initialGt: (parameters.find(p => p.model_Param_Name === "initialGt")).model_Param
            };
        }
        return null;
    }

    convertData = (percentage) => {
        const workbook = read(this.state.modelData, { type: "base64" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = utils.sheet_to_json(worksheet, { header: 1 });

        const headers = data[0];
        const columnData = {};
        headers.forEach((header) => {
            columnData[header] = [];
        });

        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            let isUndefined = false;

            for(let j = 0; j < row.length; j++){
                if(row[j] === undefined){
                    isUndefined = true;
                    break;
                }
            }

            if(!isUndefined){
                headers.forEach((header, index) => {
                    columnData[header].push(row[index]);
                });
            }
        }

        // Check for undefined round #2
        const p = [];
        const pet = [];
        const obsmm = [];
        const dates = [];
        const optimizationDates = [];
        const verificationDates = [];
        columnData.Obsmm.forEach((item, index) => {
            if (typeof(item) !== 'undefined') {
                p.push(columnData.P[index]);
                pet.push(columnData.PET[index]);
                obsmm.push(columnData.Obsmm[index]);

                let dateInt = columnData.Date[index];
                const excelSerialDate = new Date(Date.UTC(1899, 11, 30));
                const excelSerialDay = Math.floor(dateInt);
                const jsDate = new Date(excelSerialDate.getTime() + (excelSerialDay * 86400000));
                const day = ('0' + jsDate.getDate()).slice(-2);
                const month = ('0' + (jsDate.getMonth() + 1)).slice(-2);
                const year = jsDate.getFullYear();

                const formattedDate = day + '.' + month + '.' + year;
                if (index < columnData.Date.length * (percentage / 100)) {
                    optimizationDates.push(formattedDate.split(".").slice(1).join("."));
                } else {
                    verificationDates.push(formattedDate.split(".").slice(1).join("."));
                }
                dates.push(formattedDate);
            }
        });

        this.setState({
            optimizationDates: optimizationDates,
            verificationDates: verificationDates,
            optimizationPercentage: percentage,
            dates: dates
        })
        return {
            P: p,
            PET: pet,
            Obsmm: obsmm
        }
    }
    
    runOptimization = (percentage) => {
        this.setState({
            observedDataOptimization: null,
            predictedDataOptimization: null,
            observedDataVerification: null,
            predictedDataVerification: null,
            scatterDataOptimization: null,
            scatterDataVerification: null,
            optimizationDates: null,
            verificationDates: null
        }, () => {
            let { P, PET, Obsmm } = this.convertData(percentage);

            let payload = {
                Model_Id: this.state.selectedModel.id,
                Model_Type: this.state.modelingType,
                Parameters: JSON.stringify(this.state.parameters),
                P: JSON.stringify(P),
                PET: JSON.stringify(PET),
                Obsmm: JSON.stringify(Obsmm),
                Optimization_Percentage: percentage
            }
    
            this.setState({ runningOptimization: true }, () => {
                OptimizationRemote.optimize(payload).then(response => {
                    if (response.status === 400) {
                        Swal.fire({
                            title: "Incorrect Request",
                            text: `An incorrect request was sent to server.`,
                            icon: "error"
                        });
                    } else if (response.ok) {
                        response.json().then(data => this.handleOptimizationResult(data));
                    }
                });
            });
        });
    }

    handleOptimizationResult = (data) => {
        const optimizedParams = {
            ...this.state.parameters,
            a: Number(data.optimized_Parameters.A).toFixed(2),
            b: Number(data.optimized_Parameters.B).toFixed(0),
            c: Number(data.optimized_Parameters.C).toFixed(2),
            d: Number(data.optimized_Parameters.D).toFixed(2)           
        }

        const statistics = {
            optimization: {
                rmse: data.statistics_Optimization.RMSE,
                nse: data.statistics_Optimization.NSE,
                qModelDeviation: data.statistics_Optimization.DeviationPredicted,
                obsmmDeviation: data.statistics_Optimization.DeviationObserved,
                qModelSkewness: data.statistics_Optimization.SkewnessPredicted,
                obsmmSkewness: data.statistics_Optimization.SkewnessObserved,
                qModelAvg: data.statistics_Optimization.AveragePredicted,
                obsmmAvg: data.statistics_Optimization.AverageObserved
            },
            verification: {
                rmse: data.statistics_Verification.RMSE,
                nse: data.statistics_Verification.NSE,
                qModelDeviation: data.statistics_Verification.DeviationPredicted,
                obsmmDeviation: data.statistics_Verification.DeviationObserved,
                qModelSkewness: data.statistics_Verification.SkewnessPredicted,
                obsmmSkewness: data.statistics_Verification.SkewnessObserved,
                qModelAvg: data.statistics_Verification.AveragePredicted,
                obsmmAvg: data.statistics_Verification.AverageObserved
            }
        };

        const optimizationScatter = [];
        const verificationScatter = [];

        data.scatter_Data_Optimization.forEach((item) => {
            let x = Number(item[0]);
            let y = Number(item[1]).toFixed(2);
            optimizationScatter.push([x, y]);
        });

        data.scatter_Data_Verification.forEach((item) => {
            let x = Number(item[0]);
            let y = Number(item[1]).toFixed(2);
            verificationScatter.push([x, y]);
        });

        this.onParameterChange(optimizedParams);
        this.setState({
            runningOptimization: false,
            errorRates: statistics,
            observedDataOptimization: data.observed_Data_Optimization.map(item => Number(item).toFixed(0))
                .slice(0, data.observed_Data_Optimization.length > this.state.optimizationDates.length ? data.observed_Data_Optimization.length - 1 : data.observed_Data_Optimization.length),
            predictedDataOptimization: data.predicted_Data_Optimization.map(item => Number(item).toFixed(0))
                .slice(0, data.predicted_Data_Optimization.length > this.state.optimizationDates.length ? data.predicted_Data_Optimization.length - 1 : data.predicted_Data_Optimization.length),
            observedDataVerification: data.observed_Data_Verification.map(item => Number(item).toFixed(0))
                .slice(0, data.observed_Data_Verification.length > this.state.verificationDates.length ? data.observed_Data_Verification.length - 1 : data.observed_Data_Verification.length),
            predictedDataVerification: data.predicted_Data_Verification.map(item => Number(item).toFixed(0))
                .slice(0, data.predicted_Data_Verification.length > this.state.verificationDates.length ? data.predicted_Data_Verification.length - 1 : data.predicted_Data_Verification.length),
            scatterDataOptimization: optimizationScatter,
            scatterDataVerification: verificationScatter,
        });
    }

    toggleStatisticsModal = () => {
        this.setState({ showStatisticsModal: !this.state.showStatisticsModal });
    }
    
    render() {
        return this.state.loadingPage ? <></> : 
            !this.state.validSessionPresent ? <Navigate to={"/login"}/> : (
            <>
                <ModelSelectorPane
                    selectedModel={this.state.selectedModel}
                    userModelList={this.state.userModels}
                    onSelectModel={(newModel) => this.changeSelectedModel(newModel)}
                />

                <div className={"optimizations-container"}>
                    <div style={{flexDirection : "column" }}>
                        <LeftOptionsMenu
                            selectedModel={this.state.selectedModel}
                            modelingType={this.state.modelingType}
                            parameters={this.state.parameters}
                            originalParameters={this.state.origParamList}
                            onStartOptimize={(percentage) => this.runOptimization(percentage)}
                            onParameterChange={this.onParameterChange}
                            isOptimizationRunning={this.state.runningOptimization}
                            dates={this.state.dates}
                        />
                        <div className="statistics-btn-div">
                            <button
                                type="button" 
                                className="btn btn-primary"
                                disabled={!this.state.errorRates.optimization.rmse && !this.state.errorRates.verification.rmse}
                                onClick={this.toggleStatisticsModal}>
                                    Statistics
                            </button>
                        </div>
                        {
                            this.state.showStatisticsModal && <StatisticsModal
                                showModal={this.state.showStatisticsModal}
                                errorRates={this.state.errorRates}
                                onDismiss={this.toggleStatisticsModal}
                            />
                        }
                    </div>
                    <div className={"optimization-output-main-container"}>
                        {this.state.observedDataOptimization && this.state.predictedDataOptimization
                            && this.state.scatterDataOptimization && (
                                <h4 style={{marginBottom: "20px"}}>Auto-Calibration Results</h4>
                            )}
                        <div style={{ display: "flex" }}>
                            {this.state.observedDataOptimization && this.state.predictedDataOptimization && this.state.optimizationDates && (
                                <div>
                                    <LineChart
                                        type1="Observed Streamflow"
                                        actual={this.state.observedDataOptimization}
                                        type2="Predicted Streamflow"
                                        predicted={this.state.predictedDataOptimization}
                                        date={this.state.optimizationDates}
                                    />

                                </div>
                            )}
                            {this.state.scatterDataOptimization && (
                                <ScatterChart samples={this.state.scatterDataOptimization} />
                            )}
                        </div>
                        {this.state.observedDataVerification && this.state.predictedDataVerification
                            && this.state.scatterDataVerification && (
                                <h4 style={{marginBottom: "20px", marginTop: "1rem"}}>Verification Results</h4>
                            )}
                        <div style={{display: "flex"}}>
                            {
                                this.state.observedDataVerification && this.state.predictedDataVerification && this.state.verificationDates && <>
                                    <LineChart
                                        type1="Observed Streamflow"
                                        actual={this.state.observedDataVerification}
                                        type2="Predicted Streamflow"
                                        predicted={this.state.predictedDataVerification}
                                        date={this.state.verificationDates}/>
                                </>
                            }
                            {
                                this.state.scatterDataVerification && <ScatterChart
                                    samples={this.state.scatterDataVerification}/>
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Optimization;