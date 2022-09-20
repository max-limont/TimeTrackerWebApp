import React, {CSSProperties, FC, useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import {graphqlRequest} from "../../graphql/api";
import {getPaginatedUserList} from "../../graphql/queries/userList.queries";
import {useDispatch} from "react-redux";
import {fetchExportData} from "../../store/userList/userList.slice";
import {useAppSelector} from "../../hooks/useAppSelector";

interface Prop{
    orderBy: string,
    isReverse: boolean
}

const ExportXlsx: FC<Prop> = ({orderBy, isReverse}) => {
    const {exportUsers} = useAppSelector(state => state.rootReducer.userList)
    const dispatch = useDispatch()
    const exportToCSV = () => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(exportUsers)
        XLSX.utils.book_append_sheet(wb, ws, "Users")
        XLSX.writeFile(wb, "Users.xlsx")
    }

    const [isXlsx, setIsXlsx] = useState(false)

    useEffect(()=>{
        if (isXlsx){
            exportToCSV()
            setIsXlsx(false)
        }

    },[exportUsers])
    return (
        <a className={"dark-button export"} onClick={() => {
            setIsXlsx(true)
            dispatch(fetchExportData({from:0, contentPerPage: 0, orderBy, isReverse}))
        }}>XLSX</a>
    )
}

export default ExportXlsx;