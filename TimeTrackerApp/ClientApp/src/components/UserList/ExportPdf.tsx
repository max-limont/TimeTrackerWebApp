import React, {FC, useEffect, useState} from 'react';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";
import {fetchExportData} from "../../store/userList/userList.slice";

interface Prop{
    count: number,
    orderBy: string,
    isReverse: boolean
}

const ExportPdf: FC<Prop> = ({count, orderBy, isReverse}) => {
    const {exportUsers} = useAppSelector(state => state.rootReducer.userList)
    const dispatch = useDispatch()
    const exportToPDF = () => {
        const doc = new jsPDF()
        autoTable(doc,{
            head: [{
                id:'Id',
                email:'Email',
                firstName:'First Name',
                lastName:"Last Name",
                isFullTimeEmployee:"Is Full-time",
                weeklyWorkingTime:"Weekly working time",
                privilegesValue:"Privileges Value"}],
            body: exportUsers
        })
        doc.save("users.pdf")
    }

    const [isPdf, setIsPdf] = useState(false)

    useEffect(()=>{
        if (isPdf){
            exportToPDF()
            setIsPdf(false)
        }

    },[exportUsers])

    return <a className={"button dark-button"} onClick={() => {
        setIsPdf(true)
        dispatch(fetchExportData({from:0, contentPerPage: count, orderBy, isReverse}))
    }}>Export to PDF</a>
};

export default ExportPdf;