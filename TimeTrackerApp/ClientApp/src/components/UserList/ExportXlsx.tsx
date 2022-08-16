import React, {FC} from 'react';
import * as XLSX from 'xlsx';
import {graphqlRequest} from "../../app/api/api";
import {getPaginatedUserList} from "../../graphqlQuery/userList/userListQuery";

interface Prop{
    count: number,
    orderBy: string,
    isReverse: boolean
}

const ExportXlsx: FC<Prop> = ({count, orderBy, isReverse}) => {

    const exportToCSV = async () => {
        const data = await graphqlRequest(getPaginatedUserList, {
            from: 0,
            contentPerPage: count,
            orderBy,
            isReverse
        })
        console.log(data)
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(data.data.userFetchPageList)
        XLSX.utils.book_append_sheet(wb, ws, "Users")
        XLSX.writeFile(wb, "Users.xlsx")
    }
    return (
        <a className={"link-btn exportXlsx button dark-button"} onClick={() => exportToCSV()}>Export users data</a>
    );
};

export default ExportXlsx;