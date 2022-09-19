import React, {CSSProperties, FC, useEffect, useState} from 'react';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";
import {fetchExportData} from "../../store/userList/userList.slice";


interface Prop{
    orderBy: string,
    isReverse: boolean
}

const ExportPdf: FC<Prop> = ({orderBy, isReverse}) => {
    const exportUsers = useAppSelector(state => state.rootReducer.userList.exportUsers)
    const dispatch = useDispatch()
    const exportToPDF = () => {
        const doc = new jsPDF()
        autoTable(doc,{
            head: [{
                email:'Email',
                firstName:'First Name',
                lastName:"Last Name",
                workType:"Work Type",
                workingTime:"Weekly working time"}],
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

    return <a className={"dark-button export"} onClick={() => {
        setIsPdf(true)
        dispatch(fetchExportData({from:0, contentPerPage: 0, orderBy, isReverse}))
    }}>PDF</a>
};

export default ExportPdf;