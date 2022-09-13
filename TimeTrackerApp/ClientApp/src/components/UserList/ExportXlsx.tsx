import React, {FC, useEffect, useState} from 'react';
import * as XLSX from 'xlsx';
import {graphqlRequest} from "../../graphql/api";
import {getPaginatedUserList} from "../../graphql/queries/userList.queries";
import {useDispatch} from "react-redux";
import {fetchExportData} from "../../store/userList/userList.slice";
import {useAppSelector} from "../../hooks/useAppSelector";

interface Prop{
    count: number,
    orderBy: string,
    isReverse: boolean
}

const ExportXlsx: FC<Prop> = ({count, orderBy, isReverse}) => {
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
        <a className={"button dark-button"} onClick={() => {
            setIsXlsx(true)
            dispatch(fetchExportData({from:0, contentPerPage: count, orderBy, isReverse}))
        }}>Export users data</a>
    )
}

export default ExportXlsx;