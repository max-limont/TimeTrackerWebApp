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
        width: number
        height: number
        scale: {
            step: number
        }
    },
    data: StatisticDataType[]
}

export type StatisticStateType = {
    chartWidth: number,
    chartHeight: number,
    chartMaxValue: number,
    chartMinValue: number,
    scale: {
        values: number[]
    }
}

const initialState: StatisticStateType = {
    chartWidth: 0,
    chartHeight: 0,
    chartMaxValue: 0,
    chartMinValue: 0,
    scale: {
        values: []
    }
}

export const defaultMetadata = {
    maxValue: 1e-16 + 1,
    minValue: 1e-16 - 1,
    gap: 0,
    width: 0,
    height: 0,
    scale: {
        step: 1
    }
}

export const Statistics: FC<StatisticPropsType> = (props) => {

    const {metadata, data} = props
    const [state, setState] = useState({...initialState, chartHeight: metadata.height, chartWidth: metadata.width, chartMaxValue: metadata.maxValue, chartMinValue: metadata.minValue});

    const resizeChart = () => {
        let maxValue = metadata.maxValue, minValue = metadata.minValue;
        data.forEach(item => {
            minValue = Math.min(minValue, item.value)
            maxValue = Math.max(maxValue, item.value)
        })
        let scaleValues: number[] = []
        for (let i = minValue; i <= maxValue; i += metadata.scale.step) {
            scaleValues = [...scaleValues, i]
        }
        setState({
            ...state,
            chartWidth: Math.min(document.getElementsByClassName('statistic-panel')[0].clientWidth - 45 ?? metadata.width, metadata.width),
            chartHeight: metadata.height,
            chartMaxValue: maxValue,
            chartMinValue: minValue,
            scale: {
                values: scaleValues
            }
        })
    }

    useEffect(() => {
        window.addEventListener('resize', () => resizeChart(), false)
        resizeChart()
    }, [data, metadata])

    return (
        <div className={'chart-wrapper flex-container flex-column'}>
            <div className={'chart-container flex-container'}>
                <div className={'scale flex-container'}>
                    {
                        state.scale.values.map((value, index) => (
                            <label key={index} style={{
                                bottom: (value - state.chartMinValue) / (state.chartMaxValue - state.chartMinValue) * state.chartHeight
                            }}>
                                {value}
                            </label>
                        ))
                    }
                </div>
                <div className={'chart'} style={{height: state.chartHeight}}>
                    {
                        data.map((item, index) => (
                            <div className={`chart-item ${item.value > 0 ? 'positive' : 'negative'}`} key={index} style={{
                                background: item.value >= metadata.maxValue ? '#33B249' : item.value >= metadata.maxValue / 2 ? '#FFC107' : '#F24C4C',
                                width: (state.chartWidth - metadata.gap * (data.length - 1)) / data.length,
                                height: state.chartHeight * Math.abs(item.value) / (state.chartMaxValue - state.chartMinValue),
                                marginRight: index === data.length - 1 ? 0 : metadata.gap,
                                marginBottom: item.value >= 0 ? -state.chartMinValue / (state.chartMaxValue - state.chartMinValue) * state.chartHeight : -2
                            }}>
                                <div className={'value'}>
                                    {item.value}
                                </div>
                            </div>
                        ))
                    }
                    <div className={'max-value-line'} style={{
                        top: Math.abs(metadata.maxValue - state.chartMaxValue) / (state.chartMaxValue - state.chartMinValue) * state.chartHeight
                    }} />
                    <div className={'min-value-line'} style={{
                        top: state.chartHeight + state.chartMinValue / (state.chartMaxValue - state.chartMinValue) * state.chartHeight
                    }} />
                </div>
            </div>
            <div className={'chart-titles'}>
                {
                    data.map((item, index) => (
                        <label key={index} style={{
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