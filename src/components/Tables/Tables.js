import React, {Component} from "react";
import {Table} from "react-bootstrap";

function TableHeader(headers) {
    let tableHeader = [];
    Object.keys(headers).forEach(
        key => tableHeader.push(
            <th key={key}>{headers[key]}</th>
        )
    );
    return (
        <thead>
        <tr>
            {tableHeader}
        </tr>
        </thead>
    );
}

function TableData(data) {
    let tableData = [];
    Object.keys(data).forEach(
        key => tableData.push(
            <td key={key}>{data[key]}</td>
        )
    );
    return(
        <tr>{tableData}</tr>
    );
}

class Tables extends Component{
    render() {
        let tableRow = [];
        for (let i = 0; i < this.props.tableData.length; i++){
            tableRow.push(
                <TableData {...this.props.tableData[i]}/>
            );
        }
        console.log(tableRow)
        return (
            <Table responsive bordered>
                <TableHeader {...this.props.headers}/>
                <tbody>{tableRow}</tbody>
            </Table>
        );
    }
}

export default Tables;
