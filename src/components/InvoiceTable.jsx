import './InvoiceTable.css';
import AddButton from './AddButton';
import React from 'react'
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { useState } from "react"
import axios from "axios"

let globalId = 4;

const InvoiceTable = ({ initialData }) => {
//take initial data and turn it into state to not have to refreh it from App each time we modify it
const [currentData, setCurrentData] = useState(initialData)

 //Create a function that will add a row to currentData
const addRow = async () => {

    const response = await axios.post('/invoice/add', { 
        description: "Enter description here"
    })

    setCurrentData([...currentData, response.data.newInvoice])
}

    const deleteRow = (id) => {
        axios.delete(`/invoice/delete/${id}`)
        .then((res) => {

            if (res.data.status) {
            const filteredList = currentData.filter((invoice) => {
                return invoice.id !== id
            })
            setCurrentData(filteredList)
        } else {
            console.log(filteredList)
        }
        })
    }


    //loop through initial data and return  table row component for each invoice object in the array
    const rows = currentData.map((invoice) => {
        // const { id, description, hours, rate } = invoice


        return (
            <TableRow 
            key={invoice.id}
            initialIsEditing={false}
            initialInvoiceData={invoice}
            deleteFunc={() => deleteRow(invoice.id)}
            />
        )
        }
    )

    //Delete the function needs to get the row's id and then find that entry in currentData remove it (and use the setCurrentData)
    // const deleteRow = (id) => {
    //     // make a new array from currentData that filters out the entry whos id matchde the id argument
    //     const filteredList = currentData.filter((invoice) => invoice.id !== id) 
    //     //update currentData to filtered list
    //     setCurrentData(filteredList)
    // }


  return (
    <div>
        <table>
            <thead>
                <TableHeader />
            </thead>

            <tbody>
                {rows}
            </tbody>

            <tfoot>
                <AddButton addRow={addRow} />
            </tfoot>
        </table>
    </div>
  )
}

export default InvoiceTable