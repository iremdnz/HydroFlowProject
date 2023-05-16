import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Buffer } from 'buffer';
import Swal from 'sweetalert2';
import ModelsRemote from '../flux/ModelsRemote';

class ModelDetailsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: props.showModal,
            model: props.model,
            details: {
                modelName: "",
                updateDate: "",
                version: 0,
                modelType: "",
                parameters: null,
                userName: "",
                userMail: ""
            }
        }
    }

    componentDidMount() {
        ModelsRemote.getDetailsOfModel(this.state.model.id).then(response => {
            if (response.ok) {
                response.json().then(detailsData => {
                    let details = this.state.details;

                    details.modelName = detailsData.latestDetails.modelName;
                    var date = new Date(detailsData.latestDetails.updateDate);
                    date.setUTCHours(date.getUTCHours() + 3);
                    details.updateDate = date.toUTCString();
                    details.version = detailsData.latestDetails.version;
                    details.modelType = detailsData.modelType;
                    details.parameters = detailsData.parameters;
                    details.userName = detailsData.user.name;
                    details.userMail = detailsData.user.email;

                    this.setState({ details: details }, () => console.log(this.state.details));
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "An error occured while retrieving simulation details.",
                    icon: "error"
                }).then(() => this.setState({ showModal: false }, () => this.props.onDismiss()));
            }
        });
    }

    downloadModelData = () => {
        ModelsRemote.downloadModelData(this.state.model.id).then(response => response.json().then(model => {
            let data = model.modelFile;
            const bytes = Buffer.from(data, 'base64')
            const blob = new Blob([bytes])
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "observed-data.xlsx";
            link.click();
            link.remove();
        }))
    }

    getModalHeader = () => {
        return <ModalHeader>
            Simulation Details
        </ModalHeader>
    }

    getModalBody = () => {
        let details = this.state.details;
        let timeZoneOffset = (new Date()).getTimezoneOffset() / -60;
        return <ModalBody>
            <>
                <h2 style={{ textAlign: "center" }}> 
                    { details.modelName + ' - v' + details.version }
                </h2>
                <div>
                    <span><b>Version:</b> {details.version}</span>
                </div>
                <div>
                    <span><b>Update Date:</b> {`${details.updateDate}${timeZoneOffset>0?'+'+timeZoneOffset:timeZoneOffset}`}</span>
                </div>
                <div>
                    <span><b>Model: </b>{details.modelType}</span>
                </div>
                <div>
                    <span><b>Parameters: </b></span>
                </div>
                <div>
                    <span><b>Creator Name: </b>{details.userName}</span>
                </div>
                <div>
                    <span><b>Creator Mail: </b>{details.userMail}</span>
                </div>
                <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        disabled={false}
                        onClick={this.downloadModelData}>
                            Download Observed Data
                    </button>
                </div>
            </>
        </ModalBody>
    }

    getModalFooter = () => {
        return <ModalFooter>
            <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => this.setState({ showModal: false }, () => this.props.onDismiss())}>
                    Close
            </button>
        </ModalFooter>
    }

    render() {
        return <>
            <Modal isOpen={this.state.showModal}>
                {this.getModalHeader()}
                {this.getModalBody()}
                {this.getModalFooter()}
            </Modal>
        </>
    }
}

export default ModelDetailsModal;