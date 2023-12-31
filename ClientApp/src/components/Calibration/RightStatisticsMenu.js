﻿import React from "react";
import "./Calibration.css";

class RightStatisticsMenu extends React.Component {
    STATISTICS_PRECISION = 6;

    constructor(props) {
        super(props);
        this.state = {
            rmse: props.errorRates.rmse,
            nse: props.errorRates.nse,
            average: {
                calculatedData: props.errorRates.qModelAvg,
                observedData: props.errorRates.obsmmAvg
            },
            deviation: {
                calculatedData: props.errorRates.qModelDeviation,
                observedData: props.errorRates.obsmmDeviation
            },
            skewness: {
                calculatedData: props.errorRates.qModelSkewness,
                observedData: props.errorRates.obsmmSkewness
            }

        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.errorRates !== this.props.errorRates) {
            this.setState({
                rmse: this.props.errorRates.rmse,
                nse: this.props.errorRates.nse,
                average: {
                    calculatedData: this.props.errorRates.qModelAvg,
                    observedData: this.props.errorRates.obsmmAvg
                },
                deviation: {
                    calculatedData: this.props.errorRates.qModelDeviation,
                    observedData: this.props.errorRates.obsmmDeviation
                },
                skewness: {
                    calculatedData: this.props.errorRates.qModelSkewness,
                    observedData: this.props.errorRates.obsmmSkewness
                }

            });
        }
    }

    render() {
        return (
            <div className="statistics-main-container-calibration">
                <h4 style={{ marginBottom: "1rem", marginTop: "1rem", fontSize: "1.5rem" }}>Statistics</h4>
                    <div className="current-statistics-calibration">
                        <span><b>RMSE:</b> {Number(this.state.rmse).toFixed(this.STATISTICS_PRECISION)}</span>
                        <span><b>NSE:</b> {Number(this.state.nse).toFixed(this.STATISTICS_PRECISION)}</span>
                    </div>
                    <span><b>Averages</b></span>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <span style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem" }}>Observed: {Number(this.state.average.observedData ?? 0).toFixed(this.STATISTICS_PRECISION)}</span>
                        <span style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem" }}>Calculated: {Number(this.state.average.calculatedData ?? 0).toFixed(this.STATISTICS_PRECISION)}</span>
                    </div>
                    <span style={{ display: "flex", justifyContent: "space-between" }}><b>Standard Deviations</b></span>
                    <div className="standart-deviation-calibration">
                        <span style={{ display: "flex", justifyContent: "space-between" }}>Observed: {Number(this.state.deviation.observedData ?? 0).toFixed(this.STATISTICS_PRECISION)}</span>
                        <span style={{ display: "flex", justifyContent: "space-between" }}>Calculated: {Number(this.state.deviation.calculatedData ?? 0).toFixed(this.STATISTICS_PRECISION)}</span>
                    </div>
                    <span style={{ display: "flex", justifyContent: "space-between" }}><b>Skewness</b></span>
                    <div className="standart-deviation-calibration">
                        <span style={{ display: "flex", justifyContent: "space-between" }}>Observed: {Number(this.state.skewness.observedData ?? 0).toFixed(this.STATISTICS_PRECISION)}</span>
                        <span style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>Calculated: {Number(this.state.skewness.calculatedData ?? 0).toFixed(this.STATISTICS_PRECISION)}</span>
                    </div>
            </div>
        );
    }
}

export default RightStatisticsMenu;