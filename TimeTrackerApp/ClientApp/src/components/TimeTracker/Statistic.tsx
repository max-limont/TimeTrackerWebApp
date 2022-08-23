import {FC, useEffect, useState} from "react";

export type StatisticDataType = {
    value: number,
    title: string,
    color?: string
}

export type StatisticPropsType = {
    metadata: {
        maxValue: number,
        minValue: number,
        gap: number,
        itemWidth: number,
        width: number
        height: number
    }
    data: StatisticDataType[]
}

export type StatisticStateType = {
    chartWidth: number,
    chartHeight: number,
    chartMaxValue: number,
    chartMinValue: number
}

const initialState: StatisticStateType = {
    chartWidth: 0,
    chartHeight: 0,
    chartMaxValue: 0,
    chartMinValue: 0
}

export const Statistic: FC<StatisticPropsType> = (props) => {

    const { metadata, data } = props
    const [state, setState] = useState({...initialState, chartHeight: metadata.height, chartWidth: metadata.width, chartMaxValue: metadata.maxValue, chartMinValue: metadata.minValue});

    const resizeChart = () => {
        let maxValue = metadata.maxValue, minValue = metadata.minValue;
        data.forEach(item => {
            minValue = Math.min(minValue, item.value)
            maxValue = Math.max(maxValue, item.value)
        })
        console.log((metadata.maxValue - metadata.minValue) / (maxValue - minValue === 0 ? 1e20 : maxValue - minValue))
        setState({
            ...state,
            chartWidth: Math.min(document.getElementsByClassName('statistic-panel')[0].clientWidth - 45 ?? metadata.width, metadata.width),
            chartHeight: metadata.height * Math.max(1, (maxValue - minValue === 0 ? 1e20 : maxValue - minValue) / (metadata.maxValue - metadata.minValue)),
            chartMaxValue: maxValue,
            chartMinValue: minValue
        })
    }

    useEffect(() => {
        window.addEventListener('resize', () => resizeChart(), false)
        resizeChart()
    }, [])

    console.log(state.chartHeight)

    return (
        <div className={'chart-wrapper flex-container flex-column'}>
            <div className={'chart'} style={{height: state.chartHeight}}>
                {
                    data.map((item, index) => (
                        <div className={'chart-item'} key={index} style={{
                            background: item.color ?? '#00ADB5',
                            width: (state.chartWidth - metadata.gap * (data.length - 1)) / data.length,
                            height: metadata.height * Math.abs(item.value) / (metadata.maxValue - metadata.minValue),
                            marginRight: index === data.length - 1 ? 0 : metadata.gap,
                            marginBottom: item.value > 0 ? -state.chartMinValue / (metadata.maxValue - metadata.minValue) * metadata.height : 0
                        }}>
                        </div>
                    ))
                }
                <div className={'max-value-line'} style={{
                    top: Math.abs(metadata.maxValue - state.chartMaxValue) / (metadata.maxValue - metadata.minValue) * metadata.height
                }} />
                <div className={'min-value-line'} style={{
                    top: state.chartHeight + state.chartMinValue / (metadata.maxValue - metadata.minValue) * metadata.height
                }} />
            </div>
            <div className={'chart-titles'}>
                {
                    data.map((item, index) => (
                        <label style={{
                            width: (state.chartWidth - metadata.gap * (data.length - 1)) / data.length,
                            marginRight: index === data.length - 1 ? 0 : metadata.gap,
                        }}>
                            {item.title}
                        </label>
                    ))
                }
            </div>
        </div>
    )
}